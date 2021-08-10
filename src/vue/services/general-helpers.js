export default {
  addQueryParam(newParamObj, queryStr) {
    let queryObj = this.convertQueryStringToObject(queryStr);
    queryObj = { ...queryObj, ...newParamObj };
    let queryArr = [];
    Object.keys(queryObj).forEach(key => {
      queryArr.push(`${key}=${queryObj[key]}`);
    });
    return `?${queryArr.join("&")}`
  },
  convertQueryStringToObject(str) {
    if (!str) return {};
    let obj = {};
    const keyValueStrArr = str.slice(1).split("&");
    keyValueStrArr.forEach(keyValueStr => {
      const keyValueArr = keyValueStr.split("=");
      obj[keyValueArr[0]] = keyValueArr[1];
    });
    return obj;
  }
};


