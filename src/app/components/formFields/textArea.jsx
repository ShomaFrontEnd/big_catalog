import React from 'react';



const TextArea = ({ cols = 30, rows = 10, placeholder, name, label, value, error, onChange }) => {
  return (
    <>
      <label className='block mb-2  text-sm font-medium text-gray-900 text-white' htmlFor={name + label} >{label}</label>
      <textarea
      className='p-2 block md:w-64 w-full text-black rounded focus: md:w-full'
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        id={name + label}
        cols={cols}
        rows={rows}></textarea>
      {error && <div className='text-xs w-full bg-red-400 rounded-b-lg px-1'>{error}</div>}
    </>

  );
}

export default TextArea;