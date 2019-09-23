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
          <v-flex xs4 sm2>
            <v-select dense :items="ugbs" label="UGB" @change="filterUgb"></v-select>
          </v-flex>
          <v-flex xs4 sm2>
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
          <v-flex xs4 sm2>
            <v-select
              dense
              :items="clasificacions"
              label="Clasificacion"
              @change="filterclasificacion"
            ></v-select>
          </v-flex>
          <v-flex xs4 sm2>
            <v-select dense :items="potencial" label="Potencial" @change="filterPotencial"></v-select>
          </v-flex>
          <v-flex xs4 sm2>
            <v-select dense :items="riesgos" label="Riesgo" @change="filterRiesgo"></v-select>
          </v-flex>
          <v-flex xs4 sm2>
            <v-select dense :items="bloqueoE" label="Acción de bloqueo" @change="filterBloqueoE"></v-select>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <b>Administrador habla fácil</b>
            <v-spacer />
            <v-btn flat dense small color="primary" @click="resetearFiltros()">Resetear Filtros</v-btn>
            <!-- <v-text-field
              @input="filterSearch"
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
            :items="listaIncidencias2"
            class="elevation-1"
            :custom-filter="customFilter"
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
                <span>{{ props.item.accion_de_bloqueo }}</span>
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

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- {{ filters }} -->
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
      selected: [],
      filters: {
        search: "",
        start_date: null,
        // end_date: null,
        clasificacion: "",
        ugb: "",
        formatId: "",
        responsable_del_registro: "",
        potencial_de_gravedad: "",
        riesgo: "",
        accion_de_bloqueo: ""
      },
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
      locals: ["Sin filtro", "LOCAL"],
      fechaR: [],
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
    resetearFiltros() {
      // this.filterSearch("");
      this.filterUgb("");
      this.filterLocals("");
      this.filterFechaR("");
      this.filterResponsables("");
      this.filterclasificacion("");
      this.filterPotencial("");
      this.filterRiesgo("");
      this.filterBloqueoE("");
      this.filterStartDateLimpiar("");
      // this.filterEndDate("");
      // this.filters.search = ""
      this.filters.start_date = "";
      // this.filters.end_date = ""
      this.filters.clasificacion = "";
      this.filters.start_date = null;
      this.filters.ugb = "";
      this.filters.formatId = "";
      this.filters.fecha = "";
      this.filters.responsable_del_registro = "";
      this.filters.potencial_de_gravedad = "";
      this.filters.riesgo = "";
      this.filters.accion_de_bloqueo = "";
      console.log("Se preciono");
    },
    customFilter(items, filters, filter, headers) {
      const cf = new this.$MultiFilters(items, filters, filter, headers);
      // cf.registerFilter("search", function(searchWord, items) {
      //   if (searchWord.trim() === "") return items;
      //   return items.filter(item => {
      //     return item.name.toLowerCase().includes(searchWord.toLowerCase());
      //   }, searchWord);
      // });

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
        if (ugb.trim() === "" || ugb.trim() === "Sin filtro") return items;
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
        if (responsable_del_registro.trim() === "") return items;
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
        if (
          potencial_de_gravedad.trim() === "" ||
          potencial_de_gravedad.trim() === "Sin filtro"
        )
          return items;
        return items.filter(item => {
          return item.potencial_de_gravedad == potencial_de_gravedad;
        }, potencial_de_gravedad);
      });

      cf.registerFilter("riesgo", function(riesgo, items) {
        if ((riesgo.trim() === "") | (riesgo.trim() === "Sin filtro"))
          return items;
        return items.filter(item => {
          return item.riesgo.toLowerCase() === riesgo.toLowerCase();
        }, riesgo);
      });

      cf.registerFilter("accion_de_bloqueo", function(
        accion_de_bloqueo,
        items
      ) {
        if (
          (accion_de_bloqueo.trim() === "") |
          (accion_de_bloqueo.trim() === "Sin filtro")
        )
          return items;
        return items.filter(item => {
          return (
            item.accion_de_bloqueo.toLowerCase() ===
            accion_de_bloqueo.toLowerCase()
          );
        }, accion_de_bloqueo);
      });

      cf.registerFilter("start_date", function(start_date, items) {
        console.log(start_date);
        console.log(items);
        if (start_date === null) return items;
        return items.filter(item => {
          console.log(item.fecha);
          return item.fecha == start_date;
        }, start_date);
      });
      // cf.registerFilter("end_date", function(end_date, items) {
      //   if (end_date === null) return items;
      //   return items.filter(item => {
      //     return item.birth_date <= end_date;
      //   }, end_date);
      // });

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

    // filterSearch(val) {
    //   this.filters = this.$MultiFilters.updateFilters(this.filters, {
    //     search: val
    //   });
    // },

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

    filterFechaR(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        fecha: val
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
        accion_de_bloqueo: val
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
      const timestamp = val + "T00:00:00.000Z";
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

    /**
     * Handler when select a date on "To" date picker.
     */
    filterEndDate(val) {
      // Close the date picker.
      this.$refs.show_end_date.save(val);

      //Convert the value to a timestamp before saving it.
      const timestamp = new Date(val + "T00:00:00.000Z").getTime();
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
