<template>
<div>
    <div class="login-content">
        <div v-if="loggingIn">
            <h1>BlueBoard</h1>
            <ul v-bind:key='error' v-for="error in errors">
                <li>{{ error }}</li>
            </ul>
            <form  id="login-form" action="">
                <label for="email">Email</label>
                <input type="text" v-model='email'>
                <label for="password">Password</label>
                <input type="password" v-model='password'>
                <p>Don't have an account? <span style='color: blue; cursor: pointer;' @click="loggingIn=!loggingIn">Create One</span></p>
                <button type="button" @click="checkLoginForm()">Login</button>
            </form>
        </div>
        <div id="register-form" v-else>
            <h1>BlueBoard</h1>
            <ul v-bind:key='error' v-for="error in errors">
                <li>{{ error }}</li>
            </ul>
            <form  id="login-form" action="">
                <label for="email">Email</label>
                <input type="text" v-model='email'>
                <label for="username">Username</label>
                <input type="text" v-model='username'>
                <label for="password">Password</label>
                <input type="password" v-model='password'>
                <label for="password">Confirm Password</label>
                <input type="password" v-model='confirmPassword'>
                <label for="firstName">First Name</label>
                <input type="text" v-model='firstName'>
                <label for="lastName">Last Name</label>
                <input type="text" v-model='lastName'>
                <label for="interviewer">Sign up as Interviewer?</label>
                <input type="checkbox" v-model='isInterviewer'>
                <p>Already have an account? <span style='color: blue; cursor: pointer;' @click="loggingIn=!loggingIn">Login</span></p>
                <button type="button" @click="checkRegisterForm()">Register</button>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import config from '../config';

export default {
    data() {
        return {
            errors: [],
            email: null,
            username: null,
            password: null,
            confirmPassword: null,
            firstName: '',
            lastName: '',
            isIterviewer: false,
            rememberMe: false,
            loggingIn: true
        }
    },
    methods: {
        
        /*******************************************
        * Checks that login form input is valid,
        * if there are any errors display them,
        * else submit login for with axios
        *******************************************/
        checkLoginForm() {
            this.errors = [];
            
            if(!this.email) {
                this.errors.push('Email Required')
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Email Invalid')
            }

            if(!this.password) {
                this.errors.push('Password Required')
            }

            if(!this.errors.length) {
                this.submitLogin()
            }

            console.log(this.errors)

        },
        /*****************************************
        * Checks that the register form input is
        * valid. If there are any errors display
        * them else submit register.
        *****************************************/
        checkRegisterForm() {
            this.errors = [];
            
            if(!this.email) {
                this.errors.push('Email Required')
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Email Invalid')
            }

            if(!this.username) {
                this.errors.push('Username Required')
            }

            if(!this.password) {
                this.errors.push('Password Required')
            } else if(this.password != this.checkPassword) {
                this.errors.push('Passwords do not match.')
            }

            if(!this.errors.length) {
                this.submitLogin()
            }

            console.log(this.errors)
        },
        submitLogin() {
            return axios({ url: `${config.flaskEndpoint}login`,data: {
                email: this.email,
                password: this.password
            }, method:'post', timeout:8000})
            .then(response => {
                console.log(response.data);
                if(response.data == 'Password Incorrect') {
                    this.errors.push('Email or password incorrect')
                } else {
                    // If response is a User object, reroute to home page and set global user state
                    this.$store.state.user = response.data;
                    window.localStorage.setItem('jwt',response.data.uuid);
                    this.$router.push({name:'home'})
                }
            })
            .catch(error =>  console.error(error))
        },
        submitRegister() {
            return axios({ url: `${config.flaskEndpoint}addUser/${this.username}`, method:'post', timeout:8000})
            .then(response => {
                console.log(response.data);
                if(response.data == 'Password Incorrect') {
                    this.errors.push('Email or password incorrect')
                } else {
                    // If response is a User object, reroute to home page and set global user state
                    this.$store.state.user = response.data;
                    this.$router.push({name:'home'})
                }
            })
            .catch(error =>  console.error(error))
        },
        /*******************************************
        * Uses regex to test if email input is valid
        *******************************************/
        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>

<style>
#login-form {
    color: black !important;
    display: flex;
    flex-direction: column;
}

#login-form > input {
    margin-bottom: 20px;
}

.login-content {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black !important;
    text-align: left;
}

.login-content > div{
    background: white;
    padding: 25px;
    width: 80vw;
    max-width: 250px;
    max-height: 80vh;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}
</style>