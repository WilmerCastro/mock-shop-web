import { useRecoilState} from "recoil";
import {useEffect} from "react";
import axios from "axios";
import {productsState} from "./atoms/products-state.atom";
import Product from "../../components/products/product";
import './products.css'
import {getProducts} from "../../services/product.service";
import {getOrdersByUser} from "../../services/order.service";
import {ordersState} from "../orders/atoms/orders-state.atom";
import {authStateAtom} from "../login/atoms/auth-state.atom";

const Products = () => {
    const [products, setProducts] = useRecoilState(productsState);
    const [order, setOrder] = useRecoilState(ordersState);
    const [user] = useRecoilState(authStateAtom);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
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

    return (
        <div>
            <h1>All Products</h1>
            <div className="products-container">
                {products?.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
