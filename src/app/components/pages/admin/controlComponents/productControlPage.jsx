import { useEffect, useRef, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { useProduct } from "../../../../hooks/useProduct";
import { useImage } from "../../../../hooks/useImage";
import TextField from "../../../formFields/textField";
import NumberField from "../../../formFields/numberField";
import SelectField from "../../../formFields/selectField";
import getDiscountPriceByPercent from "../../../../utils/getDiscountPriceByPercent";
import TextArea from "../../../formFields/textArea";
import BorderWrapper from "../../../hoc/borderWrapper";

const imagesEndpoint = 'furnitures/';



const ProductControlPage = () => {

  const params = useParams();
  const { prodId } = params;
  const navigate = useNavigate();
 
  const [mainInfo, setMainInfo] = useState({});
  const [newProperty, setNewProperty] = useState({});
  const [productProperty, setProductProperty] = useState({});


  const { deleteImage, imgData, uploadImages, setImgData, fetchImages } = useImage();
  const { getProductById, categoryIsLoading, category, updateProduct, isLoading } = useProduct();
  const product = !isLoading ? getProductById(prodId) : null;

  // console.log(mainInfo)


  const handleSaveChanges = async () => {
    if (!!+mainInfo.discount) {
      const discountPrice = getDiscountPriceByPercent(mainInfo.price, mainInfo.discount);
      await updateProduct({ ...mainInfo, info: productProperty, discountPrice, id: mainInfo.id || prodId, previewURL: imgData[0].url || '' });
      return;
    }
    await updateProduct({ ...mainInfo, info: productProperty, previewURL: imgData[0].url || '' });
  }


  function handleChangeMainInfo({ target }) {
    setMainInfo(prev => ({ ...prev, [target.name]: target.value }));
    // console.log(data.name, data.value)
  }

  function handleChangeNewProperty({ target }) {
    setNewProperty(prev => ({ ...prev, [target.name]: target.value }));
    // console.log(data.name, data.value)
  }
  //******* IMAGE **************************************************************************************************************************************

  const inputRef = useRef(null);

  function handleInputFileChange({ target }) {
    const files = [...target.files];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImgData(prev => {
          return ([
            ...prev,
            {
              name: file.name,
              size: file.size,
              url: reader.result,
              ref: null,
              id: nanoid(),
              file,
            }]
          );
        });
      };
      reader.readAsDataURL(file);
    });

  };
  // console.log('img', imgData);

  const handleImgDelete = async (image) => {
    await deleteImage(image);
  };


  const handleUploadImg = async () => {
    const path = imagesEndpoint + prodId;

    await uploadImages(path);
  };

  //--------------------------------------------------------------------------------------------------------------------

  const handleCreateProperty = () => {
    if (newProperty.propertyName && newProperty.propertyValue) {
      setProductProperty(prev => ({ ...prev, [newProperty.propertyName]: newProperty.propertyValue }));
      setNewProperty({});
    };
  };



  const handleDeleteProperty = (name) => {
    setProductProperty(prev => {
      const newObj = { ...prev };
      delete newObj[name];
      return newObj;
    });
  };

  //EFFECTS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const getImagesFromServer = async () => {
      const path = imagesEndpoint + prodId;
      await fetchImages(path);
    };
    getImagesFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodId]);

  // useEffect(() => {
  //   setImgData([]);
  //   return function cleanup() {
  //     setImgData([]);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (product) {
      if (!isLoading) {
        setProductProperty(prev => ({ ...prev, ...product.info, }));
        if (!categoryIsLoading) {
          // const category = getCategorytById(product.category);
          setMainInfo(prev => ({ ...prev, ...product, }));
        };
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, categoryIsLoading, prodId]);

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // console.log(newProperty.description)

  return (<>{!isLoading &&
    <>
      <section className="relative">
        <div className="text-center text-white text-3xl mt-10 bg-purple-600 rounded-t h-14 py-2">{mainInfo.name || 'Название продукта'}</div>
        <button onClick={handleSaveChanges} className="absolute top-3 right-10 duration-200 text-center bg-green-500 text-white rounded-xl p-1 active:bg-green-500 hover:bg-green-400"><i className="bi bi-save2"> </i>Сохранить</button>
        <button onClick={() => navigate(-1)} className="absolute top-3 left-10 duration-200 text-center bg-yellow-400 text-white rounded-xl p-1 px-2 active:bg-yellow-400 hover:bg-yellow-300">←Назад</button>
      </section>

      <div className="md:grid h-screen md:grid-cols-6 bg-gray-300 text-white gap-3 bg-gray-500 pt-3 sm:grid-cols-6 mb-5 ">

        {/* left side*/}
        <div className="md:col-span-3 rounded bg-gray-600  text-white">

          <BorderWrapper>
            <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 m-3 gap-4">
              {imgData.length > 0 && imgData.map(i => (

                <div className="relative" key={i.id} >
                  {i.ref && <i className="absolute left-1 text-purple-500  bi bi-cloud-fill"></i>}
                  < img className="h-auto max-w-full rounded-lg " src={i.url} alt={i.name} />
                  <button
                    onClick={() => handleImgDelete(i)}
                    className="absolute bg-red-500/50 w-full duration-200 rounded-t-xl text-center bottom-0 hover:bg-red-500 duration-200 ">
                    Удалить
                  </button>
                </div>
              ))}


              <form >
                <input
                  accept="image/*"
                  multiple
                  type="file"
                  id="imgChange"
                  className="hidden"
                  name="image"
                  ref={inputRef}
                  onChange={handleInputFileChange}
                />
                <label
                  htmlFor="imgChange"
                  className="h-full flex cursor-pointer items-center justify-center duration-300 max-w-full bg-gray-400/60 hover:bg-gray-400/70 rounded-lg">
                  <span className="bi bi-plus-lg mr-1"></span>
                  Добавить
                </label>
              </form>

            </div>
            <div className="flex justify-center px-5">
              <button
                onClick={handleUploadImg}
                className="bg-purple-500 w-full  duration-200 hover:bg-purple-400 active:bg-purple-500 py-1 duration-300 text-center px-1 m-1 rounded-xl"
              >Сохранить Фото
              </button>
            </div>
          </BorderWrapper>
        </div>





        {/* right side*/}
        <div className="col-span-3 col-end-7 bg-gray-600 rounded">

          <BorderWrapper>
            <p className="text-center font-bold  mb-3 underline">Основные свойства:</p>
            {!isLoading &&
              <div className="grid gap-2 mb-3 md:grid-cols-3 mx-2">
                <div>
                  <TextField onChange={handleChangeMainInfo} basic name='name' value={mainInfo.name || ''} label='Название:' />
                </div>
                <div>
                  <SelectField name='category' label='Категория:' options={category} onChange={handleChangeMainInfo} defaultOption={mainInfo.category} />
                </div>
                <div>
                  <TextField onChange={handleChangeMainInfo} type='number' basic name='price' value={mainInfo.price || ''} label='Цена (Руб):' />
                </div>
                <div>
                  <NumberField onChange={handleChangeMainInfo} label='Скидка в процентах(%)' min="0" max="100" name='discount' value={mainInfo.discount || '0'} type="number" />
                </div>
                {!!Number(mainInfo.discount) &&
                  <div className=' '>
                    <label htmlFor="">Цена со скидкой</label>
                    <div className=" bg-green-400 w-full py-1 rounded mt-1 text-center">
                      {productProperty.discountPrice || getDiscountPriceByPercent(mainInfo.price, mainInfo.discount)}
                    </div>
                  </div>}
              </div>
            }
          </BorderWrapper>


          <BorderWrapper>
            <p className="text-center font-bold  mb-3 underline">Дополнительные свойства:</p>
            <div className="grid gap-2 mb-6 md:grid-cols-3 mx-2">
              {productProperty && Object.keys(productProperty).map(key => (
                <div className="my-3" key={key}>
                  <div className="relative bg-purple-700 px-2 rounded">
                    <span className="mr-1">{key} : </span>
                    <span className="border-b border-purple-200">{productProperty[key]}</span>
                    <button onClick={() => handleDeleteProperty(key)} className="absolute duration-200 top-0 right-0 opacity-70 hover:opacity-100 rounded px-1 bg-red-400"><i className="bi bi-trash3 text-sm "></i></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="block px-2 py-1 bg-purple-700 rounded-t w-100 ">
              <TextArea
                onChange={handleChangeNewProperty}
                value={newProperty.description || ''}
                name='description'
                placeholder='Описание продукта...'
                label='Описание'
                rows='3'
                cols='40' />
            </div>
          </BorderWrapper>



          <BorderWrapper>
            <p className="text-center font-bold mb-5 my-2">Создать дополнительное свойство:</p>
            <div className="grid gap-6 mb-6 md:grid-cols-2 mx-2">
              <div>
                <TextField placeholder='пример:Механизм' onChange={handleChangeNewProperty} basic name='propertyName' value={newProperty.propertyName || ''} label='Название' />
              </div>
              <div>
                <TextField placeholder='пример:Тик-Так' onChange={handleChangeNewProperty} basic name='propertyValue' value={newProperty.propertyValue || ''} label='Значение' />
              </div>
            </div>

            <div className="flex justify-center px-5">
              <button
                onClick={handleCreateProperty}
                className="bg-purple-500 w-full  duration-200 hover:bg-purple-400 active:bg-purple-500 py-1 duration-300 text-center px-1 m-1 rounded-xl">
                Добавить свойство
              </button>
            </div>
          </BorderWrapper>




        </div >
      </div >


    </ >
  }
  </>

  );
}

export default ProductControlPage;