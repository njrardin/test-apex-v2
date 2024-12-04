import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import PaymentForm from "./pages/PaymentForm.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<PaymentForm />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
