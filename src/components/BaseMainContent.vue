<template>
  <div class="base-content-wrap">
    <div class="image-container">
      <q-img
        :src="props.image"
        style="width: 100%; height: 100%;"
        fit="cover"
      />
    </div>
    <p
      class="text-main-white base-title"
      style="text-align: justify;"
      :style="{
        fontSize: `${props.fontSize}px`
      }"
    >
      {{ props.title }}
    </p>
  </div>
</template>

<script setup>
// props 정의
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  fontSize: {
    type: Number,
    default: 16
  }
});

</script>

<style scoped>
.base-title {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
}

.image-container {
  margin-top: 40px;
  margin-bottom: 5px;
  overflow: hidden;
  border-radius: 10px;
}

p {
  margin: 0;
  font-weight: 500;
}
</style>
