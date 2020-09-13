export default {
  name: 'log',
  directive: {
    inserted (el) {
      console.log(el)
    }
  }
}