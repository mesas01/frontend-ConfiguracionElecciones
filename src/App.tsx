import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Callback from "./pages/Callback"
import ParametrosBase from "./pages/ParametrosBase"
import MetodoElectoralReglas from "./pages/MetodoElectoralReglas"
import CircunscripcionesElegibilidad from "./pages/CircunscripcionesElegibilidad"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />

        {/* Rutas protegidas — requieren JWT válido */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/configuracion/parametros-base" replace />} />
          <Route path="/configuracion/parametros-base" element={<ParametrosBase />} />
          <Route path="/configuracion/metodo-electoral" element={<MetodoElectoralReglas />} />
          <Route path="/configuracion/circunscripciones" element={<CircunscripcionesElegibilidad />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
