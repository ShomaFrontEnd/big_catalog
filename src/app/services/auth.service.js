import { httpAuth } from "./http.service"
import sessionStorageService from "./sessionstorage.service";




const authService = {

  async authorize({ email, password, confirmPassword, ...rest }) {
    const { data } = await httpAuth.post(
      `accounts:signUp`,
      { email, password, returnSecureToken: true }
    );
    return data;

  },

  async login({ email, password, confirmPassword, ...rest }) {
    const { data } = await httpAuth.post(
      `accounts:signInWithPassword`,
      { email, password, returnSecureToken: true }

    );
    return data;
  },

  async refresh() {
    const { data } = await httpAuth.post(
      `token`,
      {
        grant_type: 'refresh_token',
        refresh_token: sessionStorageService.getRefreshToken()
      }
    );
    return data;
  },

};

export default authService;