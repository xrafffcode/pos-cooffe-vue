<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const apiUrl = 'http://localhost:8000/api/food';
const uploadUrl = 'http://localhost:8000/uploads/';

const foods = ref([]);
const loading = ref(false);
const basket = ref([]);

const fetchFoods = async () => {
    loading.value = true;
    const response = await axios.get(apiUrl);
    foods.value = response.data;
    loading.value = false;
}

const localBasket = localStorage.getItem('basket');

if (localBasket) {
    basket.value = JSON.parse(localBasket);
}

const addToCart = (id_food) => {
    const index = basket.value.findIndex((item) => item.id_food === id_food);

    if (index === -1) {
        basket.value.push({
            id_food,
            quantity: 1,
        });
    } else {
        basket.value[index].quantity++;
    }

    localStorage.setItem('basket', JSON.stringify(basket.value));
}

const removeFromCart = (id_food) => {
    const index = basket.value.findIndex((item) => item.id_food === id_food);

    if (index !== -1) {
        if (basket.value[index].quantity > 1) {
            basket.value[index].quantity--;
        } else {
            basket.value.splice(index, 1);
        }
    }

    localStorage.setItem('basket', JSON.stringify(basket.value));
}

onMounted(() => {
    fetchFoods();
});
</script>

<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Order Detail</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in foods" :key="item.id_food">
                                <td><img :src="uploadUrl + item.image" alt="" style="width: 100px;"></td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</td>
                                <td>{{ basket.find((basketItem) => basketItem.id_food === item.id_food)?.quantity }}</td>
                                <td>{{ (item.price * basket.find((basketItem) => basketItem.id_food === item.id_food)?.quantity).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</td>
                                <td>
                                    <button @click="addToCart(item.id_food)" class="btn btn-primary me-2">+</button>
                                    <button @click="removeFromCart(item.id_food)" class="btn btn-danger">-</button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4">Total</td>
                                <td>{{ basket.reduce((acc, item) => {
                                    const food = foods.find((food) => food.id_food === item.id_food);
                                    return acc + (food.price * item.quantity);
                                }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title
                    ">Order Summary</h5>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Total Item</td>
                                <td>{{ basket.reduce((acc, item) => acc + item.quantity, 0) }}</td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td>{{ basket.reduce((acc, item) => {
                                    const food = foods.find((food) => food.id_food === item.id_food);
                                    return acc + (food.price * item.quantity);
                                }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-primary w-100">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</template>