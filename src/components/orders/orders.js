import React from 'react';
import {Card, CardContent, Button, Stack, Snackbar, Alert} from '@mui/material';
import './orders.css';
import {useRecoilState} from "recoil";
import {authStateAtom} from "../../pages/login/atoms/auth-state.atom";
import {ordersState} from "../../pages/orders/atoms/orders-state.atom";
import {completeOrder} from "../../services/order.service";
import {addToCartMessageState, addToCartState} from "../products/atoms/add-to-cart.atom";
import {useNavigate} from "react-router-dom";

const PaymentCard = ({subTotal, taxes, total}) => {

    const [user] = useRecoilState(authStateAtom);
    const [order, setOrder] = useRecoilState(ordersState);
    const [cart, setCart] = useRecoilState(addToCartState);

    const [addToCartMessage, setAddToCartMessage] = useRecoilState(addToCartMessageState);
    const [openCartSnackBar, setOpenCartSnackBar] = React.useState(false);
    const [typeCartSnackBar, setTypeCartSnackBar] = React.useState('success');

    const navigate = useNavigate();

    const checkoutOrder = async () => {
        const response = await completeOrder(user._id);

        if (!response?.message) {
            manageSnackbar('Error in checkout', 'error')
            return;
        }

        manageSnackbar('Successfully purchased items!', 'success')
        setOrder({});
        setCart(0);

    }

    const manageSnackbar = (message, type) => {
        setAddToCartMessage(message);
        setOpenCartSnackBar(true)
        setTypeCartSnackBar(type)
    }
    const handleSnackbarClose = (event, reason) => {
        navigate(`/`)
        if (reason === 'clickaway') {
            return;
        }
        setOpenCartSnackBar(false);
    };


    return (
        <Card className="payment-card">
            <CardContent className="payment-card-content">
                <div className="total-content">
                    <h3>
                        SubTotal: {subTotal?.toFixed(2)}
                    </h3>
                    <h3>
                        Taxes: {taxes?.toFixed(2)}
                    </h3>
                    <h3>
                        Total: {total?.toFixed(2)}
                    </h3>
                </div>
                <Button onClick={checkoutOrder} variant="contained" color="primary" className="payment-card-checkout-button">
                    Checkout
                </Button>
            </CardContent>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }} key={'top' + 'center'} open={openCartSnackBar} autoHideDuration={2000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={typeCartSnackBar} sx={{ width: '100%' }}>
                        {addToCartMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </Card>
    );
};

export default PaymentCard;
