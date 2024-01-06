import { useState } from "react";
import { Link } from "react-router-dom";

const NavProfile = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  return (

    <div className="relative">

      <span
        onClick={() => setOpen(prev => !prev)}
        className=' cursor-pointer rounded-full p-2 bg-gray-800 text-white text-xs'>{currentUser.name[0] + ' ' + currentUser.surname[0]}
      </span>

      <div 
      className={`absolute right-0 top-8
        divide-y divide-gray-100 rounded-lg shadow
        w-44 bg-gray-800/90 divide-gray-600 `+ (!open ? 'hidden' : '')}
      >
        <div className="px-4 py-3 text-sm text-white">
          <div>{currentUser.name + ' ' + currentUser.surname}</div>
          <div className="font-medium truncate">{currentUser.email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownUserAvatarButton">
          <li>
            <a href="/" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Панель управления</a>
          </li>
          <li>
            <a href="/" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Настройки контента</a>
          </li>
          <li>
            <a href="/" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Заработок</a>
          </li>
        </ul>
        <div className="py-2">
          <Link to="/logout" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Выйти</Link>
        </div>
      </div>





    </div>


  );
}

export default NavProfile;