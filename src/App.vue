<script setup>
  import DragInsert from './components/DragInsert.vue';
  import Template from './components/Template.vue';

  import { useDragStore } from './stores';

  const store = useDragStore()

  const dragOver = (event) => {
    store.changeDragTarget(null)
  }
</script>

<template>
  <div class="page-view" @dragover.self="dragOver">
    <Template/>
    <DragInsert/>
  </div>
</template>

<style scoped lang="scss">
  .page-view {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 65% auto;
    gap: 20px;
    padding: 0 40px;
    box-sizing: border-box;
  }
</style>
