
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueRouter from "vue-router";
import Vuex from 'vuex';
import App from './layouts/AppLayout.vue';
import Dashboard from './components/Dashboard.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import middleware from './apis/middleware.js';
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

// Vue.component('example', require('./components/Example.vue'));
// Vue.component('header-layout', require('./layouts/AppLayout.vue'));
// Vue.component('sign-up', require('./components/SignUp.vue'));
// Vue.component('sign-in', require('./components/SignIn.vue'));
// const app = new Vue({
//     el: '#app'
// });

Vue.use(VueRouter);
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        name: "",
        authenticated: false
    },
    mutations: {
        authState: (state, isAuth) => {
            state.authenticated = isAuth;
        },
        usernameChange:
        (state, name) => {
            state.name = name;
        }
    }
})


const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    linkActiveClass: 'active',
    routes: [
        { path: '/signup', component: SignUp, beforeEnter: middleware.auth },
        { path: '/signin', component: SignIn, beforeEnter: middleware.auth },
        { path: '/:username', component: Dashboard },

    ]
});
window.router = router;
window.store = store;
new Vue(Vue.util.extend({router}, App)).$mount('#app');
