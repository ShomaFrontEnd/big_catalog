import { useState } from "react";
import TextField from "../formFields/textField";
import CheckBoxField from "../formFields/checkboxField";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = ({ email, password, stayOn, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth()


  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const [formData, setFormData] = useState({ password: 'womafly0517' })


  const handleChange = (target) => {
    setFormData(prev => ({ ...prev, [target.name]: target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email && !formData.password) return;

    try {
      logIn(formData)
      // console.log('logining')
    } catch (error) {

    }

  }




  return (
    <section className="h-full lg:h-screen">
      <div className="h-full ">
        {/* <!-- Left column container with background--> */}
        <div
          className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div
            className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample" />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12  ">
            <form onSubmit={handleSubmit}>
              {/* <!--Sign in section--> */}
              <div className="flex flex-row items-center justify-center ">
                <p className="mt-1 mr-4 font-bold text-xl">Вход</p>
              </div>

              {/* <!-- Separator between tile and email/password sign in --> */}
              <div
                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              </div>
              {/* <!-- Email input --> */}

              <TextField
                type='text'
                placeholder='Email адрес'
                value={formData.email || ''}
                label='Email адрес '
                name='email'
                error=''
                onChange={handleChange}
              />


              {/* <!-- Password input --> */}
              <div className="relative">
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Пароль'
                  value={formData.password || ''}
                  label='Пароль '
                  name='password'
                  error=''
                  onChange={handleChange}
                />
                <span className="absolute top-3 right-3">
                  <i onClick={toggleShowPassword} className={'cursor-pointer ' + (showPassword ? "bi bi-eye-slash" : 'bi bi-eye')}></i>
                </span>
              </div>

              {/* <!-- Remember me checkbox --> */}

              <div className="mb-6 flex items-center justify-between">
                <CheckBoxField
                  onChange={handleChange}
                  name='stayOn'
                  label='Запомни меня'
                  type="checkbox"
                  value={formData.stayOn || false}
                />

                {/* <!--Forgot password link--> */}
                <a className="mr-2" href="#!">Забыли пароль?</a>
              </div>

              {/* <!-- Login button --> */}
              <div className="text-center">
                <button
                  className="bg-red-600 inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]   active:bg-gray-500    "
                >
                  Войти
                </button>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-10 pt-1 text-sm font-semibold">
                  Нет аккаунта ?
                  <a
                    href="#!"
                    className=" text-blue-400 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-blue-700"
                  > Регистрируйся !</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>


  );
}

export default LoginForm;