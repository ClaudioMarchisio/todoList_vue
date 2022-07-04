<template>
  <div class="edit-container">
    <div class="edit-header">
      <textarea
        type="text"
        id="new-todo-input-label"
        name="new-todo-1"
        placeholder="编辑新的任务"
        v-model.trim="task.label" 
        class="input__lg"
      />
    </div>
    <div class="edit-main">
      <textarea
        type="text"
        id="new-todo-input-content"
        name="new-todo-2"
        placeholder="具体内容"
        v-model.trim="task.content" 
        class="input__lg"
      />
    </div> 
    <div id="deadline" v-if="task.time">
      到期时间 {{task.time}}
    </div>
    <div class="edit-footer">
      <button type=button class="efbtn" @click="$router.push('/')">取消</button>
        <div class="save-making">
          <div class="row">
            <div class="col comp2" @click="addFunc('comp2')">
              保存
            </div>
            <div class="col comp1" @click="addFunc('comp1')">
              保存
            </div>
          </div>
          <div class="row">
            <div class="col comp3" @click="addFunc('comp3')">
              保存
            </div>
            <div class="col comp4" @click="addFunc('comp4')">
              保存
            </div>
          </div>
        </div>
      <button type=button class="efbtn" @click="makeDate">定时</button>
      <!-- {{todoArray}} -->
    </div>
  </div>
  <set-time v-if="showMakeDate"
    :show="showMakeDate"
    @closeMakeDate="closeMakeDate"
    @setMakeDate="setMakeDate"
    @deleteMakeDate="deleteMakeDate">
  </set-time>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useTodo, useKeepTimes } from '../utils/useData.js'
import setTime from './setTime.vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const { todoArray, updateTodo } = useTodo(proxy)
    const { keepTimes, updateKeepTimes } = useKeepTimes(proxy)

    const task = reactive({
      id: Math.floor(Date.now()/1000),
      label: '',
      content: '',
      done: false,
      time: ''
    })

    function addFunc (compName) {
      if (!task.label) return

      const todos = {...todoArray.value}
      todos[compName].push(task)
      updateTodo(todos)

      updateKeepTimes(keepTimes.value + 1)

      proxy.$router.push({
        path: '/'
      })
    }
    return {
      task,
      addFunc,
      todoArray,
    }
  }, 
  data () {
    return {
      showMakeDate: false,
    }
  },
  methods: {
    makeDate() {
      this.showMakeDate = true;
    },
    closeMakeDate() {
      this.showMakeDate = false;
    },
    setMakeDate(time) {
      this.task.time = time;
      this.showMakeDate = false;
    },
    deleteMakeDate() {
      this.task.time = '';
      this.showMakeDate = false;
    }
  },
  components: {
    setTime,
  },
}
</script>

<style scoped>
#deadline {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}
.edit-container {
  background: white;
  overflow: hidden;
  margin: 15px auto 0px auto;
  /*position: fixed;*/
  width: 500px;
}
.edit-form {
  height: 100%;
  width: 100%;
}
.edit-header {
  height: 10%;
  padding: 0px 40px;
  top: 10%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-header > textarea {
  border: 0px;
  font-weight: bolder;
  font-size: 25px;
  font-family: Arial;
  height: 100%;
  width: 100%;
}
.edit-main {
  padding: 15px 40px;
  height: 250px;
}
.edit-main > textarea {
  border: 0px;
  font-family: Arial;
  font-size: 16px;
  height: 100%;
  width: 100%;
}
.edit-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
}
.efbtn {
  padding: auto;
  cursor: pointer;
  border: 2px solid #000;
  color: #000;
  background-color: white;
  font-size: 16px;
  height: 40px;
  width: 80px;
}
.efbtn:hover {
  background-color: #000;
  color: white;
}
.edit-footer > * + * {
  margin-left: 0.8rem;
}
.save-making {
  /*border: 2px solid black;*/
  padding: 0rem 0 0.1rem;
}
.row{
  display: flex;
  min-height: 30px;
  min-width: 150px;
  height: 48.5%;
  margin-top: 1%;
  margin-left: 1%;
}
.col{
  flex: 50%;
  background: white;
  border: 0px;
  margin-right: 2%;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  padding: 0.8rem 1rem 0.7rem;
}
.col:hover{
  border: 2px solid black;
  color: black;
}
.comp1 {
  background-color: #668b8a;
  color: #668b8a;
}
.comp2 {
  background-color: #9fb083;
  color: #9fb083;
}
.comp3 {
  background-color: #f9eed3;
  color: #f9eed3;
}
.comp4 {
  background-color: #a47c64;
  color: #a47c64;
}
</style>
