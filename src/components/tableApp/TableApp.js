import {getData} from '@/services/api'
export default {
  name :'TableApp',
  data(){
    return {
      cats:[],
      headers:[],
      currentSort:'',
      currentSortDir:'asc',
      search:'' ,
    }
  },
  created(){
    getData().then(res=>{
      this.cats = res.data
      if (this.cats.length > 0){
      this.headers = Object.keys(this.cats[0])
    }
  }).catch(err=>{
    if (err.response){
        // server responded
        console.log(err.response)
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
      return ans
    },
    
    sort(att){

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