import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";

const StyledCard = styled(Card)({
    maxWidth: 345,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
});

const StyledCardContent = styled(CardContent)({
    paddingBottom: "16px !important",
});

const StyledCardActions = styled(CardActions)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #EEEEEE",
    paddingTop: "12px",
});

const StyledQuantityWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
});

const StyledQuantityLabel = styled(Typography)({
    marginRight: "16px",
});

const StyledQuantityButton = styled(IconButton)({
    color: "#FF8C00",
});

const StyledCloseButton = styled(IconButton)({
    position: "absolute",
    top: "8px",
    right: "8px",
    color: "#757575",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
});

const StyledProductImage = styled(CardMedia)({
    position: "relative",
    "&:hover $StyledCloseButton": {
        opacity: 1,
    },
});

const StyledPrice = styled(Typography)({
    color: "#FF8C00",
});

function CardComponent({ item }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleIncreaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const totalPrice = (item.product.price * quantity).toFixed(2);

    const handlePlaceOrder = () => {
        // Implement your place order logic here
        console.log("Placing order...");
    };

    return (
        <StyledCard>
            <StyledProductImage component="img" height="140" image={item.product.image} alt={item.product.name} />
            <StyledCloseButton>
                <CloseIcon />
            </StyledCloseButton>
            <StyledCardContent>
                <Typography gutterBottom variant="h6" component="div">{item.product.name}</Typography>
            </StyledCardContent>
            <StyledCardActions disableSpacing>
                <StyledQuantityWrapper>
                    <StyledQuantityLabel>Quantity:</StyledQuantityLabel>
                    <StyledQuantityButton size="small" onClick={handleDecreaseQuantity}><RemoveCircleIcon /></StyledQuantityButton>
                    <Typography>{quantity}</Typography>
                    <StyledQuantityButton size="small" onClick={handleIncreaseQuantity}><AddCircleIcon /></StyledQuantityButton>
                </StyledQuantityWrapper>
                <StyledPrice variant="h6">{`$${totalPrice}`}</StyledPrice>
            </StyledCardActions>
        </StyledCard>

    );
}

export default CardComponent;