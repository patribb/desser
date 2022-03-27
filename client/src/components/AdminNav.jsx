import { logout } from "../store/reducers/authReducer";
import { useDispatch } from 'react-redux';

const AdminNav = ({openSidebar}) => {
    const dispatch = useDispatch();

    const adminLogout = () => {
      dispatch(logout())
    }

  return (
    <nav className="fixed left-0 sm:left-64 top-4 right-0 mx-4">
      <div className="bg-gray-800  w-full flex p-4 justify-between sm:justify-end items-center">
        <i 
        onClick={openSidebar}
        className="bi bi-menu-down text-gray-300 text-2xl font-bold hover:cursor-pointer hover:text-gray-200 sm:hidden block"></i>
        <button
          className="py-2 px-4 bg-rose-600 hover:bg-rose-800 hover:cursor-pointer text-white rounded-md "
          onClick={adminLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
