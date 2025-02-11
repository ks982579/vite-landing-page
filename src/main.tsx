import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRouter from "./AppRouter.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import OriginalLayout from "./layout/OriginalLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <OriginalLayout>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </OriginalLayout>
  </AuthProvider>,
);
