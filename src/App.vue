<template>
  <div id="app">
    <Header />
    <main class="container">
      <TodoForm />
      <FilterSection />
      <TodoList />
      <QuickActions />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import TodoForm from './components/TodoForm.vue'
import FilterSection from './components/FilterSection.vue'
import TodoList from './components/TodoList.vue'
import QuickActions from './components/QuickActions.vue'
</script>