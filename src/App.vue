<template>
  <TableApp/>
</template>

<script>
import TableApp from './components/tableApp/TableApp.vue'

export default {
  name: 'App',
  components: {
    TableApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
