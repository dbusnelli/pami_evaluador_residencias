import { Route, Routes } from "react-router"
import { CARGAR_EVALUACION, EDITAR_EVALUACION, EDITAR_RESIDENCIA_PAGE, INDEX_PAGE, PATH_VARIABLES_CARGAR_EVALUACION, PATH_VARIABLES_EDITAR_EVALUACION, PATH_VARIABLES_EDITAR_RESIDENCIA, PATH_VARIABLES_VER_EVALUACIONES, VER_EVALUACIONES_PAGE, VER_RESIDENCIAS_PAGE } from "./Routes.js";
import CrearResidencia from "../components/residencias/CrearResidencia.jsx";
import VerResidencias from "../components/residencias/VerResidencias.jsx";
import NavBar from "../components/NavBar.jsx";
import VerEvaluaciones from "../components/evaluaciones/VerEvaluaciones.jsx";
import CargarEvaluacion from "../components/evaluaciones/CargarEvaluacion.jsx";

function AppRouter() {
    return (
      <>
        <NavBar />
        <div className='container mt-2'>
          <Routes>
            <Route path={INDEX_PAGE} element={<CrearResidencia />} />
            <Route path={`${EDITAR_RESIDENCIA_PAGE}${PATH_VARIABLES_EDITAR_RESIDENCIA}`} element={<CrearResidencia edicion={true} />} />
            <Route path={VER_RESIDENCIAS_PAGE} element={<VerResidencias />} />
            <Route path={`${VER_EVALUACIONES_PAGE}${PATH_VARIABLES_VER_EVALUACIONES}`} element={<VerEvaluaciones />} />
            <Route path={`${CARGAR_EVALUACION}${PATH_VARIABLES_CARGAR_EVALUACION}`} element={<CargarEvaluacion />} />
            <Route path={`${EDITAR_EVALUACION}${PATH_VARIABLES_EDITAR_EVALUACION}`} element={<CargarEvaluacion edicion={true} />} />
          </Routes>
        </div>
      </>
    )

}

export default AppRouter