import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { setSuccess } from "../../store/reducers/globalReducer";
import { useFetchCategoryQuery, useUpdateCategoryMutation } from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";

const Updatecategory = () => {
    const [state, setState] = useState('');
    const {id} = useParams();
    const {data, isFetching} = useFetchCategoryQuery(id);
  
    useEffect(() => {
        data?.category && setState(data?.category?.name);
    }, [data?.category])
    const [saveCategory, response] = useUpdateCategoryMutation();
 
     const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];
    const updateSubmit = e => {
       e.preventDefault();
       saveCategory({name: state, id});
   }
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
       if(response?.isSuccess) {
           dispatch(setSuccess(response?.data?.message));
          navigate('/dashboard/categories');
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [response?.isSuccess])

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/categories">
          <i className="bi bi-backspace mr-1"></i>Volver a categorías
        </Link>
      </ScreenHeader>
      {!isFetching ? (
        <form className="w-full md:w-8/12" onSubmit={updateSubmit}>
          <h3 className="text-lg capitalize mb-3">Actualizar categoría</h3>
          {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="bg-red-100 text-red-600 p-3 mb-2 rounded-sm text-sm">
                {error.msg}
              </p>
            </div>
          ))}
          <div className="mb-3">
            <input
              type="text"
              name=""
              className="form-control"
              placeholder="Nombre de la categoría"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input type="submit" value="Actualizar" className="btn-indigo" />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Updatecategory;
