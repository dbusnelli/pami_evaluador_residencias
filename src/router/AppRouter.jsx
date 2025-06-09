import { Route, Routes } from "react-router"
import { EDITAR_RESIDENCIA_PAGE, INDEX_PAGE, PATH_VARIABLE_EDITAR_RESIDENCIA, PATH_VARIABLE_VER_EVALUACIONES, VER_EVALUACIONES_PAGE, VER_RESIDENCIAS_PAGE } from "./Routes.js";
import CrearResidencia from "../components/residencias/CrearResidencia.jsx";
import VerResidencias from "../components/residencias/VerResidencias.jsx";
import NavBar from "../components/NavBar.jsx";
import VerEvaluaciones from "../components/evaluaciones/VerEvaluaciones.jsx";

function AppRouter() {
    return (
      <>
        <NavBar />
        <div className='container mt-2'>
          <Routes>
            <Route path={INDEX_PAGE} element={<CrearResidencia />} />
            <Route path={`${EDITAR_RESIDENCIA_PAGE}${PATH_VARIABLE_EDITAR_RESIDENCIA}`} element={<CrearResidencia edicion={true} />} />
            <Route path={VER_RESIDENCIAS_PAGE} element={<VerResidencias />} />
            <Route path={`${VER_EVALUACIONES_PAGE}${PATH_VARIABLE_VER_EVALUACIONES}`} element={<VerEvaluaciones edicion={true} />} />
          </Routes>
        </div>
      </>
    )

}

export default AppRouter