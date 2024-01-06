import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPanel from './searchPanel';
import { useAuth } from '../../app/hooks/useAuth';
import NavProfile from './navProfile';




const Navbar = () => {

  const { currentUser, isLoading: userIsLoading } = useAuth();
  const accessAdminAllowed = !userIsLoading
    && currentUser
    && currentUser.name === 'Shamil'
    && currentUser.status === 'admin';

  const { pathname } = useLocation()
  


  const getActiveClassName = (pagePath) => {
    return pagePath === pathname ? ' bg-red-800 rounded p-2' : '';
  }


  return (
    <>
      <nav className="border-red-200 bg-red-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-1">
          <a href="https://flowbite.com" className="flex items-center">
            <div className=''>
              <img className="h-11 mx-3 rounded " alt="Надежда мебель" src="https://files.meb100.ru/logos/687126a9b5eda242780dbd8b77a42b87.png" />
              {/* <div className="self-center text-3xl font-semibold whitespace-nowrap  dark:text-white">Надежда</div> */}
              <div className='text-white text-xs text-center underline'>мебельная фабрика</div>
            </div>
          </a>

          <SearchPanel />

          <div className="flex items-center">
            <a href="tel:5541251234" className="mr-5 text-sm text-white hover:underline">(555) 412-12-34</a>
            {
              !userIsLoading && currentUser
                ? <NavProfile currentUser={currentUser} />
                : <Link to="/login" className="text-sm mr-3 lg:mr-0 text-blue-500 hover:underline">Войти</Link>}


          </div>
        </div>

      </nav>
      <nav className="bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link to="/home" className={"text-white hover:underline " + getActiveClassName('/home')} aria-current="page">Главная</Link>
              </li>
              <li>
                <Link to="/catalog" className={"text-white  hover:underline " + getActiveClassName('/catalog')}>Каталог</Link>
              </li>
              <li>
                <Link to="/promotion" className={"text-white  hover:underline " + getActiveClassName('/promotion')}>Акции</Link>
              </li>
              <li>
                <Link to="/about" className={"  text-white  hover:underline " + getActiveClassName('/about')}>О Нас</Link>
              </li>
              {accessAdminAllowed && <li>
                <Link to="/admin" className="text-white bg-green-600 py-1 px-2 rounded font-bold hover:underline " >Админ </Link>
              </li>}

            </ul>
          </div>
        </div>
      </nav>

      { accessAdminAllowed &&
        (<nav className="bg-green-700">
          <div className="max-w-screen-xl px-4 mx-auto">
            <div className="flex items-center justify-center">
              <span className='font-bold text-white tracking-widest '>Админ активен!</span>
            </div>
          </div >
        </nav >)
      }

    </>
  );
}

export default Navbar;