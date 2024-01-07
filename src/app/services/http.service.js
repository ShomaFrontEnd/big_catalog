import axios from "axios";
import configFile from '../../config.json'
import sessionStorageService from "./sessionstorage.service";
import { firebaseConfig } from "../hooks/useImage";



// AXIOS INSTANCES ---------------------------------------------------------------------------

const http = axios.create({
  baseURL: configFile.apiEndpoint
})


export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: { key: firebaseConfig.apiKey }
})
// console.log(firebaseConfig.apiKey)
// ---------------------- REQUEST ---------------------------------------------------------------
http.interceptors.request.use(
  async function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = containSlash ? config.url.slice(0, -1) + '.json' : config.url + '.json';

      const expiresDate = sessionStorageService.getTokenExpiresDate();
      const refreshToken = sessionStorageService.getRefreshToken();

      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post('token', { grant_type: 'refresh_token', refresh_token: refreshToken });
        sessionStorageService.setTokens(
          {
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            idToken: data.id_token,
            localId: data.user_id
          }
        );
      }

      const accessToken = sessionStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }

    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);


//------------- RESPONSE -----------------------------------------------------------------------------

http.interceptors.response.use(

  (response) => {
    if (configFile.isFirebase) {
      response.data = { content: transformDataForFirebaseToArr(response.data) }
    };
    return response;
  },

  function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;

    if (expectedErrors) {
      console.log('Что то пошло не так.попробуйте попозже!', error)
    }
    else { return Promise.reject(error); }
  }
);

//------ support functions---------------------------------------------------------------------

function transformDataForFirebaseToArr(data) {
  return data && !data.id ? Object.keys(data).map(key => ({ ...data[key] })) : data;
}

const httpServices = {
  get: http.get,
  put: http.put,
  post: http.post,
  patch: http.patch,
  delete: http.delete,
};

export default httpServices;