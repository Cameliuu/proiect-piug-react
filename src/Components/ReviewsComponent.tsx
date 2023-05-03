import Container from "react-bootstrap/Container";
import React, {useEffect} from "react";
import {Card} from "react-bootstrap";
import reviews from './reviews.json'
import Col from "react-bootstrap/Col";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import Row from "react-bootstrap/Row";
import {useInView} from "react-intersection-observer";
function ReviewsComponent()
{
    const controls = useAnimation();
    const {ref, inView} = useInView({threshold: 0.1});
    useEffect(() => {
        if (inView) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: {duration: 0.5},
            });
        } else {
            controls.start({
                y: -100,
                opacity: 0,
            });
        }
    }, [controls, inView]);
    return <>
        <Container  style={{marginTop:'10%',fontSize:'30px',height:"200vh"}}>
        <motion.div ref={ref}
                    initial={{opacity: 0, y: -100}}
                    animate={controls}
                    exit={{opacity: 0, y: -100}}
                    transition={{ type: 'spring', damping: 15, mass: 0.75, stiffness: 100 }}>
            <Container className='text-center'>
                Reviews
            </Container>
        </motion.div>
            <Container className='d-flex justify-content-center ml-auto' style={{marginTop:'2%'}}>
                <Row className="" style={{height:"100%"}}>
                    {reviews.map((element) => (


                            <AnimatePresence>
                                <motion.div
                                    ref={ref}
                                    initial={{opacity: 0, x: -100}}
                                    animate={controls}
                                    exit={{opacity: 0, x: -100}}
                                    transition={{ type: 'spring', damping: 15, mass: 0.75, stiffness: 100 }}
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}>

                                    <Card style={{marginTop:"20%",width: '100%', height: "20px", border:"none"}}>

                                        <Card.Img style={{width:'100px',height:'100px',marginLeft:element.marginLeftImg}} src={require(`../img/user.png`)}></Card.Img>
                                        <Card.Text style={{marginLeft:element.marginLeftText, marginTop:"-5%", fontFamily:'Satisfy'}} className="text-center">{element.text}</Card.Text>


                                    </Card>
                                </motion.div>
                            </AnimatePresence>

                    ))}


                </Row>
            </Container>
        </Container>
    </>
}

export default ReviewsComponent