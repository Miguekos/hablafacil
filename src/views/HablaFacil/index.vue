<template>
  <v-container grid-list-md fluid>
    <v-layout wrap row>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            <v-tabs v-model="active" color="primary" dark slider-color="yellow">
              <v-tab :key="1" ripple>
                <b>REGISTRO DE INCIDENCIA</b>
              </v-tab>
              <v-tab-item :key="1">
                <form @submit.prevent="goStep(1)">
                  <v-card>
                    <v-card-text>
                      <v-layout wrap row align-center>
                        <v-flex xs12 sm6>
                          <v-autocomplete
                            :items="gerenciasitem"
                            item-text="gerencias"
                            item-value="id"
                            label="UGB"
                            placeholder="seleccionar UGB"
                            v-model="datos.ugb"
                            required
                            v-validate="'required'"
                            :error-messages="errors.collect('datos.ugb')"
                            data-vv-name="datos.ugb"
                            data-vv-as="UGB"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-autocomplete
                            :items="areasitem"
                            item-text="area"
                            item-value="id_gerencia"
                            label="AREA"
                            placeholder="Seleccionar area"
                            v-model="datos.area"
                            required
                            v-validate="'required'"
                            :error-messages="errors.collect('datos.area')"
                            data-vv-name="datos.area"
                            data-vv-as="area"
                          />
                        </v-flex>

                        <v-flex xs12 sm6>
                          <v-autocomplete
                            :items="locales"
                            item-text="text"
                            item-value="id"
                            label="LOCAL"
                            readonly
                            placeholder="Seleccionar Local"
                            v-model="datos.local"
                            required
                            v-validate="'required'"
                            :error-messages="errors.collect('datos.local')"
                            data-vv-name="datos.local"
                            data-vv-as="area"
                          />
                        </v-flex>
                        <v-flex xs12 sm6>
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
                                v-model="datos.fecha"
                                label="Fecha de Registro"
                                placeholder="1992-05-10"
                                prepend-icon="event"
                                readonly
                                data-vv-name="datos.fecha"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="datos.fecha"
                              no-title
                              locale="es"
                              @input="menu2 = false"
                            />
                          </v-menu>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-autocomplete
                            :items="responsables"
                            item-text="responsable"
                            item-value="id_responsable"
                            label="Responsable"
                            placeholder="Seleccionar responsables"
                            v-model="datos.responsables"
                            required
                            v-validate="'required'"
                            :error-messages="
                              errors.collect('datos.responsables')
                            "
                            data-vv-name="datos.responsables"
                            data-vv-as="responsables"
                          />
                        </v-flex>
                        <!-- <v-flex xs12 sm6>
                          <v-autocomplete
                            v-model="datos.responsable_del_registro"
                            note
                            label="Responsable"
                            v-validate="'required'"
                            :error-messages="
                              errors.collect('datos.responsable_del_registro')
                            "
                            data-vv-name="datos.responsable_del_registro"
                            data-vv-as="Tipo"
                            required
                          />
                        </v-flex> -->

                        <v-flex xs12 py-2>
                          <v-layout wrap row>
                            <v-flex xs12>
                              <h3>
                                <b>CLASIFICACIÓN</b>
                              </h3>
                            </v-flex>
                            <v-flex xs12>
                              <radio-groupbasic
                                v-model="datos.clasificacion"
                                :items="itemsClasificacion"
                              ></radio-groupbasic>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 py-2>
                          <v-layout wrap row>
                            <v-flex xs12>
                              <h3>
                                <b>RIESGO DE MEDIO AMBIENTE</b>
                              </h3>
                            </v-flex>
                            <v-flex xs12>
                              <radio-group
                                v-model="datos.riesgo"
                                :items="itemsRiesgoAmbiente"
                              ></radio-group>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12>
                          <v-layout wrap row>
                            <v-flex xs12>
                              <h3>
                                <b>RIESGO DE SEGURIDAD</b>
                              </h3>
                            </v-flex>
                            <v-flex xs12>
                              <radio-group
                                v-model="datos.riesgo"
                                :items="itemsRiesgoSeguridad"
                              ></radio-group>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 mt-2>
                          <v-layout wrap row>
                            <v-flex xs12>
                              <h3>
                                <b>POTENCIAL DE GRAVEDAD</b>
                              </h3>
                            </v-flex>
                            <v-flex xs12>
                              <v-radio-group
                                v-model="datos.potencial_de_gravedad"
                                row
                              >
                                <v-radio
                                  :value="item"
                                  :label="`${item}`"
                                  v-for="(item, key) in [1, 2, 3, 4, 5, 6]"
                                  :key="key"
                                ></v-radio>
                              </v-radio-group>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12>
                          <v-textarea
                            label="Descripción"
                            v-model="datos.descripcion"
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs12>
                          <v-switch
                            v-model="datos.accion_de_bloqueo"
                            label="Acción de bloqueo"
                          ></v-switch>
                          <v-textarea
                            v-if="datos.accion_de_bloqueo"
                            label="Acción de bloqueo"
                            v-model="datos.descripcionBloqueo"
                          ></v-textarea>
                        </v-flex>
                        <!--
                          <v-flex xs12>
                            <v-btn icon color="primary">
                              <v-icon>add</v-icon>
                            </v-btn>
                            <b>Agregrar Plan de acción</b>
                          </v-flex>
                        -->
                        <v-flex xs12 text-xs-right>
                          <v-spacer></v-spacer>
                          <v-divider class="py-2"></v-divider>
                          <v-btn color="primary" type="submit">GUARDAR</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </form>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500">
      <v-card v-if="step == 1" class="ld-modal">
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <h3 class="text-xs-center">
                <b>¿CONFIRMAR REGISTRO?</b>
              </h3>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="dialog = false" small
            >Atras</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="goSave" :loading="loading" small
            >CONFIRMAR</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-else class="ld-modal">
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <h3 class="text-xs-center">
                <b>
                  ¿Desea ejecutar un plan de acción para el incidente N°-{{
                    this.datos.id | idNumero
                  }}?
                </b>
              </h3>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="dialog = false" small
            >Atras</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="goPlan" :loading="loading" small
            >PLAN DE ACCIÓN</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { format } from "date-fns";
import { mapState } from "vuex";

import RadioGroup from "@/components/radio/RadioGroup";
import RadioGroupbasic from "@/components/radio/RadioGroupbasic";
import { itemsRiesgo } from "@/utils/default.js";
export default {
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      areasdata: "",
      gerenciasdata: "",
      responsables: [
        {
          responsable: "Ricardo Caballero",
          id_responsable: 1,
        },
      ],
      gerenciasitem: [
        {
          gerencias: "ADMINISTRACION",
          id: 1,
        },
      ],
      areasitem: [
        {
          area: "RRHH",
          id_gerencia: 1,
        },
      ],
      dialog: false,
      switch1: false,

      step: 1,
      active: 0,
      menu2: false,
      menu3: false,
      menu: false,
      classRiesgo: [
        {
          id: 1,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Medio Ambiente",
          state: true,
        },
        {
          id: 2,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Seguridad",
          state: false,
        },
      ],
      itemsClasificacion: [
        {
          id: 1,
          icon: null,
          text: "Comportamiento de riesgo",
          state: true,
        },
        {
          id: 2,
          icon: null,
          text: "Condición de riesgo",
          state: false,
        },
        {
          id: 3,
          icon: null,
          text: "Casi accidente",
          state: false,
        },
        {
          id: 4,
          icon: null,
          text: "Derecho a decir no",
          state: false,
        },
      ],
      loading: false,
    };
  },
  components: {
    RadioGroup,
    RadioGroupbasic,
  },
  filters: {
    idNumero(val) {
      let r = "" + val;
      const length = 10;
      while (r.length < length) {
        r = "0" + r;
      }
      return r;
    },
  },
  computed: {
    idNumero() {
      let r = "" + this.datos.id;
      const length = 10;
      while (r.length < length) {
        r = "0" + r;
      }
      return r;
    },
    ...mapState("incidencias", [
      "areas",
      "datos",
      "gerencias",
      "personal",
      "locales",
    ]),
    itemsRiesgoAmbiente() {
      return itemsRiesgo.filter((val) => val.tipo == 1);
    },
    itemsRiesgoSeguridad() {
      return itemsRiesgo.filter((val) => val.tipo == 2);
    },
    check_in: {
      get() {
        return this.datos.check_in;
      },
      set(v) {
        console.log("horarararar");

        this.$store.commit("incidencias/UPDATE_DATOS", {
          check_in: format(v, "YYYY-MM-DD"),
        });
      },
    },
  },
  methods: {
    goPlan() {
      this.active = 1;
      this.dialog = false;
      this.$router.push(`/planes-accion/${this.datos.id}`);
    },

    async goSave() {
      this.loading = true;
      await this.$store.dispatch("incidencias/postIncidencias");
      this.loading = false;
      this.step = 2;
      //this.$router.push("/planes-accion");
    },
    async goStep(val) {
      console.log("here");
      /* console.log(this.datos.itemsClasificacion)
       
          this.datos.riesgo &&
          this.datos.descripcion &&
          this.datos.potencial_de_gravedad */
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          console.log("step: " + val);
          this.dialog = true;
        } else {
          console.log("here-2");
        }
      });
      /* this.active = val; */
    },
  },
  async created() {
    this.$store.commit("incidencias/RESET_DATOS");
    // await this.$store.dispatch("incidencias/getAreas");
    // await this.$store.dispatch("incidencias/getGerencias");
    // await this.$store.dispatch("incidencias/getPersonal");
  },
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
</style>
