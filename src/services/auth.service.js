import axios from "axios";

const route = process.env.REACT_APP_API_URL;
const login = async ({username, password}) => {
    try {
        const response = (await axios.post(`${route}/login`, {username, password})).data;
        localStorage.setItem('token',  JSON.stringify(response.token));

        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
    }
};

export {
    login
};
