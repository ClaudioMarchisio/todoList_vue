<template>
  <div class="edit-bg" v-show="show">
    <div id="set-hider">
      <div id="hider-text">
        {{showTime}}
      </div>
    </div>
    <div class="edit-container">
      <form @submit.prevent="submitEdit" class="edit-form">
        <div class="edit-header-head"></div>
        <div class="edit-header">
          <textarea
            type="text"
            id="new-todo-input-label"
            name="new-todo-1"
            placeholder="标题"
            v-model.trim="newLabel" 
            class="input__lg"
          />
        </div>
        <div class="edit-main">
          <textarea
            type="text"
            id="new-todo-input-content"
            name="new-todo-2"
            placeholder="具体内容"
            v-model.trim="newContent" 
            class="input__lg"
          />
        </div> 
        <div class="edit-footer">
          <button type=button class="efbtn" @click="cancelEdit">取消</button>
          <button type=submit class="efbtn efbtn_save">保存</button>
          <button type=button class="efbtn" @click="makeDate">定时</button>
          <button type=button class="efbtn efbtn_danger" @click="deleteToDo">删除</button>
        </div>
      </form>
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
import setTime from './setTime.vue'

export default {
  components: {
    setTime,
  },
  props: {
    show: {type: Boolean, default: false},
    label: {required:true, type:String}, 
    content: {required:true, type:String},
    time: {required: false, type:String},
  },
  data(){
    return {
      newLabel: this.label,
      newContent: this.content,
      newTime: this.time ? this.time : '',
      showMakeDate: false,
    };
  },
  methods: {
    deleteToDo(){
      this.$emit('deleteToDo');
    },
    cancelEdit() {
      this.$emit('cancelEdit');
    },
    submitEdit() {
      // if title misdeleted then ignore change
      if(this.newLabel){
        this.$emit("submitEdit", this.newLabel, this.newContent, this.newTime);
      } else {
        this.$emit('cancelEdit');
      }
    },
    makeDate() {
      this.showMakeDate = true;
    },
    closeMakeDate() {
      this.showMakeDate = false;
    },
    setMakeDate(time) {
      this.newTime = time;
      this.showMakeDate = false;
    },
    deleteMakeDate() {
      this.newTime = '';
      this.showMakeDate = false;
    }
  },
  computed: {
    showTime() {
      if (this.newTime) {
        return `${this.newTime} 到期`;
      } else {
        return `未定时`;
      }
    },
  },
}
</script>

<style scoped>
#set-hider {
  background: white;
  position: fixed;
  height: 50px;
  width: 100%;
  top: 90px;
  left: 0;
}
#hider-text{
  width: 400px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
  font-size: 25px;
}
.edit-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
  z-index: 10;
}
.edit-container {
  background: white;
  position: fixed;
  height: 75%;
  width: 100%;
  top: 25%;
  /*bottom: 10%;*/
  left: 0%;
}
.edit-form {
  height: 100%;
  width: 100%;
}
.edit-header-head {
  height: 1%;
  background-color: white;
}
.edit-header {
  height: 10%;
  padding: 0px 40px;
  top: 10%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
}
.edit-header > textarea {
  border: 0px;
  background-color: white;
  font-family: Arial;
  font-weight: bolder;
  font-size: 25px;
  height: 100%;
  width: 400px;
}
.edit-main {
  padding: 15px 40px;
  height: 64%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-main > textarea {
  border: 0px;
  background-color: white;
  font-family:  Arial;
  font-size: 16px;
  height: 100%;
  width: 400px;
}
.edit-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
}
.efbtn {
  margin-top: 0;
  margin-bottom: 3rem;
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
.efbtn_save {
  border:  2px solid mediumseagreen;
}
.efbtn_save:hover {
  background-color: mediumseagreen;
  color: white;
}
.efbtn_danger {
  border: 2px solid red;
}
.efbtn_danger:hover {
  background-color: red;
  color: white;
}
.edit-footer > * + * {
  margin-left: 0.8rem;
}
</style>

