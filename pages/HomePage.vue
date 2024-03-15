<script>
import { store } from '../store';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCards from '../components/SwiperCards.vue';
import SwiperTypes from '../components/SwiperTypes.vue';


// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
        SwiperCards,
        SwiperTypes
    },
    setup() {
        return {
            modules: [EffectFade, Autoplay],
        };
    },
    data() {
        return {
            store
        }
    },

    methods: {
        getImagePath(image) {
            return new URL(`../assets/${image}`, import.meta.url).href
        }
    }
};
</script>

<template>
    <div id="home-page">

        <div class="jumbo">

            <swiper :autoplay="{
                delay: 4000,
                disableOnInteraction: true,
            }" :style="{ height: '100%' }" :spaceBetween="30" :effect="'fade'" :navigation="false" :pagination="{
                clickable: true,
            }" :modules="modules" class="mySwiper">
                <swiper-slide>
                    <img class="img-fluid h-100" :src="getImagePath('jumbotron1.png')" />
                    <div class="swiper-content h-100">
                        <div class="container h-100">
                            <div class="row align-items-center h-100 justify-content-center">
                                <div id="jumbotron1-title-container"
                                    class="glass d-flex align-items-center justify-content-center flex-column">
                                    <div id="jumbo-logo">

                                        <img class="image-fluid w-100" src="../assets/logo.svg" alt="">
                                    </div>
                                    <h1 id="jumbotron1-title" class="text-center">DeliveBoo</h1>
                                    <h1 class="text-center">La tua città a domicilio.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <img class="img-fluid h-100" :src="getImagePath('jumbotron2.png')" />
                    <div class="swiper-content h-100 p-3 p-md-5">
                        <div class="container-fluid h-100">
                            <div class="row align-items-center h-100 justify-content-start">
                                <div id="jumbotron2-title-container"
                                    class="glass d-flex align-items-center justify-content-center flex-column p-5">
                                    <h1 id="jumbotron2-title" class="text-center">I nostri ristoranti</h1>
                                    <h5 class="text-center">Scegli i tuoi piatti preferiti in pochi minuti presso i
                                        migliori ristoranti della tua città.</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <img class="img-fluid h-100" :src="getImagePath('jumbotron3.png')" />
                    <div class="swiper-content h-100 p-3 p-md-5">
                        <div class="container-fluid h-100">
                            <div class="row align-items-center h-100 justify-content-end">
                                <div id="jumbotron3-title-container"
                                    class="glass d-flex align-items-center justify-content-center flex-column p-5">
                                    <h1 id="jumbotron3-title" class="text-center">Scegli la tua categoria preferita</h1>
                                    <h5 class="text-center mt-3">Non conosci i ristoranti della tua zona? Con DeliveBoo
                                        puoi
                                        cercare direttamente la categoria di cibo che ti interessa!</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <img class="img-fluid h-100" :src="getImagePath('jumbotron4.png')" />
                    <div class="swiper-content h-100 p-3 p-md-5">
                        <div class="container-fluid h-100">
                            <div class="row align-items-center h-100 justify-content-end">
                                <div id="jumbotron3-title-container" class=" text-center text-lg-end">
                                    <h1 style="color: #006a64; " class="jumbotron4-title">Hai un'attività?</h1>
                                    <span style="color: #006a64; " class="jumbotron4-title">Registrala ora
                                        su </span>
                                    <div class=" d-flex justify-content-end align-items-center">
                                        <div id="jumbo-logo" class="me-2">
                                            <img class="image-fluid w-100" src="../assets/logo2.svg" alt="">
                                        </div>
                                        <span id="jumbotron4-title-DeliveBoo">DeliveBoo</span>
                                        <span id="jumbotron4-title-admin">admin</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <div id="jumbo-spacer"></div>

        <div class="wave-container w-100">
            <svg data-name="Layer 1" viewBox="0 0 1200 120" transform="rotate(180)" class="wave blue transparent"
                preserveAspectRatio="none">
                <path id="wave-last"
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25" class="shape-fill position-relative" fill="#ffac4b" fill-opacity="1">
                </path>
                <path id="wave-middle"
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    opacity=".5" class="shape-fill position-relative" fill="#ffac4b" fill-opacity="1">
                </path>
                <path id="wave-first"
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    class="shape-fill position-relative" fill="#ffac4b" fill-opacity="1"></path>
            </svg>
        </div>
        <section class="py-5">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-12 mb-3 col-lg-6">
                        <SwiperCards />
                    </div>
                    <div class="col-12 mb-3 col-lg-6 text-center text-lg-start">
                        <h1 class="my-5 fw-bold">Sfoglia la nostra lista di ristoranti.</h1>
                        <p>
                            Con DeliveBoo, la tua cena a domicilio è a portata di click! La nostra piattaforma offre
                            un'ampia gamma di ristoranti convenzionati a Latina, per soddisfare ogni tuo gusto e
                            desiderio.
                            <br>
                            <br>

                            Cucina italiana, etnica, fast food, vegetariana e vegana: su DeliveBoo trovi ristoranti per
                            tutti i palati. Che tu abbia voglia di una pizza fragrante, di un succulento hamburger o di
                            un piatto esotico, DeliveBoo ha la soluzione giusta per te.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5">
            <div class="wave-container">

                <svg data-name="Layer 1" viewBox="0 0 1200 120" transform="rotate(180)" class="wave cyan transparent"
                    preserveAspectRatio="none">
                    <path id="wave-last"
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25" class="shape-fill position-relative" fill="#393939" fill-opacity="1">
                    </path>
                    <path id="wave-middle"
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5" class="shape-fill position-relative" fill="#393939" fill-opacity="1">
                    </path>
                    <path id="wave-first"
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        class="shape-fill position-relative" fill="#393939" fill-opacity="1"></path>
                </svg>
            </div>
            <div class="color-cyan">
                <div class="container py-5">
                    <div class="row">
                        <h1 style="color: #ffac4b;" class="text-center fw-bold my-5">Cerca i tuoi cibi preferiti.</h1>
                    </div>

                    <div class="row">
                        <SwiperTypes />
                    </div>

                </div>
            </div>
            <div class="wave-container">

                <svg data-name="Layer 1" viewBox="0 0 1200 120" class="wave cyan transparent upside-down"
                    preserveAspectRatio="none">
                    <path id="wave-last"
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25" class="shape-fill position-relative" fill="#393939" fill-opacity="1">
                    </path>
                    <path id="wave-middle"
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5" class="shape-fill position-relative" fill="#393939" fill-opacity="1">
                    </path>
                    <path id="wave-first"
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        class="shape-fill position-relative" fill="#393939" fill-opacity="1"></path>
                </svg>
            </div>
        </section>

        <section class="py-5">
            <div class="container admin-home">
                <div class="row justify-content-center">
                    <div
                        class="col-12 mb-3 col-md-6 d-md-block d-flex flex-column justify-content-center align-items-center">
                        <div class="text-center text-md-start">

                            <h1 class="fw-bold">Sei un ristoratore? Prova ora: </h1>
                            <div class="d-flex justify-content-start align-items-center">
                                <div id="jumbo-logo" class="me-2">
                                    <img class="w-100" src="../assets/logo2.svg" alt="">
                                </div>
                                <span id="section-title-DeliveBoo">DeliveBoo</span>
                                <span id="section-title-admin">admin</span>

                            </div>
                            <p style="color: #9df2e9 ;" class="mt-5">DeliveBoo Admin è l'app completa per la gestione
                                del tuo ristorante.
                                Dalle
                                ordinazioni agli
                                incassi, dai menu alle statistiche, avrai tutto sotto controllo in un'unica app,
                                sempre
                                a
                                portata di mano.</p>
                        </div>

                        <div class="mb-3">
                            <a :href="store.urlBackend" class="btn btn-primary mt-4 p-3 px-5 fw-bold fs-5">
                                <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="me-2" />
                                Vai al sito
                            </a>
                        </div>

                    </div>
                    <div class="col-12 mb-3 col-md-auto">
                        <div class="img-container">
                            <img class="w-100 img-fluid" :src="'../src/assets/backEnd.png'" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="container">
                <p class="text-center">Made with &hearts; by</p>
                <div class="row gap-4 flex-column ">
                    <div class="d-flex m-4">
                        <div class="col">
                            <a class="github-profile" href="https://github.com/ChiaraRuggi">
                                <img class="rounded-circle avatar" src="https://github.com/ChiaraRuggi.png"
                                    alt="Chiara Ruggi avatar">
                                <span class="ms-3">Chiara Ruggi</span>
                            </a>
                        </div>
                        <div class="col">
                            <a class="github-profile" href="https://github.com/SassaroCristian">
                                <img class="rounded-circle avatar" src="https://github.com/SassaroCristian.png"
                                    alt="Sassaro Cristian avatar">
                                <span class="ms-3">Cristian Sassaro</span>
                            </a>
                        </div>
                        <div class="col">
                            <a class="github-profile" href="https://github.com/Francesco-Rapetti">
                                <img class="rounded-circle avatar" src="https://github.com/Francesco-Rapetti.png"
                                    alt="Francesco Rapetti avatar">
                                <span class="ms-3">Francesco Rapetti</span>
                            </a>
                        </div>
                        <div class="col">
                            <a class="github-profile" href="https://github.com/PinoGabriel">
                                <img class="rounded-circle avatar" src="https://github.com/PinoGabriel.png"
                                    alt="Gabriel Pino avatar">
                                <span class="ms-3">Gabriel Pino</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    </div>
</template>

<style scoped>
.admin-home {
    background-color: #393939;
    border-radius: 2%;
}

.img-container {
    overflow: hidden;
    border-radius: 16px;
    max-width: 600px;
}

#jumbotron1-title {
    font-size: 10rem;
    font-weight: 900;
}

#jumbotron1-title-container {
    width: 800px;
    height: 800px;
    border-radius: 50% !important;
    /* background: rgba(255, 255, 255, 0);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); */
}

#jumbotron2-title {
    font-size: 6rem;
    font-weight: 900;
}

#jumbotron2-title-container {
    width: 800px;
    height: 400px;
    border-radius: 32px !important;
}

#jumbotron3-title {
    font-size: 6rem;
    font-weight: 900;
}

#jumbotron3-title-container {
    max-width: 1200px;
    /* height: 400px; */
    border-radius: 32px !important;
}

.jumbotron4-title {
    font-size: 6rem;
    font-weight: 900;
    color: #ffac4b;
}

#jumbotron4-title-DeliveBoo {
    color: #9df2e9;
    font-size: 6rem;
    font-weight: 900;
}

#jumbotron4-title-admin {
    font-size: 4rem;
    font-family: 'impact';
    font-style: italic;
    color: #81d5cd;
    position: relative;
    top: 15px;

}

#section-title-DeliveBoo {
    color: #9df2e9;
    font-size: 5rem;
    font-weight: 900;
}

#section-title-admin {
    font-size: 3rem;
    font-family: 'impact';
    font-style: italic;
    color: #81d5cd;
    position: relative;
    top: 15px;

}

#jumbo-logo {
    max-width: 120px !important;
    max-height: 120px !important;
}

.jumbo {
    /* position: relative; */
    position: fixed;
    z-index: -1;
    bottom: 1rem;
    top: 1rem;
    /* margin + scrollbar */
    right: calc(1rem + 10px);
    left: 8.5rem;
    border-radius: 16px 0 0 16px;
    overflow: hidden;
}

#jumbo-spacer {
    height: calc(100vh - 8rem);
}



.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
}

.swiper-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.btn {
    background-color: #9df2e9 !important;
    color: #393939 !important;
}
</style>