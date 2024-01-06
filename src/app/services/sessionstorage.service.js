const STORAGE_TOKEN_KEY = 'jwt-token';
const STORAGE_REFRESH_KEY = 'jwt-refresh-token';
const STORAGE_EXPIRES_KEY = 'jwt-expires';
const STORAGE_USERID_KEY = 'user-local-id';


function setTokens(
  {expiresIn = 3600,
  refreshToken,
  idToken,
  localId,}
) {



  const expiresDate = new Date().getTime() + expiresIn * 1000;
  sessionStorage.setItem(STORAGE_TOKEN_KEY, idToken);
  sessionStorage.setItem(STORAGE_REFRESH_KEY, refreshToken);
  sessionStorage.setItem(STORAGE_EXPIRES_KEY, expiresDate);
  sessionStorage.setItem(STORAGE_USERID_KEY, localId);
};

function removeAuthData() {
  sessionStorage.removeItem(STORAGE_TOKEN_KEY);
  sessionStorage.removeItem(STORAGE_REFRESH_KEY);
  sessionStorage.removeItem(STORAGE_EXPIRES_KEY);
  sessionStorage.removeItem(STORAGE_USERID_KEY);
};

function getAccessToken() {
  return sessionStorage.getItem(STORAGE_TOKEN_KEY);
}
function getRefreshToken() {
  return sessionStorage.getItem(STORAGE_REFRESH_KEY);
}
function getTokenExpiresDate() {
  return sessionStorage.getItem(STORAGE_EXPIRES_KEY);
}
function getUserId() {
  return sessionStorage.getItem(STORAGE_USERID_KEY);
}

const sessionStorageService = {
  setTokens,
  removeAuthData,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
};

export default sessionStorageService;
