<script>
import { store } from "../store.js"
import axios from 'axios'
export default {
    name: "CredentialsPage",
    data() {
        return {
            store,
            errors: [],
            objectErrors: {},
            orderData: {
                client_name: '',
                client_surname: '',
                client_address: '',
                client_phone: '',
                client_mail: '',
                total: 0,
                status: "pending",
                restaurant_id: 0,
                dishes: []
            },
            clientSideErrors: {
                client_name: '',
                client_surname: '',
                client_address: '',
                client_phone: '',
                client_mail: '',
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log(from)
        if (from.name !== 'cart') {
            next({ path: '/' })
        } else {
            next()
        }
    },
    methods: {
        getTotal() {
            this.store.cart.forEach(dish => {
                this.orderData.total += dish.price * dish.quantity
            })
            this.orderData.total += 5.99
        },

        getDishes() {
            this.store.cart.forEach(dish => {
                this.orderData.dishes.push(dish)
            })
        },

        dataValidated() {
            if (this.orderData.client_name == '') {
                this.clientSideErrors.client_name = 'Inserisci il tuo nome'
            } else if (this.orderData.client_name.length < 2) {
                this.clientSideErrors.client_name = 'Il nome deve avere almeno 5 caratteri'
            } else if (this.orderData.client_name.length > 50) {
                this.clientSideErrors.client_name = 'Il nome deve avere massimo 50 caratteri'
            } else {
                this.clientSideErrors.client_name = ''
            }

            if (this.orderData.client_surname == '') {
                this.clientSideErrors.client_surname = 'Inserisci il tuo cognome'
            } else if (this.orderData.client_surname.length < 2) {
                this.clientSideErrors.client_surname = 'Il cognome deve avere almeno 5 caratteri'
            } else if (this.orderData.client_surname.length > 50) {
                this.clientSideErrors.client_surname = 'Il cognome deve avere massimo 50 caratteri'
            } else {
                this.clientSideErrors.client_surname = ''
            }

            if (this.orderData.client_mail == '') {
                this.clientSideErrors.client_mail = 'Inserisci la tua email'
            } else if (this.orderData.client_mail.length < 10) {
                this.clientSideErrors.client_mail = 'la mail deve avere almeno 10 caratteri'
            } else if (this.orderData.client_mail.length > 100) {
                this.clientSideErrors.client_mail = 'la mail deve avere massimo 100 caratteri'
            } else {
                this.clientSideErrors.client_mail = ''
            }

            if (this.orderData.client_address == '') {
                this.clientSideErrors.client_address = 'Inserisci il tuo indirizzo'
            } else if (this.orderData.client_address.length < 10) {
                this.clientSideErrors.client_address = 'l\'indirizzo deve avere almeno 10 caratteri'
            } else {
                this.clientSideErrors.client_address = ''
            }

            if (this.orderData.client_phone == '') {
                this.clientSideErrors.client_phone = 'Inserisci il tuo numero di telefono'
            } else if (this.orderData.client_phone.length < 9) {
                this.clientSideErrors.client_phone = 'Il numero deve avere almeno 9 caratteri'
            } else if (this.orderData.client_phone.length > 164) {
                this.clientSideErrors.client_phone = 'Il numero deve avere massimo 164 caratteri'
            } else {
                this.clientSideErrors.client_phone = ''
            }

            let output = true;
            for (const [key, value] of Object.entries(this.clientSideErrors)) {
                if (value != '') {
                    output = false
                    break
                }
            }
            return output
        },

        async order() {
            this.getDishes();
            this.getTotal();
            this.orderData.restaurant_id = this.store.cart[0].restaurant_id;

            if (this.dataValidated()) {
                this.clientSideErrors = {
                    client_name: '',
                    client_surname: '',
                    client_address: '',
                    client_phone: '',
                    client_mail: '',
                }
                try {
                    const response = await axios.post(this.store.urlAPI + '/orders', this.orderData);
                    /* console.log(response.data.success); */
                    if (response.data.success) {
                        const totalFormatted = this.orderData.total.toFixed(2);
                        localStorage.order = JSON.stringify({ ...response.data.payload, total: totalFormatted });
                        this.$router.push({ name: 'payment', total: totalFormatted });
                        console.log(response.data.payload);
                        this.store.cart = [];
                        localStorage.cart = JSON.stringify(this.store.cart);
                    }
                } catch (error) {
                    document.getElementById('errorMessage').classList.remove('d-none')
                    this.objectErrors = {};
                    this.errors = [];
                    for (const [key, value] of Object.entries(error.response.data.errors)) {
                        this.errors.push(value);
                    }
                    this.objectErrors = error.response.data.errors;
                }

                this.orderData.dishes = []
                this.orderData.total = 0
            }
        }


    }

}
</script>

<template>
    <div class="container">
        <h1>
            Inserisci le tue credenziali
        </h1>

        <div class="alert alert-danger d-none" role="alert" id="errorMessage">
            <ul>
                <li v-for="error in errors">{{ error[0] }}</li>
            </ul>
        </div>

        <form @submit.prevent="order" method="POST" class="needs-validation">

            <div class="d-flex w-100 gap-3">
                <div class="mb-3 w-50">
                    <label for="client_name" class="form-label">Nome*</label>
                    <input v-model="orderData.client_name" type="text" class="form-control"
                        :class="{ 'is-invalid': objectErrors.client_name || clientSideErrors.client_name != '' }"
                        id="client_name">
                    <div v-if="objectErrors.client_name" class="text-danger error">{{ objectErrors.client_name[0] }}
                    </div>
                    <div v-if="clientSideErrors.client_name != ''" class="text-danger error"> {{
                    clientSideErrors.client_name }} </div>
                </div>

                <div class="mb-3 w-50">
                    <label for="client_surname" class="form-label">Cognome*</label>
                    <input v-model="orderData.client_surname" type="text" class="form-control" id="client_surname"
                        :class="{ 'is-invalid': objectErrors.client_surname || clientSideErrors.client_surname != '' }">
                    <div v-if="objectErrors.client_surname" class="text-danger error">{{ objectErrors.client_surname[0]
                        }}
                    </div>
                    <div v-if="clientSideErrors.client_surname != ''" class="text-danger error"> {{
                    clientSideErrors.client_surname }} </div>
                </div>
            </div>

            <div class="d-flex w-100 gap-3">
                <div class="mb-3 w-50">
                    <label for="client_mail" class="form-label">Email*</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input v-model="orderData.client_mail" type="email" class="form-control"
                            :class="{ 'is-invalid': objectErrors.client_mail || clientSideErrors.client_mail != '' }"
                            id="client_mail">
                    </div>
                    <div v-if="objectErrors.client_mail" class="text-danger error">{{ objectErrors.client_mail[0] }}
                    </div>
                    <div v-if="clientSideErrors.client_mail != ''" class="text-danger error"> {{
                    clientSideErrors.client_mail }} </div>
                </div>

                <div class="mb-3 w-50">
                    <label for="client_phone" class="form-label">Cellulare*</label>
                    <input v-model="orderData.client_phone" type="number" class="form-control" id="client_phone"
                        :class="{ 'is-invalid': objectErrors.client_phone || clientSideErrors.client_phone != '' }">
                    <div v-if="objectErrors.client_phone" class="text-danger error">{{ objectErrors.client_phone[0] }}
                    </div>
                    <div v-if="clientSideErrors.client_phone != ''" class="text-danger error"> {{
                    clientSideErrors.client_phone }} </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="client_address" class="form-label">Indirizzo*</label>
                <input v-model="orderData.client_address" type="text" class="form-control" id="client_address"
                    :class="{ 'is-invalid': objectErrors.client_address || clientSideErrors.client_address != '' }">
                <div v-if="objectErrors.client_address" class="text-danger error">{{ objectErrors.client_address[0] }}
                </div>
                <div v-if="clientSideErrors.client_address != ''" class="text-danger error"> {{
                    clientSideErrors.client_address }} </div>
            </div>


            <button type="submit" class="btn btn-primary">Procedi con il pagamento</button>
        </form>

    </div>
</template>

<style scoped>
.error {
    font-size: 12px;
}

h1 {
    color: #393939;
}


.form-label {
    color: #393939;
}

.btn {
    background-color: #ffac4b !important;
    color: #393939;
}
</style>