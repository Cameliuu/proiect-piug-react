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
        const controls2 = useAnimation();
        const {ref, inView} = useInView({threshold: 0.1});
        useEffect(() => {
            if (inView) {
                controls2.start({
                    x: 0,
                    opacity: 1,
                    transition: {duration: 0.5},
                });
                controls.start({
                    x: 0,
                    opacity: 1,
                    transition: {duration: 0.5},
                });
            } else {
                controls2.start({
                    x: 100,
                    opacity: 0,
                });
                controls.start({
                    x: -100,
                    opacity: 0,
                });
            }
        }, [controls, inView]);

        return (
            <>
                <div style={{backgroundColor: 'black', fontFamily:'Inconsolata'}}>
                    <Container style={{marginTop: '2%'}}>
                        <motion.div ref={ref}
                                    initial={{opacity: 0, x: 100}}
                                    animate={controls2}
                                    exit={{opacity: 0, x: 100}}>


                        <Container className='text-center' style={{paddingTop: '3%', fontSize: '30px', color: '#ffff', fontWeight:'bold'}}>
                            About Us
                        </Container>
                        </motion.div>
                        <Row className="d-flex justify-content-between ml-auto">
                            {j.map((element) => (

                                <Col className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={element.id} sm={12} md={6} lg={4} xl={3} style={{paddingTop: '2%'}}>
                                    <AnimatePresence>
                                        <motion.div
                                            ref={ref}
                                            initial={{opacity: 0, x: -100}}
                                            animate={controls}
                                            exit={{opacity: 0, x: -100}}
                                            transition={{ type: 'spring', damping: 15, mass: 0.75, stiffness: 100 }}
                                            whileHover={{scale: 1.1}}
                                            >

                                            <Card style={{width: '100%', height: "300px", backgroundSize:'100% 303px',backgroundColor:'rgba(52, 52, 52, 0.1    )'}}>

                                                <Card.Title style={{marginBottom:"15%"}} className="text-center text-white">{element.title}</Card.Title>
                                                <Card.Text className="text-center text-white">{element.text}</Card.Text>


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
