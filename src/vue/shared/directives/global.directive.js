export default {
  name: 'myDirective',
  directive: {
    inserted (el) {
      el.innerText = `“v-my-directive” was used on ${el.innerText}`
    }
  }
}