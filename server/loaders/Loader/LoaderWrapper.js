const EventEmitter = require('events');
const DataLoader = require('dataloader');

const ALL_RESOLVED = 'ALL_RESOLVED';

function Loader(batchFn, { queryAllFn, cacheFn, ...options }) {
  this._queryAllFn = queryAllFn;
  this._loader = new DataLoader(function batch(keys) {
    const results = batchFn(keys);
    if (this._cacheFn) this._cacheFn(results);
    this.clearAll();
    return results;
  }, options);
  this._cacheFn = cacheFn;
  this._allPending = false;
  this._loadEmitter = new EventEmitter();
}

// Custom load method
Loader.prototype.load = function load(key) {
  return new Promise((resolve, reject) => {
    try {
      if (this._allPending) {
        this._loadEmitter.on(ALL_RESOLVED, () => resolve(this._loader.load(key)));
      } else resolve(this._loader.load(key));
    } catch (err) {
      reject(err);
    }
  });
};

// Custom loadMany method
Loader.prototype.loadMany = function loadMany(keys) {
  return new Promise((resolve, reject) => {
    try {
      if (keys.length === 0) {
        if (this._allPending) {
          this._loadEmitter.on(ALL_RESOLVED, () => resolve(this._allFromCache()));
        } else if (this._loadAll) this._loadAll(resolve, reject);
        else reject(new Error('Expected queryAllFn to not be undefined'));
      } else resolve(this._loader.loadMany(keys));
    } catch (err) {
      reject(err);
    }
  });
};

// Expose _loader 'prime' method
Loader.prototype.prime = function prime(key, value) {
  return this._loader.prime(key.toString(), value);
};

// Set CacheFn after instantiation
Loader.prototype.setCacheFn = function setCacheFn(cacheFn) {
  this._cacheFn = cacheFn;
};

// Load all keys
Loader.prototype._loadAll = function loadAll(resolve, reject) {
  this._allPending = true;
  this._queryAllFn()
    .then((results) => {
      try {
        if (this._cacheFn) this._cacheFn(results);
        results.forEach((result) => this.prime(result._id.toString(), result));
        this._allPending = false;
        this._loadEmitter.emit(ALL_RESOLVED);
        this._loadEmitter.removeAllListeners(ALL_RESOLVED);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    }).catch((err) => reject(err));
};

// Load all keys from cache
Loader.prototype._allFromCache = function allFromCache() {
  return this._loader.loadMany([...this._loader._cacheMap.keys()]);
};

module.exports = Loader;
