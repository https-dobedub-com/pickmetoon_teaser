<template>
  <q-page class="flex">
    <div class="main-page main-bg">
      <div class="main-image-inner">
        <img alt="픽미툰 곧 오픈" src="/icons/main-soon.png" class="main-image" />
        <div class="buttons-grid-container">
          <!-- 일반 인플루언서 버튼 -->
          <q-img
            v-for="(influencer) in clickableInfluencers"
            :key="influencer.name"
            :src="influencer.button_image"
            class="dialog-btn"
            @click="handleButtonClick(influencer)"
          />

          <!-- NEXT 버튼 (클릭 불가) -->
          <q-img
            v-if="nextButton"
            :src="nextButton.button_image"
            class="dialog-btn next-button"
          />
        </div>
        <div class="main-txt">
          <span>
            런칭 카운트다운이 시작되었습니다 <br>
            이 시대의 감각을 새롭게 정의하는 콘텐츠 플랫폼 <br>
            PickMeToon — 당신의 감성과 취향에 완벽히 맞춰진 콘텐츠
          </span>
          <p>
            📍 COMING SOON <br>
            🎁 곧 공개될 프리미엄 런칭 이벤트를 놓치지 마세요
          </p>
          <p class="contact">
            다음 픽미툰 아티스트는 바로 당신입니다. <br>
            상상이 현실이 되는 곳, 픽미툰과 함께하세요! <br>
            📬CONTACT : pickmetoon@naver.com
          </p>
        </div>
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
            v-for="content in contents"
            :key="content.title"
            :title="content.title"
            :image="content.image"
            :fontSize="16"
            style="margin-bottom: 40px"
          />
        </div>
        <div class="main-white-box">
          <p style=" width: 65%">섹시함은 더 <span class="text-main-red">리얼</span>하게</p>
          <p style=" width: 70%">스토리는 더 <span class="text-main-red">자극적</span>으로</p>
          <p style=" width: 63%">출연진은 더 <span class="text-main-red">화려</span>하게</p>
        </div>
        <div class="inner-wrapper text-center text-main-white">
          <p class="text-bold" style="margin-bottom: 20px">📍 기존 채널에서 경험할 수 없는,<br>
            '당신만의 팬덤'을 새롭게 창조할 순간이 시작됩니다.
          </p>
          <p class="custom-font" style="font-size: 24px; font-weight: 700; margin: 0"> <span class="custom-font text-main-red">픽미툰</span>에서 가장 먼저 활동하세요</p>
        </div>
        <div class="main-footer">
          <q-img src="/icons/footer.png" class="main-footer-img" />
          <p class="inner-wrapper text-main-white text-center">
            인플루언서에게는 새로운 무대, 새로운 팬덤 <br>
            <strong>PickMeToon</strong>은 단순한 플랫폼이 아닙니다.<br>
            브랜드가 되고 싶은 인플루언서들을 위한 프리미엄 무대입니다
          </p>
        </div>
      </div>
    </div>
    <ProductDialog
      v-model="showProductDialog"
      :influencer="selectedItem"
      :influencers-list="filteredInfluencers"
      :current-index="currentInfluencerIndex"
      @navigate-to-influencer="navigateToInfluencer"
    />
  </q-page>
</template>
<script setup>
import BaseCarousel from "components/BaseCarousel.vue";
import ProductDialog from "src/dialogs/ProductDialog.vue";
import {ref, computed, onMounted} from "vue";
import BaseMainContent from 'components/BaseMainContent.vue'

// 데이터 초기화 (MainData.json 직접 임포트 대신 reactive 상태 사용)
const influencers = ref([]);
const contents = ref([]);

// 데이터 로드 함수
const loadData = async () => {
  try {
    // 모듈 동적 임포트
    const MainData = await import("src/json/MainData.json");
    if (MainData && MainData.default) {
      influencers.value = MainData.default.influencers || [];
      contents.value = MainData.default.contents || [];
    }
  } catch (error) {
    console.error("데이터 로드 중 오류 발생:", error);
    // 기본값 설정
    influencers.value = [];
    contents.value = [];
  }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadData();
});

const showProductDialog = ref(false);
const selectedItem = ref(null);
const currentInfluencerIndex = ref(-1);

// 프로필 이미지가 있는 인플루언서만 필터링 (클릭 가능한 인플루언서)
const filteredInfluencers = computed(() => {
  return influencers.value.filter(influencer =>
    influencer &&
    influencer.profile_image &&
    influencer.profile_image !== '' &&
    influencer.name !== 'NEXT'  // NEXT는 제외
  );
});

// 버튼 이미지가 있고 NEXT가 아닌 인플루언서만 필터링 (클릭 가능한 버튼)
const clickableInfluencers = computed(() => {
  return filteredInfluencers.value.filter(influencer =>
    influencer &&
    influencer.button_image &&
    influencer.button_image !== ''
  );
});

// NEXT 버튼 찾기
const nextButton = computed(() => {
  return influencers.value.find(influencer =>
    influencer && influencer.name === 'NEXT' && influencer.button_image
  );
});

// 기존 캐러셀 클릭 핸들러
const handleItemClick = (item) => {
  if (!item) {
    console.error('선택된 아이템이 없습니다');
    return;
  }

  console.log('선택된 인플루언서:', item.name); // 디버깅용

  // Find index of the selected influencer in the filtered list
  currentInfluencerIndex.value = filteredInfluencers.value.findIndex(infl =>
    infl && infl.name === item.name
  );

  selectedItem.value = item;
  showProductDialog.value = true;
};

// 버튼 이미지 클릭 핸들러 (기존 함수와 동일한 기능)
const handleButtonClick = (item) => {
  if (!item) {
    console.error('선택된 아이템이 없습니다');
    return;
  }

  console.log('버튼 클릭 - 선택된 인플루언서:', item.name); // 디버깅용

  // 인덱스 찾기
  currentInfluencerIndex.value = filteredInfluencers.value.findIndex(infl =>
    infl && infl.name === item.name
  );

  selectedItem.value = item;
  showProductDialog.value = true;
};

// Function to navigate between influencers in the dialog
const navigateToInfluencer = (newIndex) => {
  if (newIndex >= 0 && newIndex < filteredInfluencers.value.length) {
    currentInfluencerIndex.value = newIndex;
    selectedItem.value = filteredInfluencers.value[newIndex];
  }
};
</script>
<style scoped>
.main-page {
  width: 100%;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  gap: 50px;
}
.main-txt{
  padding: 16px 18px;
  color: white;
  border-radius: 10px;
  background-color: #3C3C3C;

  p{
    margin: 0;
    margin-top: 20px;
    font-size: 16px;
  }

  p.contact{
    font-weight: bold;
  }
}
.main-image-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-image{
  margin-top: 200px;
  max-width: 100%;
  max-height: 656px;
  object-fit: contain !important;
}

/* 버튼 그리드 컨테이너 스타일 - 양쪽 끝까지 넓게 배치 */
.buttons-grid-container {
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  padding: 0 10px;
  box-sizing: border-box;
}
.dialog-btn {
  width: 80px;
  height: 113px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  flex: 0 0 auto;
}

.dialog-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* NEXT 버튼 스타일 - 호버 효과 제거, 투명도 효과 추가 */
.next-button {
  cursor: default;
  filter: brightness(0.9);
}

.next-button:hover {
  transform: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
.main-white-box{
  margin-bottom: 40px;
}
.main-white-box p{
  padding-left: 30px;
  font-size: 32px;
  height: 50px;
  font-weight: 800;
  background-color: white;
  line-height: 50px;
  margin-bottom: 10px;
}
.main-footer{
  margin: 60px 0;
  .main-footer-img{
    margin-bottom: 50px;
  }
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
    width: 100%;
  }

  .main-image {
    margin-top: 200px;
  }

  /* 중간 크기 화면에서 그리드 조정 */
  .buttons-grid-container {
    max-width: 350px;
  }

  .dialog-btn {
    width: 70px;
    height: 99px;
    margin-bottom: 15px;
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
  .main-white-box p{
    padding-left: 10px;
    font-size: 24px;
    height: 50px;
    font-weight: 800;
    background-color: white;
    line-height: 50px;
    margin-bottom: 10px;
  }

  /* 작은 화면에서 그리드 조정 */
  .buttons-grid-container {
    max-width: 300px;
  }

  .dialog-btn {
    width: 60px;
    height: 85px;
    border-radius: 8px;
    margin-bottom: 12px;
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

  .buttons-grid-container {
    max-width: 280px;
  }

  .dialog-btn {
    width: 55px;
    height: 78px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 360px) {
  .main-white-box p{
    padding-left: 10px;
    font-size: 20px;
    height: 50px;
    font-weight: 800;
    background-color: white;
    line-height: 50px;
    margin-bottom: 10px;
  }

  /* 가장 작은 화면에서 그리드 조정 */
  .buttons-grid-container {
    max-width: 240px;
  }

  .dialog-btn {
    width: 48px;
    height: 68px;
    margin-bottom: 8px;
  }
}
</style>
