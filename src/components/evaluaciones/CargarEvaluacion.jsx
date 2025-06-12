import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import TrashIcon from "../../../public/assets/trash";
import { addEquipoEvaluador, addEvaluacion, addEvaluacionItems, deleteEquipoEvaluadorById, getAllItemsEvaluaciones, getCategorias, getClasificadores, getEquipoEvaluadorByIdEvaluacion, getEvaluacionById, getEvaluacionItemsByIdEvaluacion, updateEvaluacionById, updateEvaluacionItemById } from "../../supabase/dao";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CustomModal from "../commons/CustomModal";
import { VER_EVALUACIONES_PAGE } from "../../router/Routes";
import { normalizarFechaParaInputDate } from "../../utils/utils";



function CargarEvaluacion({edicion}) {
    const { residenciaId, evaluacionId } = useParams();

    const navigate = useNavigate();

    const [evaluacion, setEvaluacion] = useState({})
    const [resultadosItems, setResultadosItems] = useState([])
    const [equipoEvaluador, setEquipoEvaluador] = useState([])
    const [equipoEvaluadorInicial, setEquipoEvaluadorInicial] = useState([])

    const [itemsEvaluaciones, setItemsEvaluaciones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [clasificadores, setClasificadores] = useState([])

    const [evaluador, setEvaluador] = useState("")

    const [error, setError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalError, setShowModalError] = useState(false)

    useEffect(() => {
        getAllItemsEvaluaciones(setItemsEvaluaciones, ()=>{})
        getCategorias(setCategorias, ()=>{})
        getClasificadores(setClasificadores, ()=>{})
        if (edicion) {
            getEvaluacionById(evaluacionId, setEvaluacion, err=>setError(err))
            getEvaluacionItemsByIdEvaluacion(evaluacionId, setResultadosItems, err=>setError(err))
            getEquipoEvaluadorByIdEvaluacion(evaluacionId, (equipo => {
                setEquipoEvaluador(equipo)
                setEquipoEvaluadorInicial(equipo)
            }), err=>setError(err))
        }
    }, [residenciaId]);

    useEffect(() => {
        if(error){
            setShowModalError(true)
        }
    }, [error]);

    const handleAgregarEvaluador = () => {
        setEquipoEvaluador([...equipoEvaluador, {nombre_dependencia: evaluador}])
        setEvaluador("")
    }

    const handleEliminarEvaluador = (indexAEliminar) => {
        setEquipoEvaluador(prev => prev.filter((_, i) => i !== indexAEliminar));
    }

    const handleCheckItemEvaluacion = (item, respuesta) => {
        let anteriorResultado = resultadosItems?.length > 0 ?
            resultadosItems.find(r => r.id_item_evaluacion === item.id)
        : null;
        if(anteriorResultado){
            const nuevosResultados = resultadosItems.map(r =>
                r.id_item_evaluacion === item.id
                ? { ...r, respuesta }
                : r
            )
            setResultadosItems(nuevosResultados);
        }else{
            setResultadosItems([...resultadosItems, {
                id_item_evaluacion: item.id,
                respuesta: respuesta
            }])
        }
    }

    const buscarResultado = (item) => {
        return resultadosItems?.find(r => r.id_item_evaluacion === item.id)?.respuesta ?? null
    }

    const obtenerClasificador = (item) => {
        return clasificadores?.find(clasificador => clasificador.id === item.clasificador) ?? null;
    }

    const obtenerCategoria = (item) => {
        return categorias?.find(categoria => categoria.id === item.categoria) ?? null;
    }

    const clearAll = () => {
        setEvaluacion({})
        setEquipoEvaluador([])
        setResultadosItems([])
        setError(false)
    }

    const handleSubmit = () => {
        if (edicion) {
            updateEvaluacionById(evaluacionId, evaluacion, cbSuccessEditarEvaluacion)
        } else {
            let nuevaEvaluacion =  {...evaluacion, id_residencia: residenciaId}
            addEvaluacion(nuevaEvaluacion, (err) => setError(err), (data) => cbSuccessAddEvaluacion(data))
        }
    }

    const cbSuccessAddEvaluacion = (data) => {
        let idEvaluacionAgregada = data[0].id
        let itemsAAgregar = resultadosItems.map((item) => {
            return {...item, id_evaluacion : idEvaluacionAgregada}
        })
        let equipoEvaluadorAAgregar = equipoEvaluador.map((evaluador) => {
            return {...evaluador, id_evaluacion : idEvaluacionAgregada}
        })
        addEvaluacionItems(itemsAAgregar, (err) => setError(err))
        addEquipoEvaluador(equipoEvaluadorAAgregar, (err) => setError(err))
        clearAll()
        navigate(`${VER_EVALUACIONES_PAGE}${residenciaId}`)
    }

    const cbSuccessEditarEvaluacion = () => {
        resultadosItems.forEach(evalItem => {
            updateEvaluacionItemById(evalItem.id, evalItem, err=>setError(err))
        });
        const nuevosIds = equipoEvaluador.map(evaluador => evaluador.id)
        const originalesIds = equipoEvaluadorInicial.map(evaluador => evaluador.id)
        // 1. IDs a eliminar (estaban antes pero ya no están)
        const idsAEliminar = originalesIds.filter(id => !nuevosIds.includes(id))
        // 2. Objetos a agregar (están ahora pero no estaban antes)
        const objetosAAgregar = equipoEvaluador.filter(evaluador => !originalesIds.includes(evaluador.id)).map(evaluador => {return {...evaluador, id_evaluacion : evaluacionId}})
        console.log(objetosAAgregar)
        if(idsAEliminar.length > 0){
            idsAEliminar.forEach(id => {
                deleteEquipoEvaluadorById(id, (err)=>setError(err))
            })
        }
        if(equipoEvaluador.length > 0){
            addEquipoEvaluador(objetosAAgregar, (err)=>setError(err))
        }
        clearAll()
        navigate(`${VER_EVALUACIONES_PAGE}${residenciaId}`)
    }

    return (
        <>
            <h2>{edicion ? "Editar Evaluación" : "Cargar Evaluación"}</h2>
            <div className="row mb-3">
                <div className="col-4 mb-2">
                    <label htmlFor="nombreResidencia" className="form-label">Fecha de Evaluación</label>
                    <input type="date" className="form-control" id="nombreResidencia" value={normalizarFechaParaInputDate(evaluacion?.fecha_de_evaluacion)} onChange={e=>setEvaluacion({...evaluacion, fecha_de_evaluacion: e.target.value})}/>
                </div>
                <div className="col-8 mb-2">
                    <label htmlFor="nombreResidencia" className="form-label">Equipo Evaluador:</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Nombre, apellido y dependencia" value={evaluador} onChange={e=>setEvaluador(e.target.value)}/>
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAgregarEvaluador}>Agregar</button>
                    </div>
                </div>
                {equipoEvaluador?.length > 0 &&
                    <div className="col-12 ms-2 mb-3 card" style={{padding: "0.5rem"}}>
                        {equipoEvaluador?.map((evaluador, index) =>
                            <div key={index} className="mb-1" style={{display: "flex", justifyContent: "space-between"}}>
                                <p>{index+1}. {evaluador.nombre_dependencia}</p>
                                <button type="button" className="btn btn-danger" onClick={() => handleEliminarEvaluador(index)}><TrashIcon width={20} height={20} fill="white" /></button>
                            </div>
                        )}
                    </div>
                }
            </div>
            <div className="row mb-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col">Item</th>
                            <th className="col-8">Pregunta</th>
                            <th className="col">Respuesta</th>
                            <th className="col">Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsEvaluaciones?.map(item =>
                            <tr key={item.id}>
                                <th>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="button-tooltip-2">{obtenerClasificador(item)?.descripcion ?? "-"}</Tooltip>}
                                    >
                                        <p style={{cursor:"pointer"}}>{obtenerClasificador(item)?.codigo ?? "-"}{item.numeracion}</p>
                                    </OverlayTrigger>
                                </th>
                                <td>{item.pregunta}</td>
                                <td>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" checked={buscarResultado(item) === 1} onChange={e=>handleCheckItemEvaluacion(item, 1)}/>
                                        <label className="form-check-label" htmlFor="radioDefault1">
                                            Si
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" checked={buscarResultado(item) === 0} onChange={e=>handleCheckItemEvaluacion(item, 0)}/>
                                        <label className="form-check-label" htmlFor="radioDefault2">
                                            No
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="button-tooltip-2">{obtenerCategoria(item)?.descripcion ?? "-"}</Tooltip>}
                                    >
                                        <p className="text-center" style={{cursor:"pointer"}}>{obtenerCategoria(item)?.codigo ?? "-"}</p>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary mb-2" onClick={() => setShowModal(true)}>{edicion ? "Confirmar edición" : "Agregar evaluación"}</button>
            <CustomModal
                showOnly={false}
                show={showModal}
                titulo={"Agregar evaluación:"}
                body={"¿Confirma que desea agregar la evaluación?"}
                closeText={"Cancelar"}
                saveText={"Aceptar"}
                handleClose={()=>setShowModal(false)}
                handleSave={() => {
                    handleSubmit()
                    setShowModal(false)
                }}
            />
            <CustomModal
                showOnly={true}
                show={showModalError}
                titulo={"Ha habido un error"}
                body={`Hubo un error al querer guardar la evaluación: ${error}`}
                closeText={"Cerrar"}
                handleClose={()=>setShowModalError(false)}
            />
        </>
    )
}

export default CargarEvaluacion