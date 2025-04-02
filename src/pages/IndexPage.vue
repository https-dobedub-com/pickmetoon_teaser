<template>
  <q-page class="flex">
    <div class="main-page">
      <div class="main-image-inner">
        <img alt="픽미툰 곧 오픈" src="/icons/Group-2613907.png" class="main-image" />
      </div>
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
        <div class="inner-wrapper main-data-txt text-center ">
          <div class="main-data-txt-chip flex flex-center">
            <span class="custom-font chip ">감성</span>
            <span class="custom-font">+</span>
            <span class="custom-font chip">상상</span>
            <span class="custom-font">+</span>
            <span class="custom-font chip">현실감각</span>
          </div>
          <p class="custom-font text-main-white q-mt-md q-mb-lg" style="font-size: 20px" >모두 충전되는 오감 몰입형 엔터테인먼트가 시작된다</p>
          <div class="text-white main-text-infor text-center">
            <p>지금까지와는 전혀 다른 팬층을 만날 수 있는 기회</p>
            <p>웹툰 속 캐릭터로 사랑받는 당신,</p>
            <p>화보·더빙·숏폼으로 확장되는 IP 자산,</p>
            <p>그리고 콘텐츠마다 각인되는 목소리의 아이덴티티</p>
          </div>
          <BaseMainContent
            v-for="content in MainData.contents"
            :key="content.title"
            :title="content.title"
            :image="content.image"
            :fontSize="16"
          />
        </div>
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
import {ref, onMounted, computed} from "vue";
import BaseMainContent from 'components/BaseMainContent.vue'

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
onMounted(() => {
  console.log('--- MainData 디버깅 시작 ---');

  // 전체 MainData 확인
  console.log('MainData 전체:', MainData);

  // contents 배열 확인
  console.log('contents 배열 존재 여부:', MainData.contents);

  if (MainData.contents) {
    console.log('contents 배열 길이:', MainData.contents.length);

    // 각 항목 내용 디버깅
    MainData.contents.forEach((item, index) => {
      console.log(`콘텐츠 항목 #${index + 1}:`, item);
      console.log(`콘텐츠 #${index + 1} title:`, item.title);
      console.log(`콘텐츠 #${index + 1} image:`, item.image);

      // 추가 속성 확인
      const otherProps = Object.keys(item).filter(key => key !== 'title' && key !== 'image');
      if (otherProps.length > 0) {
        console.log(`콘텐츠 #${index + 1} 기타 속성:`, otherProps);
      }
    });
  } else {
    console.warn('경고: contents 배열이 없거나 비어있습니다!');
  }

  console.log('--- MainData 디버깅 완료 ---');
});
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
  max-width: 100%;
  max-height: 656px;
  object-fit: contain !important;
}

.main-data{
  width: 516px !important;
  overflow: hidden;

  .main-data-header {
    height: 60px;
    padding: 17px 30px;
  }
}
.main-text-infor p{
  margin: 8px 0;
}
.main-data-txt-chip {
  color: #FF2D55 !important;

}
.custom-font.chip{
  display: inline-block;
  width: 100px;
  height: 50px;
  margin: 0 5px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #FF2D55;
  border-radius: 25px;
}
@media screen and (max-width: 960px) {
  .main-page {
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0;
  }
  .main-image-inner{
    padding: 0 18px;
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
@media screen and (max-width: 400px) {
  .custom-font.chip{
    display: inline-block;
    width: 75px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #FF2D55;
    border-radius: 25px;
  }
}
</style>
