import './product-detail.css';
import {Alert, Rating, Snackbar, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "../card";
import {useRecoilState} from "recoil";
import {addToCartDetails} from "./atoms/add-to-card.atom";
import {addToCart, getOrdersByUser} from "../../../services/order.service";
import {authStateAtom} from "../../../pages/login/atoms/auth-state.atom";
import {useNavigate} from "react-router-dom";
import {ordersState} from "../../../pages/orders/atoms/orders-state.atom";
import * as React from "react";
import {addToCartMessageState} from "../../products/atoms/add-to-cart.atom";

const ProductDetail = ({ product }) => {
    const [cart, setCart] = useRecoilState(addToCartDetails);
    const [user] = useRecoilState(authStateAtom);
    const [order] = useRecoilState(ordersState);

    // snackbar
    const [addToCartMessage, setAddToCartMessage] = useRecoilState(addToCartMessageState);
    const [openCartSnackBar, setOpenCartSnackBar] = React.useState(false);
    const [typeCartSnackBar, setTypeCartSnackBar] = React.useState('success');


    const navigate = useNavigate();

    if (!product) {
        return null; // Return null or handle the case when product is null
    }


    const { id, title, price, image, description, rating, category } = product;


    const handleAddToCart = async () => {

        if (!user) {
            navigate('/login');
        }
        const response = await addToCart({
            productList: [product],
            user: user?._id,
            orderId: order._id,
        });

        if (!response?.message) {
            manageSnackbar('Error adding order to cart', 'error')
            return;
        }

        manageSnackbar('Item added to cart!', 'success')
        navigate('/');

        const userOrder = await getOrdersByUser(user?._id);

        if (userOrder) {
            setCart(userOrder.data.productList.length);
            // setOrders(orders.data);
        }
    };

    const manageSnackbar = (message, type) => {
        setAddToCartMessage(message);
        setOpenCartSnackBar(true)
        setTypeCartSnackBar(type)
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCartSnackBar(false);
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

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }} key={'top' + 'center'} open={openCartSnackBar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={typeCartSnackBar} sx={{ width: '100%' }}>
                        {addToCartMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </Card>
    );
}

export default ProductDetail;
