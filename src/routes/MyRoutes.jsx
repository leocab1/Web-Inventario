import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Mobiliario, Personas, Ubicaciones, Usuarios, Inicio } from "../screens";

export const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/personas" element={ <Personas /> } />
            <Route path="/mobiliario" element={ <Mobiliario /> } />
            <Route path="/ubicaciones" element={ <Ubicaciones /> } />
            <Route path="/usuarios" element={ <Usuarios /> } />
            <Route index path="/" element={ <Inicio /> } />
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    </BrowserRouter>
  );
};
