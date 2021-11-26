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
import { mapState } from 'vuex'
// @ is an alias to /src
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppSidebar
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  },

  mounted() {
    if (this.currentUser.username == 'admin' && this.$route.name == 'Root') {
      this.$router.push({name: 'users.index'})
    } else if (this.currentUser.username != 'admin' && this.$route.name == 'Root') {
      this.$router.push({name: 'mis-cursos.index'})
    }
  },

  async created() {
    await this.$store.dispatch('auth/getCurrentUser');
  }
}
</script>
