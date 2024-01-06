function paginate(data, curentPage, amountContetntInPage) {
  const startIndex = (curentPage - 1) * amountContetntInPage;
  if (data) {
    return [...data].splice(startIndex, amountContetntInPage)
  }
}

export default paginate;