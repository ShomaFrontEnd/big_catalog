


const Pagination = ({ currentPage, dataAmount, productAmountInPage, onSetPage, onPrevPage, onNextPage }) => {

  const pageCount = Math.ceil(dataAmount / productAmountInPage);
  let paginationArr = [];

  for (let i = 0; i < pageCount; i++) {
    paginationArr.push(i+1);
  };

  if (paginationArr.length <= 1) {
    return;
  }

  return (
    <nav aria-label="Page navigation  ">
      <ul className="flex justify-center -space-x-px h-8 text-sm mt-5 " >

        <li className=" cursor-pointer " onClick={onPrevPage}>
          <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="sr-only">Previous</span>
            <i className="bi bi-caret-left"></i>
          </div>
        </li>

        {paginationArr.map(num => (

          <li
            key={num+'-paginNumber'}
            className=" cursor-pointer"
            onClick={() => onSetPage(num)}
          >
            <div
              className={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white" + (currentPage === num ? ' bg-red-400 text-white' : '')}>{num}</div>
          </li>
        ))}

        <li className=" cursor-pointer" onClick={onNextPage}>
          <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white" >
            <span className="sr-only">Next</span>
            <i className="bi bi-caret-right"></i>
          </div>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;