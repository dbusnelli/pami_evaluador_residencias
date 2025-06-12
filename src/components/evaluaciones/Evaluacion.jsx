import PencilSquareIcon from "../../../public/assets/pencil-square"
import TrashIcon from "../../../public/assets/trash"
import { formatDateFromSupabase } from "../../utils/utils"

function Evaluacion(props) {
    const {evaluacion, handleEditar, handleEliminar} = props

    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">Fecha: {formatDateFromSupabase(evaluacion?.fecha_de_evaluacion)}</h5>
                <div style={{display: "flex", justifyContent: "flex-end", gap: 2}}>
                    <button type="button" className="btn btn-primary" onClick={() => handleEditar(evaluacion)}><PencilSquareIcon width={20} height={20} fill="white" /> Editar</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleEliminar(evaluacion)}><TrashIcon width={20} height={20} fill="white" /> Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default Evaluacion