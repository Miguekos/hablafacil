<template>
  <v-container grid-list-lg fluid>
    <v-layout wrap row>
      <v-flex xs12 mx-2>
        <h4>
          <b>FILTROS</b>
        </h4>
      </v-flex>
      <v-flex xs12 ma-2>
        <v-layout wrap row>
          <v-flex xs6 sm3>
            <v-select dense :items="ugbs" label="UGB" @change="filterUgb"></v-select>
          </v-flex>
          <v-flex xs6 sm3>
            <v-select dense :items="locals" label="Local" @change="filterLocals"></v-select>
          </v-flex>
          <v-flex xs6 sm3>
            <v-menu
              ref="show_start_date"
              :close-on-content-click="false"
              v-model="show_start_date"
              :nudge-right="40"
              :return-value.sync="start_date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="start_date"
                label="Fecha Prevista"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="start_date" @input="filterStartDate"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6 sm3>
            <v-menu
              ref="show_end_date"
              :close-on-content-click="false"
              v-model="show_end_date"
              :nudge-right="40"
              :return-value.sync="end_date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="end_date"
                label="Fecha realizada"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="end_date" @input="filterEndDate"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- <v-flex xs2>
        <v-select dense :items="fechaP" label="Fecha Prevista" @change="filterPotencial"></v-select>
      </v-flex>
      <v-flex xs2>
        <v-select dense :items="fechaR" label="Fecha Realizada" @change="filterRiesgo"></v-select>
      </v-flex>
      <v-flex xs2>-->
      <!-- <v-select dense :items="bloqueoE" label="estado" @change="filterBloqueoE"></v-select> -->
      <!-- </v-flex> -->

      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <b>Administrador Plan de acción</b>
            <v-spacer />
            <v-btn flat dense small color="primary" @click="resetearFiltros()">Resetear Filtros</v-btn>
            <!-- <v-text-field
              v-model="search"
              append-icon="search"
              label="BUSCAR"
              single-line
              hide-details
            />-->
          </v-card-title>
          <v-data-table
            :search="filters"
            :headers="headers"
            :rows-per-page-items="[30, 60]"
            :items="listaPlanAccion2"
            class="elevation-1"
            :custom-filter="customFilter"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.id_incidencia }}</td>
              <td class="text-xs-left">{{ props.item.ugb }}</td>
              <td class="text-xs-left">PORVENIR-PASCO</td>
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
      return format(val, "YYYY-MM-DD");
    }
  },
  data() {
    return {
      show_start_date: false,
      start_date: null,
      show_end_date: false,
      end_date: null,
      filters: {
        search: "",
        start_date: null,
        end_date: null,
        clasificacion: "",
        ugb: "",
        formatId: "",
        responsable_del_registro: "",
        potencial_de_gravedad: "",
        riesgo: "",
        accion_de_bloqueo: ""
      },
      search: null,
      fechaP: [],
      fechaR: [],
      clasificacions: [
        "Sin filtro",
        "Comportamiento de riesgo",
        "Condición de riesgo",
        "Casi accidente",
        "Derecho a decir no"
      ],
      ugbs: [
        "Sin filtro",
        "TI",
        "Gerencia de SSMA",
        "Contraloría",
        "Gerencia de Geología"
      ],
      locals: ["Sin filtro", "PORVENIR-PASCO"],
      responsables: [],
      potencial: ["Sin filtro", "1", "2", "3", "4", "5", "6"],
      riesgos: [
        "Sin filtro",
        "Gestión de servicios ecosistémicos",
        "Sistema de gestión ambiental",
        "Transporte de productos peligrosos",
        "Gestión de presas y depósitos de relaves",
        "Gestión de medio ambiente en inversiones",
        "Gestión de recursos naturales",
        "Gestión de emisiones atmosfericas",
        "Gestión de residuos",
        "Gestión del plan de cierre",
        "Gestión de aguas y efluentes líquidos",
        "Animales ponzoñosos",
        "Herramientas manuales",
        "Instalaciones eléctricas",
        "Excavación subterranea",
        "Protección de máquinas",
        "Trabajo en alturas",
        "Excavación a cielo abierto",
        "Espacio confinado",
        "Sistemas presurizados",
        "Sustancias químicas peligrosas",
        "Bloqueo y aislamiento de energías",
        "Excavaciones civiles",
        "Metal liquido",
        "Vehículos livianos y equipos móviles",
        "Cargas suspendidas"
      ],
      bloqueoE: ["Sin filtro", "Si", "No"],
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
    resetearFiltros() {
      // this.filterSearch("");
      this.filterUgb("");
      this.filterLocals("");
      // this.filterFechaR("");
      this.filterResponsables("");
      this.filterclasificacion("");
      this.filterPotencial("");
      this.filterRiesgo("");
      this.filterBloqueoE("");
      this.filterStartDateLimpiar("");
      this.filterEndDateLimpiar("");
      // this.grupo_de_tareas("");
      // this.filters.search = ""
      this.filters.start_date = null;
      this.filters.end_date = null;
      this.filters.clasificacion = "";
      this.filters.ugb = "";
      this.filters.formatId = "";
      this.filters.fecha = "";
      this.filters.responsable_del_registro = "";
      this.filters.potencial_de_gravedad = "";
      this.filters.riesgo = "";
      // this.filters.grupo_de_tareas = "";
      this.filters.accion_de_bloqueo = "";
      console.log("Se preciono");
    },
    customFilter(items, filters, filter, headers) {
      const cf = new this.$MultiFilters(items, filters, filter, headers);

      cf.registerFilter("clasificacion", function(clasificacion, items) {
        if (
          clasificacion.trim() === "" ||
          clasificacion.trim() === "Sin filtro"
        )
          return items;
        return items.filter(item => {
          return (
            item.clasificacion.toLowerCase() === clasificacion.toLowerCase()
          );
        }, clasificacion);
      });

      cf.registerFilter("ugb", function(ugb, items) {
        if (ugb.trim() === "Sin filtro" || ugb.trim() === "") return items;
        return items.filter(item => {
          return item.ugb.toLowerCase() === ugb.toLowerCase();
        }, ugb);
      });

      cf.registerFilter("formatId", function(formatId, items) {
        if (formatId.trim() === "" || formatId.trim() === "Sin filtro")
          return items;
        return items.filter(item => {
          return item.formatId.toLowerCase() === formatId.toLowerCase();
        }, formatId);
      });

      cf.registerFilter("responsable_del_registro", function(
        responsable_del_registro,
        items
      ) {
        if (
          responsable_del_registro.trim() === "" ||
          responsable_del_registro.trim() === "Sin filtro"
        )
          return items;
        return items.filter(item => {
          return (
            item.responsable_del_registro.toLowerCase() ===
            responsable_del_registro.toLowerCase()
          );
        }, responsable_del_registro);
      });

      cf.registerFilter("potencial_de_gravedad", function(
        potencial_de_gravedad,
        items
      ) {
        if (potencial_de_gravedad.trim() === "") return items;
        return items.filter(item => {
          return item.potencial_de_gravedad == potencial_de_gravedad;
        }, potencial_de_gravedad);
      });

      cf.registerFilter("riesgo", function(riesgo, items) {
        if (riesgo.trim() === "" || riesgo.trim() === "Sin filtro")
          return items;
        return items.filter(item => {
          return item.riesgo.toLowerCase() === riesgo.toLowerCase();
        }, riesgo);
      });

      cf.registerFilter("accion_de_bloqueo", function(
        accion_de_bloqueo,
        items
      ) {
        // console.log(items);
        if (accion_de_bloqueo.trim() === "") return items;
        return items.filter(item => {
          return (
            item.accion_de_bloqueo.toLowerCase() ===
            accion_de_bloqueo.toLowerCase()
          );
        }, accion_de_bloqueo);
      });

      cf.registerFilter("start_date", function(start_date, items) {
        if (start_date === null) return items;
        return items.filter(item => {
          console.log(item.fecha_prevista);
          return item.fecha_prevista >= start_date;
        }, start_date);
      });

      cf.registerFilter("end_date", function(end_date, items) {
        console.log("fechafin " + end_date);
        // console.log("Iterms");
        // console.log(items);
        if (end_date === null) return items;
        return items.filter(item => {
          console.log(item.fecha_realizada);
          return item.fecha_realizada <= end_date;
        }, end_date);
      });

      return cf.runFilters();
    },

    /**
     * Toggle selected items with the master checkbox.
     */
    toggleAll() {
      if (this.selected.length) {
        this.selected = [];
      } else {
        this.selected = this.rows.slice();
      }
    },

    /**
     * Column shorting.
     *
     * @param column
     */
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },

    filterUgb(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        ugb: val
      });
    },

    filterLocals(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        locals: val
      });
    },

    filterResponsables(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        responsable_del_registro: val
      });
    },

    filterclasificacion(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        clasificacion: val
      });
    },

    filterPotencial(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        potencial_de_gravedad: val
      });
    },

    filterRiesgo(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        riesgos: val
      });
    },

    filterBloqueoE(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        grupo_de_tareas: val
      });
    },

    /**
     * Handler when select a date on "From" date picker.
     */
    filterStartDate(val) {
      // Close the date picker.
      this.$refs.show_start_date.save(val);

      //Convert the value to a timestamp before saving it.
      // const timestamp = new Date(val + "T00:00:00Z").getTime();
      const timestamp = val + "T00:00:00Z";
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        start_date: timestamp
      });
    },

    filterStartDateLimpiar(val) {
      // Close the date picker.
      this.$refs.show_start_date.save(val);

      //Convert the value to a timestamp before saving it.
      // const timestamp = new Date(val + "T00:00:00Z").getTime();
      const timestamp = val;
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        start_date: timestamp
      });
    },

    filterEndDateLimpiar(val) {
      // Close the date picker.
      this.$refs.show_start_date.save(val);

      //Convert the value to a timestamp before saving it.
      // const timestamp = new Date(val + "T00:00:00Z").getTime();
      const timestamp = val;
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        end_date: timestamp
      });
    },

    /**
     * Handler when select a date on "To" date picker.
     */
    filterEndDate(val) {
      // Close the date picker.
      this.$refs.show_end_date.save(val);

      //Convert the value to a timestamp before saving it.
      // const timestamp = new Date(val + "T00:00:00Z").getTime();
      const timestamp = val + "T00:00:00Z";
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        end_date: timestamp
      });
    },
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
