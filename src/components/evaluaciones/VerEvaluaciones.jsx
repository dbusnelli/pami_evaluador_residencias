import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Evaluacion from "./Evaluacion";
import { deleteEquipoEvaluadorByIdEvaluacion, deleteEvaluacionById, deleteEvaluacionItemsByIdEvaluacion, getEvaluacionById, getEvaluacionesByIdResidencia, getResidenciaById } from "../../supabase/dao";
import { CARGAR_EVALUACION, EDITAR_EVALUACION } from "../../router/Routes";
import CustomModal from "../commons/CustomModal";

function VerEvaluaciones() {
    const { residenciaId } = useParams();
    const [residencia, setResidencia] = useState()
    const [evaluaciones, setEvaluaciones] = useState([]);

    const [showModal, setShowModal] = useState(false)
    const [evaluacionAEliminar, setEvaluacionAEliminar] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        getResidenciaById(residenciaId, setResidencia, ()=>{})
        getEvaluacionesByIdResidencia(residenciaId, setEvaluaciones, ()=>{})
    }, [residenciaId]);

    const handleAgregarEvaluacion = () => {
        navigate(`${CARGAR_EVALUACION}${residencia.id}`)
    }

    const handleEditar = (evaluacion) => {
        navigate(`${EDITAR_EVALUACION}${residencia.id}/${evaluacion.id}`)
    }

    const handleEliminar = (evaluacion) => {
        setEvaluacionAEliminar(evaluacion)
        setShowModal(true)
    }

    const eliminarEvaluacion = () => {
        deleteEvaluacionById(evaluacionAEliminar.id, (err)=>{
            if(!err){getEvaluacionesByIdResidencia(residenciaId, setEvaluaciones, ()=>{})}
        })
        deleteEvaluacionItemsByIdEvaluacion(evaluacionAEliminar.id, ()=>{})
        deleteEquipoEvaluadorByIdEvaluacion(evaluacionAEliminar.id, ()=>{})
    }

    return (
        <>
            <h3>Evaluacioes de la residencia, </h3>
            <h2 className="mb-3">{residencia?.nombre}</h2>
            {evaluaciones?.length > 0 ?
                evaluaciones.map(evaluacion =>
                    <Evaluacion key={evaluacion.id} handleEditar={handleEditar} handleEliminar={handleEliminar} evaluacion={evaluacion}/>
                )
            : <h4>No hay evaluaciones disponibles...</h4>}
            <button className="btn btn-primary mt-2" onClick={handleAgregarEvaluacion}>Agregar Evaluación</button>
            <CustomModal
                showOnly={false}
                show={showModal}
                titulo={"Eliminar evaluación:"}
                body={"¿Confirma que desea eliminar la evaluación? Esta acción no puede revertirse."}
                closeText={"Cancelar"}
                saveText={"Aceptar"}
                handleClose={()=>setShowModal(false)}
                handleSave={() => {
                    eliminarEvaluacion()
                    setShowModal(false)
                }}
            />
        </>
    )
}

export default VerEvaluaciones