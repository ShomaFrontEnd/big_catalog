import React from 'react';


const NumberField = ({ type, name,min,max, label, value, error, onChange }) => {


  return (
    <>
      <label htmlFor={name + label} className="block mb-2 text-sm font-medium text-gray-900 text-white ">{label}</label>
      <input className="w-full text-center rounded bg-red-300 p-1"  onChange={onChange} min={min} max={max} name='discount' value={value} type={type} />

    </>
  );
}

export default NumberField;