<script setup>
import axios from "axios";
import { ref } from "vue";

const foods = ref([]);
const loading = ref(false);
const orders = ref([]);

const fetchFoods = async () => {
  loading.value = true;
  const response = await axios.get("http://localhost:8000/api/food");
  foods.value = response.data;
  loading.value = false;
};

const fetchOrders = async () => {
  const response = await axios.get("http://localhost:8000/api/order", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  orders.value = response.data.data;
};



fetchFoods();
fetchOrders();
</script>
<template>
  <div>
    <h1>Orders</h1>
    <div v-if="loading">Loading...</div>
    <table class="table table-striped mt-3" v-if="!loading">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Table Number</th>
          <th scope="col">Order Date</th>
          <th scope="col">Order Detail</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id_order }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.table_number }}</td>
          <td>{{ order.order_date }}</td>
          <td>
            <div v-for="detail in order.order_detail" :key="detail.id">
              <p>Food ID: {{ detail.id_food }}</p>
              <p>Price: {{ detail.price }}</p>
              <p>Quantity: {{ detail.quantity }}</p>
            </div>
          </td>
          <td>
            <button @click="handleDelete(order.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
