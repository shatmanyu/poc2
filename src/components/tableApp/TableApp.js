import store from '@/store/store'
export default {
  name :'TableApp',
  created(){
    store.dispatch('getCatsApi')
  },
  computed: {
    getSearch:{
      get(){
        return store.getters.search
      },
      set(newValue){
        store.dispatch('setSearch',newValue)
        var updatedCats = this.getCats.filter(this.searchFilter)
        store.dispatch('setFilteredRecords',updatedCats)
      }
    },
    getHeaders(){
      return store.getters.headers
    },
    getCurrentSort(){
      return store.getters.currentSort
    },
    getCurrentSortDir(){
      return store.getters.currentSortDir
    },
    filteredRecords(){
      return store.getters.filteredRecords
    },
    getCats(){
      return store.getters.cats
    }
    
  },
  
  methods: {
    // filtering data on the basis of search 
    searchFilter(obj){
      var ans = false
      for (const key in obj) {
          ans = ans || obj[key].toString().toLowerCase().includes(store.getters.search.toString().toLowerCase())
        }
      return ans
    },
    sort(att){
      // sorting 
        if (att == this.getCurrentSort){
          store.dispatch('toggleSort')
          }
        else{
          store.dispatch('setCurrentSort',att)}
      
      if (this.getCurrentSortDir == 'desc'){
          store.dispatch('sortDesc')
         }
      else{
        store.dispatch('sortAsc')
        }
      }
      
    },


  }