export function formatDateFromSupabase(date) {
    const fecha = new Date(date);

    const dia = String(fecha.getDate()).padStart(2, '0')
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const anio = fecha.getFullYear()

    const fechaFormateada = `${dia}/${mes}/${anio}`
    return(fechaFormateada)
}

export function normalizarFechaParaInputDate(fecha) {
  if (!fecha) return "";

  if (typeof fecha === "string" && fecha.includes("T")) {
    return fecha.split("T")[0]
  }

  return fecha;
};