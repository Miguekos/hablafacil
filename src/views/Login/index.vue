<template>
  <div>
    <v-layout wrap row>
      <v-flex xs12 sm7 md8 order-xs-2 order-md1 class="mainLefLogin" />
      <v-flex xs12 sm5 md4 order-xs-1 order-md2 class="mainLogin">
        <v-layout wrap row>
          <v-flex xs12 text-xs-center>
            <!-- <v-img :src="require('@/assets/logo.jpg')" aspect-ratio="1" max-height="60" /> -->
          </v-flex>
          <v-flex xs12 text-xs-center>
            <h1 class="display-1 font-weight-black py-2">
              <b>Habla Fácil</b>
            </h1>
            <h5 class="grey--text py-2">Bienvenido, por favor inicia sesión</h5>
          </v-flex>
          <v-flex xs12 lg10 offset-lg1 xl8 offset-xl2 pa-3 class="grey lighten-4">
            <form @submit.prevent="goLogin" autocomplete="nope">
              <v-card flat>
                <v-card-text>
                  <v-layout wrap row align-center>
                    <v-text-field
                      prepend-icon="person"
                      v-model="usuario"
                      v-validate="'required'"
                      :error-messages="errors.collect('usuario')"
                      data-vv-name="usuario"
                      placeholder="nexaUser"
                      required
                      name="login"
                      label="USUARIO"
                      type="text"
                    />
                    <v-text-field
                      prepend-icon="lock"
                      v-model="password"
                      name="password"
                      label="Contraseña"
                      placeholder="password"
                      type="password"
                      v-validate="'required'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                    />
                    <br />
                    <v-flex xs6>
                      <v-checkbox v-model="recordarme" label="Recordarme" height="4" small></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                      <v-btn flat small>Forgot Password</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-layout wrap row>
                    <v-flex xs8 offset-xs2 pa-1>
                      <v-btn color="primary" block :loading="loading" type="submit">Ingresar</v-btn>
                    </v-flex>
                    <!--
                      <v-flex xs6 pa-1>
                      <v-btn
                        color="grey darken-1"
                        block
                        :loading="loading"
                        dark
                        @click.native="newUser"
                      >NUEVO USUARIO</v-btn>
                      </v-flex>
                    -->
                  </v-layout>
                </v-card-actions>
              </v-card>
            </form>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        El usuario no existe, Verifique su Email y Password.!
        <v-btn color="red" text @click="snackbar = false;">Cerrar</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mixins } from "@/mixins/mixin.js";
export default {
  mixins: [mixins],
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    snackbar: false,
    usuario: "daniela@nexa.com",
    recordarme: false,
    password: "123456",
    loading: false
  }),
  methods: {
    goLogin() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.loading = true;
          const data = {
            usuario: this.usuario,
            password: this.password
          };
          console.log(data);

          const user = await this.$store.dispatch("users/goLogin", data);
          /* if login sucess */
          if (!user) {
            console.log("El usuario no existe");
            this.loading = false;
            this.snackbar = true;
          } else {
            this.$store.commit("users/UPDATE_USER", { ...user, isAuth: true });
            this.loading = false;
            this.$router.push("/habla-facil");
          }
        }
      });
    },
    newUser() {
      // creating users
    }
  }
};
</script>
<style scoped>
.mainLefLogin {
  width: 100%;
  background: url("../../assets/LOGIN.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.mainLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
