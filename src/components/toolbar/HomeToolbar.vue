<template>
  <div>
    <v-navigation-drawer clipped dark persistent fixed app v-model="drawer">
      <v-list class="pt-0" dense>
        <template v-for="item in items">
          <v-list-tile :key="item.text" @click="goRoute(item.to);">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title color="primary">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile @click="cerrarSesion">
          <v-list-tile-action>
            <v-icon>close</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>CERRAR SESION</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app fixed clipped-left>
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer;"></v-toolbar-side-icon>
        <span>NEXA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <!-- <v-list-tile-title>{{ usuarioLocal.name }} {{ usuarioLocal.lastname }}</v-list-tile-title> -->
        </v-list-tile-content>

        <!--
          <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini;">
                <v-icon>chevron_left</v-icon>
              </v-btn>
          </v-list-tile-action>
        -->
      </v-list-tile>
      <!--
        <v-btn flat>
          <v-icon>person</v-icon>USER
        </v-btn>
      -->
    </v-toolbar>
    <!-- {{ $data }} -->
  </div>
</template>
<script>
export default {
  name: "HomeToolbar",
  data() {
    return {
      usuarioLocal: "",
      baseUrl: process.env.BASE_URL,
      mini: true,
      clipped: false,
      fixed: false,
      miniVariant: false,
      drawer: true,
      right: true,
      rightDrawer: false,
      title: "ACCESO Crédito Vehicular",
      items: [
        {
          icon: "dashboard",
          text: "DASHBOARD",
          to: this.isAdmin ? "/dashboard/admin" : "/dashboard/admin"
        },
        {
          icon: "edit",
          text: "REGISTRO DE INCIDENCIAS",
          to: "/habla-facil"
        },
        {
          icon: "content_copy",
          text: "ADMIN. HABLA FÁCIL",
          to: "/habla-facil/admin"
        },
        {
          icon: "content_copy",
          text: "ADMIN. PLAN DE ACCIÓN",
          to: "/planes-accion"
        }
      ]
    };
  },
  computed: {
    isAdmin() {
      console.log(this.$store.state.users);
      if (2 == 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goRoute(url) {
      this.$router.push(url);
    },
    cerrarSesion() {
      localStorage.removeItem("user_nexa");
      this.drawer = false;
      this.$store.commit("users/UPDATE_USER", {
        isAuth: false
      });
      this.$router.push("/");
    }
  },
  created() {
    console.log("theme: " + this.$vuetify.breakpoint.name);
    const screen = this.$vuetify.breakpoint.name;
    if (screen == "xs" || screen == "md") {
      console.log("here--1");
      this.drawer = false;
    }
    this.usuarioLocal = JSON.parse(localStorage.getItem("user_nexa"));
  }
};
</script>
<style></style>
