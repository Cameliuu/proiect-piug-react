import ModalComponent from "./ModalComponent.tsx";
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function SliderCaption(props: Props) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const variants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={variants}
                style={{ display: 'flex', alignItems: 'center', width: '50%', marginLeft: '25%', paddingTop: '9%' }}
            >
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    exit={{ scaleX: 0 }}
                    style={{ flex: 1, backgroundColor: '#ffff', height: '4px' }}
                />
                <motion.h5
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    exit={{ opacity: 0 }}
                    style={headerScris}
                >
                    YOUR HUNGER'S BEST FRIEND
                </motion.h5>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    exit={{ scaleX: 0 }}
                    style={{ flex: 1, backgroundColor: '#ffff', height: '4px' }}
                />
            </motion.div>
            <motion.p
                initial="hidden"
                animate={controls}
                variants={variants}
                style={parScsris}
            >
                {props.Caption}
            </motion.p>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={variants}
            >
                <ModalComponent></ModalComponent>
            </motion.div>
        </>
    );
}

const headerScris =
    {
        fontFamily: 'Bebas-Neue'
    }
const parScsris =
    {
        fontFamily: "Roboto",
        fontSize: '65px',
        fontWeight:'bold'
    }

interface Props {
    Caption: string[];
}

export default SliderCaption