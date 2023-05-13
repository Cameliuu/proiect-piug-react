        import Container from 'react-bootstrap/Container';
        import Navbar from 'react-bootstrap/Navbar';

        import {Snackbar} from '@mui/material';

        import Logo from "./Logo.tsx";
        import {Button, Col, NavbarBrand, Row} from "react-bootstrap";
        import NavbarToggle from "react-bootstrap/NavbarToggle";
        import NavbarCollapse from "react-bootstrap/NavbarCollapse";
        import {Offcanvas} from "react-bootstrap";
        import Nav from 'react-bootstrap/Nav';
        import {useContext, useEffect, useState} from "react";
        import {Link} from 'react-scroll';

        import {motion} from "framer-motion";
        import NavbarOffcanvas from "react-bootstrap/NavbarOffcanvas";
        import Modal from 'react-bootstrap/Modal'
        import axios from 'axios';
        import {Box, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
        import { green } from '@mui/material/colors';
        import StyledCard from "./StyledCard.tsx";
        import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
        import AccountCircleIcon from '@mui/icons-material/AccountCircle';
        import {AuthContext} from './AuthContext.js'
        import {Login, LoginRounded} from "@mui/icons-material";
        const linkStyle = {
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#ffff',
        }
    
        let links = ["Menu", "Reviews", "About Us", "Contact"]
    
    
        function NavigationBar() {
            const [snackbarOpen, setSnackbarOpen] = useState(false);
            const handlePlaceOrder = () => {

                handleClose();
                axios
                    .delete(`https://localhost:7146/cart/${cartId}`)
                    .then(response => {
                        handleClose();
                        setSnackbarOpen(true);
                        setCartProds(response.data);
                        // Handle the response or perform any additional actions
                    })
                    .catch(error => {
                        // Handle the error
                    });
                setSnackbarOpen(true);
            };

            const [show, setShow] = useState(false);
            const {isLoggedIn,username, cartId,cartProds,setCartProds} = useContext(AuthContext);
            const buttonVariants = {
                initial: { opacity: 0, scale: 0 },
                animate: { opacity: 1, scale: 1 },
            };


            const buttonStyle =
                {
                    backgroundColor: '#FF8C00',
                    color: '#ffff',
                    borderColor: '#FF8C00'
                }
    
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
            let [selectedIndex, setSelectedIndex] = useState(-1);
            let [navbarStyle, setNavbarStyle] = useState({});
            useEffect(() => {

                const handleScroll = () => {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition > 90) {
                        setNavbarStyle({
                            transition: "background-color 0.3s ease-in-out",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                        });
                    } else {
                        setNavbarStyle({
                            transition: "background-color 0.3s ease-in-out",
                            backgroundColor: "transparent",
                        });
                    }
                };
                window.addEventListener("scroll", handleScroll);
                return () => window.removeEventListener("scroll", handleScroll);
            }, []);
            useEffect(() => {
                const fetchData = async () => {
                    console.log("se schimba idu", cartId);
                    try {
                        if(cartId != 'none') {
                            const response = await axios.get('https://localhost:7146/Cart/id/' + cartId);
                            const data = response.data;
                            console.log("smecherie", data);
                            setCartProds(data); // Update the cartData state with the fetched data
                        }
                    } catch (error) {
                        console.log('Error fetching data:', error);
                    }
                };

                fetchData();
            }, []);

            return (
                <Navbar fixed={'top'} style={navbarStyle}>
                    <Container className='justify-content-between'>
                        <Navbar.Brand href="#home">
                            <Logo src={require('../img/logo_bun.png')}
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Container>
                            <Nav className="me-auto justify-content-center">

                                {links.map((link, index) => (
    
                                        <Nav.Link
    
                                            key={index}
    
                                        >
                                            <motion.div
                                                initial={{color:'white',fontSize:'20px'}}
                                                whileHover={{
                                                    color: '#FF8C00',
                                                    scale: 1.1,
                                                    borderBottom: '2px solid white'
                                                }}
                                                whileTap={{scale: 0.9}}>
                                            <Link
                                                activeClass="active"
                                                to="menu"
                                                spy={true}
                                                smooth={true}
                                                duration={500}
    
    
                                            >
                                                {link}
                                            </Link>
                                            </motion.div>
                                        </Nav.Link>
    
                                ))}
                            </Nav>
                        </Container>

                            <Navbar.Collapse>
                                {isLoggedIn ? (
                                    <>
                                        <Navbar.Text>Logged in as: {username}</Navbar.Text>
                                        <AccountCircleIcon style={{ color: 'white' }} onClick={() => console.log(cartProds)} />
                                    </>
                                ) : (
                                    <LoginRounded style={{ color: 'white' }}>Log in</LoginRounded>
                                )}
                            </Navbar.Collapse>
    
                        <Navbar.Collapse>
                            <ShoppingCartIcon onClick={handleShow}>Cart  Items

                            </ShoppingCartIcon>

                        </Navbar.Collapse>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Shopping Cart</Modal.Title>
                                    </Modal.Header>

                                    {cartProds ?(
                                        <Modal.Body>
                                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <Container>
                                                    <Row className="justify-content-center align-items-center">
                                                        {cartProds.map((item) => (
                                                            <StyledCard key={item.id} item={item} />
                                                        ))}
                                                    </Row>

                                                </Container>
                                            </div>
                                        </Modal.Body>


                                    ) : (
                                        <Modal.Body>
                                            <Container>
                                                <Row className="justify-content-center align-items-center">
                                                    <p>No items in cart.</p>
                                                </Row>
                                            </Container>
                                        </Modal.Body>
                                    )}
                                    { cartProds ? (
                                        <motion.button
                                            style={buttonStyle}
                                            variant="contained"
                                            color="primary"
                                            variants={buttonVariants}
                                            initial="initial"
                                            animate="animate"
                                            onClick={handlePlaceOrder}
                                        >
                                            Place Order
                                        </motion.button>
                                    ) : (
                                        <></> // or any other valid JSX element or expression
                                    )}





                                </Modal>
                            <Snackbar
                                open={snackbarOpen}
                                onClose={() => setSnackbarOpen(false)}
                                message="Order placed"
                                autoHideDuration={1000}
                            />
                        </Container>

                </Navbar>
            );
        }
    
    
        export default NavigationBar