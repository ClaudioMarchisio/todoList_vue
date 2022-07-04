<template>
  <div id="whitebar"></div>
  <div id="stats-header">
    统计
  </div>
  <div id="whitebar"></div>
  <div id="stats-main-summary">
    {{allDoneSummary}}
  </div>
  <div id="info-container-container">
  <div id="info-container">
    <div class="row">
      <div class="col comp2">
        <div class="info-container-comp">
          {{c2}}
        </div>
      </div>
      <div class="col comp1">
        <div class="info-container-comp">
          {{c1}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col comp3">
        <div class="info-container-comp">
          {{c3}}
        </div>
      </div>
      <div class="col comp4">
        <div class="info-container-comp">
          {{c4}}
        </div>
      </div>
    </div>
  </div>
  <div id="whitebar"></div>
  <div id="stats-main-summary">
    历史上共创建过 {{keepTimes}} 个任务
  </div>
  <div id="whitebar"></div>
  <div id="stats-main-summary">
    <button type=button id="delete" @click="clearTodoArray">清除所有任务</button>
  </div>

  </div>
  
</template>


<script>
import { getCurrentInstance } from 'vue'
import { useTodo, useKeepTimes } from '../utils/useData.js';
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const { todoArray, updateTodo } = useTodo(proxy)
    const todos = {...todoArray.value}
    const { keepTimes } = useKeepTimes(proxy)

    function clearTodoArray () {
      const todos = {"comp1": [], "comp2": [], "comp3": [], "comp4": []}
      updateTodo(todos)
    }

    return {
      keepTimes,
      clearTodoArray,
      todos,
      updateTodo,
      useTodo
    }
  },
  computed: {
    profile() {
      const { proxy } = getCurrentInstance()
      const { todoArray } = useTodo(proxy)
      const todos = {...todoArray.value}
      var profile = {comp1: {}, comp2: {}, comp3: {}, comp4: {}};
      for (var compName in todos)
      {
        const nDoneItems = todos[compName].length ? todos[compName].filter(item=>item.done).length : 0;
        profile[compName] = {"nItems": todos[compName].length, "nDoneItems": nDoneItems};
      }
      return profile;
    },
    allDoneSummary() {
      var nAllItem = 0;
      for (var compName in this.profile) {
        nAllItem += this.profile[compName]['nItems'];
      }
      var nAllDone = 0;
      for (let compName in this.profile) {
        nAllDone += this.profile[compName]['nDoneItems'];
      }
      return `共 ${nAllItem} 项, 已完成 ${nAllDone} 项`;
    },
    c1() {
      const compName = "comp1"
      const nCompItem = this.profile[compName]['nItems'];
      const nCompDone = this.profile[compName]['nDoneItems'];
      return `共${nCompItem}项, 已完成${nCompDone}项`;
    },
    c2() {
      const compName = "comp2"
      const nCompItem = this.profile[compName]['nItems'];
      const nCompDone = this.profile[compName]['nDoneItems'];
      return `共${nCompItem}项, 已完成${nCompDone}项`;
    },
    c3() {
      const compName = "comp3"
      const nCompItem = this.profile[compName]['nItems'];
      const nCompDone = this.profile[compName]['nDoneItems'];
      return `共${nCompItem}项, 已完成${nCompDone}项`;
    },
    c4() {
      const compName = "comp4"
      const nCompItem = this.profile[compName]['nItems'];
      const nCompDone = this.profile[compName]['nDoneItems'];
      return `共${nCompItem}项, 已完成${nCompDone}项`;
    },
  }
}
</script>

<style scoped>
#stats-header {
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 30px;
}
#stats-main-summary {
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin-top: 1rem;
}
#info-container-container {
  margin-top: 1rem;
  width: 100%;
  height: 60%;
}
#info-container {
  margin: auto;
  width: 60%;
  min-height: 200px;
}
#whitebar {
  width: 100%;
  height: 15px;
  background-color: white;
}
#delete {
  padding: auto;
  cursor: pointer;
  border: 2px solid red;
  color: red;
  background-color: white;
  font-size: 16px;
  height: 40px;
  width: 180px;
}
#delete:hover {
  background-color: red;
  color: white;
}
.row{
  display: flex;
  min-height: 95px;
  /*min-width: 400px;*/
  height: 48.5%;
  margin-top: 1%;
  margin-left: 1%;
}
.col{
  display: flex;
  flex: 50%;
  border: 0px;
  margin-right: 2%;
}
.info-container-comp {
  margin: auto;
  text-align: center;
  font-size: 15px;
}
.comp1{
  background-color: #668b8a;
}
.comp2{
  background-color: #9fb083;
}
.comp3{
  background-color: #f9eed3;
}
.comp4{
  background-color: #a47c64;
}
</style>
