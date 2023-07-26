<script setup>
  import { onMounted, onUpdated, ref } from 'vue';
  import { useDragStore } from '../stores';

  const store = useDragStore()

  const { vnode, style, customTag } = defineProps(['vnode', 'style', 'customTag'])

  const vnodeEl = ref(null)

  const vnodeTag = ref(vnode.tag)
  if(vnode.value && !customTag) {
    vnodeTag.value = 'input'
  }

  onMounted(()=> {
    if(vnode.value) {
			vnodeEl.value.innerHTML = vnode.value
      if(customTag) {
        vnodeEl.value.removeAttribute('value', '')
      }
		}
    if(vnode.className) {
      vnodeEl.value.setAttribute('class', vnode.className)
    }
    if(vnode.attrs) {
      Object.keys(vnode.attrs).forEach(key => {
        vnodeEl.value.setAttribute(key, vnode.attrs[key])
      })
    }
    if(style) {
      vnodeEl.value.style = style
    }
  })

  const handleInput = (e, v) => {
    vnode.value = e.target.value
  }

  const handleDel = () => {
    store.deleteTemp(vnode.tempId)
  }

</script>

<template>
  <component
    :is="vnodeTag" ref="vnodeEl"
    :value="vnode.value"
    @input.self="(e) => handleInput(e, vnode)"
  >
    <a
      class="delete" v-if="vnode.isTop"
      @click="handleDel">
      删除
    </a>
    <ViewShow
      v-for="v in (vnode.children || [])"
      :key="v.tempId || ''"
      :vnode="v" :customTag="customTag" :style="style"
    />
  </component>
</template>

<style lang="scss">
  .delete {
    padding: 5px 10px;
    background: #ffff;
    position: absolute;
    right: 10px;
    top: 1px;
    z-index: 99;
    cursor: pointer;
    color: #436fff;
    &:hover {
      text-decoration: underline;
    }
  }
  .content-header {
    width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;

    .title {
      font-size: 36px;
      font-family: HKGrotesk-Bold, HKGrotesk;
      font-weight: bold;
      color: #1D2129;
      line-height: 41px;
      text-align: center;
    }
    .des {
      font-size: 20px;
      font-family: HKGrotesk-Medium, HKGrotesk;
      font-weight: 500;
      color: #1D2129;
      line-height: 28px;
      text-align: center;
      margin-top: 4px;
    }
  }
  .content-banner {
    position: relative;
    display: block;
    width: 800px;
    height: 450px;
    margin: 42px auto;
    .banner {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .content-trial {
    position: relative;
    width: 800px;
    padding: 28px 22px;
    background: #DCE8FF;
    border-radius: 8px;
    margin: 32px auto;
    display: flex;
    align-items: center;
    :deep(input) {
      background: #DCE8FF;
    }
    .trial-left {
      width: 486px;
      .left-header {
        .log-img {
          display: block;
          width: 100px;
          height: 40px;
          margin-bottom: 13px;
        }
      }
      .des {
        font-size: 16px;
        font-family: HKGrotesk-Bold, HKGrotesk;
        font-weight: bold;
        color: #1D2129;
        line-height: 22px;
      }
    }
    .trial-right {
      margin-left: 50px;
      .trial-link {
        display: block;
        padding: 10px 26px;
        background: #4370FF;
        border-radius: 4px;
        border: 1px solid #9CC4FF;
        font-size: 14px;
        font-family: HKGrotesk-Bold, HKGrotesk;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 17px;
        text-align: center;
      }
    }
  }

  .content-box {
    position: relative;
    width: 800px;
    text-align: left;
    margin: 32px auto 0 auto;
    .title {
      font-size: 24px;
      font-family: HKGrotesk-Bold, HKGrotesk;
      font-weight: bold;
      color: #1D2129;
      line-height: 30px;
    }
    .min-title {
      font-size: 18px;
      font-family: HKGrotesk-Bold, HKGrotesk;
      font-weight: bold;
      color: #1D2129;
      line-height: 24px;
      margin-bottom: 20px;
      margin-bottom: 10px;
    }
    .des {
      font-size: 16px;
      font-family: HKGrotesk-Medium, HKGrotesk;
      font-weight: 500;
      color: #1D2129;
      line-height: 24px;
    }
  }
</style>