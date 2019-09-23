<template>
  <v-container grid-list-lg fluid>
    <v-layout wrap row>
      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <b>Administrador Plan de acción</b>
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
            :rows-per-page-items="[30, 60]"
            :items="listaPlanAccion2"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.id_incidencia }}</td>
              <td class="text-xs-left">{{ props.item.ugb }}</td>
              <td class="text-xs-left">LOCAL</td>
              <td class="text-xs-left">{{ props.item.fecha_prevista | dateFormat }}</td>
              <td class="text-xs-left">{{ props.item.fecha_realizada | dateFormat }}</td>
              <td class="text-xs-left">
                <v-icon :color="props.item.estado ? 'green' : 'grey'">
                  {{
                  props.item.estado ? "check" : "access_time"
                  }}
                </v-icon>
              </td>
              <td class="justify-center layout px-0">
                <v-btn icon :to="`/planes-accion/edit/${props.item.id}`">
                  <v-icon color="blue " small>remove_red_eye</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
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
      return format(new Date().toISOString().substr(0, 10), "YYYY-MM-DD");
    }
  },
  data() {
    return {
      search: null,
      headers: [
        {
          text: "NUMERO",
          value: "id_incidencia"
        },
        { text: "UGB", value: "ugb" },
        { text: "LOCAL", value: "local" },
        { text: "Fecha prevista", value: "fecha_prevista" },
        { text: "Fecha realizada", value: "fecha_realizada" },
        { text: "ESTADO", value: "estado" },
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
      "gerencias",
      "personal",
      "locales"
    ]),
    ...mapState("planAccion", ["listaPlanAccion"]),
    listaPlanAccion2() {
      return this.listaPlanAccion.map(v => {
        if (v.id_incidencia) {
          return {
            ...v,
            id_incidencia: this.idNumero(v.id_incidencia),
            ugb: this.ugb(v.ugb),
            estado: JSON.parse(v.grupo_de_tareas) // falta la variable estado
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
    ugb(val) {
      if (val) {
        const item = this.gerencias.filter(el => parseInt(val) == el.id);
        return item[0].gerencias;
      }
    }
  },
  async created() {
    await this.$store.dispatch("incidencias/getAreas");
    await this.$store.dispatch("incidencias/getGerencias");
    await this.$store.dispatch("incidencias/getPersonal");
    await this.$store.dispatch("planAccion/getPlanAccion");
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
