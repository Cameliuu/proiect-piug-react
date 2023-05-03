import NavigationBar from "./Components/NavigationBar.tsx";
import CarouselComponent from "./Components/CarouselComponent.tsx";
import Menu from "./Components/Menu.tsx";
import {Carousel} from "react-bootstrap";
import AboutsComponent from "./Components/AboutsComponent.tsx";
import ReviewsComponent from "./Components/ReviewsComponent.tsx";
import Container from "react-bootstrap/Container";
function App()
{
  return <div>

    <NavigationBar></NavigationBar>
    <CarouselComponent></CarouselComponent>
    <Container>
    <Menu></Menu>
    <AboutsComponent></AboutsComponent>
    <ReviewsComponent></ReviewsComponent>
    </Container>
  </div>
}
export default App;