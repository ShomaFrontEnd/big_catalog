import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './app/components/navbar';
import Footer from './app/components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




// https://catherineasquithgallery.com/uploads/posts/2023-01/1674275896_catherineasquithgallery-com-p-serii-fon-krasivii-s-uzorami-foto-75.jpg

function App() {

  return (
    <div className='h-[100%]'  style={
      {
        backgroundImage: `url(https://uprostim.com/wp-content/uploads/2021/04/image080-43.jpg)`
      }
      }>
      <header className='sticky z-50 top-0'>
        <Navbar />
      </header>

      <main className='mx-auto ' >
        <Outlet />
      </main>
     <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
