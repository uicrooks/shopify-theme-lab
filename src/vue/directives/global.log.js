export default {
  name: 'log', // use on a component with 'v-log'
  directive: {
    inserted (el) {
      console.log(el)
    }
  }
}