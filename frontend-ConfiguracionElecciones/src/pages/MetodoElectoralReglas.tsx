import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react"

type MetodoElectoral = "ME-01" | "ME-02" | "ME-03" | "ME-04"
type ModeloCandidatura = "unico" | "abierta" | "cerrada"

const metodos: { id: MetodoElectoral; titulo: string; codigo: string; desc: string }[] = [
  {
    id: "ME-01",
    codigo: "ME-01",
    titulo: "Mayoría Simple",
    desc: "El ganador es el candidato con el mayor número de votos.",
  },
  {
    id: "ME-02",
    codigo: "ME-02",
    titulo: "Absoluta / 2da Vuelta",
    desc: "Requiere +50% para ganar en la primera vuelta.",
  },
  {
    id: "ME-03",
    codigo: "ME-03",
    titulo: "Proporcional",
    desc: "D'Hondt / Cifra Repartidora para distribución de escaños entre partidos.",
  },
  {
    id: "ME-04",
    codigo: "ME-04",
    titulo: "Voto Alternativo",
    desc: "Votación por orden de preferencia con eliminaciones sucesivas.",
  },
]

export default function MetodoElectoralReglas() {
  const navigate = useNavigate()

  const [metodoSeleccionado, setMetodoSeleccionado] = useState<MetodoElectoral>("ME-03")
  const [umbralElectoral, setUmbralElectoral] = useState("3.0")
  const [metodoCurules, setMetodoCurules] = useState("dhondt")
  const [modeloCandidatura, setModeloCandidatura] = useState<ModeloCandidatura>("abierta")
  const [votoBlancoHabilitado, setVotoBlancoHabilitado] = useState(false)
  const [idiomaTargeton, setIdiomaTargeton] = useState("es-CO")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">SL</span>
          </div>
          <div className="leading-tight">
            <p className="font-bold text-sm text-gray-900">Sello Legítimo</p>
            <p className="text-red-500 text-[10px] font-semibold tracking-wider">
              SISTEMA ELECTORAL COLOMBIANO
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <button className="hover:text-gray-900 transition">Elecciones</button>
          <button className="hover:text-gray-900 transition">Resultados</button>
          <button className="hover:text-gray-900 transition">Auditoría</button>
          <button className="text-gray-900 font-medium">Configuración</button>
        </nav>

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
          U
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-8 py-6 max-w-4xl mx-auto w-full">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <button onClick={() => navigate("/")} className="hover:text-gray-700">
            Configuración de Elección
          </button>
          <ChevronRight size={12} />
          <span className="text-gray-700">Métodos y Reglas</span>
        </div>

        {/* Page title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Métodos y Reglas de Victoria
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Paso 2: Define cómo se cuentan los votos y se determinan los ganadores.
        </p>

        {/* Progress */}
        <div className="bg-white border rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-wide">
                PROGRESO DE CONFIGURACIÓN
              </p>
              <p className="text-xs text-red-500 font-semibold mt-0.5">
                Paso 2 de 3: Método Electoral y Reglas
              </p>
            </div>
            <span className="text-lg font-bold text-gray-900">66%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full">
            <div className="h-1.5 bg-red-500 rounded-full" style={{ width: "66%" }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Siguiente: Circunscripciones y Distritos
          </p>
        </div>

        {/* Section 1: Seleccionar Método Electoral */}
        <div className="bg-white border rounded-xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="font-semibold text-gray-900">Seleccionar Método Electoral</h2>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {metodos.map((m) => {
              const selected = metodoSeleccionado === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMetodoSeleccionado(m.id)}
                  className={`text-left border rounded-xl p-4 transition ${
                    selected
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    {/* Icon placeholder */}
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-500">{m.codigo}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                        selected ? "bg-red-500 border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mb-1">{m.titulo}</p>
                  <p className="text-[11px] text-gray-500 leading-snug">{m.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Section 2: Configuración de Reglas de Victoria */}
        <div className="bg-white border rounded-xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="font-semibold text-gray-900">Configuración de Reglas de Victoria</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            {/* Umbral Electoral */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Umbral Electoral (%) <span className="text-gray-400 font-normal">#</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={umbralElectoral}
                  onChange={(e) => setUmbralElectoral(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 pr-8 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  %
                </span>
              </div>
            </div>

            {/* Método de Asignación de Curules */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Método de Asignación de Curules
              </label>
              <div className="relative">
                <select
                  value={metodoCurules}
                  onChange={(e) => setMetodoCurules(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="dhondt">D'Hondt (Cifra Repartidora)</option>
                  <option value="hare">Cuota Hare (Resto Mayor)</option>
                  <option value="sainte-lague">Sainte-Laguë</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Las columnas actuales: 3% para derecho; 50+1 para Curules
          </p>
        </div>

        {/* Section 3: Modelo de Candidatura */}
        <div className="bg-white border rounded-xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="font-semibold text-gray-900">Modelo de Candidatura</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Candidato Único */}
            <button
              type="button"
              onClick={() => setModeloCandidatura("unico")}
              className={`text-left border rounded-xl p-4 transition ${
                modeloCandidatura === "unico"
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    modeloCandidatura === "unico"
                      ? "bg-red-500 border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              <p className="text-xs font-semibold text-gray-800 mb-1">Candidato Único</p>
              <p className="text-[11px] text-gray-500 leading-snug">
                Cada candidato compite de manera individual
              </p>
            </button>

            {/* Lista de Partido Abierta */}
            <button
              type="button"
              onClick={() => setModeloCandidatura("abierta")}
              className={`text-left border rounded-xl p-4 transition ${
                modeloCandidatura === "abierta"
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    modeloCandidatura === "abierta"
                      ? "bg-red-500 border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              <p className="text-xs font-semibold text-gray-800 mb-1">Lista de Partido Abierta</p>
              <p className="text-[11px] text-gray-500 leading-snug">
                Voto preferente por candidatos individuales
              </p>
            </button>

            {/* Lista de Partido Cerrada */}
            <button
              type="button"
              onClick={() => setModeloCandidatura("cerrada")}
              className={`text-left border rounded-xl p-4 transition ${
                modeloCandidatura === "cerrada"
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    modeloCandidatura === "cerrada"
                      ? "bg-red-500 border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              <p className="text-xs font-semibold text-gray-800 mb-1">Lista de Partido Cerrada</p>
              <p className="text-[11px] text-gray-500 leading-snug">
                Los escaños se asignan a la lista tal como el partido la definió
              </p>
            </button>
          </div>
        </div>

        {/* Section 4: Tarjetón e Idioma */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              4
            </div>
            <h2 className="font-semibold text-gray-900">Tarjetón e Idioma</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Voto en Blanco */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">
                    Voto en Blanco (Voto en Blanco)
                  </p>
                  <p className="text-xs text-gray-500">
                    Ha un anulado retomado la opción oficial de voto en blanco
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setVotoBlancoHabilitado(!votoBlancoHabilitado)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none mt-0.5 ${
                    votoBlancoHabilitado ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      votoBlancoHabilitado ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Idioma */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Idioma Principal del Tarjetón
              </label>
              <div className="relative">
                <select
                  value={idiomaTargeton}
                  onChange={(e) => setIdiomaTargeton(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="es-CO">Español (Colombia)</option>
                  <option value="en">Inglés</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <ChevronLeft size={14} />
            Regresar al Paso 1
          </button>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-sm text-gray-600 hover:text-gray-900 transition">
              Guardar Borrador
            </button>
            <button className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition flex items-center gap-1">
              Continuar al Paso 3
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-3 px-8 text-center text-xs text-gray-400">
        Certificado ISO 27001 &nbsp;|&nbsp; Regulado por el CNE (Colombia) &nbsp;|&nbsp; Estándar de Sistemas a Sistema
      </footer>

    </div>
  )
}
