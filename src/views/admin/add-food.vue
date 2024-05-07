<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')

const name = ref('')
const spicy_level = ref('')
const price = ref('')
const image = ref('')
const errors = ref(null)

const router = useRouter()

const handleSubmit = async () => {
    try {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('spicy_level', spicy_level.value)
        formData.append('price', price.value)
        formData.append('image', image.value)

        const response = await axios.post('http://localhost:8000/api/addfood', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })

        router.push({ name: 'admin' })
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errors.value = {
                name: ['Something went wrong. Please try again.']
            }
        }
    }
}
</script>

<template>
    <div>
        <h1>Add Food</h1>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="name" :class="{ 'is-invalid': errors && errors.name }">
                <div class="invalid-feedback" v-if="errors && errors.name">
                    {{ errors.name[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="spicy_level" class="form-label">Spicy Level</label>
                <input type="text" class="form-control" v-model="spicy_level" :class="{ 'is-invalid': errors && errors.spicy_level }">
                <div class="invalid-feedback" v-if="errors && errors.spicy_level">
                    {{ errors.spicy_level[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="text" class="form-control" v-model="price" :class="{ 'is-invalid': errors && errors.price }">
                <div class="invalid-feedback" v-if="errors && errors.price">
                    {{ errors.price[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Image</label>
                <input type="file" class="form-control" :class="{ 'is-invalid': errors && errors.image }" @change="image = $event.target.files[0]">
                <div class="invalid-feedback" v-if="errors && errors.image">
                    {{ errors.image[0] }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>