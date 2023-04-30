import {Button} from "react-bootstrap";
import {useState} from "react";
import {motion} from "framer-motion";
const buttonStyle =
    {
        backgroundColor:'#FF8C00',
        color:'#ffff',
        borderColor:'#FF8C00',
        borderRadius:'10px'
    }
const buttonStyleActive=
    {
        backgroundColor:'#ffff',
        color:'#FF8C00',
        borderColor:'#ffff',
        fontSize:'px'
    }
interface Props {
    Text: string
    onClick: () => void
}
function ButtonComponents(props: Props) {

    return (

        <motion.button whileHover={{ scale: 1.1,backgroundColor:'#ffff',
            color:'#FF8C00',
            borderColor:'#ffff' }}
                       whileTap={{ scale: 0.9 }} style={buttonStyle}
                //onMouseOver={() => {setButtonStyle(buttonStyleActive)}}
                //onMouseOut={() => {setButtonStyle(buttonStyle)}}
                onClick={props.onClick}
        >
            {props.Text}</motion.button>
    );
}



export default ButtonComponents