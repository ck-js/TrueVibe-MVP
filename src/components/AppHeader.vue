<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { isLoggedIn } = useAuthUser();
</script>
<template>
<div class="container">
    <ul>
        <li><router-link :to="{ name: 'Home' }">
            <img src="../assets//true vibe logo_transparent_small.png" alt="">
        </router-link></li>
        <!-- <li><router-link :to="{ name: 'Me' }">Me</router-link></li> -->
    </ul>
    <ul v-if="isLoggedIn()">
        <li><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
    </ul>
    <ul v-else>
        <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
        <!-- <li><router-link :to="{ name: 'Register' }">Register</router-link></li> -->
    </ul>
  </div>
</template>
<style scoped>

.container {
    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

}
ul {
    
    flex-direction: row;
    padding: 0;
    margin: 0;
}
    li {
    list-style: none;
}

li a {
    display: inline-block;
    padding: 10px 20px;
    
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
}

li a:hover {
    background-color: salmon;
    
}
img {
    width: 50px;
    height: 50px;
    
}
</style>