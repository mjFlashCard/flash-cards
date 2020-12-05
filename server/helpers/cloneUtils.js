const cloneUtils = () => {};

cloneUtils.shallowClone = (obj) => {
  if (typeof obj !== 'object') throw new TypeError("Expected argument of type 'object'");
  if (Array.isArray(obj)) return Object.values(obj);
  const result = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = obj[keys[i]];
  }
  return result;
};

cloneUtils.deepClone = function deepClone(obj) {
  if (typeof obj !== 'object') throw new TypeError("Expected argument of type 'object'");
  const clone = {};
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const val = obj[key];
    if (typeof val === 'object') {
      clone[key] = deepClone(val);
      if (Array.isArray(val)) clone[key] = Array.from(clone[key]);
    } else clone[key] = val;
  });
  return clone;
};

module.exports = cloneUtils;
