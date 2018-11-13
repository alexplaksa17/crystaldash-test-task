const Components = {
  DataTable,
  Cell
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
