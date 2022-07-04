<template>
  <div>
    <button type="button" :id="id" :checked="isDone" :class="classItem" :style="expireColor"
      @click="onClick">
      {{truncatedLabel}}
    </button>
    <item-edit v-if="isEditing"
    :show="isEditing" 
    :label="this.label" 
    :content="this.content"
    :time="this.time"
    @cancelEdit="cancelEdit" 
    @submitEdit="submitEdit"
    @deleteToDo="itemDeleted">
    </item-edit>
  </div>
</template>


<script>
import ItemEdit from './ItemEdit.vue';
export default {
  components: {
    ItemEdit
  },
  props: {
    label: {required:true, type:String}, 
    content: {required:true, type:String},
    done: {default:false, type:Boolean},
    id: {required:true, type:String},
    time: {required: false, type:String}
  },
  data() {
    return{
      isEditing: false,
      counter: 0,
      delay: 300,
      newTime: this.time,
    };
  },
  methods: {
    onClick(){
      this.counter++;
      if(this.counter === 1){
        this.timer = setTimeout(() => {
          this.$emit('checkbox-changed');
          this.counter = 0
        }, this.delay);
      } else {
        clearTimeout(this.timer);
        this.isEditing = true;
        this.counter = 0;
      }
    },
    itemDeleted() {
      this.$emit('deleteToDo');
    },
    submitEdit(newLabel, newContent, newTime) {
      this.$emit('submitEdit', {new_label: newLabel, new_content: newContent, new_time: newTime});
      this.newTime = newTime;
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    }
  },
  computed:{
    isDone() {
      return this.done
    },
    classItem() {
      return {
        'btn_item btn_done': this.done,
        'btn_item btn_undone': !this.done
      }
    },
    truncatedLabel() {
      var max_length = 45;
      return this.label.length>max_length?this.label.substring(0, max_length)+'...':this.label;
    },
    expireColor() {
      if (!this.newTime || this.isDone) {
        return "background-color: white;";
      } else {
        const now = new Date().getTime();
        const expire = new Date(this.newTime.slice(0, 4), parseInt(this.newTime.slice(5, 7))-1, this.newTime.slice(8, 10), this.newTime.slice(11, 13), this.newTime.slice(14, 16), 0).getTime();
        const diff = (expire-now) / 1000 / 60 / 60 / 4;
        let shade = 0;
        if (diff < 0.000001) {
          shade = 255;
        } else {
          shade = (1 - Math.atan(diff) / (Math.PI/2));
        }
        return "background-color: rgba(205, 92, 92, "+shade+");";
      }
    }
  }
}
</script>

<style scoped>

.btn_item{
  background-color: transparent;
  /*border-radius: 5px;*/
  padding: 5px;
  font-family: Arial, sans-serif;
  text-align: center;
  display: block;
  -webkit-font-smoothing: antialiased;
  font-size: 15px;
  line-height: 1.25;
  position: relative;
  width: 99%;
  min-height: 30px;
  margin-bottom: 5px;
  clear: left;
  overflow-wrap: anywhere; 
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1rem 1rem 0 rgba(0, 0, 0, 0.05);
}
.btn_item:hover {
  background-color: rgba(1, 1, 1, 0.05);
}
.btn_done{
  border-left: 5px solid #9fe0ab;
  border-top: none;
  border-right: none;
  border-bottom: none;
}
.btn_undone{
  font-weight: bold;
  border-left: 5px solid palevioletred;
  border-top: none;
  border-right: none;
  border-bottom: none;
}

</style>