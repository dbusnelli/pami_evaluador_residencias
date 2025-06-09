import { useEffect, useState } from "react"
import Residencia from "./Residencia"
import { eliminarResidenciaById, getAllResidencias } from "../../supabase/dao";
import { useNavigate } from "react-router";
import { EDITAR_RESIDENCIA_PAGE, VER_EVALUACIONES_PAGE } from "../../router/Routes";
import CustomModal from "../commons/CustomModal";

function VerResidencias() {
    const [residencias, setResidencias] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [residenciaEliminar, setResidenciaEliminar] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        getAllResidencias(setResidencias, ()=>{})
    }, []);

    const handleEditar = (residencia) => {
        navigate(`${EDITAR_RESIDENCIA_PAGE}${residencia.id}`)
    }

    const handleEliminar = (residencia) => {
        setResidenciaEliminar(residencia)
        setShowModal(true)
    }

    const eliminarResidencia = () => {
        console.log("Eliminando residencia: "+residenciaEliminar.id)
        eliminarResidenciaById(residenciaEliminar.id, error => {
            if(!error){
                getAllResidencias(setResidencias, ()=>{})
            }else{
                console.log(error)
            }
        })
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
                    handleEliminar={handleEliminar}
                    key={residencia.id}
                />
            ): <h4>No hay residencias cargadas</h4>}
            <CustomModal
                showOnly={false}
                show={showModal}
                titulo={"Eliminar residencia:"}
                body={"¿Confirma que desea eliminar la residencia? Esto también eliminará todas las posibles evaluaciones que posea."}
                closeText={"Cancelar"}
                saveText={"Aceptar"}
                handleClose={()=>setShowModal(false)}
                handleSave={() => {
                    eliminarResidencia()
                    setShowModal(false)
                }}
            />
        </>
    )
}

export default VerResidencias