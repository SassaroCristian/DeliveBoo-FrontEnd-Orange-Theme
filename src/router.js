import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue'
import RestaurantList from './pages/RestaurantList.vue';
import Cart from './pages/Cart.vue';
import FoodTypeList from './pages/FoodTypeList.vue';
import UserPage from "./pages/UserPage.vue";
import RestaurantMenu from "./pages/RestaurantMenu.vue";
import CredentialsPage from "./pages/CredentialsPage.vue";
import PaymentPage from "./pages/PaymentPage.vue";
import ConfirmedPayment from "./pages/ConfirmedPayment.vue";
import RejectedPayment from "./pages/RejectedPayment.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: "/restaurants",
            name: "restaurants",
            component: RestaurantList,
        },
        {
            path: "/restaurants/:id",
            name: "restaurant-menu",
            component: RestaurantMenu,
            props: true,
        },
        {
            path: "/types",
            name: "types",
            component: FoodTypeList,
        },
        {
            path: '/user',
            name: 'user',
            component: UserPage,
        },
        {
            path: "/cart",
            name: "cart",
            component: Cart
        },
        {
            path: "/credentials",
            name: "credentials",
            component: CredentialsPage
        },
        {
            path: "/payment",
            name: "payment",
            component: PaymentPage,
        },
        {
            path: "/confirmed",
            name: "confirmed",
            component: ConfirmedPayment,
        },
        {
            path: "/rejected",
            name: "rejected",
            component: RejectedPayment,
        }
        // {
        //     path: "/event/:id",
        //     name: "event-detail",
        //     component: EventDetail,
        //     props: true,
        // },
    ],
});

export { router };
