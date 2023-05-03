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
    const {ref, inView} = useInView({threshold: 0.5});
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
                                    >

                                    <Card style={{marginLeft:"35%",marginTop:"10%",width: '565px', height: "113px", background:'#D9D9D9', border:'none', borderRadius:'25px',boxShadow:'0px 4px 6px 0px #00000040'
                                    }}>

                                        <Container className='d-flex justify-content-between'>
                                            <Container style={{marginLeft:'40px'}}>
                                                <Card.Img style={{width:'58px',height:'58px'  }} src={require(`../img/user.png`)}>

                                                </Card.Img>

                                                <img src={require('../img/star.png')} style={{width:'100px', marginLeft:"5px",marginTop:'-5%'}} />
                                                <p style={{fontSize:'10px', marginLeft:'70px',marginTop:'-10%'}}> 16/08/2023 via Facebook</p>
                                                <Card.Text style={{fontFamily:'Roboto', fontSyle:'normal', fontWeight:'300', fontSize:'23px', marginTop:'5%'}} className="  ">{element.text}</Card.Text>
                                            </Container>



                                            <div>
                                                <img src={require('../img/fb.png')} />
                                            </div>

                                        </Container>

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