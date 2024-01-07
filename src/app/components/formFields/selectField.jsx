import React from 'react';



const SelectField = ({ name, label, defaultOption, options, error, onChange }) => {



  return (



    <div>
      <label htmlFor={name + label} className="block mb-2 text-sm font-medium text-gray-900 text-white ">{label}</label>

      <select
        onChange={onChange}
        name={name}
        value={defaultOption}
        id={name + label}
        className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      >
        <option className='bg-gray-300 ' value='' hidden="hidden">Выберите категорию</option>
        {options && options.map(o => (
          <option key={o.id} value={o.id}>{o.name}</option>
        )

        )}
      </select>
      {error && <div className='bg-red-300 text-xs rounded-lg px-1 text-center '>{error}</div>}
    </div>
  );
}

export default SelectField;