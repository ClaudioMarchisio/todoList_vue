import { computed } from 'vue'

export function useTodo (proxy) {
  const todoArray = computed(() => proxy.$store.state.todoArray)
  const updateTodo = (payload) => {
    proxy.$store.commit('SET_TODO_ARRAY', payload)
  }
  return {
    todoArray,
    updateTodo
  }
}

export function useKeepTimes (proxy) {
  const keepTimes = computed(() => proxy.$store.state.keepTimes)
  const updateKeepTimes = (payload) => {
    proxy.$store.commit('SET_KEEP_TIMES', payload)
  }
  return {
    keepTimes,
    updateKeepTimes
  }
}
