<script>
import { store } from "../store.js"
export default {
    name: "RestaurantCard",
    props: ["item"],
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="card glass p-0">
        <div class="card-body d-flex flex-column justify-content-between align-items-center">
            <div class="card-img-container" type="button" data-bs-toggle="modal" data-bs-target="#restaurantInfo"
                @click="store.currentRestaurant = item">
                <img :src="item.img.substring(0, 4) === 'http' ? item.img : store.urlBackend + '/storage/' + item.img"
                    class="card-img-top" alt="Restaurant Image">
            </div>


            <div class="w-100 mt-2">
                <h5 class="card-title text-center restaurant-name fs-4">{{ item.name }}</h5>
            </div>


            <div class="text-center mt-3 d-flex flex-wrap justify-content-center w-100">
                <span v-for="(item, index) in item.types" :key="index" class="pill">
                    <img :src="'../src/assets/' + item.img + '.svg'" class="svg-pill">
                </span>
            </div>
            <router-link :to="{ name: 'restaurant-menu', params: { id: item.id } }" class="btn btn-warning my-3">
                <font-awesome-icon icon="fa-solid fa-utensils" class="me-2" />
                <span>Menu</span>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;


.btn {
    width: 100px;
}

.card {
    width: 416px !important;
    height: 430px !important;
    border-radius: 32px;
    border: 0;
    box-shadow: 0px 6px 10px 0px rgba(133, 133, 133, 0.5);
    overflow: hidden;
    background-color: $themeColorOrangeLight;
    color: $themeColorOrangeSidebar;

}

.card-title {
    font-weight: 900;
}

.card-img-container {
    cursor: pointer;
    border-radius: 32px 32px 0 0;
    /* overflow: hidden; */
    min-height: 0 !important;
    max-height: 60% !important;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
}

.card-body {
    padding: 0 !important;
    min-height: 30% !important;
    max-height: 100% !important;
}

.card-img-top {
    min-width: 100% !important;
    min-height: 100% !important;
    object-fit: cover;
    object-position: center;
}

.svg-pill {
    max-width: 80px;
}
</style>