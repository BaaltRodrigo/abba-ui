<template>
  <v-container fluid>
    <div>
      <v-btn @click="$router.push({name: 'users.create'})" :class="$vuetify.theme.dark ? 'indigo' : 'accent'">Agregar nuevo usuario</v-btn>
    </div>
    <br>
    <v-card v-for="user in all" :key="'user-'+user.id" class="mb-3">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{user.username}}</v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1">{{user.id}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <span>
            <!-- <v-btn icon><v-icon>mdi-eye</v-icon></v-btn> -->
            <v-btn icon @click="prepareToDelete(user)"><v-icon>mdi-delete</v-icon></v-btn>
          </span>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <!-- Pop up para eliminar al usuario -->
    <v-dialog max-width="500px" v-model="deleteDialog">
      <v-card>
        <v-card-text class="text-h5">
          <p class="text-center">
            <v-icon color="error" size="150px">mdi-alert-circle-outline</v-icon>
          </p>
          Si borras a un usuario, perderas todos sus datos
        </v-card-text>
        <v-card-text>
          <v-row justify="space-between">
            <v-btn depressed text @click="confirmDelete">Si, eliminar</v-btn>
            <v-btn depressed color="error">Cancelar</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'user-index-view',
  computed: {
    ...mapState('users', ['all'])
  },

  data() {
    return {
      deleteDialog: false,
      selectedUserId: null 
    }
  },

  methods: {
    ...mapActions('users', ['getAllUsers', 'deleteUser']),
    prepareToDelete(user) {
      this.deleteDialog = true;
      this.selectedUser = user
    },
    
    async confirmDelete() {
      const status = await this.deleteUser(this.selectedUser.id);
      console.log(status)
      this.deleteDialog = false
      this.selectedUser = null
    }
  },

  async created() {
    await this.getAllUsers();
    console.log(this.all)
  }
}
</script>
