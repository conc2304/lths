


import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {store} from "./store";
import Routes from "./routes";


import { LayoutToaster } from "./components/layouts";

import LayoutThemeProvider from "./themes";
function App() {
  return (
    <Provider store={store}>
    
    <BrowserRouter >
      <LayoutThemeProvider>
        <Routes />
        <LayoutToaster/>
      </LayoutThemeProvider>
    </BrowserRouter>

    </Provider>
  );
}

export default App;
