export type MetodoElectoral = "ME-01" | "ME-02" | "ME-03" | "ME-04"
export type ModeloCandidatura = "unico" | "abierta" | "cerrada"
export type CircunscripcionId = "nacional" | "territorial" | "especiales"

export interface Paso2Config {
  metodoSeleccionado: MetodoElectoral
  umbralElectoral: string
  metodoCurules: string
  numeroCurules: string
  modeloCandidatura: ModeloCandidatura
  votoBlancoHabilitado: boolean
  idiomaTargeton: string
}

export interface Paso3Config {
  circunscripcionActiva: CircunscripcionId
  edadDesde: string
  edadHasta: string
  exencionSeleccionada: string
}

type Paso2DraftInput = {
  metodoSeleccionado?: string
  umbralElectoral?: string
  metodoCurules?: string
  numeroCurules?: string
  modeloCandidatura?: string
  votoBlancoHabilitado?: boolean
  idiomaTargeton?: string
}

type Paso3DraftInput = {
  circunscripcionActiva?: string
  edadDesde?: string
  edadHasta?: string
  exencionSeleccionada?: string
}

interface TipoEleccionPreset {
  metodo: MetodoElectoral
  modelosCompatibles: ModeloCandidatura[]
  defaultModelo: ModeloCandidatura
  circunscripcionesCompatibles: CircunscripcionId[]
  defaultCircunscripcion: CircunscripcionId
  lockMethod: boolean
  lockModelo: boolean
  lockCircunscripcion: boolean
  resumen: string
  reglasVictoria: string
}

interface MetodoVictoryConfig {
  titulo: string
  descripcion: string
  usaConteoDirecto: boolean
  usaUmbralEditable: boolean
  umbralFijo?: string
  usaMetodoCurules: boolean
  usaNumeroCurules: boolean
  usaRedistribucion: boolean
}

const DEFAULT_METODO_CURULES = "dhondt"

const tipoEleccionPresets: Partial<Record<string, TipoEleccionPreset>> = {
  PRESIDENCIAL: {
    metodo: "ME-02",
    modelosCompatibles: ["unico"],
    defaultModelo: "unico",
    circunscripcionesCompatibles: ["nacional"],
    defaultCircunscripcion: "nacional",
    lockMethod: true,
    lockModelo: true,
    lockCircunscripcion: true,
    resumen: "Presidencial fija segunda vuelta, candidato unico y circunscripcion nacional.",
    reglasVictoria: ">50% en primera vuelta o segunda vuelta.",
  },
  LEGISLATIVA: {
    metodo: "ME-03",
    modelosCompatibles: ["abierta", "cerrada"],
    defaultModelo: "abierta",
    circunscripcionesCompatibles: ["territorial", "nacional", "especiales"],
    defaultCircunscripcion: "territorial",
    lockMethod: true,
    lockModelo: false,
    lockCircunscripcion: false,
    resumen: "Legislativa fija sistema proporcional y solo admite listas de partido.",
    reglasVictoria: "Umbral electoral mas formula de reparto de curules.",
  },
  TERRITORIAL: {
    metodo: "ME-01",
    modelosCompatibles: ["unico"],
    defaultModelo: "unico",
    circunscripcionesCompatibles: ["territorial"],
    defaultCircunscripcion: "territorial",
    lockMethod: true,
    lockModelo: true,
    lockCircunscripcion: true,
    resumen: "Territorial fija mayoria simple, candidato unico y circunscripcion territorial.",
    reglasVictoria: "Gana quien obtiene mas votos validos.",
  },
}

const metodoVictoryConfig: Record<MetodoElectoral, MetodoVictoryConfig> = {
  "ME-01": {
    titulo: "Conteo directo de votos",
    descripcion: "La victoria se define unicamente por el mayor numero de votos validos.",
    usaConteoDirecto: true,
    usaUmbralEditable: false,
    usaMetodoCurules: false,
    usaNumeroCurules: false,
    usaRedistribucion: false,
  },
  "ME-02": {
    titulo: "Mayoría absoluta con segunda vuelta",
    descripcion: "El umbral es implicito en 50%. Si nadie lo supera, aplica segunda vuelta.",
    usaConteoDirecto: false,
    usaUmbralEditable: false,
    umbralFijo: "50",
    usaMetodoCurules: false,
    usaNumeroCurules: false,
    usaRedistribucion: false,
  },
  "ME-03": {
    titulo: "Reparto proporcional de curules",
    descripcion: "Este es el unico metodo donde el umbral y la formula de reparto son obligatorios.",
    usaConteoDirecto: false,
    usaUmbralEditable: true,
    usaMetodoCurules: true,
    usaNumeroCurules: true,
    usaRedistribucion: false,
  },
  "ME-04": {
    titulo: "Eliminación y redistribución",
    descripcion: "Se elimina al menos votado y sus votos se redistribuyen segun las preferencias.",
    usaConteoDirecto: false,
    usaUmbralEditable: false,
    usaMetodoCurules: false,
    usaNumeroCurules: false,
    usaRedistribucion: true,
  },
}

export function getTipoEleccionPreset(tipoEleccion?: string) {
  if (!tipoEleccion) return null
  return tipoEleccionPresets[tipoEleccion] ?? null
}

export function getMetodoVictoryConfig(metodo: MetodoElectoral): MetodoVictoryConfig {
  return metodoVictoryConfig[metodo]
}

export function getModelosCompatibles(metodo: MetodoElectoral): ModeloCandidatura[] {
  if (metodo === "ME-03") return ["abierta", "cerrada"]
  return ["unico"]
}

export function getCircunscripcionesCompatibles(metodo: MetodoElectoral): CircunscripcionId[] {
  if (metodo === "ME-03") return ["territorial", "nacional", "especiales"]
  return ["territorial", "nacional"]
}

export function isMetodoElectoral(value: string | undefined): value is MetodoElectoral {
  return value === "ME-01" || value === "ME-02" || value === "ME-03" || value === "ME-04"
}

function isModeloCandidatura(value: string | undefined): value is ModeloCandidatura {
  return value === "unico" || value === "abierta" || value === "cerrada"
}

function isCircunscripcionId(value: string | undefined): value is CircunscripcionId {
  return value === "nacional" || value === "territorial" || value === "especiales"
}

function sanitizeMetodoCurules(metodoSeleccionado: MetodoElectoral, value?: string): string {
  if (metodoSeleccionado !== "ME-03") return DEFAULT_METODO_CURULES
  if (value === "dhondt" || value === "sainte-lague") return value
  return DEFAULT_METODO_CURULES
}

function sanitizeUmbral(metodoSeleccionado: MetodoElectoral, value?: string): string {
  if (metodoSeleccionado === "ME-02") return "50"
  if (metodoSeleccionado === "ME-03") return value?.trim() ? value : "3.0"
  return "0"
}

export function sanitizePaso2Draft(tipoEleccion: string | undefined, draft: Paso2DraftInput): Paso2Config {
  const preset = getTipoEleccionPreset(tipoEleccion)
  const metodoSeleccionado = preset?.metodo ?? (isMetodoElectoral(draft.metodoSeleccionado) ? draft.metodoSeleccionado : "ME-03")
  const modelosCompatibles = preset?.modelosCompatibles ?? getModelosCompatibles(metodoSeleccionado)
  const draftModelo = isModeloCandidatura(draft.modeloCandidatura) ? draft.modeloCandidatura : undefined
  const modeloCandidatura = draftModelo && modelosCompatibles.includes(draftModelo)
    ? draftModelo
    : preset?.defaultModelo ?? modelosCompatibles[0]

  return {
    metodoSeleccionado,
    umbralElectoral: sanitizeUmbral(metodoSeleccionado, draft.umbralElectoral),
    metodoCurules: sanitizeMetodoCurules(metodoSeleccionado, draft.metodoCurules),
    numeroCurules: metodoSeleccionado === "ME-03" ? draft.numeroCurules?.trim() || "1" : "1",
    modeloCandidatura,
    votoBlancoHabilitado: draft.votoBlancoHabilitado ?? false,
    idiomaTargeton: draft.idiomaTargeton ?? "es-CO",
  }
}

export function sanitizePaso3Draft(
  tipoEleccion: string | undefined,
  metodoSeleccionado: MetodoElectoral,
  draft: Paso3DraftInput
): Paso3Config {
  const preset = getTipoEleccionPreset(tipoEleccion)
  const circunscripcionesCompatibles =
    preset?.circunscripcionesCompatibles ?? getCircunscripcionesCompatibles(metodoSeleccionado)
  const circunscripcionActiva =
    isCircunscripcionId(draft.circunscripcionActiva) &&
    circunscripcionesCompatibles.includes(draft.circunscripcionActiva)
      ? draft.circunscripcionActiva
      : preset?.defaultCircunscripcion ?? circunscripcionesCompatibles[0]

  return {
    circunscripcionActiva,
    edadDesde: draft.edadDesde ?? "18",
    edadHasta: draft.edadHasta ?? "65",
    exencionSeleccionada:
      draft.exencionSeleccionada ?? "Personal Activo de Fuerzas Militares y Policía",
  }
}