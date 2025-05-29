import PencilSquareIcon from "../../../public/assets/pencil-square"

function Residencia(props) {
    const {residencia, handleEditar} = props

    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">Nombre: {residencia?.nombre}</h5>
                <div className="row mb-2">
                    <p className="card-text col-md-6 col-12">Domicilio: {residencia?.domicilio}</p>
                </div>
                <div style={{display: "flex"}}>
                    <button type="button" className="btn btn-primary" onClick={() => handleEditar(residencia)}><PencilSquareIcon width={20} height={20} fill="white" /> Editar</button>
                </div>
            </div>
        </div>

    )
}

export default Residencia

