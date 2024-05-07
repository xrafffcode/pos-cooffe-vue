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

// 'order_detail.*.id_food' => 'required|exists:food,id_food',
//             'order_detail.*.price' => 'required|numeric',
//             'order_detail.*.quantity' => 'required|numeric',

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
  <div class="d-flex justify-content-between">
    <h1>Home</h1>
    <div class="position-relative">
      <i class="bi bi-cart fs-3"  @click="$router.push('/orders')"></i>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ basket.reduce((acc, item) => acc + item.quantity, 0) }}
      </span>
    </div>
  </div>
  <div v-if="loading">Loading...</div>
  <div class="row" v-if="!loading">
    <div class="col-sm-4" v-for="food in foods" :key="food.id">
      <div class="card">
        <img :src="uploadUrl + food.image" class="card-img-top" alt="Food Image" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">{{ food.name }}</h5>
          <p class="card-text">Spicy Level: {{ food.spicy_level }}</p>
          <p class="card-text">{{ food.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
        </div>
        <div class="card-footer d-flex justify-content-end gap-2">
          <button class="btn btn-primary" @click="addToCart(food.id_food)">
            <i class="bi bi-cart-plus"></i>
          </button>
          <input type="number" class="form-control" :value="basket.find((item) => item.id_food === food.id_food)?.quantity" readonly>
          <button class="btn btn-danger" @click="removeFromCart(food.id_food)">
            <i class="bi bi-cart-dash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
