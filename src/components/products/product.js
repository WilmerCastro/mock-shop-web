import {useRecoilState} from "recoil";
import { addToCartMessageState, addToCartState} from "./atoms/add-to-cart.atom";
import './product.css'
import Card from "../common/card";
import {Alert, Rating, Snackbar, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {sentenceCutterHelper} from "../../shared/helpers/sentence-cutter.helper";
import {useNavigate} from "react-router-dom";
import {addToCart, getOrdersByUser} from '../../services/order.service'
import {authStateAtom} from "../../pages/login/atoms/auth-state.atom";
import * as React from "react";
import {ordersState} from "../../pages/orders/atoms/orders-state.atom";

const Product = ({product, showAddToCart = true}) => {

    const [cart, setCart] = useRecoilState(addToCartState);
    const [order, setOrder] = useRecoilState(ordersState);
    const [addToCartMessage, setAddToCartMessage] = useRecoilState(addToCartMessageState);

    const [user] = useRecoilState(authStateAtom);

    // snackbar
    const [openCartSnackBar, setOpenCartSnackBar] = React.useState(false);
    const [typeCartSnackBar, setTypeCartSnackBar] = React.useState('success');

    const navigate = useNavigate();

    if (!product) {
        return null; // Return null or handle the case when product is null
    }


    const handleClick = () => {
        // Navigate to a specific route
        navigate(`/product/${id}`);
    };

    const { id, title, price, image, rating, category } = product;

    const handleAddToCart = async () => {

        if (!user) {
            navigate('/login');
        }
        await fetchOrders()
        const response = await addToCart({
            productList: [product],
            user: user?._id,
            orderId: order?._id,
        });

        if (!response?.message) {
            manageSnackbar('Error adding order to cart', 'error')
            return;
        }

        manageSnackbar('Item added to cart!', 'success')

        const userOrder = await getOrdersByUser(user?._id);

        if (userOrder) {
            setCart(userOrder.data.productList.length);
            setOrder(order?.data);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await getOrdersByUser(user?._id);
            setOrder(response.data);

        } catch (error) {
            console.log(error);
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
                {
                    showAddToCart &&
                    <Button variant="outlined" onClick={handleAddToCart}>Add to Cart</Button>
                }

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

export default Product
