import { useParams } from "react-router";

function VerEvaluaciones() {
    const { residenciaId } = useParams();

    return (
        <>
            <h2>EVALUACIONES RESIDENCIA nro.{residenciaId}:</h2>
        </>
    )
}

export default VerEvaluaciones