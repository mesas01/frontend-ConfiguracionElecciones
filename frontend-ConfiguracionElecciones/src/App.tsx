import { BrowserRouter, Routes, Route } from "react-router-dom"
import ParametrosBase from "./pages/ParametrosBase"
import MetodoElectoralReglas from "./pages/MetodoElectoralReglas"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ParametrosBase />} />
        <Route path="/configuracion/parametros-base" element={<ParametrosBase />} />
        <Route path="/configuracion/metodo-electoral" element={<MetodoElectoralReglas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
