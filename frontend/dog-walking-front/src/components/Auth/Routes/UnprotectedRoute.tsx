import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../../store";

export interface UnprotectedRouteProps {
  children: JSX.Element;
}

export const UnprotectedRoute = ({children} : UnprotectedRouteProps): JSX.Element => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (isAuthenticated) return <Navigate to="/home" />;
  return children;
};