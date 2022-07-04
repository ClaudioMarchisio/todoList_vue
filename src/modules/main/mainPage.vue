<template>
  <div class="drag-part">
    <div class="close enable-click" @click="closeMain">×</div>
  </div>
  <div id="app">
    <div id="date">{{dateStr}}</div>
    <div id="switchpage">
      <router-link class="page-top-btn" to="/">✎</router-link>
      <router-link class="page-top-btn" to="/addPage">+</router-link>
      <router-link class="page-top-btn" to="/statsPage">&#8801;</router-link>
    </div>
    <div class="content">
      <div class="content-manage">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { closeMain } from '../../utils/useIPC.js'

export default {
  setup () {
    const date = new Date()
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return {
      closeMain,
      dateStr
    }
  },
}
</script>

<style>
body {
  /*font: 1.6rem/1.25 "Helvetica Neue", Helvetica, Arial, sans-serif;*/
}
.drag-part {
  position: absolute;
  z-index: 999;
  top: 0px;
  width: 100%;
  height: 20px;
  -webkit-app-region: drag;
}
.close {
  -webkit-app-region: no-drag;
  font-size: 26px;
  cursor: pointer;
  width: 20px;
  float: right;
  margin-right: 20px;
}
#date {
  text-align: center;
  font-size: 25px;
  padding: 0.5rem;
  margin: 1rem;
  margin-top: 10px;
  background-color: black;
  color: white;
  width: 30%;
}
#app {
  background: white;
  position: relative;
  padding: 0.5rem;
  height: 100%;
  /*box-shadow: 0 2px
   4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);*/
}
#app > * {
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
#switchpage {
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 60%;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
}
.page-top-btn {
  cursor: pointer;
  border: 2px solid #000;
  color: #000;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  text-decoration: none;
  margin: 0 0.5rem auto;
}
.page-top-btn:hover {
  background-color: #000;
  color: white;
}
.page-top-btn.router-link-exact-active {
  background-color: #000;
  color: white;
}
.content {
  flex: 1;
  padding: 10px 0 0 0;
}
.content-manage {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  font-size: 14px;
}

</style>