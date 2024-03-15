<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { store } from '../store';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Autoplay } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [FreeMode, Autoplay],
        };
    },
    data() {
        return {
            store
        }
    }
};
</script>

<template>

    <swiper :centeredSlides="false" :loop="true" :speed="3000" :autoplay="{ delay: 0, disableOnInteraction: false }"
        slidesPerView="auto" :spaceBetween="30" :modules="modules" class="mySwiper">
        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/burgers.svg'" alt="burgers">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/chinese.svg'" alt="chinese">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/dessert.svg'" alt="dessert">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/fast_food.svg'" alt="fast food">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/fish.svg'" alt="fish">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/gluten_free.svg'" alt="gluten_free">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/ice_cream.svg'" alt="ice cream">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/italian.svg'" alt="italian">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/kebab.svg'" alt="kebab">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/meat.svg'" alt="meat">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/mexican.svg'" alt="mexican">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/pizza.svg'" alt="pizza">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/sushi.svg'" alt="sushi">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/vegan.svg'" alt="vegan">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card-img-top overflow-hidden">
                <img :src="'../src/assets/vegetarian.svg'" alt="vegetarian">
            </div>
        </swiper-slide>


    </swiper>
</template>

<style scoped>
.swiper {
    transition-timing-function: linear !important;
}

.swiper {
    width: 100% !important;
    height: 230px !important;
}

.swiper-slide {
    width: 230px !important;
    text-align: center;
    font-size: 18px;
    border-radius: 18px;
    background: #FDEBC9;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>