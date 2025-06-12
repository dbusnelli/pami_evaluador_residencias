import { useEffect, useState } from "react"
import Residencia from "./Residencia"
import { getAllResidencias } from "../../supabase/dao";
import { useNavigate } from "react-router";
import { EDITAR_RESIDENCIA_PAGE, VER_EVALUACIONES_PAGE } from "../../router/Routes";

function VerResidencias() {
    const [residencias, setResidencias] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAllResidencias(setResidencias, ()=>{})
    }, []);

    const handleEditar = (residencia) => {
        navigate(`${EDITAR_RESIDENCIA_PAGE}${residencia.id}`)
    }

    const handleVerEvaluaciones = (residencia) => {
        navigate(`${VER_EVALUACIONES_PAGE}${residencia.id}`)
    }

    return (
        <>
            <h2>Residencias:</h2>
            {residencias?.length ? residencias.map(residencia =>
                <Residencia residencia={residencia}
                    handleVerEvaluaciones={handleVerEvaluaciones}
                    handleEditar={handleEditar}
                    key={residencia.id}
                />
            ): <h4>No hay residencias cargadas</h4>}
        </>
    )
}

export default VerResidencias