<template>
<div>
    <div class="login-content">
        <div v-if="loggingIn">
            <h1>BlueBoard</h1>
            <ul v-for="error in errors">
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

        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            errors: [],
            email: null,
            username: null,
            password: null,
            firstName: null,
            lastName: null,
            isInstructor: false,
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
        submitLogin() {

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
    color: black;
    text-align: left;
}

.login-content > div{
    background: white;
    padding: 25px;
    width: 80vw;
    max-width: 250px;
    height: 80vh;
    max-height: 350px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>