<template>
<div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex gradient-background flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Voting Systems</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item shadow-lg ml-2"
                        :class="isActive('Home') ? 'activeDash' : ''"
                        @mouseover="hovered = 'Home'"
                        @mouseout="hovered = ''">
                        <router-link :to="{name:'Home'}" class="nav-link text-success align-middle px-0">
                            <i class="fs-4 bi-speedometer2"></i>
                            <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </router-link>
                    </li>
                    <li v-if="isAdmin" class="shadow-lg ml-2"
                        :class="isActive('Parties') ? 'activeDash' : ''"
                        @mouseover="hovered = 'Parties'"
                        @mouseout="hovered = ''">
                        <router-link :to="{name:'Parties'}" class="nav-link text-success align-middle px-0">
                            <i class="fs-4 bi-people"></i>
                            <span class="ms-1 d-none d-sm-inline">Parties</span>
                        </router-link>
                    </li>
                    <li v-if="isAdmin" class="shadow-lg ml-2"
                        :class="isActive('Candidates') ? 'activeDash' : ''"
                        @mouseover="hovered = 'Candidates'"
                        @mouseout="hovered = ''">
                        <router-link :to="{name:'Candidates'}" class="nav-link text-success align-middle px-0">
                            <i class="fs-4 bi-people"></i>
                            <span class="ms-1 d-none d-sm-inline">Candidates</span>
                        </router-link>
                    </li>
                    <li v-if="!isAdmin" class="shadow-lg ml-2"
                        :class="isActive('Voting') ? 'activeDash' : ''"
                        @mouseover="hovered = 'Voting'"
                        @mouseout="hovered = ''">
                        <router-link :to="{name:'Voting'}" class="nav-link text-success align-middle px-0">
                            <i class="fs-4 bi-check2-square"></i>
                            <span class="ms-1 d-none d-sm-inline">Voting Section</span>
                        </router-link>
                    </li>
                </ul>
                <hr>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img class="icon_img rounded-circle" alt="profile" width="30" height="30" src="../../src/assets/profile.svg"/>
                        <span class="d-none d-sm-inline mx-1">{{ name }}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" @click="signOut">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col py-3">
            <router-view/>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const hovered = ref('')
const isAdmin = ref(false)
const name = ref('')
const router = useRouter()
const route = useRoute()

function signOut() {
    localStorage.clear()
    router.push({ name: 'Login' })
}

function isActive(navName) {
    return hovered.value === navName || route.name === navName
}

onMounted(async () => {
    try {
        const userId = localStorage.getItem("id")
        const userRes = await axios.get('users/' + userId + "?populate=*")
        isAdmin.value = userRes.data.is_admin
        name.value = isAdmin.value ? userRes.data.email : userRes.data.voter.full_names
    } catch (err) {
        console.log(err)
    }
})
</script>

<style scoped>
.activeDash {
    background-color: white;
    border-radius: 10%;
    width: 100%;
}
.gradient-background {
    background: rgb(0,10,36);
    background: linear-gradient(90deg, rgba(0,10,36,1) 0%, rgba(40,24,27,0.779) 32%, rgba(9,121,60,0.706) 76%, rgba(5,18,28,0.877) 100%);
}
</style>
