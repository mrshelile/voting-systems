<!-- src/views/Admin.vue -->
<template>
  <div class="admin-layout">
    <Sidenav />
    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidenav from '@/components/SideNav.vue'

export default {
  name: 'Admin',
  components: {
    Sidenav,
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.admin-content {
  flex: 1;
  padding: 24px;
  background: #f9f9f9;
}
</style>