<script>
import { store } from "../store.js"; // state management

export default {
    name: "RejectedPayment",
    data() {
        return {
            store,
            orderInfo: {},
            message: "Oh no, qualcosa è andato storto."
        };
    },
    beforeRouteEnter(to, from, next) {
        if (from.name !== 'payment') {
            next({ path: '/' })
        } else {
            next()
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.path !== '/') {
            alert('Non puoi abbandonare la pagina adesso')
            next(false)
        } else {
            next()
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push({ path: '/' })
        }
    },
    mounted() {
        this.orderInfo = JSON.parse(localStorage.order);
        this.message = localStorage.orderErrorMessage
        // this.$router.beforeEach((to, from) => {
        //     if (from.name === 'rejected' && to.name !== 'home') {
        //         this.$route.push({ path: '/' })
        //         return false
        //     }
        // })
    }
};
</script>

<template>
    <div class="container d-flex justify-content-center align-items-center">

        <div class="bg">
            <div class="card">
                <span class="card__failure"><i class="ion-close-circled"></i></span>
                <h1 class="card__msg">Payment Failed</h1>
                <h2 class="card__submsg">We're sorry, but your payment was not successful</h2>
                <div class="card__body">
                    <div class="card__recipient-info">
                        <p class="card__recipient">{{ orderInfo.client_name }} {{ orderInfo.client_surname
                            }}</p>
                        <p class="card__email">ite{{ orderInfo.client_mail }}</p>
                    </div>
                    <div>
                        <h1 class="card__price text-danger">{{ message }}</h1>
                    </div>
                    <div class="text-center">
                        <button @click="goToHomePage()" class="fs-5 p-4 mt-3 btn btn-primary">Torna alla
                            homepage</button>
                    </div>
                </div>
                <div class="card__tags">
                    <span class="card__tag">failed</span>
                    <span class="card__tag">item</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    height: calc(100vh - 2rem);
}

.bg {
    width: 100%;
    // overflow: hidden;
    // margin: 0 auto;
    box-sizing: border-box;
    // padding: 40px;
    font-family: 'Roboto';
    margin-bottom: 40px;
}

.card {
    background-color: white;
    width: 100%;
    float: left;
    margin-top: 40px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 80px 30px 25px 30px;
    text-align: center;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.card__failure {
    position: absolute;
    top: -50px;
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: #e74c3c;
    border: 5px solid white;

    i {
        color: white;
        line-height: 100px;
        font-size: 45px;
    }
}

.card__msg {
    text-transform: uppercase;
    color: #55585b;
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 5px;
}

.card__submsg {
    color: #959a9e;
    font-size: 18px;
    font-weight: 400;
    margin-top: 0px;
}

.card__body {
    background-color: #f8f6f6;
    border-radius: 4px;
    width: 100%;
    margin-top: 30px;
    float: left;
    box-sizing: border-box;
    padding: 30px;
}

.card__recipient-info {
    display: inline-block;
}

.card__recipient {
    color: #232528;
    text-align: left;
    margin-bottom: 5px;
    font-weight: 600;
}

.card__email {
    color: #838890;
    text-align: left;
    margin-top: 0px;
}

.card__price {
    color: #232528;
    font-size: 30px;
    margin-top: 25px;
    margin-bottom: 30px;

    span {
        font-size: 60%;
    }
}

.card__method {
    color: #d3cece;
    text-transform: uppercase;
    text-align: left;
    font-size: 11px;
    margin-bottom: 5px;
}

.card__payment {
    background-color: white;
    border-radius: 4px;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card__tags {
    clear: both;
    padding-top: 15px;
}

.card__tag {
    text-transform: uppercase;
    background-color: #f8f6f6;
    box-sizing: border-box;
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 10px;
    color: #d3cece;
}
</style>