import { createStore } from 'vuex'
// import uniqueId from 'lodash.uniqueid'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    todoArray: {
          "comp1":
            [],
          "comp2":
            [],
          "comp3": 
            [],
          "comp4": 
            [],
        },
    keepTimes: 0
  },
  mutations: {
    SET_TODO_ARRAY: (state, todoArray) => {
      state.todoArray = todoArray
    },
    SET_KEEP_TIMES: (state, keepTimes) => {
      state.keepTimes = keepTimes
    },
  }
})
