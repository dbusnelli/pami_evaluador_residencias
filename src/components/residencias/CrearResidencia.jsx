import { useState, useEffect } from "react"
import { LOCALIDAD_INICIAL, UGL_INICIAL } from "../../utils/Const";
import CustomModal from "../commons/CustomModal";
import { addResidencia, getResidenciaById, updateResidenciaById } from "../../supabase/dao";
import { useParams } from "react-router";


const initialResidencia = {
    nombre: "",
    codigo_prestador: "",
    domicilio: "",
    localidad: LOCALIDAD_INICIAL,
    ugl: UGL_INICIAL,
    email: "",
    provincia: "-",
    codigo_postal: "",
    mcc: 0,
    modalidad_prestacional: 1,
    total_plazas: 0,
    plazas_pami: 0,
    plazas_sin_pami: 0,
    total_habitaciones: 0,
    habitaciones_individuales_banio: 0,
    habitaciones_triples_banio: 0,
    habitaciones_individuales_sin_banio: 0,
    habitaciones_triples_sin_banio: 0,
    banios_uso_compartido: 0
}


function CrearResidencia({edicion}) {

    const { residenciaId } = useParams();

    const [residencia, setResidencia] = useState(initialResidencia)
    const [showModal, setShowModal] = useState(false)
    const [showModalError, setShowModalError] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if(edicion){
            getResidenciaById(residenciaId, setResidencia, ()=>{})
        }
    }, []);

    useEffect(() => {
        if(error){
            setShowModalError(true)
        }
    }, [error]);

    const calcularTotalHabitaciones = () => {
        return Number(residencia.habitaciones_individuales_banio) + Number(residencia.habitaciones_individuales_sin_banio) + Number(residencia.habitaciones_triples_banio) + Number(residencia.habitaciones_triples_sin_banio);
    }

    const handleSubmit = () => {
        let nuevaResidencia ={
            ...residencia,
            total_habitaciones: calcularTotalHabitaciones()
        }
        if (edicion) {
            updateResidenciaById(residencia.id, nuevaResidencia, (error) => {
                if(error){
                    setError(error)
                }else{
                    clearAll()
                }
            })
        } else {
            addResidencia(nuevaResidencia, (error) => {
                if(error){
                    setError(error)
                }else{
                    clearAll()
                }
            })
        }
    }

    const clearAll = () => {
        setResidencia(initialResidencia)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <h2>{edicion ? "Editar residencia:" : "Agregar una residencia:"}</h2>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <label htmlFor="nombreResidencia" className="form-label">Nombre de residencia</label>
                    <input type="text" value={residencia.nombre} onChange={e => setResidencia({...residencia, nombre: e.target.value})} className="form-control" id="nombreResidencia" />
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="codigo-prestador" className="form-label">Codigo del prestador</label>
                    <input type="text" value={residencia.codigo_prestador} onChange={e => setResidencia({...residencia, codigo_prestador: e.target.value})} className="form-control" id="codigo-prestador" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <label htmlFor="domicilioResidencia" className="form-label">Dirección</label>
                    <input type="text" value={residencia.domicilio} onChange={e => setResidencia({...residencia, domicilio: e.target.value})} className="form-control" id="domicilioResidencia" />
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="localidadResidenicia" className="form-label">Localidad</label>
                    <input type="text" value={residencia.localidad} onChange={e => setResidencia({...residencia, localidad: e.target.value})} className="form-control" id="localidadResidenicia" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <p>UGL</p>
                    <select className="form-select"
                        value={residencia.ugl}
                        onChange={e => setResidencia({...residencia, ugl: e.target.value})}
                    >
                        <option value={1}>I</option>
                        <option value={2}>II</option>
                        <option value={3}>III</option>
                        <option value={4}>IV</option>
                        <option value={5}>V</option>
                        <option value={6}>VI</option>
                    </select>
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="emailResidenicia" className="form-label">E-Mail</label>
                    <input type="email" value={residencia.email} onChange={e => setResidencia({...residencia, email: e.target.value})} className="form-control" id="emailResidenicia" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <label htmlFor="provinciaResidencia" className="form-label">Provincia</label>
                    <input type="text" value={residencia.provincia} onChange={e => setResidencia({...residencia, provincia: e.target.value})} className="form-control" id="provinciaResidencia" />
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="codigoPostalResidenicia" className="form-label">Codigo Postal</label>
                    <input type="text" value={residencia.codigo_postal} onChange={e => setResidencia({...residencia, codigo_postal: e.target.value})} className="form-control" id="codigoPostalResidenicia" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="mb-2 col-md-6 col-12">
                    <p>Modulo de cuidados continuos - MCC</p>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" checked={residencia.mcc === 1} onChange={() => setResidencia({...residencia, mcc: 1})} />
                    <label className="form-check-label" htmlFor="radioDefault1">
                        Si
                    </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" checked={residencia.mcc === 0} onChange={() => setResidencia({...residencia, mcc: 0})} />
                    <label className="form-check-label" htmlFor="radioDefault2">
                        No
                    </label>
                    </div>
                </div>
                <div className="row mb-2 col-md-6 col-12">
                    <p>Modalidad prestacional</p>
                    <select className="form-select"
                        value={residencia.modalidad_prestacional}
                        onChange={e => setResidencia({...residencia, modalidad_prestacional: e.target.value})}
                    >
                        <option value={1}>RLE-CAT. A</option>
                        <option value={2}>RLE-CAT. A</option>
                        <option value={3}>RLE-CAT. C</option>
                        <option value={4}>RLEP-CAT. A</option>
                        <option value={5}>RLEP-CAT. B</option>
                        <option value={6}>RLEP-CAT. C</option>
                        <option value={7}>IBP adherido</option>
                    </select>
                </div>
            </div>
            <h3>Indicar cantidades:</h3>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <label htmlFor="totalPlazas" className="form-label">Total de plazas habitadas </label>
                    <input type="number" value={residencia.total_plazas} onChange={e => setResidencia({...residencia, total_plazas: Number(e.target.value)})} className="form-control" id="totalPlazas" />
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="plazasPami" className="form-label">Plazas ocupadas con prestación PAMI</label>
                    <input type="number" value={residencia.plazas_pami} onChange={e => setResidencia({...residencia, plazas_pami: Number(e.target.value)})} className="form-control" id="plazasPami" />
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-6 col-12">
                    <label htmlFor="plazasSinPami" className="form-label">Plazas ocupadas sin prestación PAMI</label>
                    <input type="number" value={residencia.plazas_sin_pami} onChange={e => setResidencia({...residencia, plazas_sin_pami: Number(e.target.value)})} className="form-control" id="plazasSinPami" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <p>Cantidad total de habitaciones</p>
                    <p>{calcularTotalHabitaciones()}</p>
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="habitacionesIndividualesBanio" className="form-label">Cantidad de habitaciones individuales o dobles con baño privado</label>
                    <input type="number" value={residencia.habitaciones_individuales_banio} onChange={e => setResidencia({...residencia, habitaciones_individuales_banio: Number(e.target.value)})} className="form-control" id="habitacionesIndividualesBanio" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <label htmlFor="habitacionesTriplesBanio" className="form-label">Cantidad de habitaciones triples con baño privado</label>
                    <input type="number" value={residencia.habitaciones_triples_banio} onChange={e => setResidencia({...residencia, habitaciones_triples_banio: Number(e.target.value)})} className="form-control" id="habitacionesTriplesBanio" />
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="habitacionesIndividualesSinBanio" className="form-label">Cantidad de habitaciones individuales o dobles sin baño privado</label>
                    <input type="number" value={residencia.habitaciones_individuales_sin_banio} onChange={e => setResidencia({...residencia, habitaciones_individuales_sin_banio: Number(e.target.value)})} className="form-control" id="habitacionesIndividualesSinBanio" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6 col-12">
                    <label htmlFor="habitacionesTriplesSinBanio" className="form-label">Cantidad de habitaciones triples sin baño privado</label>
                    <input type="number" value={residencia.habitaciones_triples_sin_banio} onChange={e => setResidencia({...residencia, habitaciones_triples_sin_banio: Number(e.target.value)})} className="form-control" id="habitacionesTriplesSinBanio" />
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="domicilioResidencia" className="form-label">Cantidad de baños de uso compartido</label>
                    <input type="number" value={residencia.banios_uso_compartido} onChange={e => setResidencia({...residencia, banios_uso_compartido: Number(e.target.value)})} className="form-control" id="domicilioResidencia" />
                </div>
            </div>
            <button className="btn btn-primary mb-2" onClick={() => setShowModal(true)}>{edicion ? "Confirmar edicion" : "Agregar"}</button>
            <CustomModal
                showOnly={false}
                show={showModal}
                titulo={"Agregar residencia:"}
                body={"¿Confirma que desea agregar la residencia?"}
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
                body={`Hubo un error al querer guardar la residencia: ${error}`}
                closeText={"Cerrar"}
                handleClose={()=>setShowModalError(false)}
            />
        </>
    )
}

export default CrearResidencia
