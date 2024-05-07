<script setup>
import axios from 'axios'
import { ref } from 'vue'

const token = localStorage.getItem('token')

const foods = ref([])
const loading = ref(false)

const fetchFoods = async () => {
  loading.value = true
  const response = await axios.get('http://localhost:8000/api/food')
  foods.value = response.data
  loading.value = false
}

fetchFoods()

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this food?')) {
    await axios.delete(`http://localhost:8000/api/deletefood/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    fetchFoods()
  }
}

</script>

<template>
  <div>
    <h1>Admin</h1>
    <router-link to="/admin/tambah-makanan" class="btn btn-primary">Add Food</router-link>
    <div v-if="loading">Loading...</div>
    <table class="table table-striped mt-3" v-if="!loading">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Spicy Level</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foods" :key="food.id">
          <td>{{ food.name }}</td>
          <td>{{ food.spicy_level }}</td>
          <td>{{ food.price }}</td>
          <td><img :src="'http://localhost:8000/uploads/' + food.image" alt="" style="width: 100px;"></td>
          <td>
            <button @click="handleDelete(food.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>