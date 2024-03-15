<script>
import { store } from "../store.js";

export default {
    name: "UserPage",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div style="background-color: #003734; padding-top: 10px;">
        <section>
            <div class="container my-5">
                <div class="d-flex justify-content-center align-items-center">
                    <div id="logo" class="me-2">
                        <img class="w-100" src="../assets/logo2.svg" alt="">
                    </div>
                    <span id="section-title-DeliveBoo">DeliveBoo</span>
                    <span id="section-title-admin">admin</span>

                </div>
                <p class="fs-4 my-5 text-center">Con DeliveBoo admin puoi gestire, modificare e creare i tuoi ristoranti
                    con
                    il relativo
                    menù. Hai a
                    disposizione una dashboard per controllare l'andamento del tuo ristorante e dei singoli piatti.</p>

                <div class="buttons d-flex justify-content-center gap-3">
                    <a :href="store.urlBackend + '/register'" target="_blank"
                        class="btn btn-primary px-4 fw-bold py-2">Register</a>
                    <a :href="store.urlBackend + '/login'" target="_blank"
                        class="btn btn-secondary px-4 fw-bold py-2">Login</a>
                </div>
            </div>
        </section>

        <section class="py-5">

            <div class="container my-5">
                <div class="row gap-4 py-5">
                    <div
                        class="col-12 col-md-6 glass-clear chart-container p-3 d-flex justify-content-center align-items-center">
                        <img class="rounded-4 w-100" src="../assets/chart.png" alt="">
                    </div>

                    <div class="col">
                        <h1 class="my-5">
                            Grafici interattivi: prendi il controllo del tuo ristorante con DeliveBoo admin</h1>
                        <p>Con i grafici interattivi di DeliveBoo, hai una finestra cristallina sul tuo ristorante.
                            Monitora
                            vendite, clienti, tempi di attesa e altro ancora, prendendo decisioni informate per
                            ottimizzare
                            il
                            tuo business.<br>
                            DeliveBoo ti aiuta a:
                        <ul class="fa-ul">
                            <li><span class="fa-li"><font-awesome-icon
                                        icon="fa-solid fa-chart-line" /></span>Controllare il
                                tuo
                                ristorante
                            </li>
                            <li><span class="fa-li"><font-awesome-icon icon="fa-solid fa-user" /></span>Prendere
                                decisioni
                                informate</li>
                            <li><span class="fa-li"><font-awesome-icon
                                        icon="fa-solid fa-arrows-rotate" /></span>Aggiornare
                                periodicamente
                            </li>
                        </ul>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5">

            <div class="container my-5">
                <h1 class="text-center my-5">Cosa fa DeliveBoo admin?</h1>
                <div class="row gap-3 justify-content-center">

                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="glass text-center p-3">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-utensils " class="icon-color fa-3x mb-3" />
                                <h5 style="color: #9df2e9;">Piatti</h5>
                                <p>Gestisci i piatti del tuo ristorante.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="glass  text-center p-3">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-user " class="icon-color fa-3x mb-3" />
                                <h5 style="color: #9df2e9;">Clienti</h5>
                                <p>Gestisci i clienti del tuo ristorante.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="glass text-center p-3">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-clock " class="icon-color fa-3x mb-3" />
                                <h5 style="color: #9df2e9;">Ordini</h5>
                                <p>Gestisci gli ordini del tuo ristorante.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <footer>
            <div class="container mt-5">
                <p class="text-center my-5">Made with &hearts; by</p>
                <div class="row gap-4">
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
        </footer>
    </div>

</template>



<style scoped lang="scss">
.glass {
    background-color: #006a6580;
    border-radius: 32px;
}

#logo {
    width: 150px;
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

.icon-color {
    color: #9df2e9 !important;
}

p {
    color: #9df2e9;
}

a {
    color: #9df2e9;
}

h1 {
    color: #9df2e9;
}

.btn-primary:hover {
    background-color: #9df2e9 !important;
}

.btn-secondary:hover {
    background-color: #006a64 !important;
}
</style>