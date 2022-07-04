<template>
  <div id="makedate-bg" v-show="show">
    <div id="set-hider">
      <div id="hider-text">
        设定时间
      </div>
    </div>
    <div id="makedate-panel">
      <div id="panelheadhead"></div>
      <div id="picker">
        <input type="date" id="dateinput" v-model="date"/>
        <input type="time" id="timeinput" v-model="time"/>
      </div>
      <div id="panelhead"></div>
      <div class="btn-container">
        <button @click="setMakeDate" class="btn btn_save">确定</button>
      </div>
      <div id="panelhead"></div>
      <div class="btn-container">
        <button @click="closeMakeDate" class="btn">取消</button>
      </div>
      <div id="panelhead"></div>
      <div class="btn-container">
        <button @click="deleteMakeDate" class="btn btn_danger">重置</button>
      </div>
      <div id="panelheadfoot"></div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    show: {type: Boolean, default: false},
  },
  methods: {
    closeMakeDate () {
      this.$emit('closeMakeDate');
    },
    setMakeDate() {
      this.$emit('setMakeDate', this.date + ' ' + this.time);
    },
    deleteMakeDate() {
      this.$emit('deleteMakeDate');
    }
  },
  data () {
    return {
      date: new Date().toLocaleDateString('en-CA'),
      time: new Date().toLocaleTimeString('it-IT').slice(0, 5),
    };
  },
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  color: black;
}
input[type="time"]::-webkit-calendar-picker-indicator {
  color: black;
}
.btn {
  margin-top: 0;
  margin-bottom: 3rem;
  padding: auto;
  cursor: pointer;
  border: 2px solid #000;
  color: #000;
  background-color: white;
  font-size: 20px;
  height: 40px;
  width: 120px;
}
.btn:hover {
  background-color: black;
  color: white;
}
.btn_save {
  border:  2px solid mediumseagreen;
}
.btn_save:hover {
  background-color: mediumseagreen;
  color: white;
}
.btn_danger {
  border: 2px solid red;
}
.btn_danger:hover {
  background-color: red;
  color: white;
}
.btn-container{
  width: 120px;
  height: 40px;
  margin: auto;
}
#dateinput {
  text-align: center;
  font-family: Arial;
  font-size: 25px;
  height: 40px;
  width: 190px;
  border: none;
  margin-right: 40px;
  margin-left: 15px;
  margin-top: 20px;
}
#timeinput {
  margin: auto;
  text-align: center;
  font-family: Arial;
  font-size: 25px;
  height: 40px;
  width: 120px;
  border: none;
  margin-top: 20px;
}
.inputer:on-focus {
  background: white;
  color: black;
}
.inputer:on-blur {
}
#makedate-bg {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 100;
}
#makedate-panel {
  background: white;
  position: fixed;
  height: 75%;
  width: 100%;
  top: 25%;
  /*bottom: 10%;*/
  left: 0%;
}
#set-hider {
  background: white;
  position: fixed;
  height: 50px;
  width: 100%;
  top: 90px;
  left: 0;
}
#hider-text{
  width: 200px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
  font-size: 25px;
}
#panelheadhead {
  height: 10%;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
}
#panelhead {
  height: 7%;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
}
#panelheadfoot {
  margin: auto;
  height: 13%;
  width: 60%;
  background: white;
  border-bottom: 2px solid black;
}
#picker {
  height: 80px;
  width: 380px;
  margin: auto;
  border:  2px solid lightseagreen;
}
</style>