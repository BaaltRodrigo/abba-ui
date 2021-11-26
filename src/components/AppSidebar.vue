<template>
  <v-navigation-drawer
    app 
    :permanent="['xs', 'md', 'sm'].includes($vuetify.breakpoint.name)"
    clipped :value="true">
    <!-- Student options -->
    <v-list nav dense>
      <v-list-item v-for="item in studentOptions" :key="'Studen-'+item.title" link :to="item.page">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- Admin options -->
    <div v-if="isAdmin">
      <v-divider></v-divider>
      <v-list nav dense>
        <v-subheader>Opciones Admin</v-subheader>
        <v-list-item v-for="item in adminOptions" :key="'Studen-'+item.title" link :to="item.page">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app-sidebar',

  computed: {
    ...mapState('sidebar', ['studentOptions', 'adminOptions']),
    ...mapState('auth', ['currentUser']),
    isAdmin() {
      return this.currentUser.username == 'admin';
    }
  },
}
</script>