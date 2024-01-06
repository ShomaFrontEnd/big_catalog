

function getErrorMessage(error) {

  let errorMessage = '';
  // console.log(error.response.data.error.message);
  if (error.message === 'Network Error') {
    return 'Network Error';
  };
  if (error.response.data.error.code) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      if (message === 'EMAIL_EXISTS') {
        errorMessage = 'Пользователь с таким Email уже сушествует ';
      }

      else if (message === 'INVALID_PASSWORD') {
        errorMessage = 'Неверный email или пароль';
      }

      else if (message === 'EMAIL_NOT_FOUND') {
        errorMessage = 'Неверный email или пароль';
      }
      else if (message === 'INVALID_LOGIN_CREDENTIALS') {
        errorMessage = 'Неверный email или пароль';
      }
      else if (message === 'USER_DISABLED') {
        errorMessage = 'Пользователю вход запрещён';
      }
      else if (message === 'INVALID_EMAIL') {
        errorMessage = 'Email указан неверно';
      }
      else { errorMessage = error.message; };
    }
  } else { errorMessage = error.message; };
  return errorMessage;
};

export default getErrorMessage