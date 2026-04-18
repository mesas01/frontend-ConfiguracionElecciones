// API calls for elections configuration
export const BASE_URL = "/api"

export async function guardarBorrador(data: unknown) {
  const response = await fetch(`${BASE_URL}/elecciones/borrador`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Error al guardar borrador")
  return response.json()
}
