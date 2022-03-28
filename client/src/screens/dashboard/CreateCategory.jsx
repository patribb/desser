import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useCreateMutation } from "../../store/services/categoryService";
import { setSuccess } from '../../store/reducers/globalReducer';

const CreateCategory = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const [saveCategory, data] = useCreateMutation();
  const dispatch = useDispatch();

  const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];

  const submitCategory = (e) => {
    e.preventDefault();
    saveCategory({ name: state });
  };

  useEffect(() => {
    if(data?.isSuccess) {
      dispatch(setSuccess(data?.data?.message));
      navigate('/dashboard/categories');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.isSuccess])
  

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/categories">
          <i className="bi bi-backspace mr-1"></i>Volver a categorías
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submitCategory}>
        <h3 className="text-lg capitalize mb-3">Crear nueva categoría</h3>
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
          <input
            type="submit"
            value={data.isLoading ? "Cargando..." : "Guardar categoría"}
            className="btn btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
