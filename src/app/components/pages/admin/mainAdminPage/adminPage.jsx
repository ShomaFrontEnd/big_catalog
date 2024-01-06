import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsTable from "../productsTable";

import CategoryControl from "../controlComponents/categoryControl";
import ProductControlPage from "../controlComponents/productControlPage";
import ImgControlGridList from "../controlComponents/imgControlGridList";
import { useImage } from "../../../../hooks/useImage";




const AdminPage = () => {

  const params = useParams();
  const { prodId, edit, createProduct } = params;
  const [showCarouselImage, setShowImage] = useState(false);


  const handleToggleShowImg = () => {
    setShowImage(prev => !prev)
  }


  return (
    <div className=" h-screen md:px-1 lg:px-20">
      {prodId && edit
        ? <div className="h-screen"> <ProductControlPage /> </div>
        : createProduct
          ? <div className="h-screen"> <ProductControlPage /> </div>
          : <div className=" h-screen">
            <div className="md:grid md:grid-cols-8 bg-gray-300 sm:grid-cols-6  gap-4 my-10">

              <section className='md:col-span-3 bg-gray-600 rounded text-white'>
                <CategoryControl />

                <div >
                  <h3 className="text-center font-bold py-1 text-lg rounded bg-gray-700">Фото карусели</h3>
                  <div className=" px-2">
                    <button className="bg-purple-500 w-full duration-200 hover:bg-purple-400 active:bg-purple-500 p-1 text-sm duration-300 text-center  rounded-lg "
                      onClick={handleToggleShowImg}
                    >{!showCarouselImage ? <i className="bi bi-eye"> Показать</i> : <i className="bi bi-eye-slash"> Скрыть</i>}
                    </button>
                  </div>
                  {showCarouselImage && <ImgControlGridList path='mainCarousel' />}
                </div>
              </section>

              <section className="col-span-5 col-end-9">
                <ProductsTable />
              </section>

            </div>
          </div>}
    </div>
  );
};

export default AdminPage;