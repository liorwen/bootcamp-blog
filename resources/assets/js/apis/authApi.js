/**
 * Created by liorwen on 2016/11/16.
 */

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
            this.signin(context, email, password);
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

            this.user.authenticated = true;
            this.user.profile = response.data.data;

            router.push('home');
        }, (response) => {
            context.error = true;
        })
    },
    signout() {
        localStorage.removeItem('id_token');
        this.user.authenticated = false;
        this.user.profile = null;

        router.push('signin');
    },
    checkauth(context) {
        console.log('check auth');
        let id_token = localStorage.getItem('id_token');

        if(!id_token) {
            return;
        }
        Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

        Vue.http.post(
            'api/auth/check-auth',
            {
                id_token: localStorage.getItem('id_token')
            }
        ).then(response => {
            context.error = false;
            this.user.authenticated = true;
            this.user.profile = response.data.data;


        }, (response) => {
            context.error = true
        })
    },
    checkauth2(callback)
    {
        let id_token = localStorage.getItem('id_token');
        let returnData = {success: false, error: false, msg:"", data: null};
        if(!id_token) {
            returnData.error = true;
            returnData.msg = "id_token has not yet";
            callback(returnData);
            return;
        }
        Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

        Vue.http.post(
            'api/auth/check-auth',
            {
                id_token: localStorage.getItem('id_token')
            }
        ).then(response => {
            returnData.success = true;
            returnData.msg = "auth valid";
            returnData.data = {
                authenticated: true,
                profile: response.data.data};
            callback(returnData);

        }, (response) => {
            returnData.error = true;
            returnData.msg = "auth invalid";

            callback(returnData);

        })
    }
}