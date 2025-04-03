<template>
  <q-dialog v-model="isOpen" maximized >
    <q-card class="dialog-card">
      <q-btn class="close-btn" flat round dense v-close-popup :ripple="false">
        <q-icon>
          <img src="/icons/close.svg" style="width: 24px; height: 24px;" alt="close"/>
        </q-icon>
      </q-btn>
      <div class="dialog-content">
        <div class="image-gallery">
          <q-img class="big-image" :src="currentImage" style="width: 540px"/>
        </div>
        <div class="people-info">
          <div class="info-section scrollable" :class="{'desktop-layout': !isMobile}">
            <div class="influencer-profile">
              <strong class="influencer-name custom-font">{{ influencer.name }}</strong>
              <span v-if="influencer.tag">{{influencer.tag}}</span>
            </div>
            <p class="body-profile custom-font-size" v-if="influencer.body_profile">{{ influencer.body_profile }}</p>
            <div class="sns-links" v-if="hasAnySns">
              <q-img
                flat
                class="sns-btn"
                v-if="hasInstagram"
                @click="openSnsLink('instagram')"
                src="https://pikmetoon.s3.ap-northeast-2.amazonaws.com/teaser/images/link_insta.png"
                style="cursor: pointer;"
              />
              <q-img
                flat
                class="sns-btn"
                v-if="hasYoutube"
                @click="openSnsLink('youtube')"
                src="https://pikmetoon.s3.ap-northeast-2.amazonaws.com/teaser/images/link_youtube.png"
                style="cursor: pointer;"
              />
              <q-img
                flat
                class="sns-btn"
                v-if="hasTiktok"
                @click="openSnsLink('tictok')"
                src="https://pikmetoon.s3.ap-northeast-2.amazonaws.com/teaser/images/link_tiktok.png"
                style="cursor: pointer;"
              />
              <q-img
                flat
                class="sns-btn"
                v-if="hasX"
                @click="openSnsLink('x')"
                src="https://pikmetoon.s3.ap-northeast-2.amazonaws.com/teaser/images/link_twitter.png"
                style="cursor: pointer;"
              />
              <q-img
                flat
                class="sns-btn"
                v-if="hasFantrie"
                @click="openSnsLink('fantrie')"
                src="https://pikmetoon.s3.ap-northeast-2.amazonaws.com/teaser/images/link_fantire.png"
                style="cursor: pointer;"
              />
              <q-img
                flat
                class="sns-btn"
                v-if="hasLikey"
                @click="openSnsLink('likey')"
                src="https://pikmetoon.s3.ap-northeast-2.amazonaws.com/teaser/images/link_likey.png"
                style="cursor: pointer;"
              />
            </div>
            <p class="description">{{ influencer.description }}</p>
          </div>

          <div class="thumbnail-section" :class="{'desktop-layout': !isMobile}">
            <div class="thumbnails-container">
              <div
                v-for="(image, index) in influencer.image_list"
                :key="index"
                class="thumbnail"
                @click="currentImage = image"
                :class="{ 'active': currentImage === image }"
              >
                <q-img :src="image" class="thumbnail-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  influencer: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 선택된 이미지
const currentImage = ref('')

// 모바일 화면 체크
const isMobile = ref(false)

// 화면 크기 변경 감지
const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 960
}

// 다이얼로그가 열릴 때 첫 번째 이미지를 기본값으로 설정
const updateCurrentImage = () => {
  if (props.influencer && props.influencer.image_list && props.influencer.image_list.length > 0) {
    currentImage.value = props.influencer.image_list[0]
  }
}

// isOpen 값이 변경될 때마다 이미지 업데이트
watch(() => isOpen.value, (newVal) => {
  if (newVal) {
    updateCurrentImage()
  }
})

// 컴포넌트가 마운트될 때와 influencer 값이 변경될 때도 이미지 업데이트
watch(() => props.influencer, () => {
  updateCurrentImage()
}, { immediate: true })

onMounted(() => {
  updateCurrentImage()
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// SNS 링크 존재 확인 함수
const checkSnsLink = (type) => {
  return props.influencer?.sns_list &&
    props.influencer.sns_list.some(sns => sns[type] && sns[type] !== '')
}

// 각 SNS 플랫폼 링크 확인
const hasInstagram = computed(() => checkSnsLink('instagram'))
const hasYoutube = computed(() => checkSnsLink('youtube'))
const hasTiktok = computed(() => checkSnsLink('tictok'))
const hasX = computed(() => checkSnsLink('x'))
const hasFantrie = computed(() => checkSnsLink('fantrie'))
const hasLikey = computed(() => checkSnsLink('likey'))

// 어떤 SNS 링크라도 있는지 확인
const hasAnySns = computed(() => {
  return hasInstagram.value || hasYoutube.value || hasTiktok.value ||
    hasX.value || hasFantrie.value || hasLikey.value
})

// SNS URL 가져오기
const getSnsUrl = (type) => {
  if (!checkSnsLink(type)) return ''
  const snsObj = props.influencer.sns_list.find(sns => sns[type])
  return snsObj[type] || ''
}

// SNS 링크 열기
const openSnsLink = (type) => {
  const url = getSnsUrl(type)
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
/* 스크롤 가능하지만 스크롤바는 보이지 않게 하는 클래스 */
.scrollable {
  overflow-y: auto !important;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollable::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.dialog-card {
  max-width: 944px !important;
  max-height: 720px !important;
  width: 944px !important;
  height: 720px !important;
  margin: auto;
  position: relative;
  background-color: white;
  border-radius: 10px !important;
  overflow: hidden; /* 필요한 경우에만 스크롤 */
}

.close-btn {
  position: absolute;
  right: 30px;
  top: 30px;
  width: 50px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 9999;
}

.dialog-content {
  display: flex;
  height: 100%;
  width: 100%;
}

.image-gallery {
  width: 540px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.big-image {
  height: auto;
  object-fit: contain;
}

/* 데스크톱에서만 적용되는 높이 제한 */
.desktop-layout {
  height: 50%;
}

.info-section {
  padding-right: 10px;
}

.thumbnail-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnails-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.thumbnail {
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.thumbnail.active {
  border-color: #FF2D55;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sns-links{
  margin: 10px 0;
  display: flex;
  gap: 10px;
}

.people-info {
  width: 404px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.influencer-profile {
  display: flex;
  align-items: baseline;
  gap: 15px;
}

.influencer-name {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
}

.body-profile {
  font-size: 18px;
  margin: 0;
}

.description {
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 0;
}

.sns-btn {
  width: 30px; height: 30px;
}

@media screen and (max-width: 960px) {
  .dialog-card {
    max-width: 405px !important;
    max-height: 90vh !important;
    width: 90vw !important;
    height: 90vh !important;
    margin: auto;
    position: relative;
    background-color: white;
    border-radius: 10px !important;
  }

  .dialog-content {
    flex-direction: column;
    overflow-y: auto !important; /* 중요: 모바일에서 스크롤 허용 */
    height: 100%;
  }

  .image-gallery {
    width: 100%;
    height: auto;
    min-height: 300px;
    max-height: 50vh;
  }

  .big-image {
    width: 100% !important;
  }

  .people-info {
    width: 100%;
    padding: 20px;
    overflow-y: visible; /* 중요: 스크롤을 .dialog-content로 위임 */
  }
  .influencer-profile{
    margin-top: 20px;
  }
  .info-section, .thumbnail-section {
    height: auto !important; /* 중요: 모바일에서 높이 제한 해제 */
    overflow: visible !important; /* 중요: 스크롤을 .dialog-content로 위임 */
  }

  .thumbnails-container {
    padding: 5px;
    gap: 5px;
  }

  .influencer-name {
    font-size: 24px;
  }

  .body-profile {
    font-size: 16px;
  }

  .description {
    font-size: 14px;
  }
}
</style>
