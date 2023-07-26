<script setup>
  import ViewShow from './ViewShow.vue';
  import { useDragStore } from '../stores';
import { reactive } from 'vue';

  const store = useDragStore()

  const templateList = reactive([
    {
      title: '头部',
      vnode: {
        tag: 'div',
        className: 'content-header',
        children: [
          {
            tag: 'h1',
            className: 'title',
            value: 'Advanced HTTP REST API Testing Tool'
          },
          {
            tag: 'p',
            className: 'des',
            value: 'Easily test and debug REST APIs with our advanced tool'
          }
        ]
      }
    },
    {
      title: '占位图',
      vnode: {
        tag: 'div',
        className: 'content-banner',
        children: [
          {
            tag: 'img',
            className: 'banner',
            attrs: {
              src: '',
              alt: ''
            }
          }
        ]
      }
    },
    {
      title: '试用组件',
      vnode: {
        tag: 'div',
        className: 'content-trial',
        children: [
          {
            tag: 'div',
            className: 'trial-left',
            children: [
              {
                tag: 'div',
                className: 'left-header',
                children: [
                  {
                    tag: 'img',
                    className: 'log-img',
                    attrs: {
                      src: '',
                      alt: ''
                    }
                  },
                ]
              },
              {
                tag: 'p',
                className: 'des',
                value: 'Quick Creator is the ultimate marketing tool for creating SEO-optimized blog pages andhigh-conversion landing pages in minutes.'
              }
            ]
          },
          {
            tag: 'div',
            className: 'trial-right',
            children: [
              {
                tag: 'a',
                className: 'trial-link',
                value: 'START FREE TRIAL'
              }
            ]
          }
        ]
      }
    },
    {
      title: '内容',
      vnode: {
        tag: 'div',
        className: 'content-box',
        children: [
          {
            tag: 'h3',
            className: 'title',
            value: 'Advanced HTTP REST API Testing Tool'
          },
          {
            tag: 'h4',
            className: 'min-title',
            value: 'Introduction'
          },
          {
            tag: 'p',
            className: 'des',
            value: 'Our professional tool is designed to make REST API testing and debugging simple and efficient. With our easy-to-use interface, you can quickly enter your REST request parameters, click send, and wait for the results to appear. Whether you\'re a seasoned developer or just starting out, our advanced HTTP REST API testing tool is the perfect solution for your testing and debugging needs.'
          }
        ]
      }
    }
  ])

  const dragOver = (event) => {
    store.changeDragTarget(null)
  }

  const dragStart = (item) => {
    store.changeDragStatus(true, item.vnode)
  }

  const dragendEnd = (item) => {
    store.changeDragStatus(false, null)
  }
</script>

<template>
  <div class="drag-view" @dragover="dragOver">
    <template v-for="item in templateList">
      <div class="drag-item">
        <p class="title">{{ item.title }}</p>
        <div class="card-box" draggable="true" @dragstart="dragStart(item)" @dragend="dragendEnd(item)">
          <ViewShow :vnode="item.vnode"/>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
  .drag-view {
    height: 100vh;
    overflow: auto;
    padding: 20px 10px;
    border-left: 1px solid #ccc;
    .drag-item {
      margin-bottom: 30px;
      .title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .card-box {
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 20px;
        position: relative;
        zoom: 0.6;
        &:hover {
          border-color: #436fff;
        }
      }
    }
  }

</style>