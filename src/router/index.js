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
        beforeEnter: () => {
            // console.log(localStorage.getItem('token'))

            if (localStorage.getItem('token') == null)
                return { name: "Login" }
            else
                return true
        },

        children: [{
                path: 'home',
                name: "Home",
                component: DashboardComponents,

            },
            {
                path: 'parties',
                name: "Parties",
                component: Parties,

            },
            {
                path: 'candidates',
                name: "Candidates",
                component: Candidates,

            },
            {
                path: 'voting',
                name: "Voting",
                component: Voting,
                // beforeEnter: () => {

                //     // alert(localStorage.getItem('admin'))
                //     if (localStorage.getItem('admin') != null) {
                //         // alert(localStorage.getItem('admin'))
                //         alert(localStorage.getItem('admin'))
                //         if (localStorage.getItem('admin')) {
                //             // alert(localStorage.getItem('admin'));
                //             return { name: "Home" }
                //         } else
                //             return true
                //     } else {
                //         alert(localStorage.getItem('admin'));
                //         return { name: "Voting" }
                //     }
                // },

            },
            {
                path: 'profile',
                name: "Profile",
                component: Profile,

            }
        ]
    },

    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router