import { useProduct } from "../hooks/useProduct";



const SearchPanel = () => {

  const { searchQuery, setSearchQuery } = useProduct();

  return (
    <div className="flex items-center">
      <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery || ''} type="text" className='w-100 p- rounded' placeholder=' Поиск' />
      <button onClick={() => setSearchQuery('')} className='text-white py-0 p-1 text-xl hover:bg-red-600 rounded'><i className="bi bi-x "></i></button>
    </div>


  );
}

export default SearchPanel;