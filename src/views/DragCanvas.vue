<template>
  <div class="canvas-container">
    <div class="row">
      <div class="col">
        <div class="class-header comp2"></div>
        <div class="class-body">
          <draggable
           class="draggable-list"
           :list="newAllList.comp2"
           item-key="id"
           group="mygroup"
           @move="onUpdate">
            <template #item="{ element }">
              <to-do-item 
                v-bind="element"
                @checkbox-changed="onCheck(element.id, 'comp2')"
                @deleteToDo="deleteToDo(element.id, 'comp2')"
                @submitEdit="submitEdit(element.id, 'comp2', $event)">
              </to-do-item>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col">
        <div class="class-header comp1"></div>
        <div class="class-body">
          <draggable
           class="draggable-list"
           :list="newAllList.comp1"
           item-key="id"
           group="mygroup"
           @move="onUpdate">
            <template #item="{ element }">
              <to-do-item
                v-bind="element"
                @checkbox-changed="onCheck(element.id, 'comp1')"
                @deleteToDo="deleteToDo(element.id, 'comp1')"
                @submitEdit="submitEdit(element.id, 'comp1', $event)">
              </to-do-item>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="class-header comp3"></div>
        <div class="class-body">
          <draggable
           class="draggable-list"
           :list="newAllList.comp3"
           item-key="id"
           group="mygroup"
           @move="onUpdate">
            <template #item="{ element }">
              <to-do-item
                v-bind="element"
                @checkbox-changed="onCheck(element.id, 'comp3')"
                @deleteToDo="deleteToDo(element.id, 'comp3')"
                @submitEdit="submitEdit(element.id, 'comp3', $event)">
              </to-do-item>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col">
        <div class="class-header comp4"></div>
        <div class="class-body">
          <draggable
           class="draggable-list"
           :list="newAllList.comp4"
           item-key="id"
           group="mygroup"
           @move="onUpdate">
            <template #item="{ element }">
              <to-do-item
                v-bind="element"
                @checkbox-changed="onCheck(element.id, 'comp4')"
                @deleteToDo="deleteToDo(element.id, 'comp4')"
                @submitEdit="submitEdit(element.id, 'comp4', $event)">
              </to-do-item>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import draggable from "vuedraggable";
  import ToDoItem from "./ToDoItem.vue";

  export default{
    components: {
      draggable,
      ToDoItem,
    },
    props: {
      allList: {required: true},
    },
    data() {
      return {
        newAllList: this.allList,
      };
    },
    methods: {
      onCheck(toDoId, compName) {
        this.$emit("updateDoneStatus", toDoId, compName);
      },
      deleteToDo(toDoId, compName) {
        this.$emit("deleteToDo", toDoId, compName);
      },
      submitEdit(toDoId, compName, newInfo) {
        this.$emit("submitEdit", toDoId, compName, newInfo);
      }
    },
  }
</script>

<style scoped>
.canvas-container {
  background: white;
  border-radius: 10px;
  position: relative;
  margin-top: 25px;
}
.row{
  display: flex;
  min-height: 200px;
  min-width: 200px;
  height: 48.5%;
  margin-top: 1%;
  margin-left: 1%;
}
.col{
  flex: 50%;
  background: white;
  border: 0px;
  margin-right: 2%;
}
.class-header{
  min-height: 5px;
  width: 50%;
}
.class-body{
  min-height: 200px;
  padding: 4%;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 1rem 1rem 0 rgba(0, 0, 0, 0.1);
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

.draggable-list{
  width: 100%;
  height: 200px;
  overflow: auto;
}

</style>