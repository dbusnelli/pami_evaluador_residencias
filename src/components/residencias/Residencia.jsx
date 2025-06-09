import PencilSquareIcon from "../../../public/assets/pencil-square"
import TrashIcon from "../../../public/assets/trash"
import UploadDocumentIcon from "../../../public/assets/upload-document"

function Residencia(props) {
    const {residencia, handleEditar, handleEliminar, handleVerEvaluaciones} = props

    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">Nombre: {residencia?.nombre}</h5>
                <div className="row mb-2">
                    <p className="card-text col-md-6 col-12">Domicilio: {residencia?.domicilio}</p>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", gap: 2}}>
                    <button type="button" className="btn btn-primary" onClick={() => handleVerEvaluaciones(residencia)}><UploadDocumentIcon width={20} height={20} fill="white" /> Evaluaciones</button>
                    <button type="button" className="btn btn-primary" onClick={() => handleEditar(residencia)}><PencilSquareIcon width={20} height={20} fill="white" /> Editar</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleEliminar(residencia)}><TrashIcon width={20} height={20} fill="white" /> Eliminar</button>
                </div>
            </div>
        </div>

    )
}

export default Residencia

