<script setup>
  import ViewShow from './ViewShow.vue';
  import { useDragStore } from '../stores';
  import { computed, nextTick, ref, watch } from 'vue';

  const templateView = ref(null)
  const store = useDragStore()

  const dragOver = (event) => {
    store.changeDragTarget(event.toElement)
  }
  const targetVnode = computed(() => store.targetVnode)

  const copyTemp = () => {
    nextTick(() => {
      const rootEl = templateView.value.querySelector('.root-box')
      const copyText = rootEl.innerHTML.replaceAll('<!--v-if-->', '').replaceAll('<a class="delete"> 删除 </a>', '')

      const textarea = document.createElement("textarea");
      textarea.value = copyText;

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand('copy');

      document.body.removeChild(textarea);
    })
  }

</script>

<template>
  <div class="template-view" @dragover="dragOver" ref="templateView">
    <a class="copy-template" @click="copyTemp">复制模板</a>
    <ViewShow :vnode="targetVnode" :customTag="true"/>
  </div>
</template>

<style lang="scss">
  .template-view {
    height: 100vh;
    overflow: auto;
    padding: 20px 0;
    position: relative;
    .copy-template {
      position: fixed;
      left: 10px;
      top: 10px;
      color: red;
      cursor: pointer;
    }
  }
</style>