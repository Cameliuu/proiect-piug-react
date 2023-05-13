import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar.tsx";
import CarouselComponent from "./Components/CarouselComponent.tsx";
import Menu from "./Components/Menu.tsx";
import AboutsComponent from "./Components/AboutsComponent.tsx";
import ReviewsComponent from "./Components/ReviewsComponent.tsx";
import Container from "react-bootstrap/Container";
import ConctactUsComponent from "./Components/ConctactUsComponent.tsx";
import { AuthProvider } from "./Components/AuthContext.js";
import { CartProvider } from "./Components/CartContext.js";


function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <NavigationBar>

                    </NavigationBar>

                    <CarouselComponent></CarouselComponent>
                    <Container>

                        <Menu></Menu>
                        <AboutsComponent></AboutsComponent>
                        <ReviewsComponent></ReviewsComponent>
                    </Container>
                    <ConctactUsComponent></ConctactUsComponent>
                    <Routes>

                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
