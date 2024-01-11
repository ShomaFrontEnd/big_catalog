import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductsTable from "../productsTable";

import CategoryControl from "../controlComponents/categoryControl";
import ProductControlPage from "../controlComponents/productControlPage";
import ImgControlGridList from "../controlComponents/imgControlGridList";
// import { useImage } from "../../../../hooks/useImage";




const AdminPage = () => {

  const params = useParams();
  const { prodId, edit, createProduct } = params;
  const [showCarouselImage, setShowCarouselImage] = useState(false);
  // const [showaboutUsImage, setShowaboutUsImage] = useState(false);
  





  return (
    <div className=" md:px-1 lg:px-20">
      {prodId && edit
        ? <div className="h-screen"> <ProductControlPage /> </div>
        : createProduct
          ? <div > <ProductControlPage /> </div>
          : <div >
            <div className="md:grid md:grid-cols-8 bg-gray-300 sm:grid-cols-6  gap-4 my-10">

              <section className='md:col-span-3 bg-gray-600 rounded text-white'>
                {/* //categories */}
                <CategoryControl />

                {/* carousel images control */}
                <div className="mb-3 pb-2">
                  <div className="text-center font-bold py-1 text-lg rounded bg-gray-700 ">Фото карусели</div>
                  <div className=" px-2 bg-gray-700 pb-1">
                    <button className="bg-purple-500 w-full duration-200 hover:bg-purple-400 active:bg-purple-500 p-1 text-sm duration-300 text-center  rounded-lg "
                      onClick={() => setShowCarouselImage(prev => !prev)}
                    >{!showCarouselImage ? <i className="bi bi-eye"> Показать</i> : <i className="bi bi-eye-slash"> Скрыть</i>}
                    </button>
                  </div>
                  {showCarouselImage && <ImgControlGridList path='mainCarousel' />}
                </div>
                {/* //-----------About us------------------ */}
                {/* <div className="mb-3 pb-2">
                  <div className="text-center font-bold py-1 text-lg rounded bg-gray-700 ">Фото страницы `О нас`</div>
                  <div className=" px-2 bg-gray-700 pb-1">
                    <button className="bg-purple-500 w-full duration-200 hover:bg-purple-400 active:bg-purple-500 p-1 text-sm duration-300 text-center  rounded-lg "
                      onClick={() => setShowaboutUsImage(prev => !prev)}
                    >{!showaboutUsImage ? <i className="bi bi-eye"> Показать</i> : <i className="bi bi-eye-slash"> Скрыть</i>}
                    </button>
                  </div>
                  {showaboutUsImage && <ImgControlGridList path='aboutUs' />}
                </div> */}


              </section>


              {/* product list section(Right side) */}
              <section className="col-span-5 col-end-9">
                <ProductsTable />
              </section>

            </div>
          </div>}
    </div>
  );
};

export default AdminPage;