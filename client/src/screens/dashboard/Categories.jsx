import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";

const Categories = () => {
  return (
    <Wrapper>
    <ScreenHeader>
     <Link className='btn-dark' to='/dashboard/create-category'><i className="bi bi-folder-plus mr-1"></i>Añadir categoría</Link>
    </ScreenHeader>
      categories
    </Wrapper>
  );
};

export default Categories;
