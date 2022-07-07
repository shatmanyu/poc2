import store from '@/store/store'
export default {
  name :'TableApp',
  created(){
    store.dispatch('response')
  },
  computed: {
    getSearch:{
      get(){
        return store.state.search
      },
      set(newValue){
        // console.log("change text",store.state.search)
        store.dispatch('setSearch',newValue)
        var updatedCats = store.state.cats.filter(this.searchFilter)
        // console.log("updated Cats",updatedCats)
        store.dispatch('setFilteredRecords',updatedCats)
      }
    },
    getHeaders(){
      // console.log(store.state.headers)
      return store.state.headers
    },
    getCurrentSort(){
      // console.log("getCurrentSort")
      return store.getters.currentSort
      // console.log()
    },
    getCurrentSortDir(){
      // console.log("getCurrentSort")
      return store.getters.currentSortDir
      // console.log()
    },
    
    filterRecords(){
      return store.state.cats1
  
    },
  },

    // }
    //1. // join? 
       // why join - behaviour
       // remove join 
        
  
  methods: {
    searchFilter(obj){
      var ans = false
      for (const key in obj) {
          ans = ans || obj[key].toString().toLowerCase().includes(store.state.search.toString().toLowerCase())
        }
      return ans
    },
    
    sort(att){
      // sorting 
      // console.log("from comp sort",this.getCurrentSort,this.getCurrentSortDir)
        if (att == this.getCurrentSort){
          store.dispatch('toggleSort')
        }
        else{
          store.dispatch('setCurrentSort',att)}
      
      if (this.getCurrentSortDir == 'desc'){
        // console.log('desc')
          store.dispatch('sortDesc')
      // 
    }
      else{
        store.dispatch('sortAsc')
        }
        }
      
    },


  }