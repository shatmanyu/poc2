<template>
<h2 id="title"> Cats Data</h2>
  <div class="tb">
    <input type="text" v-model="search" placeholder="search"/>

    <table cellspacing='0' id = 'table'>
    <!-- <div id = 'div1'> -->
    <thead>
      <tr id = 'thead'>
        <!-- currentSort -->
        <th @click="sort(i)" :class="[currentSort==i && (currentSortDir=='asc'?'asc': 'desc')] " v-for="i in headers" :key="i">
        <span id="i">{{i}}</span>
          
          <div class="header">
          <i v-if="currentSort == i && currentSortDir=='desc'" class="fa-solid fa-sort-down fa-2xs"></i>
            <i v-else-if="currentSort == i && currentSortDir=='asc'" class="fa-solid fa-sort-up fa-2xs"></i>
        
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
    <!-- </div> -->
    <!-- <div v-show="filterRecords.length == 0" id = div2> -->
      
    <!-- </div> -->
    
    
  </table>

<!-- <h3 v-show="filterRecords.length == 0">No search results found</h3> -->
<p v-show="filterRecords.length == 0">No search results found</p>
  </div>
  
</template>

<script>
// import { objectProperty } from '@babel/types';
import axios from 'axios';
export default {
  name :'TableApp',
  data(){
    return {
      cats:[],
      headers:[],
      currentSort:'',
      currentSortDir:'asc',
      search:'' ,
      // chk:''
      
    }
  },
  created(){
     // getting response from an api
    // error handling api 
    axios
    .get('https://www.raymondcamden.com/.netlify/functions/get-cats')
    .then(res=>{
      this.cats = res.data
      if (this.cats.length > 0){
        this.headers = Object.keys(this.cats[0])
      }
    }).catch(err=>{
      if (err.response){
        // server responded
        console.log('response',err.response.data)
        console.log('response',err.response.status)
      }
      else if(err.request){
        // server not responded
        console.log('request',err.request)
      }
      else{
        // backend error
        console.log("Error",err.message)
      }
    })
  },
  computed: {
    filterRecords(){
    // console.log(Object.keys(this.cats[0]))

      // joining all props of each object so to apply string includes method and search in it
      const cats1 = this.cats.filter(this.searchFilter)
      return cats1}
    },

    // }
    //1. // join? 
       // why join - behaviour
       // remove join 
        
  
  methods: {
    searchFilter(obj){
      var ans = false
      for (const key in obj) {
          ans = ans || obj[key].toString().toLowerCase().includes(this.search.toString().toLowerCase())
        }
      // console.log(ans)
      return ans
    },
    
    sort(att){
      // this.chk=!this.chk
      // console.log(this.chk)

      // sorting 
      if (att == this.currentSort){
        // console.log("hello",this.currentSort,att,this.currentSortDir)
        this.currentSortDir = this.currentSortDir=='desc'?'asc':'desc';
      }
      this.currentSort = att
      // console.log("hello1",this.currentSort,att,this.currentSortDir)
      // console.log(this.currentSort,this.currentSortDir)
      if (this.currentSortDir == 'desc'){
        // console.log('desc')
      this.cats = this.cats.sort((cat1,cat2)=>{
            if (cat1[att] < cat2[att]){
              
              return 1
            }
            return -1
          })}
      else{
        // console.log('asc',att)
          this.cats = this.cats.sort((cat1,cat2)=>{
            if (cat1[att] < cat2[att]){
              return -1
            }
            return 1
          })}
        }
      
    },
    //2. // sorting css - color change / identify 
    //4. yellow - asc ; dark green - desc sorting
    //3. // optimize sort 


  }
</script>

<style>

.tb {
  color:green;
  border:2px solid black;
  width:400px;
  /* margin:20px; */
  margin-left: 430px;
}
th:hover{
  cursor: pointer;
}
/* td{
border-bottom:1px solid grey
} */
td,th{
  border:1px solid grey
}
table{
  width:100%;
  margin-top: 2px;
}
.asc{
  color:white;
  background-color: darkgreen
}
.desc{
  color:yellow;
  background-color:brown
}
i{
  margin-left: 10px;
}
/* .fa-solid,.fa-sort-down{
} */
.header{
  display:inline-block

}
#title{
  text-decoration: underline;
}
/* 
  sortng - background - dark green ; title = white
  asc - down arrow
  desc - up arrow 
  no arrw for not sorting 
  borders of table 


 */

</style>