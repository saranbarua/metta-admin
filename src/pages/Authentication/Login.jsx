import InputForm from "../../components/InputForm/InputForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "../../redux/features/Authentication/loginActions";
import {
  setUsername,
  setPassword,
} from "../../redux/features/Authentication/loginSlice";
import Button from "../../components/Button/Button";
import PasswordForm from "../../components/PasswordForm/PasswordForm";
import Cookies from "js-cookie";
import Loader from "../../components/Loader/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const { username, password, loading, error, isLoggedIn } = useSelector(
    (state) => state.login
  );
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = Cookies.get("login");
    if (saved) {
      dispatch(setUsername(saved));
    }

    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (remember) {
      Cookies.set("login", username, password);
    } else {
      Cookies.remove("login");
    }
    dispatch(loginUser({ username, password }));
  };

  return (
    <section className="h-screen flex items-center">
      <div className="md:w-[30%] w-full p-1 mx-auto">
        <div className="text-center">
          <div className="my-5 flex flex-col items-center">
            {/* <img src={logo} className="w-[200px]" /> */}
            <p className="text-blue-600 font-medium">Admin Panel</p>
          </div>
          <form onSubmit={handleSubmit} className="mb-2">
            <InputForm
              value={username}
              type="text"
              onInput={(e) => dispatch(setUsername(e.target.value))}
              placeholder="User Name"
              className="border border-gray-300 w-full px-4 py-2 rounded"
            />
            <PasswordForm
              onInput={(e) => dispatch(setPassword(e.target.value))}
              type="password"
              placeholder="Password"
              className="border border-gray-300 my-5 w-full px-4 py-2 rounded"
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>

            <div className="text-center md:text-left">
              {loading ? (
                <Loader />
              ) : (
                <Button
                  disabled={loading}
                  name="Login"
                  className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
