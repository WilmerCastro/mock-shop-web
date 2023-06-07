import { useRecoilState } from "recoil";
import {useEffect} from "react";
import {useParams} from "react-router";
import ProductDetail from "../../components/common/product-detail-component/product-detail.component";
import {productDetailState} from "./atoms/product-state.atom";
import {getOneProduct} from "../../services/product.service";

const ProductDetails = () => {
    const [product, setProduct] = useRecoilState(productDetailState);

    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await getOneProduct(id);
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
