export default {
  name: 'myDirective',
  directive: {
    inserted (el) {
      console.log(`${el.innerText} “v-my-directive” was used on this element.`)
    }
  }
}