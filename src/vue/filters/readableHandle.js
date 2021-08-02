const readableHandle = (val) => {
  if (!val) return "";
  const capitalized = val.split("-").map(word => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capitalized.join(" ");
}
export {
  readableHandle
}