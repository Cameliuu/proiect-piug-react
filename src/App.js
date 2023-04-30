import NavigationBar from "./Components/NavigationBar.tsx";
import CarouselComponent from "./Components/CarouselComponent.tsx";
import Menu from "./Components/Menu.tsx";
import {Carousel} from "react-bootstrap";
import AboutsComponent from "./Components/AboutsComponent.tsx";
function App()
{
  return <div>
    <NavigationBar></NavigationBar>
    <CarouselComponent></CarouselComponent>
    <Menu></Menu>
    <AboutsComponent></AboutsComponent>
  </div>
}
export default App;