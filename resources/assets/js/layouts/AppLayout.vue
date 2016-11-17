<template>
    <div>
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="/">
                        Bootcamo-Blog
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav"></ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <li v-if="!authenticated"><router-link to="signin">Login</router-link></li>
                        <li v-if="!authenticated"><router-link to="signup">Register</router-link></li>
                        <li class="dropdown" v-if="authenticated">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ username }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li>
                                    <a href="#" v-on:click="signout" class="ui inverted button">Sign out</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
 //   import auth from '../apis/authApi.js';
    import auth2 from '../apis/AuthService.js';
    export default{
        data(){
            return{
   //             auth: auth,
          //      auth2: {
           //       authenticated: store.state.authenticated,
            //      name: store.state.name;
             //   },
                error: false
            }
        },
        methods: {
            signout() {
                auth2.signout(function(response) {
                   // vm.auth2.name = "";
                   // vm.auth2.authenticated = false;
                    store.commit('authState', false);
                    store.commit('usernameChange', "");
                    router.push('signin');
                })

            },
        },
        mounted() {
            let vm = this;
            auth2.check(function(response) {
                if(response.success)
                {
                    //vm.auth2.name = response.data.profile.name;
                    //vm.auth2.authenticated = response.data.authenticated;
                    store.commit('authState', response.data.authenticated);
                    store.commit('usernameChange', response.data.profile.name);
                }
            })
        },
        computed: {
            username() {
                return store.state.name;
            },
            authenticated() {
                return store.state.authenticated;
            }
        }
    }
</script>
