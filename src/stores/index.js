import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

let tempId = 0

export const useDragStore = defineStore('dragInfo', () => {
  const isDrag = ref(false)
  const target = ref(null)
  const originVnode = ref(null)
  const targetVnode = reactive({
    tag: 'div',
    className: 'root-box',
    children: []
  })

  const changeDragStatus = (status, vnode) => {
    isDrag.value = status
    if(status) {
      originVnode.value = {
        tempId: tempId++,
        ...JSON.parse(JSON.stringify(vnode)),
        isTop: true
      }
    }
    if(target.value) {
      targetVnode.children.push(originVnode.value)
      changeDragTarget(null)
    }
  }

  const changeDragTarget = (el) => {
    target.value = el
  }

  const deleteTemp = (id) => {
    const findIdx = targetVnode.children.findIndex(item => item.tempId === id)
    targetVnode.children.splice(findIdx, 1)
  }

  return { isDrag, target, targetVnode, changeDragStatus, changeDragTarget, deleteTemp }
})