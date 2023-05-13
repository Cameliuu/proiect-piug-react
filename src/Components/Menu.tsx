import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-scroll";
import axios from "axios";
import { AuthContext } from "./AuthContext.js";
import ButtonComponent from "./ButtonComponent.tsx";

const categoryStyle = {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: "30px",
    fontFamily: "Roboto",
    fontWeight: "bold",
};

const categoryStyleSelected = {
    color: "rgba(0, 0, 0, 0.8)",
    fontSize: "32px",
    borderBottom: "2px solid black",
    fontFamily: "Roboto",
};

const imgStyle = {
    width: "100%",
    height: "100%",
};

function Menu(props) {
    const [isCartUpdated, setIsCartUpdated] = useState(false);

    const [foodData, setFoodData] = useState([]);
    const { isLoggedIn, username,cartData, setCartData, cartDataUpdated,setCartDataUpdated,cartId,cartProds,setCartProds} = useContext(AuthContext);
    const listRef = useRef(null);
    const containerRef = useRef(null);
    const [selectedCategory, setCategory] = useState("Pui");
    const [hoveredCategory, setHoveredCategory] = useState("None");

    useEffect(() => {
        axios.get("https://localhost:7146/foods").then((response) => {
            setFoodData(response.data);
            console.log(foodData);
        });
    }, []);

    useEffect(() => {
        if (listRef.current?.firstElementChild) {
            listRef.current.firstElementChild.scrollIntoView();
        }
    }, [selectedCategory]);

    const handleCategoryChange = (category) => {
        setCategory(category);
        if (listRef.current?.firstElementChild) {
            listRef.current.firstElementChild.scrollIntoView();
        }
    };
    useEffect(() => {
        if (isCartUpdated) {
            setCartDataUpdated(true);
        }
    }, [isCartUpdated]);

    const handleOnMouseOver = (category) => {
        setHoveredCategory(category);
    };

    const handleOnMouseOut = () => {
        setHoveredCategory("None");
    };
    let mancaruri = ["Pui", "Porc", "Salata", "Ciorba", "Garnitura", "Desert"]
    const handleAddToCart = (mancare) => {
        const data = {
            ProductId: mancare.id,
            Quantity: 1,
            Username: username,
        };

        axios
            .post("https://localhost:7146/Cart", data)
            .then((response) => {
                console.log("AM ADAUGAT:", response.data);
                setIsCartUpdated(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {

        axios
            .get(`https://localhost:7146/cart/id/${cartId}`)
            .then((response) => {
                console.log("Cart data:", response.data);
                setCartProds(response.data);
                // Handle the retrieved data here
            })
            .catch((error) => {
                console.log("Error fetching cart data:", error);
            });
        setIsCartUpdated(false);
    }, [isCartUpdated]);

    return (
        <Container style={{ marginTop: "2%", boxShadow: "0px 2px 5px #777" }}>
            <Container
                ref={containerRef}
                className="py-5 mr-auto d-flex allign justify-content-between"
                style={{ width: "70%" }}
            >
                <Nav className="items-container"></Nav>
                {mancaruri.map((mancare, index) => (
                    <Nav.Item
                        style={
                            mancare === selectedCategory
                                ? categoryStyleSelected
                                : mancare === hoveredCategory
                                    ? categoryStyleSelected
                                    : categoryStyle
                        }
                        onMouseOver={() => handleOnMouseOver(mancare)}
                        onMouseOut={handleOnMouseOut}
                        onClick={() => handleCategoryChange(mancare)}
                    >
                        <Link
                            activeClass="active"
                            to="food"
                            spy={true}
                            smooth={true}
                            duration={500}
                        ></Link>
                        {mancare}
                    </Nav.Item>
                ))}
            </Container>

            <Container>
                <Row ref={listRef} id="menu">
                    {foodData
                        .filter((mancare) => mancare.category === selectedCategory)
                        .map((mancare) => (
                            <Col
                                key={mancare.id}
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                                style={{ paddingTop: "1%" }}
                            >
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Card
                                            style={{ width: "300px", height: "303px", border: "none" }}
                                            onClick={() => handleAddToCart(mancare)}
                                        >
                                            <Card.Img variant="top" src={mancare.image} style={imgStyle} />
                                            <Card.Title className="text-center">{mancare.name}</Card.Title>
                                            <Card.Text className="text-center">Pret: {mancare.price}</Card.Text>
                                        </Card>
                                    </motion.div>
                                </AnimatePresence>
                            </Col>
                        ))}
                </Row>
            </Container>
        </Container>
    );
}

export default Menu;
