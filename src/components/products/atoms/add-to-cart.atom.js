import {atom} from "recoil";

export const addToCartState = atom({
    key: "addToCart",
    default: 0,
});

export const addToCartMessageState = atom({
    key: "addToCartMessage",
    default: null,
});
