<template>
<div class="container-fluid">
    <div class="row flex-nowrap ">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex gradient-background flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center  pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Voting Systems</span>
                </a>
                <ul class="nav nav-pills flex-column  mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item shadow-lg ml-2 " @mouseout="active1=false" @mouseover="active1=true" :class="active1?'activeDash':''">
                        <router-link  :to="{name:'Home'}" class="nav-link text-success  align-middle px-0">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </router-link>
                    </li>
                    <li v-if="isAdmin" class="text-success" @mouseout="active2=false" @mouseover="active2=true" :class="active2?'activeDash':''">
                        <router-link :to="{name:'Parties'}" class="text-success nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Parties</span> 
                        </router-link>
                    </li>
                    <li v-if="isAdmin" @mouseout="active3=false" @mouseover="active3=true" :class="active3?'activeDash':''">
                        <router-link :to="{name:'Candidates'}" class="nav-link px-0 align-middle text-success">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Candidates</span>
                        </router-link>
                    </li>
                    <li v-if="!isAdmin" @mouseout="active4=false" @mouseover="active4=true" :class="active4?'activeDash':''">
                        <router-link :to="{name:'Voting'}" class="nav-link px-0 align-middle text-success">
                            <i class="fs-4 bi-check2-square"></i> <span class="ms-1 d-none d-sm-inline">Voting Section</span> 
                        </router-link>
                    </li>
                </ul>
                <hr>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img class="icon_img rounded-circle"  alt="profile" width="30" height="30"  src="../../src/assets/profile.svg"/>
                        <span class="d-none d-sm-inline mx-1">{{name}}</span>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const active1 = ref(false)
const active2 = ref(false)
const active3 = ref(false)
const active4 = ref(false)
const isAdmin = ref(false)
const name = ref('')
const router = useRouter()

function signOut() {
    localStorage.clear()
    router.push({ name: 'Login' })
}

onMounted(async () => {
    try {
        const userId = localStorage.getItem("id")
        const userRes = await axios.get('users/' + userId + "?populate=*")
        isAdmin.value = userRes.data.is_admin
        if (!isAdmin.value) {
            name.value = userRes.data.voter.full_names
        } else {
            name.value = userRes.data.email
        }
    } catch (err) {
        console.log(err)
    }
})
</script>

<style scoped>
.activeDash{background-color: white;border-radius: 10%; width: 100%;}
.gradient-background{background: rgb(0,10,36);
background: linear-gradient(90deg, rgba(0,10,36,1) 0%, rgba(40,24,27,0.7791491596638656) 32%, rgba(9,121,60,0.7063200280112045) 76%, rgba(5,18,28,0.87718837535014) 100%);}
</style>
