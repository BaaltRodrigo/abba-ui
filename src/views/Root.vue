<template>
  <v-app>
    <app-header />
    <app-sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>
