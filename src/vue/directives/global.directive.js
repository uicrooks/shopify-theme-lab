export default {
  name: 'myDirective',
  directive: {
    beforeMount (el) {
      el.innerText = `“v-my-directive” was used on ${el.innerText}`
    }
  }
}