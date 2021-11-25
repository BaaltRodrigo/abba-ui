<template>
  <v-app>
    <v-row align="center" align-content="center" justify="center">
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>Login de usuarios</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="username"
                dense
                outlined
                label="Nombre de usuario"
                :rules=[rules.required]
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                dense
                outlined
                label="Contrasena"
                type="password"
                :rules='[rules.required]'
              >
              </v-text-field>
            </v-form>
            <v-btn block depressed color="success" @click="sendForm">Entrar</v-btn>
          </v-card-text>
        </v-card>
        <br>
        <v-card>
          <v-card-text>
            En caso de tener problemas con tus credenciales, no dudes en contactar con tu sede
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'login',

  data() {
    return {
      username: null,
      password: null,
      rules: {
        required: (v) => !!v || 'Campo obligatorio'
      }
    }
  },

  computed: {
    ...mapState('auth',['currentUser']),
  },

  methods: {
    ...mapActions('auth', ['login', 'getCurrentUser']),
    async sendForm() {
      if (!this.$refs.form.validate()) {
        return
      }

      const user = {
        username: this.username,
        password: this.password
      }

      const status = await this.login(user);
      if (status == 200) {
        this.$router.push({name: 'Home'});
      } else {
        console.log('Mal')
      }
    }
  },

  async created() {
    if (this.currentUser) {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>