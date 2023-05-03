import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import data from './mancare.json'
import {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-scroll";
import ButtonComponent from "./ButtonComponent.tsx";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {AnimatePresence, motion} from "framer-motion";
import {CartContext} from "./CartContext.tsx";


let mancaruri = ["Pui", "Porc", "Salata", "Ciorba", "Garnitura", "Desert"]

interface Food {
    image: string,
    price: string,
    name: string
    category: string
}

const imgStyle = {
    width: '100%',
    height: '100%'
}
const categoryStyle =
    {
        color: "rgb(0,0,0,0.5)",
        fontSize: "30px",
        fontFamily:"Roboto",
        fontWeight:'bold'
    }
const categoryStyleSelected =
    {
        color: 'rgb(0,0,0,0.8)',
        fontSize: '32px',
        borderBottom:'2px solid black',
        fontFamily:"Roboto",
    }
    function GetProductData(id)
    {
        let prod = data.find(mancare => mancare.id ===id);
         return (prod === undefined) ? undefined : prod;
    }

function Menu(props) {

    const cart = useContext(CartContext);

    const listRef = useRef<HTMLUListElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    let [selectedCategory, setCategory] = useState("Pui")
    let [hoveredCategory, setHoveredCategory] = useState("None");
    useEffect(() => {
        listRef.current?.firstElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [selectedCategory]);
    const handleCategoryChange = (category: string) => {
        setCategory(category);
        if (listRef.current?.firstElementChild) {
            listRef.current.firstElementChild.scrollIntoView();
        }

    };
    const handleOnMouseOver = (category: string) => {
        setHoveredCategory(category);
    };

    const handleOnMouseOut = () => {
        setHoveredCategory("None");
    };

    const handleOnClick = () => {
        console.log("merge");
    }


    return (
        <>
            <Container style={{marginTop:'2%', boxShadow:'0px 2px 5px #777'}}>
            <Container ref={containerRef} className=' py-5 mr-auto d-flex allign justify-content-between' style={{width:'70%'}}>
                <Nav className="items-container"></Nav>
                {mancaruri.map((mancare, index) =>
                    (<Nav.Item
                            style={
                                mancare === selectedCategory
                                    ? categoryStyleSelected
                                    : mancare === hoveredCategory
                                        ? categoryStyleSelected
                                        : categoryStyle
                            }

                            onMouseOver={() => handleOnMouseOver(mancare)}
                            onMouseOut={handleOnMouseOut}
                            onClick={() => handleCategoryChange(mancare)}>
                            <Link activeClass="active"
                                  to="food"
                                  spy={true}
                                  smooth={true}
                                  duration={500}></Link>
                            {mancare}
                        </Nav.Item>
                    ))}

            </Container>

                <Container >

                    <Row ref={listRef} id='menu'>

                        {data.filter((mancare) => mancare.category === selectedCategory).map((mancare) => (

                            <Col key={mancare.id} sm={12} md={6} lg={4} xl={3} style={{paddingTop:'1%'}} >
                                <AnimatePresence>
                                <motion.div    initial={{ opacity: 0, scale: 0.5 }}
                                               animate={{ opacity: 1, scale: 1 }}
                                               transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.1 }}
                                             >

                                <Card style={{width: '300px', height:"303px", border:'none'}}>
                                    <Card.Img variant="top" src={mancare.image} style={imgStyle} />
                                    <Card.Title className="text-center">{mancare.name}</Card.Title>
                                    <Card.Text className="text-center">Pret:{mancare.price}</Card.Text>


                                </Card>
                                </motion.div>
                                </AnimatePresence>
                            </Col>

                        ))}
                    </Row>

                </Container>

            </Container>

        </>
    );
}


export default Menu