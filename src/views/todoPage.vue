<template>
  <drag-canvas v-if="!isEditing" :allList="todoArray"
    @updateDoneStatus="updateDoneStatus"
    @submitEdit="submitEdit"
    @deleteToDo="deleteToDo">
  </drag-canvas>
</template>

<script>
import { getCurrentInstance } from 'vue';
import { useTodo } from '../utils/useData.js';
// import { popRemindWindow } from '../utils/useIPC.js';
import DragCanvas from './DragCanvas.vue';

export default {
  components: {
    DragCanvas
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const { todoArray, updateTodo } = useTodo(proxy)
    const todos = {...todoArray.value}
    // const { keepTimes, updateKeepTimes } = useKeepTimes(proxy)

    function updateDoneStatus(toDoId, compName) {
      const toDoToUpdate = todos[compName].find(item => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
      updateTodo(todos);
    }
    function submitEdit(toDoId, compName, newInfo) {
      const toDoToEdit = todos[compName].find(item => item.id === toDoId);
      toDoToEdit.label = newInfo["new_label"];
      toDoToEdit.content = newInfo["new_content"];
      toDoToEdit.time = newInfo["new_time"];
      updateTodo(todos);
    }
    function deleteToDo(toDoId, compName) {
      var index = todos[compName].map(item => {return item.id}).indexOf(toDoId);
      todos[compName].splice(index, 1);
      updateTodo(todos);
    }
    return {
      todoArray,
      todos, 
      updateDoneStatus,
      submitEdit,
      deleteToDo,
    }
  },
  data() {
    return {
      isEditing: false,
      timer: null,
    }
  },
}
</script>
<style scoped>
</style>
