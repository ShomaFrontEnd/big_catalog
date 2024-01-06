import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "../../../app/hooks/useProduct";
import ImagesGrid from "../imagesGrid";




const ProductPage = () => {
  const [imageCount, setImageCount] = useState(0)
  const params = useParams();

  console.log(params.id)

  const { getProductById } = useProduct();
  const currentProductData = getProductById(params.id)


  const slidePrev = () => {
    if (imageCount === 0) {
      setImageCount(currentProductData.imgPaths.length - 1);
      return;
    }
    setImageCount(prev => prev - 1);

  }



  const slideNext = () => {
    if (imageCount === currentProductData.imgPaths.length - 1) {
      setImageCount(0);
      return;
    }
    setImageCount(prev => prev + 1);
  }



  return (

    <>
      <div className="m-auto h-screen p-5 w-full sm:w-fit pt-5 mb-5 ">
        <div className=" sm:w-fit lg:w-[65rem] ">

          <div className="mb-5 relative  ">
            <img className="h-auto  rounded-lg  border" src={currentProductData.imgPaths[imageCount]} alt="divan" />
            <button type="button" className="absolute top-0 start-0  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
              <span
                onClick={slidePrev}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full  bg-gray-800/30  group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                <i className="bi bi-caret-left text-xl text-white"></i>
                <span className="sr-only">Предыдущий</span>
              </span>
            </button>
            <button type="button" className="absolute top-0 end-3  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
              <span
                onClick={slideNext}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full  bg-gray-800/30  group-hover:bg-gray-800/60 group-focus:ring-4  group-focus:ring-gray-800/70 group-focus:outline-none">
                <i className="bi bi-caret-right text-xl text-white"></i>
                <span className="sr-only">Следующий</span>
              </span>
            </button>

          </div>
          {/* ------------------- List --------------------------------------------------- */}
          <ImagesGrid data={currentProductData.imgPaths} imageCount={imageCount} wSize={20} cols={8} handleClick={setImageCount} />


        </div>
      </div>


    </>

  );
}

export default ProductPage;