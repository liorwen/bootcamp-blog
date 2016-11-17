/**
 * Created by liorwen on 2016/11/17.
 */
import auth from './AuthService';
export default {
    auth(to, from, next) {
        auth.check(function (reponse) {
           if(!reponse.success) {
               next();
           }
           else {
               next('/home');
           }
        });

    }
}