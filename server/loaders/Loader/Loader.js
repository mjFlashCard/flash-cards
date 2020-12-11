const EventEmitter = require('events');
const DataLoader = require('dataloader');

const ALL_RESOLVED = 'ALL_RESOLVED';

// Wrapped DataLoader that allows loading all documents in collection
function Loader(batchFn, { queryAllFn, cacheFn, ...options }) {
  // Call DataLoader constructor
  DataLoader.call(this, async function batch(keys) {
    const results = await batchFn(keys);
    if (this._cacheFn) this._cacheFn(results);
    this.clearAll();
    return results;
  }, options);
  // Loader attribues
  this._queryAllFn = queryAllFn;
  this._cacheFn = cacheFn;
  this._allPending = false;
  this._loadEmitter = new EventEmitter();
}

// Inherit prototype from DataLoader class
Loader.prototype = Object.create(DataLoader.prototype);

// Define Loader prototype as constructor with value of Loader
Object.defineProperty(Loader.prototype, 'constructor', {
  value: Loader,
  enumerable: false,
  writable: true
});

// Save old 'load' function as '_load'
Loader.prototype._load = Loader.prototype.load;

// Custom 'load' method that waits if a call has been made for all documents in collection
Loader.prototype.load = function load(key) {
  return new Promise((resolve, reject) => {
    try {
      // If 'loadAll' has been called, wait for response and take advantage of cache
      if (this._allPending) {
        this._loadEmitter.on(ALL_RESOLVED, () => resolve(this._load(key)));
      // Use old 'load' method
      } else resolve(this._load(key));
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
      if (this._allPending) {
        this._loadEmitter.on(ALL_RESOLVED, () => {
          resolve(this.loadMany([...this._cacheMap.keys()]));
        });
      // If 'queryAllFn' has been defined, pend future loads and use query db
      } else if (this._queryAllFn) {
        // Pend future loads
        this._allPending = true;
        // Query db
        this._queryAllFn()
          .then((results) => {
            // Custom cache function for priming other loader's cache
            if (this._cacheFn) this._cacheFn(results);
            // Manually prime cache with results
            results.forEach((result) => this.prime(result._id.toString(), result));
            // Execute pending loads
            this._allPending = false;
            this._loadEmitter.emit(ALL_RESOLVED);
            this._loadEmitter.removeAllListeners(ALL_RESOLVED);
            // Resolve results
            resolve(results);
          }).catch((err) => reject(err));
      } else reject(new Error('Expected queryAllFn to not be undefined'));
    } catch (err) {
      reject(err);
    }
  });
};

// Set CacheFn after instantiation
Loader.prototype.setCacheFn = function setCacheFn(cacheFn) {
  this._cacheFn = cacheFn;
};

module.exports = Loader;
