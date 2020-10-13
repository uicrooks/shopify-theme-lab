<template>
  <div>
    <div class="bg-gray-800 text-white p-6">
      <slot />

      <ul>
        <li
          v-for="(value, key) in shopifyData"
          :key="key"
        >
          {{ key }}: <span class="text-gray-500">{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * if a name is defined, you can use the component as <system-info></system-info> in .liquid files,
   * otherwise the component will be named after the file path starting from components/ directory
   * for this file it is: <render-system-info></render-system-info>
   */
  // name: 'systemInfo',
  props: {
    shopifyData: {
      type: Object,
      required: true
    }
  }
}
</script>