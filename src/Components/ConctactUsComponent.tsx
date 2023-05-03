import Container from "react-bootstrap/Container";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ContactUsComponent() {
    return (
        <div style={{ background: "#212529", width: "100%", height: "100%" }}>
            <Container className="text-white">
                <Row className="justify-content-center align-items-center" style={{ }}>
                    <Col md={8} className="text-center">
                        <img src={require("../img/logo_bun.png")} style={{ width: "100px", height: "100px" }} />
                    </Col>
                    <Col md={8} className="text-center">
                        <h1>Contact Us</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default ContactUsComponent