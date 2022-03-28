import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer';
import { useGetQuery, useDeleteCategoryMutation  } from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Categories = () => {
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  let { page } = useParams();

  if(!page) {
    page = 1
  }

  const { data = [], isFetching } = useGetQuery(page);
  const [removeCategory, response] = useDeleteCategoryMutation();
  

  const deleteCat = (id) => {
    if(window.confirm('¿Estás seguro de eliminar la categoría?')) {
      removeCategory(id)
    }
  }

  useEffect(() => {
    if(response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data?.message])
  
  
  useEffect(() => {
   return () => dispatch(clearMessage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <Wrapper>
    <ScreenHeader>
     <Link className='btn-dark' to='/dashboard/create-category'><i className="bi bi-folder-plus mr-1"></i>Añadir categoría</Link>
    </ScreenHeader>
    { success && <div className="alert-success">{success}</div> }
      { !isFetching ? data?.categories?.length > 0 && <> <div>
        <table className='w-full bg-gray-900 rounded-md'>
          <thead>
            <tr className='border-b border-gray-800 text-left'>
              <th className='p-3 uppercase text-gray-500 text-sm'>Nombre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.categories?.map((category => (
              <tr className='odd:bg-gray-800' key={category._id}>
                <td className='p-3 capitalize text-sm font-normal text-gray-300'>{category.name}</td>
                <td className='p-3 capitalize text-sm font-normal text-gray-300'>
                  <Link to={`/dashboard/update-category/${category._id}`} className="btn btn-success">Editar</Link>
                </td>
                <td className='p-3 capitalize text-sm font-normal text-gray-300'>
                  <button onClick={() => deleteCat(category._id)} className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div> <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path='dashboard/categories' /> </> : <Spinner /> }
    </Wrapper>
  );
};

export default Categories;
