<template>
  <v-container fluid>
    <v-form ref="form">
      <v-row justify="space-around">
        <v-col cols="12" md='8'>
          <v-card class="mb-3 rounded-lg">
            <v-list-item @click="credenciales = !credenciales">
              <v-list-item-content>
                <v-list-item-title class="text-h6">Credenciales del usuario</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon>{{ credenciales? 'mdi-chevron-down':'mdi-chevron-right' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-expand-transition>
              <div v-show="credenciales">
                <v-card-text>
                  <v-text-field v-model="rut" dense filled label="RUT"></v-text-field>
                  <v-text-field v-model="username" dense filled label="Username"></v-text-field>
                  <v-text-field v-model="password" dense filled label="Password"></v-text-field>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
          <v-card class="mb-3 rounded-lg">
            <v-list-item @click="info_personal = !info_personal">
              <v-list-item-content>
                <v-list-item-title class="text-h6">Informacion personal</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon>{{ info_personal? 'mdi-chevron-down':'mdi-chevron-right' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-expand-transition>
              <div v-show="info_personal">
                <v-card-text>
                  <v-text-field v-model="nombre" dense filled label="Nombre"></v-text-field>
                  <v-text-field v-model="apellidos" dense filled label="Apellidos"></v-text-field>
                  <v-text-field v-model="direccion" dense filled label="Direccion"></v-text-field>
                  <v-text-field v-model="fecha_nacimiento" dense filled label="Fecha de nacimiento"></v-text-field>
                  <v-text-field v-model="sexo" dense filled label="Sexo"></v-text-field>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
          <v-card class="mb-3 rounded-lg">
            <v-list-item @click="info_contacto = !info_contacto">
              <v-list-item-content>
                <v-list-item-title class="text-h6">Informacion de contacto</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon>{{ info_contacto ? 'mdi-chevron-down':'mdi-chevron-right' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-expand-transition>
              <div v-show="info_contacto">
                <v-card-text>
                  <v-text-field
                    label="Correo personal"
                    dense
                    filled
                    v-model="correo"
                  ></v-text-field>
                  <v-text-field
                    label="Telefono personal"
                    dense
                    filled
                    v-model="telefono"
                  ></v-text-field>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
          <v-container>
            <v-row justify="space-between">
              <v-btn depressed  color="success" @click="save">Guardar</v-btn>
              <v-btn depressed text color='error'>Cancelar</v-btn>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'user-form-view',
  
  data() {
    return {
      // Datos de cosas visuales
      credenciales: true,
      info_personal: true,
      info_contacto: true,
      //Datos del formulario
      username: null,
      rut: null,
      password: null,
      nombre: null,
      apellidos: null,
      direccion: null,
      sexo: null,
      fecha_nacimiento: null,
      correo: null,
      telefono: null,
    }
  },
  
  methods: {
    ...mapActions('users', [ 'addPersonalInformation', 'deleteUser', 'saveUser',]),
    async save() {
      if (!this.$refs.form.validate()) return;

      const user = {
        username: this.username,
        password: this.password,
        id: this.rut,
      }

      const sendUserStatus = await this.saveUser(user);
      if (sendUserStatus == 201) this.sendExtraInformation();
    },

    async sendExtraInformation() {
      const personalInformation = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        sexo: this.sexo,
        direccion: this.direccion,
        fecha_nacimiento: this.fecha_nacimiento
      }

      const personalInfoStatus = await this.addPersonalInformation(personalInformation);
      if (personalInfoStatus != 201) {
        // Borro porque se creo mal
        await this.deleteUser(this.rut);
        console.log('Borre al usuario pq estaba mal creado')
      }
      console.log('Bien creado')
    }
  }
}
</script>