import {Card} from "react-bootstrap";
import React from "react";
interface  Props{
    marginImg: string,
    maringCard: string,
    text: string,
    image: string
}
function ReviewsList(props: Props)
{
    return(
      <>
          <Card style={{marginTop:"35%",width: '100%', height: "20px", border:"none"}}>

              <Card.Img style={{width:'100px',height:'100px',marginLeft:props.marginImg}} src={require("../img/user.png")}></Card.Img>
              <Card.Text style={{marginLeft:props.maringCard, marginTop:"-5%"}} className="text-center">{element.text}</Card.Text>


          </Card>
      </>
    );
}
export default ReviewsList