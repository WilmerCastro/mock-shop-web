import Product from "../../components/products/product";
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import {ordersState, totalToPayState} from "./atoms/orders-state.atom";
import './orders.css'
import PaymentCard from "../../components/orders/orders";
import {authStateAtom} from "../login/atoms/auth-state.atom";
import {getOrdersByUser} from "../../services/order.service";

const Orders = () => {
    const [order, setOrder] = useRecoilState(ordersState);
    const [totalToPay, setTotalToPay] = useRecoilState(totalToPayState);
    const [user] = useRecoilState(authStateAtom);

    useEffect(() => {
        calculateTotalToPay(order);
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getOrdersByUser(user?._id);
            setOrder(response.data);
            calculateTotalToPay(response.data);


        } catch (error) {
            console.log(error);
        }
    };

    const calculateTotalToPay = (order) => {
        let subTotal = order?.subTotal;
        let interest = order?.interest;
        let totalValue = order?.totalValue;

        setTotalToPay({
            subTotal,
            interest,
            total: totalValue
        });
    };

    return (
        <div>
            <h1>My Order</h1>
            <div className="container">
                <div className="orders-container">
                    {order?.productList?.map((product) => (
                        <Product key={product.id} product={product} showAddToCart={false} />
                    ))}
                </div>
                <div className="payment-container">
                    <PaymentCard subTotal={totalToPay.subTotal} taxes={totalToPay.interest} total={totalToPay.total}/>
                </div>
            </div>
        </div>
    );
}

export default Orders;
