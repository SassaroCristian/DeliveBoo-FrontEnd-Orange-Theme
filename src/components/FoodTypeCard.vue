<script>
export default {
    name: "FoodTypeCard",
    props: ["item"],
}
</script>

<template>
    <div class="card">
        <div class="card-custom d-flex flex-column align-items-center justify-content-between">
            <h3 class="card-title type-name align-self-start">{{ item.name }}</h3>
            <div class="img-container d-flex justify-content-center align-items-center">
                <img :src="'../src/assets/' + item.img + '.svg'" class="w-100">
            </div>
            <div></div>
        </div>
    </div>
    <!-- <div class="card-footer text-center">
                <router-link :to="{ name: 'event-detail', params: { id: item.id } }" class="btn btn-primary">
                    <font-awesome-icon icon="fa-solid fa-circle-info" class="me-2" />
                    <span>Details</span>
                </router-link>
            </div> -->

</template>

<style scoped lang="scss">
@use '../styles/partials/variables' as *;

.card-title {
    color: #393939;
}

.card-custom {
    padding: 1rem;
    border: none;
    background-color: none !important;
    width: 300px;
    height: 200px;
}

.card {
    border: none;
    box-shadow: 0px 6px 10px 0px rgba(133, 133, 133, 0.5);
    background-color: $themeColorOrangeLight;
    border-radius: 20px;
}

.img-container {
    width: 200px;
}

@media screen and (max-width: 768px) {
    .card-custom {
        width: 100% !important;
    }

}
</style>