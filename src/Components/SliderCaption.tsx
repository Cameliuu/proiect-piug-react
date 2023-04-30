function SliderCaption(props: Props) {
    return (
        <>
            <div style={{display: "flex", alignItems: "center", width: "50%", marginLeft: "25%", paddingTop:"9%"}}>
                <div style={{flex: 1, backgroundColor: "#ffff", height: "4px"}}/>

                <h5 style={headerScris}>YOUR HUNGER'S BEST FRIEND</h5>
                <div style={{flex: 1, backgroundColor: "#ffff", height: "4px"}}/>
            </div>
            <p style={parScsris}>{props.Caption}</p>
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