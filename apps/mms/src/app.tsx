
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

import LayoutThemeProvider from "./themes";

import { Provider } from "react-redux";
import {store} from "./store";

function App() {
  return (
    <Provider store={store}>
    
    <BrowserRouter >
      <LayoutThemeProvider>
        <Routes />
      </LayoutThemeProvider>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
