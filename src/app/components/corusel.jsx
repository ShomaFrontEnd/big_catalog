
import React, { useEffect, useState } from 'react';
import { useImage } from '../hooks/useImage';
// import Sidebar from './sidebar';
const Corusel = () => {



  const [currentIndex, setCurrentIndex] = useState(0);


  const { imgData, isImgLoading, fetchImages } = useImage();

  useEffect(() => {
    fetchImages('mainCarousel')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // console.log(imgData)

  // const slides = [
  //   {
  //     url: 'https://files.meb100.ru/products/dd212fc9c773ddc110b538dc4387e9e6.jpg',
  //     id: '1a1a',
  //     title: '20 лет с вами'
  //   },
  //   {
  //     url: 'https://files.meb100.ru/products/91ad8360798a3adc81b5a69807e48f5c.jpg',
  //     id: '2b2b',
  //     title: 'Бесплатная доставка по городу!'
  //   },
  //   {
  //     url: 'https://files.meb100.ru/products/c9f86ecfea1dfb8d963a810668530d92.jpg',
  //     id: '3c3c',
  //     title: 'Скидка на первый заказ!'
  //   },
  //   {
  //     url: 'https://files.meb100.ru/products/1184fa1f97528dc13e121db5dbf49d44.jpg',
  //     id: '4d4d',
  //     title: 'На выбор олее 550 видов тканей  '
  //   },
  //   {
  //     url: 'https://files.meb100.ru/products/889d00c309cc59cd2c4b0ce47ed5f8f9.jpg',
  //     id: '5e5e',
  //     title: 'Гарантия до 2-х лет'
  //   },
  //   {
  //     url: 'https://files.meb100.ru/products/40dc5fe2efb470d8b91d1726dc0b0944.jpg',
  //     id: '5e5eq',
  //     title: 'Высокая качества'
  //   },
  //   {
  //     url: 'https://files.meb100.ru/products/original/divan-sofa-modulnaya-s-podlokotnikami-2022-04-02-07-38-59-1707.jpg',
  //     id: '5e5ew',
  //     title: 'Скидка на первый заказ!'
  //   },
  // ];


  const slideSize = !isImgLoading ? imgData.length : 0


  const handleNextSlide = () => {
    if (slideSize > 0) {
      const slideIndex = currentIndex === slideSize - 1 ? 0 : currentIndex + 1
      setCurrentIndex(slideIndex);
    }
  }

  setTimeout(() => {
    handleNextSlide()
  }, 3000);

  // console.log(currentIndex)

  return (<div className='h-screen '>

    {!isImgLoading ? 
    <div className='bg-gray-'>
      {/* <Sidebar /> */}
      <div className='p-4 sm:ml-64  ' >
        <div className='max-w-[45vw] h-[27vw]  w-full m-auto border py-5 px-4 rounded-xl  bg-gray-200  relative group '>
          <img
          alt={imgData[currentIndex].name}
            src={imgData[currentIndex].url}
            className='w-full h-full rounded-xl bg-center bg-cover  duration-500 '
          />
          {/* title */}
          {/* {slides[currentIndex].title &&
            <div
              className='duration-500 absolute  bottom-[30%] p-2 md:text-2xl lg:text-3xl text-red-600 bg-white/30 p-1 '  >
              <span className=''>{slides[currentIndex].title}</span>
            </div>} */}
        </div>
      </div>
    </div>
      :

      <div className='text-center mt-20 text-xl'>
        <span className="">Загрузка...</span>
      </div>


    }
  </div>
  );
}

export default Corusel;