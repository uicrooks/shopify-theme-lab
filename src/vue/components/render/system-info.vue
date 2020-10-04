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
  props: {
    shopifyData: {
      type: Object,
      required: true
    }
  }
}
</script>