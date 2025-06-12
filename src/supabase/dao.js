import { TABLA_CATEGORIAS, TABLA_CLASIFICADORES, TABLA_EQUIPO_EVALUADOR, TABLA_EVALUACION_ITEMS, TABLA_EVALUACIONES, TABLA_ITEMS_EVALUACIONES, TABLA_MODALIDADES_PRESTACIONALES, TABLA_RESIDENCIAS } from "../utils/Const"
import { supabase } from "./supabase-client"


//RESIDENCIAS
export const addResidencia = async(residencia, cb) => {
    let {error} = await supabase.from(TABLA_RESIDENCIAS).insert(residencia)

    cb(error?.message)
}
export const updateResidenciaById = async(id, residencia, cb) => {
    let {error} = await supabase.from(TABLA_RESIDENCIAS).update(residencia).eq('id', id)

    cb(error?.message)
}
export const eliminarResidenciaById = async(id, cb) => {
    let {error} = await supabase.from(TABLA_RESIDENCIAS).delete().eq('id', id)

    cb(error?.message)
}
export const getAllResidencias = async(setResidencias, cb) => {
    let {data, error} = await supabase.from(TABLA_RESIDENCIAS).select()

    setResidencias(data)
    cb(error?.message)
}
export const getResidenciaById = async(id, setResidencias, cb) => {
    let {data, error} = await supabase.from(TABLA_RESIDENCIAS).select("*").eq('id', id).single()

    setResidencias(data)
    cb(error?.message)
}

//MODALIDADES PRESTACINALES
export const getModalidadesPrestacinoales = async(setModalidades, cb) => {
    let {data, error} = await supabase.from(TABLA_MODALIDADES_PRESTACIONALES).select()

    setModalidades(data)
    cb(error?.message)
}

//ITEMS EVALUACIONES
export const getAllItemsEvaluaciones = async(setItemsEvaluaciones, cb) => {
    let {data, error} = await supabase.from(TABLA_ITEMS_EVALUACIONES).select()

    setItemsEvaluaciones(data)
    cb(error?.message)
}

//EVALUACIONES
export const addEvaluacion = async(evaluacion, cbError, cbSucces) => {
    let {data, error} = await supabase.from(TABLA_EVALUACIONES).insert(evaluacion).select()

    if (error) {
        cbError(error.message)
    }else{
        cbSucces(data)
    }
}
export const updateEvaluacionById = async(id, evaluacion, cb) => {
    let {error} = await supabase.from(TABLA_EVALUACIONES).update(evaluacion).eq('id', id)

    cb(error?.message)
}
export const deleteEvaluacionById = async(id, cb) => {
    let {error} = await supabase.from(TABLA_EVALUACIONES).delete().eq('id', id)

    cb(error?.message)
}
export const getEvaluacionesByIdResidencia = async(idResidencia, setEvaluaciones, cb) => {
    let {data, error} = await supabase.from(TABLA_EVALUACIONES).select("*").eq('id_residencia', idResidencia)

    setEvaluaciones(data)
    cb(error?.message)
}
export const getEvaluacionById = async(id, setEvaluacion, cb) => {
    let {data, error} = await supabase.from(TABLA_EVALUACIONES).select("*").eq('id', id).single()

    setEvaluacion(data)
    cb(error?.message)
}

//EVALUACION_ITEMS
export const addEvaluacionItems = async(items, cb) => {
    let {error} = await supabase.from(TABLA_EVALUACION_ITEMS).insert(items)

    cb(error?.message)
}
export const updateEvaluacionItemById = async(id, evaluacionItem, cb) => {
    let {error} = await supabase.from(TABLA_EVALUACION_ITEMS).update(evaluacionItem).eq('id', id)

    cb(error?.message)
}
export const deleteEvaluacionItemsByIdEvaluacion = async(idEvaluacion, cb) => {
    const { error } = await supabase.from(TABLA_EVALUACION_ITEMS).delete().eq('id_evaluacion', idEvaluacion)

    cb(error?.message)
}
export const getEvaluacionItemsByIdEvaluacion = async(idEvaluacion, setEvaluacionItems, cb) => {
    let {data, error} = await supabase.from(TABLA_EVALUACION_ITEMS).select().eq('id_evaluacion', idEvaluacion)

    setEvaluacionItems(data)
    cb(error?.message)
}

//EQUIPO_EVALUADOR
export const addEquipoEvaluador = async(equipo, cb) => {
    let {error} = await supabase.from(TABLA_EQUIPO_EVALUADOR).insert(equipo)

    cb(error?.message)
}
export const deleteEquipoEvaluadorById = async(id, cb) => {
    const { error } = await supabase.from(TABLA_EQUIPO_EVALUADOR).delete().eq('id', id)

    cb(error?.message)
}
export const deleteEquipoEvaluadorByIdEvaluacion = async(idEvaluacion, cb) => {
    const { error } = await supabase.from(TABLA_EQUIPO_EVALUADOR).delete().eq('id_evaluacion', idEvaluacion)

    cb(error?.message)
}
export const getEquipoEvaluadorByIdEvaluacion = async(idEvaluacion, setEquipoEvaluador, cb) => {
    let {data, error} = await supabase.from(TABLA_EQUIPO_EVALUADOR).select().eq('id_evaluacion', idEvaluacion)

    setEquipoEvaluador(data)
    cb(error?.message)
}

//CATEGORIAS
export const getCategorias = async(setModalidades, cb) => {
    let {data, error} = await supabase.from(TABLA_CATEGORIAS).select()

    setModalidades(data)
    cb(error?.message)
}

//CLASIFICADORES
export const getClasificadores = async(setModalidades, cb) => {
    let {data, error} = await supabase.from(TABLA_CLASIFICADORES).select()

    setModalidades(data)
    cb(error?.message)
}