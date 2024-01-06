const CheckBoxField = ({ value, name, type, onChange, label }) => {


  const handleChange = () => {
    onChange({ name: name, value: !value });

  };

  
  return (
    <div className="flex items-center mb-4">
      <input className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
        type={type}
        name={name}
        onChange={handleChange}
        checked={value}
        id={name + name.length} />
      <label
        className="inline-block ml-2 pl-[0.15rem] hover:cursor-pointer"
        htmlFor={name + name.length}>
        {label}
      </label>
    </div >



  );
}

export default CheckBoxField;