import React, { useState } from 'react';
import Card from '../card';
import Sidebar from '../sidebar';
import { useParams } from 'react-router-dom';
import ProductPage from './productPage';
import Pagination from '../pagination';
import paginate from '../../../app/utils/paginate';
import { useProduct } from '../../../app/hooks/useProduct';



const CatalogPage = () => {

  const params = useParams()
  const [category, setCategory] = useState();

  const { product, getCategorytById, searchQuery } = useProduct();
  const [currentPage, setCurentPage] = useState(1);

  if (!product) return;

  const amountContetntInPage = 6;


  const filteredData = searchQuery
    ? product.filter(item =>
      item.name
        .concat(item.price)
        .concat(getCategorytById(item.category).name)
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase()))
    : category
      ? product.filter(item => getCategorytById(item.category).name.toLowerCase() === category)
      : product

  const dataLength = filteredData.length;

  const cropedData = paginate(filteredData, currentPage, amountContetntInPage)
  //------ Handlers ---------------------------------------------------------------------------------------------------------------------------------
  const handleNextPage = () => {
    if (Math.ceil(dataLength / amountContetntInPage) === currentPage) return;
    setCurentPage(prev => prev + 1)
  }

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurentPage(prev => prev - 1)
  }
  const handleSelectCategory = (name) => {
    setCurentPage(1)
    setCategory(name)
  }


  return (
    <div>
      {params.productPage
        ? <ProductPage />
        : <>
          <Sidebar onSetCategory={handleSelectCategory} selectedCategory={category} allData={product} />
          <div className='p-4 h-[100%] sm:ml-64 min-h-scree '>
            <h1 className='text-3xl  md:ml-10 font-bold '>Диваны в <span className='text-red-500'>Томске</span></h1>
            <hr className='border w-full border-black border-2'></hr>
            <div className='container mx-auto'>

              <Card data={cropedData} />
            </div>
            <Pagination
              currentPage={currentPage}
              dataAmount={dataLength}
              onSetPage={setCurentPage}
              productAmountInPage={amountContetntInPage}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          </div>
        </>
      }

    </div>
  );
}

export default CatalogPage;