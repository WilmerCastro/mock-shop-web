import {useRecoilState} from "recoil";
import {addToCart} from "./atoms/add-to-cart.atom";
import './product.css'
import Card from "../common/card";
import {Rating} from "@mui/material";
import Button from "@mui/material/Button";
import {sentenceCutterHelper} from "../../shared/helpers/sentence-cutter.helper";
import {useNavigate} from "react-router-dom";

const Product = ({product}) => {
    const [cart, setCart] = useRecoilState(addToCart);
    const navigate = useNavigate();

    if (!product) {
        return null; // Return null or handle the case when product is null
    }


    const handleClick = () => {
        // Navigate to a specific route
        navigate(`/product/${id}`);
    };

    const { id, title, price, image, rating, category } = product;

    const handleAddToCart = () => {
        setCart((prevCart) => [...prevCart, { id, title, price }]);
    };

    return (
        <Card>
            <div className="product" sx={{ maxWidth: 275, maxHeight: 300 }}>
                <div className="image-container" onClick={handleClick}>
                    <img src={image}  alt={title} className="product-image" />
                </div>
                <div className="product-details">
                    <h3 className="product-name" onClick={handleClick}>{sentenceCutterHelper(title, 45)}</h3>
                    <p className="product-category">Category: {category}</p>
                    <Rating name="read-only" value={rating.rate} readOnly />
                    <p className="product-price">${price?.toFixed(2)}</p>
                </div>
                <Button variant="outlined" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
        </Card>
    );
}

export default Product
