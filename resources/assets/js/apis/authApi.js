/**
 * Created by liorwen on 2016/11/16.
 */
import {router} from "../app.js";
export default {
    user: {
        authenticated: false,
        profile: null
    },
    register(context, name, email, password, password_confirmation) {
        Vue.http.post(
            'api/auth/signup',
            {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        ).then(response => {
            context.success = true
        }, (response) => {
            context.response = response.data
            context.error = true
        })
    },
    signin(context, email, password) {
        Vue.http.post(
            'api/auth/signin',
            {
                email: email,
                password: password
            }
        ).then(response => {
            context.error = false
            localStorage.setItem('id_token', response.data.meta.token)
            Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

            this.user.authenticated = true
            this.user.profile = response.data.data
            // $route.params.username = this.user.profile.name;
            router.push({
                name: 'home'
            })
        }, (response) => {
            context.error = true
        })
    },
    signout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
        this.user.profile = null

        router.push({
            name: 'signin'
        })
    }
}