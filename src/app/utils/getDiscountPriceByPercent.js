const getDiscountPriceByPercent = (price, percent) => {

  return Math.ceil(Number(price) - ((Number(percent) / 100) * Number(price)))
}
export default getDiscountPriceByPercent;