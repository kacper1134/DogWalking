import { Flex, Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/Auth/Routes/ProtectedRoute";
import { UnprotectedRoute } from "./components/Auth/Routes/UnprotectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

const App = () => {
  return (
    <Flex>
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
          path="/"
          element={
            <ProtectedRoute>
              <Text>Hello</Text>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Flex>
  );
};

export default App;
