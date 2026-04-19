import { debugLog } from "../utils/debugLogger"

const DEFAULT_KEYCLOAK_BASE_URL = "http://localhost:8090"
const DEFAULT_KEYCLOAK_REALM = "sello-legitimo-auth"

function getRequiredEnv(name: string, fallback?: string): string {
  const value = (import.meta.env[name] as string | undefined)?.trim()
  if (value) return value
  if (fallback) return fallback
  throw new Error(`Falta configurar ${name} en el frontend.`)
}

function buildTokenUrl(): string {
  const baseUrl = getRequiredEnv("VITE_KEYCLOAK_BASE_URL", DEFAULT_KEYCLOAK_BASE_URL)
  const realm = getRequiredEnv("VITE_KEYCLOAK_REALM", DEFAULT_KEYCLOAK_REALM)
  return `${baseUrl}/realms/${realm}/protocol/openid-connect/token`
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken?: string
  expiresIn?: number
}

export async function postLogin(payload: LoginPayload): Promise<LoginResponse> {
  const tokenUrl = buildTokenUrl()
  const body = new URLSearchParams({
    client_id: getRequiredEnv("VITE_KEYCLOAK_CLIENT_ID"),
    grant_type: "password",
    username: payload.username,
    password: payload.password,
  })

  const scope = (import.meta.env.VITE_KEYCLOAK_SCOPE as string | undefined)?.trim()
  if (scope) {
    body.set("scope", scope)
  }

  debugLog("auth", "Solicitando token a Keycloak", {
    url: tokenUrl,
    clientId: getRequiredEnv("VITE_KEYCLOAK_CLIENT_ID"),
    username: payload.username,
    scope,
  })

  let response: Response

  try {
    response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
  } catch (error) {
    debugLog("auth", "Fallo de red al solicitar token", {
      url: tokenUrl,
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  }

  debugLog("auth", "Respuesta recibida desde Keycloak", {
    url: tokenUrl,
    status: response.status,
    ok: response.ok,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    debugLog("auth", "Keycloak rechazó el login", body)
    const keycloakMessage = body?.error_description ?? body?.message
    const message =
      keycloakMessage ||
      (response.status === 401
        ? "Credenciales incorrectas"
        : "Error al iniciar sesión con Keycloak")
    throw new Error(message)
  }

  const data = (await response.json()) as {
    access_token: string
    refresh_token?: string
    expires_in?: number
  }

  debugLog("auth", "Token recibido correctamente", {
    expiresIn: data.expires_in,
    hasAccessToken: Boolean(data.access_token),
    hasRefreshToken: Boolean(data.refresh_token),
  })

  return {
    token: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  }
}
