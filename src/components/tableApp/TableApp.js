import store from '@/store/store'
export default {
  name :'TableApp',
  data(){
    return {

    addPageList:[],
  }
  },
  created(){
    store.dispatch('getCatsApi')
   
  },
  computed: {
    getAddList(){
      return this.addPageList
    },
    getSearch:{
      get(){
        return store.getters.search
      },
      set(newValue){
        store.dispatch('setSearch',newValue)
        store.commit('setPresentPage')
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
    displayData(){
      var start = ((this.getPresentPage - 1) * this.getPageSize);
      var end = start + this.getPageSize;
      return this.filteredRecords.slice(start, end)
    },

    getCats(){
      return store.getters.cats
    },
    getCountOfPages(){
      return store.getters.countOfPages
    },
    getPresentPage(){
      return store.getters.presentPage
    },
    getPageSize(){
      return store.getters.pageSize
    }
    
  },
  
  methods: {

    // filtering data on the basis of search 
    getNextPage() {
      if (this.getPresentPage < this.getCountOfPages){
      store.commit('getNextPage')}
      },
    getPreviousPage() {
      if (this.getPresentPage > 1){
        store.commit('getPreviousPage')}
      },
      
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