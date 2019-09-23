<template>
  <v-container fluid grid-list-md>
    <!-- personal -->
    <v-layout wrap row>
      <v-flex xs12>
        <v-card-text>
          <v-layout wrap row align-center>
            <v-flex xs12 sm6>
              <h3><b>Desde</b></h3>
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fecha"
                    label="Seleccionar Periodo"
                    placeholder="1992-05-10"
                    prepend-icon="event"
                    readonly
                    data-vv-name="fecha"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="fecha"
                  no-title
                  locale="es"
                  @input="menu1 = false;"
                />
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <h3><b>Hasta</b></h3>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fecha1"
                    label="Seleccionar Periodo"
                    placeholder="1992-05-10"
                    prepend-icon="event"
                    readonly
                    data-vv-name="fecha1"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="fecha1"
                  no-title
                  locale="es"
                  @input="menu2 = false;"
                />
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap row>
                <v-flex xs12 sm6 py-2 class="grey lighten-3">
                  <h3 class="py-2"><b>Cantidad de informes por unidad</b></h3>
                  <v-layout wrap row>
                    <v-flex xs12>
                      <v-layout wrap row align-center>
                        <v-flex xs1>
                          <h4 style="writing-mode: vertical-rl;">Metalurgia</h4>
                        </v-flex>
                        <v-flex xs11 py-2>
                          <horizontal-chart :data="chart1"></horizontal-chart>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout wrap row align-center>
                        <v-flex xs1>
                          <h4 style="writing-mode: vertical-rl;">Mineracao</h4>
                        </v-flex>
                        <v-flex xs11 py-2>
                          <horizontal-chart :data="chart1"></horizontal-chart>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 py-2 class="grey lighten-3">
                  <v-layout wrap row>
                    <v-flex xs12>
                      <h3 class="py-2"><b>Status de acciones</b></h3>
                      <v-layout wrap row align-center>
                        <v-flex
                          xs4
                          sm4
                          v-for="(item, key) in items"
                          :key="key"
                          pa-2
                        >
                          <resume-chart
                            :item="item"
                            :color="item.color"
                            :series="series"
                          ></resume-chart>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <h3 class="py-2">
                        <b>Informe por tipo de desvío por dirección</b>
                      </h3>
                      <multiple-chart :data="multipleSeries2"></multiple-chart>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12>
              <h3 class="py-2"><b>Informe por tipo de desvío por unidad</b></h3>
              <multiple-chart :data="multipleSeries"></multiple-chart>
            </v-flex>
            <!-- tercer chart -->

            <!-- cuarto chart -->
          </v-layout>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { format } from "date-fns";
import { mapState } from "vuex";
import ResumeChart from "@/components/charts/ResumeChart";
import HorizontalChart from "@/components/charts/HorizontalChart";
import MultipleChart from "@/components/charts/MultipleChart";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      fecha: new Date().toISOString().substr(0, 10),
      fecha1: new Date().toISOString().substr(0, 10),
      chart1: {
        categories: ["Cajamarquilla", "Juiz de Fora", "Tres Marias"],
        series: [
          {
            name: "Concluidos",
            data: []
          }
        ],
        height: "200"
      },
      chart2: {
        categories: [
          "SSMA",
          "Mantenimiento",
          "Planta Concentradora",
          "Geología",
          "Exploraciones",
          "Operaciones de mina",
          "DHO",
          "Relaciones comunitarias",
          "Gerencia General"
        ],
        series: [
          {
            name: "Concluidos",
            data: []
          }
        ],
        height: "440"
      },
      multipleSeries: {
        categories: [
          "SSMA",
          "Mantenimiento",
          "Planta Concentradora",
          "Geología",
          "Exploraciones",
          "Operaciones de mina",
          "DHO",
          "Relaciones comunitarias",
          "Gerencia General"
        ],
        series: [
          {
            name: "Comportamiento de riesgo",
            data: []
          },
          {
            name: "Condicion de riesgo",
            data: []
          },
          {
            name: "Casi accidente",
            data: []
          },
          {
            name: "Derecho a decir NO",
            data: []
          }
        ],
        height: "300"
      },
      multipleSeries2: {
        categories: ["Mineria", "Metalurgía", "Otros"],
        series: [
          {
            name: "Comportamiento de riesgo",
            data: [44, 55, 41]
          },
          {
            name: "Condicion de riesgo",
            data: [53, 16, 33]
          },
          {
            name: "Derecho a decir NO",
            data: [53, 20, 33]
          },
          {
            name: "Casi accidente",
            data: [53, 15, 33]
          }
        ],
        height: "250"
      },
      items: [
        {
          title: "Concluidas",
          dataset: [],
          count: 160,
          color: "#4caf50",
          textColor: "green"
        },
        {
          title: "Andamento",
          dataset: [],
          count: 150,
          color: "#ff9800",
          textColor: "orange"
        },
        {
          title: "Atrasadas",
          dataset: [],
          count: 190,
          color: "#d32f2f",
          textColor: "red"
        }
      ],
      series: [
        {
          name: "Concluidos",
          data: []
        }
      ]
    };
  },
  components: {
    ResumeChart,
    HorizontalChart,
    MultipleChart
  },
  methods: {
    aleatorio(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }
  },
  async created() {
    console.log("created");
    const contadores = await this.$store.dispatch("dashboard/conAndAtr");
    this.chart2.series[0].data = contadores.count_ugb;
    this.items[0].count = contadores.totales[0];
    this.items[1].count = contadores.totales[1];
    this.items[2].count = contadores.totales[2];
    this.series[0].data = contadores.totales;
    this.multipleSeries.series[0].data = contadores.multiseries1;
    this.multipleSeries.series[1].data = contadores.multiseries2;
    this.multipleSeries.series[2].data = contadores.multiseries3;
    this.multipleSeries.series[3].data = contadores.multiseries4;
    console.log(this.chart2.series[0].data);
    // console.log(typeof(contadores));
    // console.log(contadores)
    // console.log(contadores[0].ID)
    // console.log(contadores[1].ID)
    // console.log('contadores')
  }
};
</script>
<style scoped>
.mainImage {
  display: flex;
  flex-direction: column;
}
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
.small {
  max-width: 600px;
  max-height: 400px;
  margin: 16px auto;
}
</style>
