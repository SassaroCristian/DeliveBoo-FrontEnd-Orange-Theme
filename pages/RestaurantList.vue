<script>
import { store } from "../store.js"; // state management
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
    name: "RestaurantList",
    components: {
        RestaurantCard,
    },
    data() {
        return {
            store,
            searchText: "",
            selectedTypes: [],
            typeClicked: {},
            selectedFoodType: null,
            sortBy: 'none',
            showNoResults: false,
        };
    },
    computed: {
        filteredRestaurants() {
            let filtered = [...this.store.restaurantList];

            if (this.searchText) {
                filtered = filtered.filter((restaurant) =>
                    restaurant.name.toLowerCase().includes(this.searchText.toLowerCase())
                );
            }

            if (this.selectedTypes.length > 0) {
                filtered = filtered.filter((restaurant) =>
                    this.selectedTypes.every((selectedType) =>
                        restaurant.types.some((type) => type.name === selectedType)
                    )
                );
            }

            if (this.selectedFoodType) {
                filtered = filtered.filter((restaurant) =>
                    restaurant.types.some((type) => type.name === this.selectedFoodType)
                );
            }

            if (this.sortBy === 'alphabet') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortBy === 'newest') {
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }

            this.showNoResults = filtered.length === 0;
            return filtered;
        },
    },
    methods: {
        clearSearch() {
            this.searchText = "";
            this.selectedTypes = [];
            this.typeClicked = {};
            this.selectedFoodType = null;
            this.$router.push({ name: 'restaurantList' });
        },
        toggleTypeFilter(type) {
            const index = this.selectedTypes.indexOf(type.name);

            if (this.selectedFoodType === type.name) {
                this.selectedFoodType = null;
                this.$router.replace({ name: 'restaurants', query: {} });
            } else {
                if (index !== -1) {
                    this.selectedTypes.splice(index, 1);
                } else {
                    this.selectedTypes.push(type.name);
                }
                this.typeClicked[type.name] = !this.typeClicked[type.name];
            }

            // Aggiorna la variabile showNoResults in base ai risultati filtrati
            this.showNoResults = this.filteredRestaurants.length === 0;
        },
        getTypeClass(type) {
            const classes = [
                "badge",
                "rounded-pill",
                {
                    "text-bg-primary": (this.typeClicked[type.name] || this.selectedFoodType === type.name),
                    "text-bg-secondary": !(this.typeClicked[type.name] || this.selectedFoodType === type.name),
                },
            ];
            return classes;
        },
        updateSort(type) {
            this.sortBy = type;
        },

        searchRestaurant() {
            // Get all type names
            let names = document.getElementsByClassName('restaurant-name');

            // Iterate through each type
            this.store.restaurantList.forEach(restaurant => {
                // If search text is empty reset visibility
                if (this.searchText == "") {
                    // Clean all restaurant names and set visibility to true
                    Array.from(names).forEach(name => {
                        // Remove existing highlight tags
                        name.innerHTML = name.innerHTML.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
                    })
                    // restaurant.visible = true;
                }
                // If restaurant name includes search text
                else if (restaurant.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                    // Create regex to match search text
                    const regex = new RegExp(this.searchText, 'gi');
                    // Iterate through each restaurant name
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
                // If restaurant name does not include search text
                else {
                    // Set visibility to false
                    restaurant.visible = false;
                }
            });
        },
    },
    mounted() {
        this.selectedFoodType = this.$route.query.foodType || null;
    },

    watch: {
        '$route.query.foodType'(newFoodType) {
            this.selectedFoodType = newFoodType;
        },
    },
};
</script>

<template>

    <div style="background-color: #ffac4b;" class="container mt-5">
        <div class="searchBox">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            <input class="" type="text" placeholder="Cerca un ristorante" :value="searchText"
                @input="searchText = $event.target.value, searchRestaurant()">
        </div>

        <hr class="dotted">



        <div class="row">
            <div class="mt-3 mb-2">
                <span v-for="(type, index) in store.foodTypeList" :key="index" :class="getTypeClass(type)"
                    class="fs-6 type-tags  mt-2" @click="toggleTypeFilter(type)" :id="'type' + type.id">
                    {{ type.name }}
                </span>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <p v-if="!store.restaurantList || !store.restaurantList.length">Non ci sono ristoranti</p>
            <div v-if="showNoResults && searchText != '' || filteredRestaurants.length <= 0"
                class="alert alert-info mt-3 error-color" role="alert">
                Nessun ristorante trovato con i criteri di ricerca selezionati.
            </div>
        </div>

        <div class="row my-4 gap-5 gap-md-4 justify-content-center">
            <RestaurantCard v-for="restaurant in filteredRestaurants" :key="restaurant.id" :item="restaurant" />

        </div>
    </div>

</template>

<style scoped>
.text-bg-primary {
    background-color: #c44536 !important;
    color: #393939 !important;
    border: solid 2px #393939 !important;
}

.text-bg-secondary {
    border: solid 2px;
    border-color: #393939 !important;
    background-color: transparent !important;
    color: #393939 !important;
}

.invisible {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
}

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
    border: 1px dashed #393939;
}

.badge {
    cursor: pointer;
}

.type-tags {
    padding: 0.7rem;
    margin: 0 0.2rem;
}

.error-color {
    background-color: #ffac4b;
    color: #393939;
    border: #c44536;
}

@media screen and (max-width: 620px) {
    .searchBox:hover>.searchInput {
        width: 150px;
        padding: 0 6px;
    }
}
</style>