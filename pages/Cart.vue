<script>
import { store } from "../store.js"

export default {
    name: "Cart",
    components: {

    },
    data() {
        return {
            store,
            shippingCost: 2.00,
            commission: 3.99,
        }
    },
    methods: {

        saveCartToLocalStorage() {
            localStorage.cart = JSON.stringify(this.store.cart);
            this.calculatePartialTotal();
            this.calculateTotal();
        },

        emptyCart() {
            this.store.cart = [];
            localStorage.cart = JSON.stringify(this.store.cart);

        },

        increaseQuantity(dish) {
            dish.quantity++;
            this.saveCartToLocalStorage();
        },

        decreaseQuantity(dish) {
            if (dish.quantity > 1) {
                dish.quantity--;
                this.saveCartToLocalStorage();
            } else if (dish.quantity === 1) {
                this.store.cart.splice(this.store.cart.indexOf(dish), 1);
            }

            this.saveCartToLocalStorage();
            console.log(localStorage.orderTotal)
        },

        calculatePartialTotal() {
            let partialTotal = 0;
            for (const dish of this.store.cart) {
                partialTotal += dish.price * dish.quantity;
            }
            localStorage.partialTotal = partialTotal;
            return partialTotal
        },

        calculateTotal() {
            let total = this.calculatePartialTotal() + this.shippingCost + this.commission;
            localStorage.orderTotal = total;
            return total;
        },

        removeFromCart(dish) {
            const index = this.store.cart.findIndex(item => item.id === dish.id);
            if (index !== -1) {
                this.store.cart.splice(index, 1);
                this.saveCartToLocalStorage();
            }
        },
    },
    mounted() {
        this.store.cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
        // localStorage.cart = [];
    },
}
</script>

<template>
    <!-- Bottone fisso in basso a destra -->
    <div v-if="store.cart.length" class="my-position d-lg-none">
        <button class="btn my-btn" data-bs-toggle="modal" data-bs-target="#cartModal"
            @click="calculateTotal(), calculatePartialTotal()">
            <strong><span class="px-1">€ {{ calculatePartialTotal().toFixed(2) }}</span></strong>
            <span class="my-arrow"><strong><font-awesome-icon icon="fa-solid fa-arrow-right pl-2" /></strong></span>
        </button>
    </div>

    <div class="container my-5">
        <div class="row">
            <p v-if="!store.cart || !store.cart.length"
                class="d-flex flex-column justify-content-center align-items-center mt-5"><strong>Non ci sono piatti
                    nel carrello</strong>
                <span><router-link to="/restaurants" class="btn btn-primary btn-lg mt-4"><strong>Trova Ristoranti
                            qui!</strong></router-link></span>
            </p>
            <div class="col-lg-8  mt-4">
                <div v-for="dish in store.cart" :key="dish.id" class="card my-card mb-3 rounded-5">
                    <div class="row g-0 h-100">
                        <div class="col h-100">
                            <div class="my-img-container h-100">
                                <img :src="dish.img.substring(0, 4) === 'http' ? dish.img : store.urlBackend + '/storage/' + dish.img"
                                    :alt="dish.name" class="img-fluid rounded-start-4 h-100">
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="card-body d-flex justify-content-between">
                                <div>
                                    <h5 class="card-title mb-2 mt-0 my-color"><strong>{{ dish.name }}</strong></h5>
                                    <p class="card-text my-2 my-color"><strong>€ {{ dish.price }} / 1</strong>
                                    </p>
                                    <div class="d-flex quantity-controls">
                                        <button @click="decreaseQuantity(dish)">
                                            <font-awesome-icon icon="fa-solid fa-minus" class="me-2" />
                                        </button>
                                        <div class="quantity">{{ dish.quantity }}</div>
                                        <button @click="increaseQuantity(dish)">
                                            <font-awesome-icon icon="fa-solid fa-plus" class="ms-2" />
                                        </button>
                                    </div>
                                </div>
                                <button class="my-trash-button" v-if="store.cart && store.cart.length"
                                    @click="removeFromCart(dish)">
                                    <font-awesome-icon icon="fas fa-trash-can" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-lg-4 mt-4 d-none d-lg-block">
                <div class="card my-panel mb-3 rounded-4" v-if="store.cart && store.cart.length">
                    <div class="card-body">
                        <h4 class="card-title mb-4 my-color"><strong>Totale ordine</strong></h4>
                        <p class="mb-2 d-flex justify-content-between my-color" v-if="store.cart && store.cart.length">
                            <span>Totale Parziale </span>
                            <span>€ {{ calculatePartialTotal().toFixed(2) }}</span>
                        </p>
                        <p class="mb-2 d-flex justify-content-between my-color" v-if="store.cart && store.cart.length">
                            <span>Costo di Spedizione</span>
                            <span>€ {{ shippingCost }}.00</span>
                        </p>
                        <p class="mb-2 d-flex justify-content-between my-color" v-if="store.cart && store.cart.length">
                            <span>Commissioni</span>
                            <span>€ {{ commission }}</span>
                        </p>
                        <p class="mb-2 d-flex justify-content-between my-color" v-if="store.cart && store.cart.length">
                            <span><strong>Totale</strong></span>
                            <span><strong>€ {{ calculateTotal().toFixed(2) }}</strong></span>
                        </p>
                        <p v-else class="my-color">Nessun elemento nel carrello</p>
                    </div>
                    <div class="my-checkout d-flex justify-content-center">
                        <router-link class="btn my-checkout-btn mb-3" :class="{ 'disabled': store.cart.length === 0 }"
                            :to="{ name: 'credentials' }">
                            Check Out <font-awesome-icon icon="fa-solid fa-arrow-right pl-2" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;

@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.card {
    overflow: hidden;
}

.my-position {
    position: fixed;
    bottom: 150px;
    right: 2rem;
    z-index: 1000;
}

.my-position button {
    padding: 12px 20px;
}

.my-color {
    color: #004350;
}

.my-arrow {
    padding-left: 0.5rem;
}

.my-card {
    height: 150px;
    background-color: $themeColorOrangeLight;
    border: none;
    box-shadow: 0px 6px 10px 0px rgba(133, 133, 133, 0.5);
    margin-bottom: 0;
}

.my-panel {
    background-color: $themeColorOrangeLight;
    border: none;
    box-shadow: 0px 6px 10px 0px rgba(133, 133, 133, 0.5);
    padding: 15px;
    position: sticky;
    top: 200px;
}

.my-img-container {
    height: 100%;
    // max-width: 250px;
}

.my-img-container img {
    object-fit: cover;
    object-position: center;
    min-width: 100%;
    min-height: 100%;
}

button {
    background-color: transparent;
    border: 0;
}

.my-btn {
    background-color: $themeColorOrangeSelectedContainer;
    color: #9df2e9;
}


.my-checkout-btn {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $themeColorOrangeSelectedContainer;
    color: #393939;
    margin-bottom: 0;
}

.my-btn:hover {
    background-color: #393939;
    border-color: #393939;
    color: #ffac4b;
}

.my-trash-button {
    color: #393939;
}

.quantity-controls {
    padding: 6px 12px;
    background-color: $themeColorOrangeSelectedContainer;
    border-radius: 32px;
    color: #393939;
    width: 86.78px;
    justify-content: space-between;
}

.quantity-controls button {
    color: #393939;
}
</style>
