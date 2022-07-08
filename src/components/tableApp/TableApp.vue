<template>
<div class="container">
<h2 id="title"> Cats Data</h2>
  <div class="tb">
    <input type="text" v-model="getSearch" placeholder="search"/>

    <table id = 'table'>

    <thead>
      <tr id = 'thead'>
        <th @click="sort(i)" :class="[getCurrentSort==i && (getCurrentSortDir=='asc'?'asc': 'desc')] " v-for="i in getHeaders" :key="i">
        <span id="i">{{i}}</span>
          
          <div class="header">
          <i v-if="getCurrentSort == i && getCurrentSortDir=='desc'" class="fa-solid fa-sort-down fa-2xs"></i>
            <i v-else-if="getCurrentSort == i && getCurrentSortDir=='asc'" class="fa-solid fa-sort-up fa-2xs"></i>
        
            </div>
        
        </th>
      </tr>
    </thead>
    
    <tbody id="tbody">

       <!-- //4. // no match - no search results -->
      <tr v-for="cat in filterRecords" :key="cat">
        <td v-for="i in Object.values(cat)" :key="i">{{i}}</td>
      </tr>
    </tbody>
  </table>
<p v-show="filterRecords.length == 0">No search results found</p>
  </div>
</div>
  
</template>

<script lang="js" src="./TableApp.js">
</script>

<style lang ="css" src="./TableApp.css">
</style>