// Business logic / service layer for elections
import { guardarBorrador } from "../api/eleccionesApi"

export interface ConfiguracionBasicaForm {
  nombreEleccion: string
  tipoEleccion: string
  estadoEleccion: string
  fechaInicio: string
  fechaCierre: string
  jornadaExtendida: boolean
  horaApertura: string
  horaCierre: string
  votacionPresencial: boolean
  votacionRemota: boolean
}

export async function guardarConfiguracionBorrador(form: ConfiguracionBasicaForm) {
  return guardarBorrador(form)
}
