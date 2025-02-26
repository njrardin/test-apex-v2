import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import PaymentForm from "./pages/PaymentForm";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<PaymentForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;