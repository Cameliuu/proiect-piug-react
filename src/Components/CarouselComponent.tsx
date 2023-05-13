    import {Carousel} from "react-bootstrap";
    import SliderCaption from "./SliderCaption.tsx";
    import ButtonComponent from "./ButtonComponent.tsx";
    import ModalComponent from "./ModalComponent.tsx";
     const captionStyle=
         {
             top:'20vh',
             bottom:'auto'
         };

        const liniutze={
            content:" ",
            width:'40px',
            height:'4px',
            backgroundColor:'#ffff',
            display:'inline-block',
            margin:'10px',
            verticalAlign:'midle'
        };

        function CarouselComponent() {
            return (
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../img/restaurant.jpg')}
                            alt="First slide"
                            style={{
                                opacity:1
                            }}
                        />
                        <Carousel.Caption style={captionStyle}>
                           <SliderCaption Caption={"Skip the line."}></SliderCaption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../img/restaurant2.jpg')}
                            alt="Second slide"
                            style={{
                                opacity:1
                            }}
                        />

                        <Carousel.Caption style={captionStyle}>
                            <SliderCaption Caption={"Save the time."}>

                            </SliderCaption>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            );
        }

    export default CarouselComponent