<template>
  <v-container grid-list-lg fluid>
    <v-layout wrap row>
      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <b>Administrador habla fácil</b>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="search"
              label="BUSCAR"
              single-line
              hide-details
            />
          </v-card-title>

          <v-data-table
            :search="search"
            :headers="headers"
            :rows-per-page-items="[30,60]"
            :items="listaIncidencias2"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.formatId }}</td>
              <td>{{ props.item.ugb }}</td>
              <td>LOCAL</td>
              <td>{{ props.item.fecha | dateFormat }}</td>
              <td>{{ props.item.responsable_del_registro }}</td>

              <td>{{ props.item.clasificacion }}</td>
              <td>{{ props.item.potencial_de_gravedad }}</td>
              <td>{{ props.item.riesgo }}</td>
              <td>
                <v-btn flat small color="primary" to="/planes-accion">Ver</v-btn>
              </td>
              <td>
                <span>{{props.item.accion_de_bloqueo}}</span>
              </td>
              <td>
                <v-btn
                  color="primary"
                  dark
                  icon
                  :to="`/planes-accion/${props.item.id}`"
                  target="_blank"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="500">
      <v-card class="ld-modal">
        <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { format } from "date-fns";
import { mapState } from "vuex";
import { itemsRiesgo } from "@/utils/default.js";
export default {
  $_veeValidate: {
    validator: "new"
  },
  filters: {
    dateFormat(val) {
      return format(val, "YYYY-MM-DD");
    }
  },
  data() {
    return {
      search: null,
      dialog: false,
      headers: [
        {
          text: "NUMERO",
          value: "formatId"
        },
        { text: "UGB", value: "ugb" },
        { text: "LOCAL", value: "local" },
        { text: "Fecha de registro", value: "fecha" },
        {
          text: "Responsables del registro",
          value: "responsable_del_registro"
        },
        { text: "Clasificación", value: "clasificacion" },
        { text: "Potencial", value: "potencial_de_gravedad" },
        { text: "riesgo", value: "riesgo" },
        { text: "PLAN DE ACCIÓN", value: "plan" },
        { text: "Acción de bloqueo", value: "accion_de_bloqueo" },
        { text: "", value: "btn", sortable: false }
      ],
      itemsClasificacion: [
        {
          id: 1,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Comportamiento de riesgo",
          state: true
        },
        {
          id: 2,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Condición de riesgo",
          state: false
        },
        {
          id: 3,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Casi accidente",
          state: false
        },
        {
          id: 4,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Derecho a decir no",
          state: false
        }
      ],
      itemsRiesgos: itemsRiesgo
    };
  },
  computed: {
    ...mapState("incidencias", [
      "areas",
      "datos",
      "listaIncidencias",
      "gerencias",
      "personal",
      "locales"
    ]),
    listaIncidencias2() {
      return this.listaIncidencias.map(v => {
        if (v.numero && v) {
          return {
            ...v,
            formatId: this.idNumero(v.id),
            ugb: this.ugb(v.ugb),
            responsable_del_registro: this.personas(v.responsable_del_registro),
            clasificacion: this.clasificacion(v.clasificacion),
            riesgo: this.riesgo(v.riesgo),
            accion_de_bloqueo: JSON.parse(v.accion_de_bloqueo) ? "SI" : "NO"
          };
        }
      });
    }
  },
  methods: {
    idNumero(val) {
      if (val) {
        const numero = parseInt(val);
        let r = "" + numero;
        const length = 10;
        while (r.length < length) {
          r = "0" + r;
        }
        return r;
      }
    },
    personas(val) {
      if (val) {
        const item = this.personal.filter(el => parseInt(val) === el.id);
        return item[0].trabajador;
      }
    },
    ugb(val) {
      if (val) {
        const item = this.gerencias.filter(el => val == el.id);
        return item[0].gerencias;
      }
    },
    riesgo(val) {
      const item = this.itemsRiesgos.filter(el => parseInt(val) === el.id);
      return item[0].text;
    },
    clasificacion(val) {
      const item = this.itemsClasificacion.filter(el => val === el.id);
      return item[0].text;
    }
  },
  async created() {
    await this.$store.dispatch("incidencias/getAreas");
    await this.$store.dispatch("incidencias/getGerencias");
    await this.$store.dispatch("incidencias/getPersonal");
    await this.$store.dispatch("incidencias/getIncidencias");
    /*     this.listaIncidencias2.map(async val => {
      const response = await axios({
        url: `/tb_incidencias/${val.id}`,
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });
      console.log(response.data);
    }); */
  }
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .marginTop {
    margin-top: 16px;
  }

  .layoutReservation {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
}

@media only screen and (min-width: 769px) {
  .marginTop {
    padding: 32px 0 32px 0;
  }

  .layoutReservation {
    display: flex !important;
    justify-content: right !important;
    max-width: 420px;
    padding: 0 24px 0 24px;
  }
}
</style>
