import { getData } from "@/services/api";
import { createStore } from "vuex";
export default createStore({

    state:{
      cats:[],
      filteredRecords:[],
      headers:[],
      currentSort:'',
      currentSortDir:'asc',
      search:'' ,

    },
    mutations:{
        setSearch(state,newValue){
            state.search = newValue
        },
        setFilteredRecords(state,updatedCats){
            state.filteredRecords = updatedCats
        },
        setApiData(state,apiData){
            state.cats = apiData
            state.filteredRecords = apiData
        },
        setHeaders(state){
            if (state.cats.length > 0){
            state.headers = Object.keys(state.cats[0])}
            else{
                state.headers = []
            }
        },
        toggleSort(state){
            state.currentSortDir = state.currentSortDir=='desc'?'asc':'desc'
        },
        setCurrentSort(state,att){
            state.currentSort = att
        },
        sortDesc(state){
            state.filteredRecords = state.filteredRecords.sort((cat1,cat2)=>{
                if (cat1[state.currentSort] < cat2[state.currentSort]){
                  return 1
                }
                return -1
              })},
        sortAsc(state){
            state.filteredRecords = state.filteredRecords.sort((cat1,cat2)=>{
                if (cat1[state.currentSort] < cat2[state.currentSort]){
                  return -1
                }
                return 1
              })}

        },
        
    actions:{
        setSearch({commit},newValue){
            commit('setSearch',newValue)
        },
        setFilteredRecords({commit},updatedCats){
            commit('setFilteredRecords',updatedCats)
        },
        getCatsApi({commit}){
            getData().then(res=>{
                commit('setApiData',res.data)
                commit('setHeaders')
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
        toggleSort({commit}){
            commit('toggleSort')
        },
        setCurrentSort({commit},att){
            commit('setCurrentSort',att)
        },
        sortDesc({commit}){
            commit('sortDesc')
        },
        sortAsc({commit}){
            commit('sortAsc')
        }
    },
    getters:{
        currentSort(state){
            return state.currentSort
        },
        currentSortDir(state){
            return state.currentSortDir
        },
        cats(state){
            return state.cats
        },
        filteredRecords(state){
            return state.filteredRecords
        },
        headers(state){
            return state.headers
        },
        search(state){
            return state.search
        }

    },
    modules:{
    }
})