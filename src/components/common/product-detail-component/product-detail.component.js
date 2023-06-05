import './product-detail.css';
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "../card";
import {useRecoilState} from "recoil";
import {addToCartDetails} from "./atoms/add-to-card.atom";

const ProductDetail = ({ product }) => {
    const [cart, setCart] = useRecoilState(addToCartDetails);

    if (!product) {
        return null; // Return null or handle the case when product is null
    }


    const { id, title, price, image, description, rating, category } = product;


    const handleAddToCart = () => {
        setCart((prevCart) => [...prevCart, { id }]);
    };

    return (
        <Card>
            <div className="product-details-container">
                <div className="product-image-container">
                    <img src={image} alt={title} className="product-image" />
                </div>
                <div className="product-info-container">
                    <h3 className="product-detail-name">{title}</h3>
                    <p className="product-detail-category">Category: {category}</p>
                    <Rating name="read-only" value={rating?.rate} readOnly />
                    <p className="product-price">${price?.toFixed(2)}</p>
                    <p className="product-description">{description}</p>
                    <Button variant="outlined" onClick={handleAddToCart}>Add to Cart</Button>
                </div>
            </div>
        </Card>
    );
}

export default ProductDetail;
