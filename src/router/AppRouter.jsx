import { createBrowserRouter, RouterProvider } from "react-router"
import { AGREGAR_EVALUACIONES_PAGE, EDITAR_RESIDENCIA_PAGE, INDEX_PAGE, PATH_VARIABLE_EDITAR_RESIDENCIA, VER_RESIDENCIAS_PAGE } from "./Routes.js";
import CrearResidencia from "../components/residencias/CrearResidencia.jsx";
import VerResidencias from "../components/residencias/VerResidencias.jsx";

const router = createBrowserRouter([
  {path: INDEX_PAGE, element: <CrearResidencia />},
  {path: `${EDITAR_RESIDENCIA_PAGE}${PATH_VARIABLE_EDITAR_RESIDENCIA}`, element: <CrearResidencia edicion={true}/>},
  {path: VER_RESIDENCIAS_PAGE, element: <VerResidencias />},
  /* {path: AGREGAR_EVALUACIONES_PAGE, element: <AgregarEvaluaciones />} */
])

function AppRouter() {
    return (
      <RouterProvider router={router} />
    )

}

export default AppRouter