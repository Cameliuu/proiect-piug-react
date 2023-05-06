import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "./Logo.tsx";
import {Button, NavbarBrand} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {Offcanvas} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import {useContext, useEffect, useState} from "react";
import {Link} from 'react-scroll';
import {motion} from "framer-motion";
import NavbarOffcanvas from "react-bootstrap/NavbarOffcanvas";
import Modal from "react-bootstrap/Modal";
import CartProduct from "./CartProduct.tsx";

import {AuthContext} from './AuthContext.js'
const linkStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#ffff',
}

let links = ["Menu", "Reviews", "About Us", "Contact"]


function NavigationBar() {

    const [show, setShow] = useState(false);
    const {isLoggedIn,username} = useContext(AuthContext)
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
    return (
        <Navbar fixed={'top'} style={navbarStyle}>
            <Container>
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
                <Container className="justify-content-between"  >
                    <Navbar.Collapse>
                        {isLoggedIn ? (
                            <Navbar.Text>Logged in as: {username}</Navbar.Text>
                        ) : (
                            <Button onClick={() => console.log(username+":"+isLoggedIn)}>Log in</Button>
                        )}
                    </Navbar.Collapse>

                <Navbar.Collapse>
                    <Button onClick={handleShow}>Cart  Items</Button>
                </Navbar.Collapse>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Shopping Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                               <CartProduct id='1'></CartProduct>

                        </Modal.Body>
                    </Modal>
                </Container>
            </Container>
        </Navbar>
    );
}


export default NavigationBar