import { Link } from "react-router-dom";

const NetworkError = () => {
  return (
    <div className="h-[75vh]">
      <p className="text-xl font-bold text-center text-red-500 mt-20">Нет доступа к интернету</p>
      <Link to='home' className="bg-blue-300 p-2 rounded text-white ">Повторить попытку</Link>
    </div>
  );
}

export default NetworkError;