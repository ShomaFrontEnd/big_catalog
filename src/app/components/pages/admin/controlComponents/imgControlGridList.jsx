import { useEffect, useRef } from "react";
import BorderWrapper from "../../../hoc/borderWrapper";
import { useImage } from "../../../../hooks/useImage";
import { nanoid } from "nanoid";




const ImgControlGridList = ({ path }) => {
  const inputRef = useRef(null);

  const { deleteImage, imgData, uploadImages, setImgData, fetchImages } = useImage();


  useEffect(() => {
    setImgData([]);
    return function cleanup() {
      setImgData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchImages(path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);


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
    await uploadImages(path);
  };


  return (

    // max-w-full

    <BorderWrapper>
      <div className="grid grid-cols-2 max-w-full  md:grid-cols-3 xl:grid-cols-4 m-3 gap-4">
        {imgData && imgData.map(i => (
          <div className="relative bg-black rounded-t-lg" key={i.id} >
            {i.ref && <i className="absolute left-1 text-purple-500  bi bi-cloud-fill"></i>}
            < img className="h-auto bg-purple-900 rounded-t-lg " src={i.url} alt={i.name} />
            <button
              onClick={() => handleImgDelete(i)}
              className="  text-sm absolute bg-red-500/50 w-full duration-200 rounded-t-xl text-center bottom-0 hover:bg-red-500 duration-200 ">
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
            className="h-full py-2  flex flex-col border cursor-pointer items-center justify-center duration-300 max-w-full bg-gray-400/60 hover:bg-gray-400/70 rounded-lg">
            <span className="bi bi-plus-lg mr-1"></span>
            Добавить
          </label>
        </form>

      </div>
      <div className="flex justify-center px-5">
        <button
          onClick={handleUploadImg}
          className="bg-purple-500 w-full duration-200 hover:bg-purple-400 active:bg-purple-500 py-1 duration-300 text-center px-1 m-1 rounded-xl"
        >Сохранить Фото
        </button>
      </div>
    </BorderWrapper>







  );
}

export default ImgControlGridList;