import Container from "react-bootstrap/Container";
import {useEffect} from "react";
import {AnimatePresence, motion, useAnimation, useScroll} from 'framer-motion'
import {Card} from "react-bootstrap";
import {useInView} from 'react-intersection-observer';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import j from './about.json'
import ButtonComponent from "./ButtonComponent";

interface Data {
    Title: string,
    Text: string
}

function AboutsComponent() {
    const controls = useAnimation();
    const {ref, inView} = useInView({threshold: 0.1});
    useEffect(() => {
        if (inView) {
            controls.start({
                x: 0,
                opacity: 1,
                transition: {duration: 0.5},
            });
        } else {
            controls.start({
                x: -100,
                opacity: 0,
            });
        }
    }, [controls, inView]);

    return (
        <>
            <div style={{backgroundColor: 'black', height: '75vh'}}>
                <Container style={{marginTop: '2%'}}>
                    <Container className='text-center' style={{paddingTop: '3%', fontSize: '30px', color: '#ffff'}}>
                        About Us
                    </Container>
                    <Row className="d-flex justify-content-between ml-auto">
                        {j.map((element) => (

                            <Col key={element.id} sm={12} md={6} lg={4} xl={3} style={{paddingTop: '10%'}}>
                                <AnimatePresence>
                                    <motion.div
                                        ref={ref}
                                        initial={{opacity: 0, x: -100}}
                                        animate={controls}
                                        exit={{opacity: 0, x: -100}}
                                        transition={{ type: 'spring', damping: 15, mass: 0.75, stiffness: 100 }}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}>

                                        <Card style={{width: '100%', height: "300px"}}>

                                            <Card.Title className="text-center">{element.title}</Card.Title>
                                            <Card.Text className="text-center">{element.text}</Card.Text>


                                        </Card>
                                    </motion.div>
                                </AnimatePresence>
                            </Col>

                        ))}


                    </Row>
                </Container>
            </div>
        </>
    );
}

export default AboutsComponent;
