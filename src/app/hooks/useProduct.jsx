import React, { useContext, useEffect, useState } from 'react';
import productService from '../services/product.service';
import getErrorMessage from '../utils/errorCatcher';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import categoryService from '../services/category.service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useImage } from './useImage';


const ProductContext = React.createContext();
export const useProduct = () => { return useContext(ProductContext) };

//--------- PROVIDER --------------------------------------------------------

const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation()

  const { currentUser } = useAuth();
  const { imgData, deleteImage, setImgData, fetchImages } = useImage();

  const [isLoading, setLoading] = useState(true);
  const [categoryIsLoading, setCategoryLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');






  useEffect(() => {
    if (error !== null) {
      if (error === 'Network Error') {
        navigate('/networkError');
        return;
      };
      toast.error(error, { autoClose: 2000, });
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, pathname]);


  useEffect(() => {
    fetchCategory();
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //??????????????????????????????????????????????????????
  // useEffect(() => {
  //   fetchCategory();
  //   fetchProducts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser, params]);


  async function addProduct(newData) {
    try {
      const { data } = await productService.add(newData);
      setProduct(prev => ([...prev, data.content]));
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateProduct(newData) {
    try {
      const { data } = await productService.update(newData);
      const newProds = [...product];
      const prodIndex = newProds.findIndex(p => p.id === data.content.id);
      newProds[prodIndex] = data.content;
      setProduct(newProds);
      toast.success('Продукт успешно обновлён.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      errorCatcher(error);
    }
  }



  const handleImgDelete = async (image) => {
    await deleteImage(image);
  };

  // console.log(imgData)


  async function deleteProduct(prodId) {
    setImgData([]);
    try {
      const { data } = await productService.delete(prodId);
      if (data.content === null) {
        setProduct(prev => prev.filter(i => i.id !== prodId));
        await fetchImages(prodId);
        console.log(imgData);

        if (imgData.length) {
          imgData.forEach(i => handleImgDelete(i));
        }
      }
      toast.success('Продукт успешно удалён', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
    } catch (error) {
      errorCatcher(error);
    }
  }


  async function fetchProducts() {
    try {
      const { data } = await productService.fetchAll();
      setProduct(data.content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }


  //--------------- CATEGORY ----------------------------------------------------------

  async function fetchCategory() {
    try {
      const { data } = await categoryService.fetchAll();
      setCategory(data.content || []);
      setCategoryLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }


  async function addCategory(payload) {
    try {
      const { data } = await categoryService.create(payload);
      setCategory(prev => [...prev, data.content]);
      setCategoryLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function deleteCategory(cId) {
    try {
      const { data } = await categoryService.delete(cId);
      if (data.content === null) {
        setCategory(prev => prev.filter(i => i.id !== cId));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }


  async function updateCategory(newData) {
    try {
      const { data } = await categoryService.update(newData);
      const newCategies = [...category];
      const categoryId = category.findIndex(c => c.id === data.content.id);
      newCategies[categoryId] = data.content;
      setCategory(newCategies);
    } catch (error) {
      errorCatcher(error);
    }
  }


  // Support Funcs **********************************************************************

  const getProductById = (id) => {
    return product.find(s => s.id === id);
  };

  const getCategorytById = (id) => {
    if (!categoryIsLoading) {
      return category.find(c => c.id === id);
    };
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  const getProductCountByCategory = (id) => {
    let count = 0;
    if (product) {
      product.forEach(element => {
        if (element.category === id) {
          count += 1;
        }
      });
    }
    return count;
  };

  function errorCatcher(error) {
    // console.log(error.message)
    setError(getErrorMessage(error));
    setLoading(false);
  };

  return (
    <ProductContext.Provider
      value={{
        isLoading,
        categoryIsLoading,
        product,
        category,
        searchQuery,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductCountByCategory,
        clearSearchQuery,
        getCategorytById,
        addCategory,
        deleteCategory,
        updateCategory,

      }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;







