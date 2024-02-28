import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LocationProvider } from "./providers/LocationProvider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { PostsProvider } from "./providers/PostsContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
