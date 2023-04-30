import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from "./ButtonComponent.tsx";
import Container from "react-bootstrap/Container";
const buttonStyle =
    {
        backgroundColor:'#FF8C00',
        color:'#ffff',
        borderColor:'#FF8C00'
    }
function ModalComponent()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <ButtonComponent Text={"Order Now"} onClick={handleShow}></ButtonComponent>
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your password here"

                            autoFocus
                        />
                    </Form.Group>
                </Form>
                <Container className="d-flex ml-auto justify-content-end">
                    <Button variant="link">
                        Forgot Password?
                    </Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Container className="d-flex ml-auto justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" style={buttonStyle} onClick={handleClose}>
                    Login
                </Button>
                </Container>
            </Modal.Footer>
        </Modal>
        </>
    );
}
export default ModalComponent