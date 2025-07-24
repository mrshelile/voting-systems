// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Registration from '../views/registration.vue'
import Admin from '../views/Admin.vue'
import DashboardComponents from '../components/AdminComponents/DashComponents.vue'
import Parties from '../components/AdminComponents/Parties.vue'
import Candidates from '../components/AdminComponents/Candidates.vue'
import Voting from '../components/AdminComponents/Voting.vue'
import Profile from '../components/AdminComponents/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
    },
    {
        path: '/dashboard/',
        name: 'Dashboard',
        component: Admin,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: DashboardComponents,
            },
            {
                path: 'parties',
                name: 'Parties',
                component: Parties,
                meta: { requiresAdmin: true },
            },
            {
                path: 'candidates',
                name: 'Candidates',
                component: Candidates,
                meta: { requiresAdmin: true },
            },
            {
                path: 'voting',
                name: 'Voting',
                component: Voting,
                meta: { requiresVoter: true },
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// Global navigation guard for authentication and role-based access
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const isAdmin = localStorage.getItem('admin') === 'true'
    const isVoter = localStorage.getItem('voter') === 'true'

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ name: 'Login' })
            return
        }
    }
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (!isAdmin) {
            next({ name: 'Home' })
            return
        }
    }
    if (to.matched.some(record => record.meta.requiresVoter)) {
        if (!isVoter) {
            next({ name: 'Home' })
            return
        }
    }
    next()
})

export default router
