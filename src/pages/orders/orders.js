import Product from "../../components/products/product";
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import axios from "axios";
import {ordersState} from "./atoms/orders-state.atom";
import './orders.css'
import PaymentCard from "../../components/orders/orders";

const Orders = () => {
    const [order, setOrder] = useRecoilState(ordersState);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setOrder(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>My Order</h1>
            <div className="container">
                <div className="orders-container">
                    {order.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
                <div className="payment-container">
                    <PaymentCard cardholderName={"test"} cardNumber={"test"} expirationDate={"test"}/>
                </div>
            </div>
        </div>
    );
}

export default Orders;
