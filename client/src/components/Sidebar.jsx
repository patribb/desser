import { Link } from "react-router-dom";

const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}
    >
      <i 
      onClick={closeSidebar}
      className="bi bi-x-lg text-red-600 absolute top-4 right-4 text-xl font-black hover:cursor-pointer sm:hidden block hover:text-red-900"></i>
      <div className="bg-white py-1 flex items-center justify-center -ml-5">
        DESSER <img className="w-10" src="/logo.png" alt="logo" /> MAN
      </div>
      <ul className="mt-4">
        <li className="px-4 py-3 text-gray-300 flex items-center hover:bg-gray-600 transition-all ">
          <i className="bi bi-collection mr-2 inline-block text-lg"></i>{" "}
          <Link className="text-base" to="/dashboard/products">
            Productos
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-300 flex items-center hover:bg-gray-600 transition-all ">
          <i className="bi bi-bag-check mr-2 inline-block text-lg"></i>{" "}
          <Link className="text-base" to="/dashboard/products">
            Pedidos
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-300 flex items-center hover:bg-gray-600 transition-all ">
          <i className="bi bi-people mr-2 inline-block text-lg"></i>{" "}
          <Link className="text-base" to="/dashboard/products">
            Clientes
          </Link>
        </li>
        <li className="px-4 py-3 text-gray-300 flex items-center hover:bg-gray-600 transition-all ">
          <i className="bi bi-tags mr-2 inline-block text-lg"></i>{" "}
          <Link className="text-base" to="/dashboard/categories">
            Categorías
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
