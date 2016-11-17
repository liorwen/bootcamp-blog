/**
 * Created by liorwen on 2016/11/17.
 */
import ResponseData from '../datas/ResponseObject';
export default {
    register(name, email, password, password_confirmation, callback) {
        let responseData = new ResponseData();
        Vue.http.post(
            'api/auth/signup',
            {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        ).then(response => {
            responseData.success = true
            // this.signin(context, email, password);
            callback(responseData);
        }, (response) => {
            responseData.data = response.data
            responseData.error = true
            callback(responseData);
        })
    },
    signin(email, password, callback) {
        let responseData = new ResponseData();
        Vue.http.post(
            'api/auth/signin',
            {
                email: email,
                password: password
            }
        ).then(response => {
            responseData.success = true
            localStorage.setItem('id_token', response.data.meta.token)
            Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
            responseData.data = {
                authenticated: true,
                profile: response.data.data
            };
            callback(responseData);
            // router.push('home');
        }, (response) => {
            responseData.error = true;
            responseData.msg = "login invalid";
            responseData.data = response.data;
            callback(responseData);
        })
    },
    signout(callback) {
        localStorage.removeItem('id_token');
        let responseData = new ResponseData();
        responseData.success = true;
        responseData.msg = "logout";
        responseData.data = {
            authenticated: false,
            profile: null
        };
        callback(responseData);
        // router.push('signin');
    },
    check(callback) {
        let id_token = localStorage.getItem('id_token');
        // let responseData = {success: false, error: false, msg:"", data: null};
        let responseData = new ResponseData();
        if (!id_token) {
            responseData.error = true;
            responseData.msg = "id_token has not yet";
            callback(responseData);
            return;
        }
        Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

        Vue.http.post(
            'api/auth/check-auth',
            {
                id_token: localStorage.getItem('id_token')
            }
        ).then(response => {
            responseData.success = true;
            responseData.msg = "auth valid";
            responseData.data = {
                authenticated: true,
                profile: response.data.data
            };
            callback(responseData);

        }, (response) => {
            responseData.error = true;
            responseData.msg = "auth invalid";

            callback(responseData);

        })
    }
}
