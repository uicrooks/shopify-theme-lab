const singularize = (val) => {
  if (!val) return "";
  return val.slice(-1).toLowerCase() === "s" ? val.slice(0, -1) : val;
}

export {
  singularize
}