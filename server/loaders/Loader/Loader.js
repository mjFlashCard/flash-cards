const EventEmitter = require('events');
const DataLoader = require('dataloader');

const ALL_RESOLVED = 'ALL_RESOLVED';

// Wrapped DataLoader that allows loading all documents in collection
function Loader(batchFn, { batchAllFn, ...options }) {
  // Push loader to '_loaders' array
  Loader._loaders.push(this);
  // Call DataLoader constructor
  DataLoader.call(this, batchFn, options);
  // Loader attribues
  this._batchAllFn = batchAllFn;
  this._connected = [this];
  this._all = { pending: false, resolved: false };
  this._loadEmitter = new EventEmitter();
}

// Inherit prototype from DataLoader class
Loader.prototype = Object.create(DataLoader.prototype);

// Static property for keeping track of loader instances
Loader._loaders = [];

// Static method for calling all instance '_cleanup' methods
Loader.cleanup = function cleanup() {
  for (let i = 0; i < this._loaders.length; i++) {
    this._loaders[i]._cleanup();
  }
};

// Save old 'load' function as '_load'
Loader.prototype._load = Loader.prototype.load;

// Custom 'load' method that waits if a call has been made for all documents in collection
Loader.prototype.load = function load(key) {
  return new Promise((resolve, reject) => {
    try {
      // If 'loadAll' results have been resolved, take advantage of cache
      if (this._all.resolved) resolve(this._cacheMap.get(key.toString()));
      // If 'loadAll' has been called, wait for response
      else if (this._all.pending) this._pend(() => resolve(this.load(key)));
      // Use old 'load' method
      else resolve(this._load(key));
    } catch (err) {
      reject(err);
    }
  });
};

// Method for loading all documents in collection with specified 'queryAllFn'
Loader.prototype.loadAll = function loadAll() {
  return new Promise((resolve, reject) => {
    try {
      // If method has already been called, wait for response and load keys from cacheMap
      if (this._all.pending) {
        this._pend(() => resolve(this.loadMany([...this._cacheMap.keys()])));
      // If 'queryAllFn' has been defined, pend future loads and use query db
      } else if (this._batchAllFn) {
        // Pend future loads
        this._setAll({ pending: true });
        // Query db
        this._batchAllFn()
          .then((results) => {
            // Set loader to resolved
            this._setAll({ resolved: true });
            // Manually prime cache with results
            results.forEach((result) => this.prime(result._id.toString(), result));
            // Execute pending loads
            this._execPending();
            // Resolve results
            resolve(results);
          }).catch((err) => reject(err));
      } else reject(new Error('Expected batchAllFn to not be undefined'));
    } catch (err) {
      reject(err);
    }
  });
};

// Connect loader
Loader.prototype.connect = function connect(...loaders) {
  for (let i = 0; i < loaders.length; i++) {
    this._connected.push(loaders[i]);
    loaders[i]._connected.push(this);
  }
};

// Set loader and all connected loaders '_all' property
Loader.prototype._setAll = function _setAll({ pending, resolved }) {
  for (let i = 0; i < this._connected.length; i++) {
    if (pending !== undefined) this._connected[i]._all.pending = pending;
    if (resolved !== undefined) this._connected[i]._all.resolved = resolved;
  }
};

// Clear cache and set loader to unresolved
Loader.prototype._cleanup = function _cleanup() {
  this._all.resolved = false;
  this.clearAll();
};

// Pend callback until 'execPending' is called
Loader.prototype._pend = function _pend(cb) {
  this._loadEmitter.on(ALL_RESOLVED, cb);
};

// Execute pending loads
Loader.prototype._execPending = function _execPending() {
  this._setAll({ pending: false, resolved: true });
  for (let i = 0; i < this._connected.length; i++) {
    this._connected[i]._loadEmitter.emit(ALL_RESOLVED);
    this._connected[i]._loadEmitter.removeAllListeners(ALL_RESOLVED);
  }
};

// Define Loader prototype as constructor with value of Loader
Object.defineProperty(Loader.prototype, 'constructor', {
  value: Loader,
  enumerable: false,
  writable: true
});

module.exports = Loader;
