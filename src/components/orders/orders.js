import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
import './orders.css';

const PaymentCard = ({subTotal, taxes, total}) => {
    return (
        <Card className="payment-card">
            <CardContent className="payment-card-content">
                <div className="total-content">
                    <h3>
                        SubTotal: {subTotal}
                    </h3>
                    <h3>
                        Taxes: {taxes}
                    </h3>
                    <h3>
                        Total: {total}
                    </h3>
                </div>
                <Button variant="contained" color="primary" className="payment-card-checkout-button">
                    Checkout
                </Button>
            </CardContent>
        </Card>
    );
};

export default PaymentCard;
