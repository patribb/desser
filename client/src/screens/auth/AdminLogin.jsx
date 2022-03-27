import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthLoginMutation } from "../../store/services/authService";
import { setAdminToken } from "../../store/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [login, response] = useAuthLoginMutation();
  console.log(response);
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const adminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("admin-token", response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate('/dashboard/products')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.isSuccess]);

  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form
        className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 rounded"
        onSubmit={adminLoginFunction}
      >
        <h3 className="mb-3 text-white font-semibold text-lg text-center">
          Dashboard | Inicio de sesión
        </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="bg-red-100 text-red-600 p-3 mb-2 rounded-sm text-sm">
                {error.msg}
              </p>
            </div>
          ))}
        <div className="mb-4 mt-4">
          <input
            type="email"
            onChange={handleInputs}
            value={state.email}
            className="w-full bg-black1 outline-none p-4 rounded text-gray-300"
            name="email"
            placeholder="Tu email..."
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            onChange={handleInputs}
            value={state.password}
            className="w-full bg-black1 outline-none p-4 rounded text-gray-300"
            name="password"
            placeholder="Tu contraseña..."
          />
        </div>
        <div className="mb-4">
          <input
            className="bg-indigo-600 hover:bg-indigo-800 rounded w-full p-3 uppercase font-semibold text-gray-200 hover:cursor-pointer"
            type="submit"
            value={response.isLoading ? "Loading.." : "Entrar"}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
