import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./State/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
