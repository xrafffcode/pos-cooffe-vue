<template>
    <div>
      <h1>Delete Food</h1>
      <button @click="handleDelete" class="btn btn-danger">Delete</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  
  const token = localStorage.getItem('token')
  const foodId = ref('') // replace this with the ID of the food you want to delete
  const message = ref('')
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/food/${foodId.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      message.value = 'Food deleted successfully'
    } catch (error) {
      message.value = 'Failed to delete food'
    }
  }
  </script>