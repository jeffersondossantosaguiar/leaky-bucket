import { JSX } from 'react';
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Não autenticado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  // Autenticado, renderiza o componente filho
  return children;
};

export default PrivateRoute;