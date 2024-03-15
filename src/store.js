import { reactive } from 'vue'

export const store = reactive({
    urlBackend: "http://127.0.0.1:8000",
    urlAPI: "http://127.0.0.1:8000/api",
    apiRestaurantEndpoint: "/restaurants",
    apiFoodTypeEndpoint: "/types",
    apiDishesEndpoint: "/dishes",
    apiBraintreePayment: "/payment",
    restaurantList: [],
    foodTypeList: [],
    dishList: [],
    cart: [],
    order: {},
    isDropinLoaded: false,
    clientToken: null,
    paymentProcessing: false,
    braintreeError: null,
    currentDish: null,
    currentRestaurant: null,
});
