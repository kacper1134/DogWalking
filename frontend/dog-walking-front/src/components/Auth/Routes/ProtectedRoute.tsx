import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../../store";

export interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({children} : ProtectedRouteProps): JSX.Element => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
