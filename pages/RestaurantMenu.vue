<script>
import { store } from "../store.js" // state management

export default {
    name: "RestaurantMenu",
    props: ["id"],
    data() {
        return {
            store,
            showModal: false, // Variabile per mostrare/nascondere la finestra modale
            quantity: {},
            searchText: '',
            searchedDishes: []
        }
    },
    computed: {
        restaurantDishes() {
            return this.store.dishList.filter(dish => dish.restaurant_id === parseInt(this.$route.params.id));
        }
    },
    methods: {
        checkSameDishDifferentQuantity(dish) {
            return this.store.cart.some(item => item.id === dish.id);
        },

        persist() {
            localStorage.cart = JSON.stringify(this.store.cart);
        },
        addItemToCart(dish) {
            if (this.store.cart.length === 0 || this.store.cart.every(item => item.restaurant_id === dish.restaurant_id)) {
                document.getElementById('add-to-cart' + dish.id).classList.add('d-none');
                document.getElementById('cart-controls' + dish.id).classList.remove('d-none');
                dish['quantity'] = 1;
                this.store.cart.push(dish);
                // console.log(this.store.cart);
                this.persist();
            } else {
                // Mostra la finestra modale per chiedere all'utente se vuole cancellare i piatti nel carrello
                this.showModal = true;
            }
        },
        updateItemQuantity(dish, quantity) {
            if (quantity <= 0) {
                document.getElementById('cart-controls' + dish.id).classList.add('d-none');
                document.getElementById('add-to-cart' + dish.id).classList.remove('d-none');
                this.store.cart = this.store.cart.filter(item => item.id !== dish.id);
                this.persist();
                this.quantity[dish.id] = 1;
            } else {

                this.store.cart.filter(item => item.id === dish.id)[0].quantity = quantity;
                this.persist();
            }
            // console.log(this.store.cart);
        },
        clearCartAndCloseModal() {
            this.store.cart = [];
            this.persist();
            this.showModal = false;
        },

        async getQuantity() {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            while (this.restaurantDishes.length < 1) {
                await delay(10);
            }
            this.store.dishList.filter(dish => dish.restaurant_id === parseInt(this.$route.params.id)).forEach(dish => {
                this.quantity[dish.id] = 1;
            })
        },

        searchDish() {
            // Get all Dish names
            let names = document.getElementsByClassName('dish-name');

            // Iterate through each Dish
            this.store.dishList.filter(dish => dish.restaurant_id === parseInt(this.$route.params.id) && dish.visibility === 1).forEach(dish => {
                // If search text is empty reset visibility
                if (this.searchText == "") {
                    // Clean all Dish names and set visibility to true
                    Array.from(names).forEach(name => {
                        // Remove existing highlight tags
                        name.innerHTML = name.innerHTML.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
                    })
                    // dish.visible = true;
                }
                // If Dish name includes search text
                else if (dish.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                    // Create regex to match search text
                    const regex = new RegExp(this.searchText, 'gi');
                    // Iterate through each Dish name
                    Array.from(names).forEach(name => {
                        // console.log(name.innerHTML)
                        let text = name.innerHTML
                        // Remove existing highlight tags
                        text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
                        // Replace search text with highlighted text
                        const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
                        name.innerHTML = newText;
                    })
                }
                // If Dish name does not include search text
                else {
                    // Set visibility to false
                    dish.visible = false;
                }
            });
        },

        itemCartWatcher() {
            if (this.store.cart.length > 0 && this.store.cart.every(item => item.restaurant_id === parseInt(this.$route.params.id))) {
                this.store.cart.forEach(dish => {
                    this.quantity[dish.id] = dish.quantity;
                    document.getElementById('add-to-cart' + dish.id).classList.add('d-none');
                    document.getElementById('cart-controls' + dish.id).classList.remove('d-none');
                })
            }
        },

        async initialize() {
            await this.getQuantity();
            await this.itemCartWatcher();
        }


    },

    mounted() {
        this.initialize();

    }
};
</script>

<template>
    <div id="search" class="container mt-5">
        <div>
        </div>

        <div class="searchBox">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            <input class="" type="text" placeholder="Cerca un piatto" :value="searchText"
                @input="searchText = $event.target.value, searchDish()">
        </div>
        <hr class="dotted my-3">
    </div>


    <div class="container my-5 w-100 d-flex justify-content-center align-items-center p-0">
        <div class="d-flex justify-content-center align-items-center w-100 p-0 flex-wrap">
            <p v-if="restaurantDishes.length === 0 || restaurantDishes.filter(dish => dish.visibility === 1).length === 0"
                class="alert alert-info mt-3" role="alert">
                Non ci sono piatti in questo ristorante</p>
            <div v-if="restaurantDishes.filter(dish => dish.visibility === 1).filter(dish => dish.name.toLowerCase().includes(this.searchText.toLowerCase())).length <= 0 && searchText != ''"
                class="alert alert-info mt-3" role="alert">
                Nessun piatto trovato con i criteri di ricerca selezionati.
            </div>
            <div id="card-container" class="d-flex justify-content-center align-items-center" v-else
                v-for="dish in restaurantDishes.filter(dish => dish.visibility === 1)" :key="dish.id"
                :class="{ 'invisible': !dish.name.toLowerCase().includes(this.searchText.toLowerCase()) }">
                <div class="card glass h-100 mx-3 my-3"
                    :class="{ 'invisible': !dish.name.toLowerCase().includes(this.searchText.toLowerCase()) }">
                    <div class="card-img-container" type="button" data-bs-toggle="modal" data-bs-target="#dishInfo"
                        @click="store.currentDish = dish">

                        <img :src="dish.img.substring(0, 4) === 'http' ? dish.img : store.urlBackend + '/storage/' + dish.img"
                            :alt="dish.name + ' image'">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between align-items-center">
                        <div class="w-100">
                            <h5 class="card-title dish-name text-center">{{ dish.name.length > 23 ? dish.name.slice(0,
                23) + '...' : dish.name }}</h5>

                        </div>

                        <div class="d-flex justify-content-around align-items-center w-100">
                            <p class="card-text m-0">
                                <font-awesome-icon icon="fa-solid fa-coins" class="me-2" />
                                {{ dish.price }}€
                            </p>

                            <div :id="'add-to-cart' + dish.id" class="btn btn-warning"
                                :class="{ 'disabled': quantity[dish.id] <= 0 }"
                                :data-bs-toggle="dish.restaurant_id !== store.cart[0]?.restaurant_id && store.cart.length > 0 ? 'modal' : ''"
                                :data-bs-target="'#menuErrorModal'"
                                @click="dish.restaurant_id === store.cart[0]?.restaurant_id || store.cart.length === 0 ? addItemToCart(dish) : null">
                                Aggiungi
                            </div>

                            <div :id="'cart-controls' + dish.id" class="d-flex quantity-controls d-none">
                                <button @click="updateItemQuantity(dish, --quantity[dish.id])"><font-awesome-icon
                                        icon="fa-solid fa-minus" class="me-2" /></button>
                                <div>{{ quantity[dish.id] }}</div>
                                <button @click="updateItemQuantity(dish, ++quantity[dish.id])"><font-awesome-icon
                                        icon="fa-solid fa-plus" class="ms-2" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Finestra modale per chiedere all'utente se vuole cancellare i piatti nel carrello -->
    <!-- <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background"></div>
        <div class="modal-card my-modal-bg glass ">
            <header class="modal-card-head">
                <p class="modal-card-title fw-bold fs-3">Oh no!</p>
            </header>
            <section class="modal-card-body fs-4">
                <p>Hai già nel carrello piatti di un altro ristorante. Vuoi cancellarli?</p>
            </section>
            <footer class="modal-card-foot bg-transparent">
                <button class="btn btn-primary is-success me-3" @click="clearCartAndCloseModal">Sì</button>
                <button class="btn btn-primary" @click="showModal = false">No</button>
            </footer>
        </div>
    </div> -->
</template>

<style scoped lang="scss">
.searchBox {
    background-color: #c44536;
    color: #393939;
    width: 300px;
    border-radius: 32px;
    padding: 0.5rem 1rem;
    box-shadow: 0px 6px 10px 0px rgba(196, 69, 54, 0.5);
}

input[type="text"] {
    border-radius: 32px;
    padding: 0.5rem 1rem;
    border: 0;
    background-color: transparent;
    color: #393939;

}

input::placeholder {
    color: #393939;

}

input[type="text"]:focus {
    outline: none;
}

.dotted {
    border: 1px dashed #ffac4b;
}

.invisible {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
}

button {
    background-color: transparent;
    border: 0;
}

.quantity-controls {
    padding: 6px 12px;
    background-color: #c44536;
    border-radius: 32px;
    color: #393939;
    min-width: 86.78px;
    justify-content: space-between;
}

.quantity-controls button {
    color: #393939;
}

@media screen and (max-width: 768px) {

    .card {
        width: 100% !important;
        height: 150px !important;
        flex-direction: row !important;
    }

    #card-container {
        width: 100% !important;
    }

    .card-img-container {
        border-radius: 32px 0 0 32px !important;
        width: 40%;
        height: 100% !important;
        overflow: hidden;
        object-position: center;
    }
}

.btn {
    transition: all 0.3s ease-in-out;
}

.card {
    height: 250px;
    width: 18rem;
    // width: 100% !important;
    border-radius: 32px;
    background-color: #FDEBC9;
    color: #393939;
    border: 0;
    box-shadow: 0px 6px 10px 0px rgba(133, 133, 133, 0.5);



}

.card-title {
    font-weight: 900;
}

.card-img-container {
    cursor: pointer;
    border-radius: 32px 32px 0 0;
    max-width: 300px;
    max-height: 150px !important;
    overflow: hidden;
    object-position: center;
    object-fit: cover;

}

.card-img-container img {
    // max-height: 100% !important;
    min-height: 100% !important;
    max-width: 110% !important;
    min-width: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
}

.modal {
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal.is-active {
    display: flex;
}

.my-modal-bg {
    background-color: rgba(157, 242, 234, 0.518);
    padding: 1rem;
    border-radius: 1rem;
    // color: black;
}
</style>