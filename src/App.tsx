import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from "./Pagues/Landing/Landing";
import LoginPague from "./Pagues/Login/LoginPague";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdmDashboard from "./Pagues/Admin/Dashboard";
import AdmProductos from "./Pagues/Admin/Productos";
import AdmPedidos from "./Pagues/Admin/Pedidos";
import AdmClientes from "./Pagues/Admin/Clientes";
import AdmCategorias from "./Pagues/Admin/Categorias";
import AdmColores from "./Pagues/Admin/Colores";

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPague />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdmDashboard />} />
          <Route path="/admin/productos" element={<AdmProductos />} />
          <Route path="/admin/pedidos" element={<AdmPedidos />} />
          <Route path="/admin/clientes" element={<AdmClientes />} />
          <Route path="/admin/categorias" element={<AdmCategorias />} />
          <Route path="/admin/colores" element={<AdmColores />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
