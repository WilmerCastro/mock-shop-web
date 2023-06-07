import axios from "axios";

const route = process.env.REACT_APP_API_URL;
const addToCart = async ({productList, user, orderId}) => {
    try {
        return (await axios.post(`${route}/order`, {productList, user, orderId})).data;
    } catch (error) {
        console.log(error);
    }
};

const getOrdersByUser = async (user) => {
    try {
        return (await axios.get(`${route}/order/user/${user}`)).data;
    } catch (error) {
        console.log(error);
    }
};

const completeOrder = async (user) => {
    try {
        return (await axios.patch(`${route}/order/complete/${user}`)).data;
    } catch (error) {
        console.log(error);
    }
};

export {
    addToCart,
    getOrdersByUser,
    completeOrder
};
