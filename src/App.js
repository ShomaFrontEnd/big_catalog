import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './app/components/navbar';
import Footer from './app/components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function App() {
  
  return (
    <>
      <header className='sticky z-50 top-0'>
        <Navbar />
      </header>

      <main  className='m-auto' >
        <Outlet />
      </main>

      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
