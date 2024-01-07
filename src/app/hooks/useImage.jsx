import React, { useState, useContext } from 'react';

import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject
} from "firebase/storage";
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nadezhda-furniture-factory.firebaseapp.com",
  databaseURL: "https://nadezhda-furniture-factory-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nadezhda-furniture-factory",
  storageBucket: "nadezhda-furniture-factory.appspot.com",
  messagingSenderId: "549704688926",
  appId: "1:549704688926:web:e03d953874ed125e1b150f"
};

// const imagesEndpoint = 'furnitures/';

const ImageContext = React.createContext();

export const useImage = () => {
  return useContext(ImageContext);
};

//--------- PROVIDER --------------------------------------------------------------------------------------------------------------


const ImageProvider = ({ children }) => {
  const [isImgLoading, setImgLoading] = useState(true);
  const [imgData, setImgData] = useState([]);

  // console.log(imgData)

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const storage = getStorage(app);


  function uploadImages(uniqPath) {
    setImgLoading(true);

    imgData.forEach(image => {
      if (!image.ref) {

        image.loaded = 0;
        image.id = nanoid();
        const storageRef = ref(storage, ` ${uniqPath}/  ${image.id}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          image.file,
          { customMetadata: { id: image.id, category: image.category } }
        );

        uploadTask.on(
          'state_changed',
          (snapshot) => {

            setImgData(prev => {
              return prev.map(snapImg => {
                let temp;
                if (image.id === snapImg.id) { temp = { ...image, loaded: snapshot.bytesTransferred }; };
                if (image.id === snapImg.id && snapshot.bytesTransferred === snapshot.totalBytes) {
                  temp = { ...temp, ref: storageRef };
                };
                return temp || snapImg;

              });
            });
          },
          (error) => {
            console.log(error);
            toast.error('Ошибка при загрузки фото в сервер');
          }

        );
      };
      setImgLoading(false);
    });
  };



  async function fetchImages(uniqPath) {
    setImgLoading(true);
    setImgData([])
    try {
      const listref = ref(storage, ` ${uniqPath}/`);
      const { items } = await listAll(listref);
      const currentImages = [];
      for (const itemRef of items) {
        const url = await getDownloadURL(itemRef);
        const metaData = await getMetadata(itemRef);
        currentImages.push({ url, name: metaData.name, size: metaData.size, ref: itemRef, id: metaData.customMetadata.id });
      }
      setImgData(currentImages);
      setImgLoading(false);
      // return currentImages[0];
    } catch (error) {
      setImgLoading(false);
      console.log(error);
    }
  };



  async function deleteImage(image) {
    try {
      if (image.ref) {
        await deleteObject(image.ref);
      }
      setImgData(prev => prev.filter(i => i.id !== image.id));
      toast.success('Фото успешно удалено.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      throw error;
    }
  }




  return (
    <ImageContext.Provider value={{ isImgLoading, setImgData, imgData, deleteImage, uploadImages, fetchImages }}>
      {children}
    </ ImageContext.Provider >
  )
}

export default ImageProvider;
