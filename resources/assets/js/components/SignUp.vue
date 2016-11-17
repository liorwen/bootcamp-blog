<template>
    <div class="container" slot="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Register</div>
                    <div class="panel-body">
                        <div class="register-form">
                            <form class="form-horizontal" autocomplete="off" v-on:submit="register">
                                <div class="form-group"
                                     v-bind:class="{ 'has-error': error && response.username }">
                                    <label for="name" class="col-md-4 control-label">Name</label>
                                    <div class="col-md-6">
                                        <input id="name" type="text" class="form-control"
                                               v-model="name" required autofocus>
                                        <span class="help-block"
                                              v-if="error && response.name">{{ response.name }}</span>
                                    </div>
                                </div>
                                <div class="form-group"
                                     v-bind:class="{ 'has-error': error && response.email }">
                                    <label for="email" class="col-md-4 control-label">E-mail</label>
                                    <div class="col-md-6">
                                        <input id="email" type="email" class="form-control"
                                               v-model="email" required>
                                        <span class="help-block"
                                              v-if="error && response.email">{{ response.email }}</span>
                                    </div>
                                </div>
                                <div class="form-group"
                                     v-bind:class="{ 'has-error': error && response.password }">
                                    <label for="password" class="col-md-4 control-label">Password</label>
                                    <div class="col-md-6">
                                        <input id="password" type="password" class="form-control"
                                               v-model="password" required>
                                        <span class="help-block"
                                              v-if="error && response.password">{{ response.password }}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password-confirm" class="col-md-4 control-label">Confirm
                                        Password</label>

                                    <div class="col-md-6">
                                        <input id="password-confirm" type="password" class="form-control"
                                               v-model="password_confirmation" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-6 col-md-offset-4">
                                        <button type="submit" class="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import auth from '../apis/AuthService.js';
    export default{
        data(){
            return{
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
                success: false,
                error: false,
                response: null
            }
        },
        methods: {
            register(event) {
                event.preventDefault()
                let vm = this;
                auth.register(this.name, this.email, this.password, this.password_confirmation, function(response){
                    vm.response = response.data;
                    vm.success = response.success;
                    vm.error = response.error;
                    if(vm.success) {
                        auth.signin(vm.email, vm.password, function(response){
                            console.log(response);
                            if(response.success)
                            {
                                store.commit('authState', response.data.authenticated);
                                store.commit('usernameChange', response.data.profile.name);

                            }
                        })
                        router.push('home');
                    }
                })
            }
        }
    }



</script>
