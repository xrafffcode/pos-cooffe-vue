
<script setup>
import axios from 'axios'
import { ref } from 'vue'

const foods = ref([])
const loading = ref(false)
const basket = ref([])
const customerName = ref('')
const tableNumber = ref('')

const fetchFoods = async () => {
  loading.value = true
  const response = await axios.get('http://localhost:8000/api/food')
  foods.value = response.data
  loading.value = false
}

const addToBasket = (food) => {
  const found = basket.value.find(item => item.id === food.id)
  if (found) {
    found.quantity++
  } else {
    basket.value.push({ ...food, quantity: 1 })
  }
}

const removeFromBasket = (food) => {
  const found = basket.value.find(item => item.id === food.id)
  if (found) {
    found.quantity--
    if (found.quantity === 0) {
      basket.value = basket.value.filter(item => item.id !== food.id)
    }
  }
}

const submitOrder = async () => {
  const orderDetails = basket.value.map(food => ({
    id_food: food.id,
    price: food.price,
    quantity: food.quantity
  }))

  const response = await axios.post('http://localhost:8000/api/order', {
    name: customerName.value,
    table_number: tableNumber.value,
    order_date: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format
    order_detail: orderDetails
  })

  if (response.data.status) {
    alert('Order submitted successfully')
    basket.value = [] // clear the basket
  } else {
    alert('Failed to submit order')
  }
}

fetchFoods()

</script>

<template>
  <div>
    <h1>Menu</h1>
    <div v-if="loading">Loading...</div>
    <div class="row" v-if="!loading">
      <div class="col-sm-4" v-for="food in foods" :key="food.id">
        <div class="card">
          <img :src="'http://localhost:8000/uploads/' + food.image" class="card-img-top" alt="Food Image">
          <div class="card-body">
            <h5 class="card-title">{{ food.name }}</h5>
            <p class="card-text">Spicy Level: {{ food.spicy_level }}</p>
            <p class="card-text">Price: {{ food.price }}</p>
            <button @click="addToBasket(food)">+</button>
            <button @click="removeFromBasket(food)">-</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>Basket</h2>
      <div v-for="item in basket" :key="item.id">
        <p>{{ item.name }} x {{ item.quantity }}</p>
      </div>
      <form @submit.prevent="submitOrder">
        <label>
          Name:
          <input v-model="customerName" required>
        </label>
        <label>
          Table Number:
          <input v-model="tableNumber" required>
        </label>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  </div>
</template>