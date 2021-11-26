<template>
  <v-app-bar app clipped-left flat dense :color="$vuetify.theme.dark ? 'indigo' : 'accent'">
    <v-toolbar-title>Abba</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon>{{ $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
    <v-btn icon @click="exitApp">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app-header',
  methods: {
    ...mapActions('auth', ['logout']),
    async exitApp() {
      const status = await this.logout()
      if ([200, 401].includes(status)) {
        this.$router.push({name: 'Login'})
      } else {
        console.log('Status inesperado')
      }
    }
  }
}
</script>