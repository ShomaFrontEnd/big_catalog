const Footer = () => {
  return (
    <footer className="relative w-full  z-40 border  rounded-t shadow z-90 mt-20  bg-gray-800/90">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Надежда мебель™</a>. Все Права Защищены.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="/" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;