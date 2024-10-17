import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Informes, Mobiliario, Personas, Ubicaciones, Usuarios } from "../screens";
import { Menu } from "../components";

export const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index path="/personas" element={ <Personas /> } />
            <Route path="informes" element={ <Informes /> } />
            <Route path="mobiliario" element={ <Mobiliario /> } />
            <Route path="ubicaciones" element={ <Ubicaciones /> } />
            <Route path="usuarios" element={ <Usuarios /> } />
            <Route patsh="menu" element={ <Menu /> } />
        </Routes>
    </BrowserRouter>
  )
}

