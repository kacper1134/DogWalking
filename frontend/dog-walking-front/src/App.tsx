import { Flex, Spacer } from "@chakra-ui/react";
import { Fragment } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/PageLayout/Footer/Footer";
import { Navbar } from "./components/PageLayout/Navbar/Navbar";
import { ProtectedRoute } from "./components/Auth/Routes/ProtectedRoute";
import { UnprotectedRoute } from "./components/Auth/Routes/UnprotectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import PlanningPage from "./pages/PlanningPage";
import HistoryPage from "./pages/HistoryPage";

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isNotLoginOrRegisterPage =
    currentPath !== "/login" && currentPath !== "/register";

  return (
    <Flex
      flexFlow="column"
      minW="full"
      minH="100vh"
      width={0}
      bg="white"
      textStyle="p"
    >
      {isNotLoginOrRegisterPage && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnprotectedRoute>
              <RegisterPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planning/*"
          element={
            <ProtectedRoute>
              <PlanningPage></PlanningPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/*"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate replace to="home" />
            </ProtectedRoute>
          }
        />
      </Routes>
      {isNotLoginOrRegisterPage && (
        <Fragment>
          <Spacer />
          <Footer />
        </Fragment>
      )}
    </Flex>
  );
};

export default App;
