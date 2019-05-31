// Import Vue
import Vue from 'vue';
import Router from 'vue-router';

// Import components
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Practice from '../components/Practice.vue';
import Room from '../components/Room.vue';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/practice',
            name: 'practice',
            component: Practice
        },
        {
            path: '/room/:id',
            name: 'room',
            component: Room
        }
    ]
});
