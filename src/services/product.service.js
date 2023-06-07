import axios from "axios";

const route = process.env.REACT_APP_API_URL;
const getProducts = async () => {
    try {
        return (await axios.get(`${route}/product/all`)).data;
    } catch (error) {
        console.log(error);
    }
};

const getOneProduct = async (id) => {
    try {
        return (await axios.get(`${route}/product/${id}`)).data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getOneProduct,
    getProducts
};
