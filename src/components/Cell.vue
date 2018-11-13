<template>
  <div>
    <div v-show="edit == false" @click="editing">
      <span> {{ cell }}</span>
    </div>
    <input ref="cellinput" type="text" v-show="edit == true" v-model="cell" @focus="focused" @blur="edit = false" @keyup.enter="edit == false">
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: ['entry', 'k'],
  data: function() {
    return {
      edit: false
    }
  },
  computed: {
    cell: {
      get: function() {
        return this.entry[this.k]
      },
      set: function(newCellValue) {
        this.$emit('cell-editing', {value: newCellValue, item: this.entry, column: this.k } )
      }
    }
  },
  methods: {
  focused: function() {
  },
   editing: function() {
			this.edit = true;
      this.$nextTick(function () {
        this.$refs.cellinput.focus()
      })
   }
  }
}
</script>

<style lang="css">
</style>
