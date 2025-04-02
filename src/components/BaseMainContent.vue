<template>
  <div class="base-title" :class="{ 'wide': props.isWide }">
    <p
        :style="{
        color: props.textColor,
        fontSize: `${props.fontSize}px`
      }"
    >
      {{ props.title }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  fontSize: {
    type: Number,
    default: 40
  },
  isWide: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-title {
  padding-bottom: 50px;
  &.wide {
    padding-bottom: 160px;
  }
  p {
    margin: 0;
    line-height: 1;
    font-weight: 900;
  }
}
</style>