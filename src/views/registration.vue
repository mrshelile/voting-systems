<template>
    <div class="registration-form gradient-background">
        <form @submit.prevent="handleSubmit">
            <div class="form-icon">
                <img class="icon_img" src="../../src/assets/security.svg" />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control item"
                    v-model="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div class="form-group">
                <input
                    type="password"
                    v-model="password"
                    class="form-control item"
                    @input="validatePasswords"
                    placeholder="Password"
                    required
                />
            </div>
            <div class="form-group">
                <div class="row">
                    <input
                        type="password"
                        v-model="rePassword"
                        class="form-control item"
                        @input="validatePasswords"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div class="row text-danger">{{ error }}</div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn gradient-btn create-account">
                    Create Account
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const rePassword = ref('')
const error = ref('')
const router = useRouter()

function validatePasswords() {
    error.value =
        password.value && rePassword.value && password.value !== rePassword.value
            ? 'Passwords do not match'
            : ''
}

async function handleSubmit() {
    validatePasswords()
    if (!error.value) {
        const payload = {
            username: email.value,
            password: password.value,
            is_admin: false,
            email: email.value,
        }
        try {
            const userRes = await axios.post('/auth/local/register', payload, {
                headers: { 'Content-Type': 'application/json' },
            })
            if (userRes.status === 200) {
                router.push({ name: 'Login' })
            }
        } catch (e) {
            error.value = 'Registration failed'
        }
    }
}
</script>

<style scoped>
/* ...existing styles unchanged... */
body {
    background-color: #dee9ff;
}
.gradient-background {
    background: rgb(0, 10, 36);
    background: linear-gradient(
        90deg,
        rgba(0, 10, 36, 1) 0%,
        rgba(40, 24, 27, 0.7791491596638656) 32%,
        rgba(9, 121, 60, 0.7063200280112045) 76%,
        rgba(5, 18, 28, 0.87718837535014) 100%
    );
}

.registration-form {
    padding: 50px 0;
}
.icon_img {
    width: 100%;
}
.registration-form form {
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon {
    text-align: center;

    border-radius: 50%;
    font-size: 40px;
    color: white;
    width: 150px;
    height: 100px;
    margin: auto;
    margin-bottom: 50px;
    line-height: 100px;
}

.registration-form .item {
    border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
}

.registration-form .create-account {
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: #5791ff;
    border: none;
    color: white;
    margin-top: 20px;
}

.registration-form .social-media {
    max-width: 600px;
    background-color: #fff;
    margin: auto;
    padding: 35px 0;
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #9fadca;
    border-top: 1px solid #dee9ff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .social-icons {
    margin-top: 30px;
    margin-bottom: 16px;
}

.registration-form .social-icons a {
    font-size: 23px;
    margin: 0 3px;
    color: #5691ff;
    border: 1px solid;
    border-radius: 50%;
    width: 45px;
    display: inline-block;
    height: 45px;
    text-align: center;
    background-color: #fff;
    line-height: 45px;
}

.gradient-btn {
    background: rgb(36, 11, 0);
    background: linear-gradient(
        90deg,
        rgba(36, 11, 0, 1) 19%,
        rgba(5, 18, 28, 0.9304096638655462) 81%
    );
}
@media (max-width: 576px) {
    .registration-form form {
        padding: 50px 20px;
    }

    .registration-form .form-icon {
        width: 70px;
        height: 70px;
        font-size: 30px;
        line-height: 70px;
    }
}
</style>