<script setup>
import axios from 'axios'
import { ref } from 'vue'

const foods = ref([])
const loading = ref(false)
const orders = ref([])

const fetchFoods = async () => {
  loading.value = true
  const response = await axios.get('http://localhost:8000/api/food')
  foods.value = response.data
  loading.value = false
}

const fetchOrders = async () => {
  const response = await axios.get('http://localhost:8000/api/semuaorder')
  orders.value = response.data.data
}

fetchFoods()
fetchOrders()

</script>

<template>
  <div>
    <!-- ... -->
    <div>
      <h2>Orders</h2>
      <div v-for="order in orders" :key="order.id">
        <h3>Order ID: {{ order.id }}</h3>
        <p>Name: {{ order.name }}</p>
        <p>Table Number: {{ order.table_number }}</p>
        <p>Order Date: {{ order.order_date }}</p>
        <div v-for="detail in order.order_detail" :key="detail.id">
          <p>Food ID: {{ detail.id_food }}</p>
          <p>Price: {{ detail.price }}</p>
          <p>Quantity: {{ detail.quantity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>