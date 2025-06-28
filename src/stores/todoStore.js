import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    filter: 'all',
    search: ''
  }),
  getters: {
    filteredTodos(state) {
      let filtered = state.todos.filter(todo => {
        return (
          todo.text.toLowerCase().includes(state.search.toLowerCase()) ||
          todo.category.toLowerCase().includes(state.search.toLowerCase())
        )
      })

      switch (state.filter) {
        case 'active':
          return filtered.filter(todo => !todo.completed)
        case 'completed':
          return filtered.filter(todo => todo.completed)
        case 'high':
        case 'medium':
        case 'low':
          return filtered.filter(todo => todo.priority === state.filter)
        default:
          return filtered
      }
    },
    stats(state) {
      const total = state.todos.length
      const completed = state.todos.filter(t => t.completed).length
      return {
        total,
        active: total - completed,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
      }
    }
  },
  actions: {
    addTodo(todo) {
      this.todos.unshift({
        ...todo,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    },
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
        todo.updatedAt = new Date()
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    markAllCompleted() {
      this.todos.forEach(todo => {
        todo.completed = true
        todo.updatedAt = new Date()
      })
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    importTodos(data) {
      try {
        const parsed = JSON.parse(data)
        this.todos = parsed.map(todo => ({
          ...todo,
          id: Date.now().toString(),
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date()
        }))
      } catch (e) {
        console.error('Failed to import', e)
      }
    },
    exportTodos() {
      return JSON.stringify(this.todos, null, 2)
    },
    setFilter(filter) {
      this.filter = filter
    },
    setSearch(value) {
      this.search = value
    }
  }
})
