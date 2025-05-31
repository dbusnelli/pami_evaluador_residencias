import { TABLA_MODALIDADES_PRESTACIONALES, TABLA_RESIDENCIAS } from "../utils/Const"
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