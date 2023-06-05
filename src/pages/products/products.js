import { useRecoilState} from "recoil";
import {useEffect} from "react";
import axios from "axios";
import {productsState} from "./atoms/products-state.atom";
import Product from "../../components/products/product";
import './products.css'

const Products = () => {
    const [products, setProducts] = useRecoilState(productsState);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
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
