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
                        Laravel
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav"></ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <li v-if="!auth.user.authenticated"><router-link to="signin">Login</router-link></li>
                        <li v-if="!auth.user.authenticated"><router-link to="signup">Register</router-link></li>
                        <li class="dropdown" v-if="auth.user.authenticated">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ auth.user.profile.name }} <span class="caret"></span>
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
    import auth from '../apis/authApi.js';

    export default{
        data(){
            return{
                auth: auth
            }
        },
        methods: {
            signout() {
                auth.signout()
            }
        },
        mounted() {
            auth.checkauth(this)
        }
    }



</script>
