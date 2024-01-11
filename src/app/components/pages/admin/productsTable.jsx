import { Link, useNavigate, } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import { useState } from "react";

import ModalConfirm from "../../modals/modalConfirm";
import { nanoid } from "nanoid";


const ProductsTable = () => {
  const navigate = useNavigate();

  const [isPromptOpen, setPromptOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { product, isLoading, deleteProduct, categoryIsLoading, getCategorytById } = useProduct();
  


  if (isLoading || categoryIsLoading) {
    return 'Загрузка...';
  };

  // FUNCTIONS -----------------------------------------------------------------------------------------------------------


  const getCategoryName = (id) => {
    const category = getCategorytById(id);
    return category.name;
  };


  const handleTogglePrompt = (selData) => {
    setPromptOpen(prev => !prev);
    if (selData && !selectedProduct) {
      setSelectedProduct(selData);
      return;
    };
    setSelectedProduct();
  };


  async function handleDeleteProduct(id) {
    await deleteProduct(id);
    console.log(id);
    setSelectedProduct();
    setPromptOpen(false);
  };



  return (
        <div className=" relative h-[60rem] bg-gray-900 border overflow-x-hidden overflow-y-auto rounded-lg ">

          {isPromptOpen && <div className="absolute  bg-gray-500/70 h-full w-full  ">
            <ModalConfirm
              title='Действительно хотите Удалить?'
              currentData={selectedProduct}
              applyBtnText='Удалить'
              onModalToggle={handleTogglePrompt}
              handleApply={handleDeleteProduct}
            />
          </div>}

          <div className="overflow-auto shadow-md  ">


            <table className="w-full py-3 text-sm text-left rtl:text-right text-gray-400">
              
              <caption
                onClick={() => navigate(`product/${nanoid()}/newProduct/createProduct`)}
                className="w-1/2 ms-4 bg-green-500/80 rounded-xl m-2  py-3 duration-300 hover:bg-red-600 transition-1000 cursor-pointer text-center  text-white text-left ">
                <i className="bi bi-plus-lg"> </i>
                Создать новый продукт
              </caption>
              <caption className="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 text-white bg-gray-800">
                Список мебели
              </caption>

              <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Фото продукта</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Название
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Категория
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Цена
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Цена со скидкой
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Скидка '%'
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Изменить</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Удалить</span>
                  </th>
                </tr>
              </thead>


              <tbody>
                {product.map(item => (
                  <tr key={item.id} className=" even:bg-gray-800 odd:bg-gray-900  border-b border-gray-700">

                    <th scope="row" className="flex  justify-center">
                      {item.previewURL &&
                        <Link to={'/catalog/productPage/' + item.id}>
                          <img
                            className="mt-2 w-15 h-10 rounded"
                            src={item.previewURL}
                            alt={item.name} />
                        </Link>}
                    </th>

                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      <Link to={'/catalog/productPage/' + item.id}>
                        <div className="text-base font-semibold">{item.name} </div>
                      </Link>
                    </th>

                    <td className="px-6 py-4">
                      {getCategoryName(item.category) || ''}
                    </td>
                    <td className="px-6 py-4 text-green-200">
                      {item.price} руб.
                    </td>
                    <td className="px-6 py-4 text-orange-200">
                      {item.discountPrice
                        ? item.discountPrice
                        + ' руб.' : '---------'}
                    </td>
                    <td className="px-6 py-4 text-red-300">
                      {item.discount ? item.discount : '0'} %
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={'/admin/product/' + item.id + '/edit'} className="font-medium text-blue-500 hover:underline">
                        Изменить
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleTogglePrompt(item)}
                        className="font-medium text-white bg-red-500 rounded py-1 px-2 hover:underline">
                        Удалить
                      </button>
                    </td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>


        </div>



  );
}

export default ProductsTable;


// UseEffects ----------------------------------------------------------------------------------------------
  // ненужны когда есть product.previewURL!!!
  
    // const [prodIDs, setProdIDs] = useState([]);
    // const { fetchImages } = useImage();
    // const [tableImages, setTableImages] = useState([]);
  
  // useEffect(() => {
  //   async function getImage(imgId) {
  //     const content = await fetchImages(imgId);
  //     //меняем ID фото на ID продукта
  //     setTableImages(prev => ([...prev, { ...content, id: imgId }]));
  //   };
  //   if (prodIDs.length > 0) {
  //     prodIDs.forEach(id => { getImage(id) });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [prodIDs]);


  // useEffect(() => {
  //   setTableImages([]);
  //   const setProductImagesIds = () => {
  //     const newData = product.map(p => p.id);
  //     setProdIDs(newData);
  //   };
  //   if (!isLoading) {
  //     setProductImagesIds();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, product]);

  
  //getImageById ненужна когда есть product.previewURL!!!
    // const getImageById = (id) => {
    //   if (tableImages.length) {
    //     return tableImages.find(i => i.id === id);
    //   };
    // };