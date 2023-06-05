import { useRecoilState } from "recoil";
import {useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router";
import {productsState} from "../products/atoms/products-state.atom";
import ProductDetail from "../../components/common/product-detail-component/product-detail.component";

const ProductDetails = () => {
    const [product, setProduct] = useRecoilState(productsState);


    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductDetail product={product}></ProductDetail>
    );
}

export default ProductDetails;
