import { useState } from "react";

import { useProduct } from "../../app/hooks/useProduct";





const Sidebar = ({ onSetCategory, selectedCategory, allData }) => {
  const [isOpen, setOpen] = useState(false);
  const { category, getProductCountByCategory } = useProduct();


  // const body = document.querySelector('body');
  const handleToggleOpen = () => {
    setOpen(prev => !prev)
    // if (!isOpen) {
    //   // console.log(isOpen)
    //   body.classList.add('overflow-hidden');
    //   return;
    // }
    // body.classList.remove('overflow-hidden')
  }


  const handleSetCategory = async (name) => {

    onSetCategory(name)
  }





  return (
    <>

      <button
        onClick={handleToggleOpen}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar" type="button"
        className={"bg-gray-200 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 " + (isOpen ? 'hidden' : '')}>
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <aside
        id="default-sidebar"
        className={"fixed top-25 left-0 z-30 w-72 h-full transition-transform -translate-x-full sm:translate-x-0 " + (isOpen ? 'translate-x-0' : '-translate-x-full')} aria-label="Sidebar">

        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="text-white text-right sm:hidden mb-2  " >
            <i
              onClick={handleToggleOpen}
              className="bi bi-x rounded cursor-pointer text-lg px-2  bg-gray-500 hover:bg-gray-600"
            >
            </i>

          </div>
          <ul className="space-y-2 font-medium">
            {category.map(c =>
            (<li key={c.id}>
              <div onClick={() => handleSetCategory(c.name.toLowerCase())} className={"cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-600   group " + (selectedCategory === c.name.toLowerCase() ? 'bg-gray-600' : '')}>
                <svg className="flex-shrink-0 w-5 h-5  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " >
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">{c.name}</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{getProductCountByCategory(c.id)}</span>
              </div>
            </li>)
            )}
            <li
              className="text-center"
              onClick={() => onSetCategory()}

            >
              <button className="bg-red-400 rounded py-1 hover:bg-red-500 px-2 text-white">Сбросить фильтр</button>
            </li>
          </ul>
        </div>
      </aside >
      <div
        onClick={handleToggleOpen}
        className={"z-10 absolute cursor-pointer top-0 bg-gray-800/80 sm:hidden w-full h-[250rem] " + (!isOpen ? 'hidden' : '')}>
      </div >
    </>
  );
}

export default Sidebar;