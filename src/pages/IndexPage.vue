<template>
  <q-page class="flex">
    <div class="main-page">
      <q-img src="/icons/Group-2613907.png" class="main-image" > </q-img>
      <div class="main-data">
        <div class="main-data-header">
          <q-img src="/icons/pickme-logo.png" style="width: 63px;"/>
        </div>
        <BaseCarousel
          v-if="filteredInfluencers.length > 0"
          :slides="filteredInfluencers"
          :container-width="456"
          :carousel-height="540"
          :items-per-view="1"
          :slide-width="456"
          :gap="15"
          @item-click="handleItemClick"
        />
      </div>
    </div>
    <ProductDialog
      v-model="showProductDialog"
      :product="selectedItem"
    />
  </q-page>
</template>
<script setup>
import BaseCarousel from "components/BaseCarousel.vue";
import MainData from "src/json/MainData.json"
import ProductDialog from "src/dialogs/ProductDialog.vue";
import {ref} from "vue";
import { computed } from 'vue'

const showProductDialog = ref(false)
const selectedItem = ref(null)

// 프로필 이미지가 있는 인플루언서만 필터링
const filteredInfluencers = computed(() => {
  return MainData.influencers.filter(influencer =>
    influencer.profile_image !== null &&
    influencer.profile_image !== ''
  );
});

// const handleItemClick = () => {
//   selectedItem.value = ProductData;
//   showProductDialog.value = true
// }

</script>
<style scoped>
.main-page {
  width: 100%;
  background-color: black;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  gap: 50px;
}
.main-image{
  margin-top: 70px;
  max-width: 400px;
  max-height: 656px;
}
.main-data{
  width: 516px !important;
  overflow: hidden;

  .main-data-header {
    height: 60px;
    padding: 17px 30px;
  }
}
@media screen and (max-width: 960px) {
  .main-page {
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0;
  }
}

@media screen and (max-width: 516px) {
  .main-data{
    width: 100% !important;
    overflow: hidden;

    .main-data-header {
      height: 60px;
      padding: 17px 30px;
    }
  }
}
</style>
