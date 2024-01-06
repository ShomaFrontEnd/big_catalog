const TextField = ({ basic, type, placeholder, name, label, value, error, onChange }) => {



  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });

  };
  // w-9/12 text-black outline-none px-2 rounded

  if (basic) {
    return (
      <>
        <label htmlFor={name + label} className="block mb-2 text-sm font-medium text-gray-900 text-white ">{label}</label>
        <input
          className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  '
          value={value}
          id={name + label}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
      </>
    )
  }


  return (
    <div className="relative mb-6 " >
      <input
        type={type}
        className=" border shadow-[0_4px_9px_-4px_#3b71ca] peer block min-h-[auto] w-full 
        rounded  px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200
         ease-linear placeholder:opacity-0 "
        id={name + label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        error=''
      />
      <label
        htmlFor={name + label}
        className={` pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500
         transition-all duration-300 ease-out peer-focus:-translate-y-[1.30rem] peer-focus:scale-[0.8] 
          peer-data-[te-input-state-active]:-translate-y-[1.30rem] peer-data-[te-input-state-active]:scale-[0.8] 
           motion-reduce:transition-none text-neutral-200 peer-focus:text-gray-500 
            pt-0 px-1 mt-1`
          + (!!value ? ' -translate-y-[1.30rem] scale-[0.8] text-gray-500 ' : '')}
      >{label}
      </label>

      {
        error &&
        <div
          className="bg-red-400  text-xs rounded-b-full shadow-[0_7px_15px_-4px_#EF4430]
        duration-500
        -translate-y-[-0rem] 
        ">
          <span className="ml-5">{error}</span>
        </div>
      }
    </div >


  );
}

export default TextField;