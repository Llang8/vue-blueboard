<template>
  <div id="app">
    <header>
      <div id="header-info">
        <h1>BlueBoard</h1>
        <!-- Display current page name -->
        <h1 id="header-route" style="text-transform: capitalize">{{ this.$route.name }}</h1>
      </div>
      <div id="user-menu">
        <!-- Show link to go home if router link is not home -->
        <h1 v-if="this.$route.name != 'home'">
          <router-link to='/'>Home</router-link>
        </h1>
        <!-- Show user notification button and menu button if user logged in -->
        <img v-if="this.$store.state.user != null" @click="showNotifications = !showNotifications" src="http://placehold.it/25x25" alt="Notification">
        <img id="user-menu-icon" v-if="this.$store.state.user != null"  @click="showUserMenu = !showUserMenu" src="./assets/blank-profile-picture.png" alt="Profile">
        <div v-if="showNotifications"></div>
      </div>
    </header>
    <div v-if="showUserMenu" id="user-dropdown" class="user-dropdown">
      <ul>
        <li>Settings</li>
        <li @click="logout()">Logout</li>
      </ul>
    </div>       
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      showUserMenu: false,
      showNotifications: false
    }
  },
  beforeCreate() {
    // CHECK SESSION FOR ID
    let token = window.localStorage.getItem('jwt');
    console.log(token);
    if( token) {
      return axios({ url: `https://blueboard-flask-ll.herokuapp.com/checkSession/${token}`, method:'post', timeout:8000})
      .then(response => {
        // If response is a User object, reroute to home page and set global user state
        if( response.data != 'Session not found') {
          this.$store.state.user = response.data;
        }
      })
      .catch(error =>  console.error(error))
    }
  },
  created() {

    // If user menu opened and user clicks off of it,
    // Close user dropdown menu
    document.addEventListener('click', (event) => {
      if(this.$store.state.user != null) {
        if (!document.getElementById('user-menu-icon').contains(event.target) && 
              this.showUserMenu) {
          this.showUserMenu = false;
        }
      }
    });
  },
  methods: {
    logout() {
      // Set user object to null
      this.$store.state.user = null;
      // Delete localStorage session id
      window.localStorage.removeItem('jwt', null);
      // Hide user dropdown
      this.showUserMenu = false;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background: rgb(58, 47, 78);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

a {
    color: white;
    text-decoration: none;
}

.editor {
  height: 100%;
  width: 100%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  width: calc(100% - 20px);
  background: rgb(87, 73, 112);
}

#header-info {
  display: flex;
}

#header-info > h1, #user-menu > h1 {
  margin-right: 20px;
  font-size: 25px;
}

#user-menu {
  display: flex;
  align-items: center;
}

#user-menu > img{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  border: 5px solid rgb(58, 47, 78);
}
#user-menu > img:hover{
  border: 5px solid rgb(41, 33, 56);
  cursor: pointer;
}

.user-dropdown {
  width: 100px;
  background: rgb(41, 33, 56);
  position: absolute;
  right: 25px;
  text-align: left;
}

.user-dropdown > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.user-dropdown > ul > li {
  padding: 10px 5px;
  cursor: pointer;
}

.user-dropdown > ul > li:hover {
  background: rgb(12, 9, 17);
}
</style>
