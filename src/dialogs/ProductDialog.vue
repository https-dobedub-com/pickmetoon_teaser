<!-- components/ItemDialog.vue -->
<template>
  <q-dialog v-model="isOpen">
    <q-card class="dialog-card">
      <q-btn class="close-btn" flat round dense v-close-popup :ripple="false">
        <q-icon>
          <img src="/icons/close.svg" style="width: 50px; height: 50px;" alt="close"/>
        </q-icon>
      </q-btn>
      <div class="product-background"
           :style="{backgroundImage: `url(${product.background})`}"
      >
        <div class="product-title">
          <img :src="product.titleImage" alt="title" class="title-image"/>
          <div class="button-group">
            <button type="button" class="go-product">작품 바로가기</button>
            <button type="button" class="bookmark">찜하기</button>
          </div>
        </div>
      </div>
      <div class="product-info">
        <p class="subtitle">{{ product.subtitle }}</p>
        <p class="description">{{ product.description }}</p>
      </div>
      <div class="episode-list">
        <div class="section-header row justify-between items-center">
          <h3 class="section-title">회차</h3>
          <q-btn
              class="sort-btn"
              flat
              @click="isReversed = !isReversed"
              :ripple="false"
          >
            <span class="sort-text">{{ isReversed ? '최신순' : '처음부터' }}</span>
            <q-icon>
              <img src="/icons/sort.svg" style="width: 32px; height: 32px;" alt="sort"/>
            </q-icon>
          </q-btn>
        </div>
        <div class="episodes">
          <div
              v-for="(episode, index) in displayedEpisodes"
              :key="index"
              class="episode-item row items-center justify-between"
          >
            <div class="row items-center justify-start">
              <p class="episode-number">
                {{ isReversed ? totalEpisodes - index : index + 1 }}
              </p>
              <div class="thumbnail">
                <q-img :src="episode.thumbnail" :alt="episode.title" class="thumbnail-image" fit="cover"/>
              </div>
              <p class="title">{{ episode.title }}</p>
            </div>
            <p class="duration">{{ episode.duration }}</p>
          </div>
        </div>
        <div v-if="product.episodes.length > 5" class="divider">
          <q-btn class="expand-btn" @click="isEpisodeExpanded = !isEpisodeExpanded" flat no-focus>
            <q-icon>
              <img src="/icons/expand.svg" :class="{ 'rotate-180': isEpisodeExpanded }" style="width: 48px; height: 48px;" alt="expand"/>
            </q-icon>
          </q-btn>
        </div>
      </div>
      <div class="similar-list">
        <div class="section-header">
          <h3 class="section-title">유사한 작품</h3>
        </div>
        <div class="similar row justify-start" style="gap: 10px">
          <div
              v-for="(similar, index) in displayedSimilar"
              :key="index"
              class="similar-item"
          >
            <div class="similar-thumbnail">
              <q-img :src="similar.image" alt="similar product" class="similar-image" fit="cover"/>
            </div>
          </div>
        </div>
        <div v-if="product.similarList?.length > 8" class="divider">
          <q-btn class="expand-btn" @click="isSimilarExpanded = !isSimilarExpanded" flat no-focus>
            <q-icon>
              <img
                  src="/icons/expand.svg"
                  :class="{ 'rotate-180': isSimilarExpanded }"
                  style="width: 48px; height: 48px;"
                  alt="expand"
              />
            </q-icon>
          </q-btn>
        </div>
      </div>
      <div class="detail">
        <div class="section-header">
          <h3 class="section-title">상세정보</h3>
        </div>
        <div class="detail-info">
          <p class="writer">글작가: {{ product.detail.writer}}</p>
          <p class="illustrator">그림작가: {{ product.detail.illustrator}}</p>
          <p class="cast">출연: {{ product.detail.cast}}</p>
          <p class="genre">장르: {{ product.detail.genre}}</p>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {defineProps, defineEmits, computed, ref} from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isReversed = ref(false)
const isEpisodeExpanded = ref(false)
const isSimilarExpanded = ref(false)
const totalEpisodes = computed(() => props.product.episodes?.length || 0)

// 표시할 에피소드 계산
const displayedEpisodes = computed(() => {
  let episodes = [...(props.product.episodes || [])]

  if (isReversed.value) {
    episodes = episodes.slice().reverse()
  }

  if (!isEpisodeExpanded.value) {
    episodes = episodes.slice(0, 5)
  }

  return episodes
})

// 표시할 유사 작품 계산
const displayedSimilar = computed(() => {
  let similar = [...(props.product.similarList || [])]

  if (!isSimilarExpanded.value) {
    similar = similar.slice(0, 8)
  }

  return similar
})
</script>

<style scoped>
.dialog-card {
  min-width: 1095px;
  max-width: 1095px;
  position: relative;
  background-color: #181818;

  .close-btn {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 50px;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    z-index: 9999;
  }

  .product-background {
    width: 100%;
    height: 720px;
    background-size: contain;
    background-position: center top;
    background-repeat: no-repeat;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 360px;
      background: linear-gradient(
          to top,
          rgba(24, 24, 24, 1) 50%,
          rgba(24, 24, 24, 0.95) 52%,
          rgba(24, 24, 24, 0.9) 55%,
          rgba(24, 24, 24, 0.85) 57%,
          rgba(24, 24, 24, 0.8) 60%,
          rgba(24, 24, 24, 0.7) 70%,
          rgba(24, 24, 24, 0.6) 80%,
          rgba(24, 24, 24, 0.5) 90%,
          transparent 100%
      );
      pointer-events: none;
      z-index: 1;
    }

    .product-title {
      position: absolute;
      left: 75px;
      bottom: 20px;
      z-index: 2;

      .title-image {
        height: 180px;
        margin: 0 0 45px;
      }

      .button-group {
        display: flex;
        gap: 30px;

        button {
          border: 1px solid #fff;
          border-radius: 10px;
          outline: none;
          line-height: 1;
          font-size: 24px;
          font-weight: 900;
          padding: 0 35px 0 65px;
          height: 58px;
          background-position: 22px center;
          background-repeat: no-repeat;
          cursor: pointer;

          &.go-product {
            background-size: 24px 24px;
            background-color: #fff;
            color: #000;
            background-image: url("/icons/go-btn.svg");
          }

          &.bookmark {
            background-size: 29px 28px;
            background-color: transparent;
            color: #fff;
          }
        }
      }
    }
  }

  .product-info {
    padding: 35px 75px 40px 75px;

    p {
      color: #fff;
      letter-spacing: -0.5px;
      margin: 0;
      font-size: 24px;

      &.subtitle {
        font-weight: 900;
        line-height: 1;
        margin-bottom: 20px;
      }

      &.description {
        font-weight: 400;
        line-height: 1.5;
        white-space: pre-wrap;
      }
    }
  }
  .section-header {
    padding-bottom: 25px;
    .section-title {
      margin: 0;
      color: #fff;
      font-size: 32px;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.5px;
    }
    .sort-btn {
      padding: 0;
      .sort-text {
        color: #fff;
        font-size: 27px;
        font-weight: 400;
        line-height: 1;
        letter-spacing: -0.5px;
        padding-right: 10px;
      }
    }
  }
  .episode-list {
    padding: 70px 75px 0 75px;
    border-top: 1px solid #d9d9d9;
    .episodes {
      .episode-item {
        padding: 17px 0;
        &:not(:last-of-type) {
          border-bottom: 1px solid #d9d9d9;
        }
        >div {
          .episode-number {
            color: #fff;
            font-size: 40px;
            font-weight: 300;
            line-height: 1;
            letter-spacing: -0.5px;
            margin: 0;
            padding: 0 23px 0 17px;
          }
          .thumbnail {
            cursor: pointer;
            position: relative;
            &:after {
              content: '';
              display: block;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background-image: url("/icons/play.svg");
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            }
            .thumbnail-image {
              width: 180px;
              height: 100px;
            }
          }
          .title {
            padding: 0 0 0 23px;
            margin: 0;
            color: #fff;
            font-size: 24px;
            font-weight: 900;
            line-height: 1;
            letter-spacing: -0.5px;
          }
        }
        .duration {
          margin: 0;
          color: #fff;
          font-size: 24px;
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.5px;
        }
      }
    }
  }
  .similar-list {
    padding: 60px 75px 0 75px;
    .similar {
      padding-bottom: 25px;
      .similar-image {
        width: 225px;
        height: 337px;
      }
    }
  }
  .detail {
    padding: 60px 75px;
    .detail-info {
      p {
        margin: 0;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: -0.5px;
      }
    }
  }
}
.divider {
  height: 3px;
  background-color: #d9d9d9;
  overflow: visible;
  position: relative;
  .expand-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
}
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
