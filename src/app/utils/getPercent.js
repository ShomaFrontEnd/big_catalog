const getPercent = (oldPrice, newPrice) => {
  return Math.ceil(100 - (Number(newPrice) / (Number(oldPrice) / 100)))
}
export default getPercent;