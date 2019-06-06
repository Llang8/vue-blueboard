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
        <img v-if="this.$store.state.user != null"  @click="showUserMenu = !showUserMenu" src="./assets/blank-profile-picture.png" alt="Profile">
      </div>
    </header>
                     
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      showUserMenu: false,
      showNotifications: false
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
</style>
