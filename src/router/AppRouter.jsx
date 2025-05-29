import { Route, Routes } from "react-router"
import { AGREGAR_EVALUACIONES_PAGE, EDITAR_RESIDENCIA_PAGE, INDEX_PAGE, PATH_VARIABLE_EDITAR_RESIDENCIA, VER_RESIDENCIAS_PAGE } from "./Routes.js";
import CrearResidencia from "../components/residencias/CrearResidencia.jsx";
import VerResidencias from "../components/residencias/VerResidencias.jsx";
import NavBar from "../components/NavBar.jsx";

function AppRouter() {
    return (
      <>
        <NavBar />
        <div className='container mt-2'>
          <Routes>
            <Route path={INDEX_PAGE} element={<CrearResidencia />} />
            <Route path={`${EDITAR_RESIDENCIA_PAGE}${PATH_VARIABLE_EDITAR_RESIDENCIA}`} element={<CrearResidencia edicion={true} />} />
            <Route path={VER_RESIDENCIAS_PAGE} element={<VerResidencias />} />
          </Routes>
        </div>
      </>
    )

}

export default AppRouter