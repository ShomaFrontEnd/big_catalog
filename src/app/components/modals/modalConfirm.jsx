import React from 'react';


const ModalConfirm = ({ title, currentData, onModalToggle, handleApply, applyBtnText }) => {

  return (
    <div className='flex  text-white items-center justify-center '>
      <div className='relative  max-w-md bg-gray-700 top-6 rounded-lg  w-9/12 h-52 '>
        <h2 className='text-center mt-6'>{title}</h2>
        {currentData &&

          <div className='text-center mt-8 italic font-bold text-lg underline text-red-500'>
            {currentData.name}

          </div>}

        <div className='flex justify-center '>
          <div className='absolute bottom-6 '>
            <button
              onClick={() => onModalToggle()}
              className='bg-yellow-500 rounded m-1 px-2   hover:bg-yellow-400'>Отмена</button>
            <button
              onClick={() => handleApply(currentData.id)}
              className='bg-red-500 rounded m-1 px-2 hover:bg-red-600'>{applyBtnText}</button>
          </div>
        </div>
      </div>
    </div>



  );
}

export default ModalConfirm;