<template>
  <div id="app">
    <data-table
      :data="gridData"
      :columns="gridColumns">
    </data-table>
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  name: 'app',
  components: {
    DataTable
  },
  data: function() {
    const initialData = require('./initialData.json');
    return {
      gridColumns: initialData.titles,
      gridData: initialData.items
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
