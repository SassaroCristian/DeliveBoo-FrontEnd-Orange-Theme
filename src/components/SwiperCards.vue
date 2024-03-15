<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { store } from "../store.js"

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [EffectCards],
        };
    },
    data() {
        return {
            store,
        }
    },

};
</script>

<template>
    <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper">
        <swiper-slide v-for="restaurant in store.restaurantList" :key="restaurant">
            <div class="card d-flex flex-column align-items-center justify-content-end h-100">
                <div class="card-img-top overflow-hidden">
                    <img :src="restaurant.img.substring(0, 4) == 'http' ? restaurant.img : store.urlBackend + '/storage/' + restaurant.img"
                        :alt="restaurant.name">
                </div>
                <div class="card-body w-100 d-flex flex-column justify-content-between align-items-center">
                    <div class="">
                        <h2 class="text-center">{{ restaurant.name }}</h2>

                    </div>

                    <div>
                        <p id="card-description" class="text-center">{{ restaurant.description.slice(0, 100) + "..." }}
                        </p>
                    </div>

                    <div class="container w-100">
                        <div class="row">

                            <div class="col-6">
                                <div class="d-flex">
                                    <router-link :to="{ name: 'restaurant-menu', params: { id: restaurant.id } }"
                                        class="btn btn-primary"><font-awesome-icon icon="fa-solid fa-utensils"
                                            class="me-1" /><span> Menù</span></router-link>


                                </div>
                            </div>
                            <div id="type-img-container"
                                class="col-6 d-flex justify-content-center align-items-center ms-5">
                                <img v-for="type in restaurant.types" :key="type"
                                    :src="'../src/assets/' + type.img + '.svg'" :alt="type.name" class="w-100">
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </swiper-slide>

    </swiper>
</template>

<style scoped>
h2 {
    color: #393939;
}

#card-description {
    font-size: 14px;
    color: #393939;

}

#type-img-container {
    max-width: 80px;
    max-height: 40px;
}

.overflow-hidden {
    overflow: hidden;
}

@media screen and (max-width: 1024px) {
    .swiper {
        width: 300px !important;
        height: 350px !important;
    }
}

.swiper {
    max-width: 400px !important;
    max-height: 450px !important;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #ffac4b;
    background-color: #393939;
}

.card {
    color: #ffac4b;
    background-color: #FDEBC9;
}

.card-img-top {
    min-height: 200px;
    overflow: hidden !important;
}

.card-img-top img {
    min-width: 100% !important;
    max-height: 100% !important;
}

/* .swiper-slide:nth-child(1n) {
    background-color: rgb(206, 17, 17);
}

.swiper-slide:nth-child(2n) {
    background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
    background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
    background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
    background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
    background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
    background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
    background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
    background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
    background-color: rgb(54, 94, 77); 
} */
</style>