import React from 'react';
import TextField from '../formFields/textField';




const ModalPrompt = ({ title,name, selectedName, value, error, onChange, label, onModalToggle, handleApply, applyBtnText }) => {

  return (
    <div className='flex items-center justify-center '>
      <div className='relative bg-gray-700 top-6 rounded-lg  w-9/12 h-52 '>
        <h2 className='text-center my-2'>{title}</h2>
        {selectedName &&

          <div className='text-center italic text-yellow-400'>
            {selectedName}...
            <i className="bi bi-pen ms-[2px]"></i>
          </div>}
        <div className='flex justify-center mx-3 mt-4'>
          <TextField
            basic
            type='text'
            placeholder='Новое название'
            value={value || ''}
            label={label}
            name={name}
            error={error}
            onChange={onChange}
          />
        </div >
        <div className='flex justify-center '>
          <div className='absolute bottom-6 '>
            <button
              onClick={() => onModalToggle()}
              className='bg-orange-400 rounded m-1 px-2 hover:bg-orange-300'>Отмена</button>
            <button
              onClick={handleApply}
              className={' rounded m-1 px-2 disabled  ' + (!value || !value.trim() ? 'bg-gray-400  cursor-not-allowed' : 'bg-green-600 hover:bg-green-500')}
            >{applyBtnText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPrompt;