<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errors = ref(null)

const router = useRouter()

const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/login', {
            email: email.value,
            password: password.value
        })

        localStorage.setItem('token', response.data.authorization.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        router.push({ name: 'admin' })
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else if (error.response.status === 401) {
            errors.value = {
                email: ['The provided credentials are incorrect.']
            }
        } else {
            errors.value = {
                email: ['Something went wrong. Please try again.']
            }
        }
    }
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-75">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Login</h5>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" v-model="email" :class="{ 'is-invalid': errors && errors.email }">
                        <div class="invalid-feedback" v-if="errors && errors.email">
                            {{ errors.email[0] }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="password" :class="{ 'is-invalid': errors && errors.password }">
                        <div class="invalid-feedback" v-if="errors && errors.password">
                            {{ errors.password[0] }}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>