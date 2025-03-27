
<template>
    <div class="footer">
      <ul>
        <li><router-link :to="{ name: 'Matches' }">Matches</router-link></li>
        <li><router-link :to="{ name: 'Growth' }">Growth</router-link></li>
        <li><router-link :to="{ name: 'Report' }">Report</router-link></li>
        <li><router-link :to="{ name: 'Me' }">Profile</router-link></li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  </script>
  
  <style scoped>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #333;
    background-color: rgba(250, 128, 114, 1);
    color: white;
    text-align: center;
    padding: 10px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }
  
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  li a {
    color: white;
    text-decoration: none;
    padding: 10px;
    transition: background-color 0.3s;
  }
  
  li a:hover {
    background-color: salmon;
    border-radius: 5px;
  }
  </style>