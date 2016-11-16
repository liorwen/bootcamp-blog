
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueRouter from "vue-router";
import App from './layouts/AppLayout.vue';
import Dashboard from './components/Dashboard.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
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

export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/home', component: Dashboard },
        { path: '/signup', component: SignUp },
        { path: '/signin', component: SignIn },

    ]
});
new Vue(Vue.util.extend({router}, App)).$mount('#app');
