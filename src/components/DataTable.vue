<template>
  <div class="hello">
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ value | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
        <tr>
          <th v-for="(value, key) in columns"
            :class="{ active: sortKey == key }">
            <input @input="e => {filterBy(e, key)}">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData">
          <template v-for="(value, key) in columns">
            <td>
              <Cell :entry="entry" :k="key" @cell-editing="editInfo"/>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Cell from './Cell.vue'
export default {
  name: 'DataTable',
  components: {
    Cell
  },
  props: {
    data: Array,
    columns: Object,
  },
  data: function () {
    var sortOrders = {}
    Object.keys(this.columns).map(function(objectKey, index) {
    sortOrders[objectKey] = 1
    });
    return {
      tableData: this.data.map((item, index) => {
        item.id = index
        return item
      }),
      sortKey: '',
      filterKey: '',
      filterColumn: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.tableData
      var filterColumn = this.filterColumn
      if (filterKey) {
        data = data.filter(function (row) {
          return String(row[filterColumn]).toLowerCase().indexOf(filterKey) > -1
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          if (!(isNaN(a[sortKey]) || isNaN(b[sortKey]))) {
            return (a[sortKey] - b[sortKey] ) * order
          }
          else {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    filterBy: function (event ,key ) {
      this.filterKey = event.target.value
      this.filterColumn = key
    },
    isColor: function (keyName) {
      return keyName.includes('_color')
    },
    editInfo: function(e) {
      this.tableData.find(el =>  el.id === e.item.id )[e.column] = e.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}
input {
  width: 80px;
}
table {
  border: 2px solid #409EFF;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #409EFF;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 60px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

.color-tag {
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
}
</style>
