<template>
  <div class="carousel-wrapper">
    <div class="carousel-container">
      <div class="carousel-track-wrapper">
        <div
          class="carousel-track"
          :style="{
            transform: `translateX(${translateX}px)`,
          }"
        >
          <div
            v-for="(slide, index) in slides"
            :key="slide.profile_image"
            class="slide-item"
            @click="handleItemClick"
            :style="[
                {
                  width: `${currentSlideWidth}px`,
                  height: `${currentCarouselHeight}px`,
                  marginRight: `${index < slides.length - 1 ? gap : 0}px`,
                }
              ]"
          >
            <div class="image-container">
              <q-img
                :src="slide.profile_image"
                style="width: 100%; height: 100%;"
                fit="cover"
              />
            </div>
            <div class="button-container" @click.stop="openInstagram(slide)">
              <q-img
                class="insta-button"
                src="/icons/instagram-icon.png"
              />
            </div>
            <div
              v-if="isItemFaded(index)"
              class="slide-overlay"
            ></div>
            <div
              v-if="!isItemFaded(index) && isWide"
              class="slide-index"
            >{{ index + 1 }}</div>
          </div>
        </div>
      </div>
    </div>
    <button
      v-show="canScrollPrev"
      @click="handlePrev"
      class="nav-button prev"
    >
    </button>
    <button
      v-show="canScrollNext"
      @click="handleNext"
      class="nav-button next"
    >
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  isWide: {
    type: Boolean,
    default: false
  },
  containerWidth: {
    type: Number,
    default: 516
  },
  carouselHeight: {
    type: Number,
    default: 360
  },
  itemsPerView: {
    type: Number,
    default: 1
  },
  slideWidth: {
    type: Number,
    default: 456
  },
  gap: {
    type: Number,
    default: 5
  },
  autoSlideInterval: {
    type: Number,
    default: 3500
  }
})

const currentIndex = ref(0)
const currentContainerWidth = ref(props.containerWidth)
let autoSlideTimer = null

// 자동 슬라이드 기능
const startAutoSlide = () => {
  stopAutoSlide() // 기존 타이머 제거
  autoSlideTimer = setInterval(() => {
    if (canScrollNext.value) {
      currentIndex.value++
    } else {
      // 마지막 슬라이드에 도달하면 처음으로 돌아감
      currentIndex.value = 0
    }
  }, props.autoSlideInterval)
}

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer)
    autoSlideTimer = null
  }
}

// 화면 너비 변화에 따른 조정
const handleResize = () => {
  // 패딩과 여백을 고려하여 컨테이너 너비 계산
  const screenWidth = window.innerWidth
  // 양쪽 여백을 고려한 최대 너비 설정 (80px은 양쪽 여백과 패딩의 합)
  currentContainerWidth.value = Math.min(screenWidth - 80, props.containerWidth)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  startAutoSlide() // 자동 슬라이드 시작

  // 디버깅용
  console.log('슬라이드 설정:', {
    containerWidth: props.containerWidth,
    slideWidth: props.slideWidth,
    gap: props.gap,
    slides: props.slides.length
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  stopAutoSlide() // 컴포넌트 언마운트 시 타이머 제거
})

// 현재 슬라이드 너비와 높이 계산
const currentSlideWidth = computed(() => {
  const ratio = currentContainerWidth.value / props.containerWidth
  return Math.floor(props.slideWidth * ratio)
})

const currentCarouselHeight = computed(() => {
  const ratio = currentContainerWidth.value / props.containerWidth
  return Math.floor(props.carouselHeight * ratio)
})

const totalWidth = computed(() => {
  return (currentSlideWidth.value + props.gap) * props.slides.length - props.gap
})

const maxTranslate = computed(() => {
  return -(totalWidth.value - currentContainerWidth.value)
})

const translateX = computed(() => {
  const calculatedTranslate = -(currentIndex.value * (currentSlideWidth.value + props.gap))
  if (currentIndex.value === 0) return 0
  return Math.max(maxTranslate.value, calculatedTranslate)
})
const canScrollPrev = computed(() => {
  return currentIndex.value > 0
})
const canScrollNext = computed(() => {
  const lastVisibleIndex = currentIndex.value + props.itemsPerView - 1
  return lastVisibleIndex < props.slides.length - 1
})

const isItemFaded = (index) => {
  const startIndex = currentIndex.value
  const endIndex = startIndex + props.itemsPerView - 1
  return index < startIndex || index > endIndex
}

const handlePrev = () => {
  if (canScrollPrev.value) {
    currentIndex.value--
    stopAutoSlide() // 수동 조작 시 자동 슬라이드 일시 중지
    startAutoSlide() // 다시 시작
  }
}
const handleNext = () => {
  if (canScrollNext.value) {
    currentIndex.value++
    stopAutoSlide() // 수동 조작 시 자동 슬라이드 일시 중지
    startAutoSlide() // 다시 시작
  }
}

const emit = defineEmits(['item-click'])

const handleItemClick = () => {
  emit('item-click')
}

// 인스타그램 링크 열기
const openInstagram = (slide) => {
  // sns_list에서 인스타그램 링크 찾기
  if (slide.sns_list && Array.isArray(slide.sns_list)) {
    const instagramItem = slide.sns_list.find(item => item.instagram !== undefined)
    if (instagramItem && instagramItem.instagram) {
      // 인스타그램 링크가 있으면 새 창에서 열기
      window.open(instagramItem.instagram, '_blank')
    } else {
      // 링크가 없으면 기본 인스타그램 페이지로 이동
      window.open('https://www.instagram.com/', '_blank')
    }
  } else {
    // sns_list가 없으면 기본 인스타그램 페이지로 이동
    window.open('https://www.instagram.com/', '_blank')
  }
}
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: visible;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.carousel-container {
  position: relative;
  width: 516px;
  max-width: calc(100% - 80px);
  box-sizing: border-box;
}

.carousel-track-wrapper {
  position: relative;
  overflow: visible;
  margin: 0 -3000px;
  padding: 0 3000px;
  line-height: 0;
  font-size: 0;
}

.carousel-track {
  display: inline-block;
  transition: transform 0.3s ease;
  white-space: nowrap;
  font-size: 0;
}

.slide-item {
  position: relative;
  display: inline-block;
  vertical-align: top;
  transition: all 0.3s ease;
  z-index: 2;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.button-container {
  position: absolute;
  right: 20px;
  bottom: 50px;
  z-index: 5;
  width: 42px;
  height: 42px;
  cursor: pointer;
}

.insta-button {
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease;
}

.button-container:hover .insta-button {
  transform: scale(1.1);
}

.slide-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.slide-index {
  position: absolute;
  bottom: calc(100% + 20px);
  left: 20px;
  font-size: 140px;
  font-weight: 900;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #fff;
  z-index: -1;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  z-index: 1000; /* 매우 높은 z-index 값 */
  border-radius: 50%;
  padding: 0;
  width: 31px;
  height: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
}
.nav-button.prev {
  background-image: url("/icons/left_arrow.svg");
  left: 0; /* 항상 오른쪽에 위치 */
}
.nav-button.next {
  background-image: url("/icons/right_arrow.svg");
  right: 0; /* 항상 오른쪽에 위치 */
}

@media screen and (max-width: 560px) {
  .button-container {
    width: 32px;
    height: 32px;
    right: 10px;
    bottom: 30px;
  }

  .nav-button {
    width: 25px;
    height: 40px;
  }
}
</style>
