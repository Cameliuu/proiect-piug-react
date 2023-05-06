import NavigationBar from "./Components/NavigationBar.tsx";
import CarouselComponent from "./Components/CarouselComponent.tsx";
import Menu from "./Components/Menu.tsx";
import {Carousel} from "react-bootstrap";
import AboutsComponent from "./Components/AboutsComponent.tsx";
import ReviewsComponent from "./Components/ReviewsComponent.tsx";
import Container from "react-bootstrap/Container";
import ConctactUsComponent from "./Components/ConctactUsComponent.tsx";
import {AuthProvider} from "./Components/AuthContext.js";

function App()
{
  return(
    <AuthProvider>
    <NavigationBar></NavigationBar>
    <CarouselComponent></CarouselComponent>
    <Container>
    <Menu></Menu>
    <AboutsComponent></AboutsComponent>
    <ReviewsComponent></ReviewsComponent>

    </Container>
    <ConctactUsComponent></ConctactUsComponent>
    </AuthProvider>
  );
}
export default App;