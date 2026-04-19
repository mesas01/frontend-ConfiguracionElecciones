import { buildGatewayUrl, createJsonHeaders, getErrorMessage } from "./apiClient"
import { debugLog } from "../utils/debugLogger"

// Endpoint real del microservicio expuesto a través del gateway.
// El gateway valida el JWT antes de redirigir. No se necesita un endpoint dedicado de validación.
const ELECCIONES_PATH = "/api/configuracion-eleccion"

/**
 * Verifica que el JWT sea aceptado por el gateway realizando una petición real al microservicio.
 * El gateway actúa como resource server OAuth2 y rechaza automáticamente tokens inválidos (401/403).
 */
export async function validarTokenConGateway(token: string): Promise<void> {
  const url = buildGatewayUrl(ELECCIONES_PATH)

  debugLog("gateway-validation", "Validando token con el gateway", { url })

  let response: Response
  try {
    response = await fetch(url, {
      method: "GET",
      headers: createJsonHeaders(token),
    })
  } catch (networkError) {
    debugLog("gateway-validation", "Error de red al validar con gateway", { networkError })
    throw new Error("No se pudo conectar con el gateway para validar la sesión.")
  }

  debugLog("gateway-validation", "Respuesta del gateway", { status: response.status })

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      response.status === 401 || response.status === 403
        ? "El gateway rechazó el token. Acceso no autorizado."
        : "El gateway no pudo validar la sesión."
    )
    throw new Error(message)
  }
}
