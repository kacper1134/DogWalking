import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

// Fonts
import "@fontsource/montserrat/700.css";
import "@fontsource/hind/400.css";
import "@fontsource/space-mono/400.css";

// Redux
import store from "./store/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
