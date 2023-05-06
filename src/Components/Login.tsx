import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {useState} from "react";

function Login()
{
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={true}>
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
                <Container className="d-flex mr-auto ml-auto justify-content-end">
                    <Button variant="link">
                        Forgot Password?
                    </Button>
                    <Button variant="link">
                        Sign Up
                    </Button>
                </Container>

            </Modal.Body>
            <Modal.Footer>
                <Container className="d-flex ml-auto justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Login
                    </Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}
export default Login