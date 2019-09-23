<template>
  <v-container grid-list-lg>
    <v-layout wrap row>
      <v-card flat>
        <v-card-text>
          <v-tabs v-model="active" color="primary" dark slider-color="yellow">
            <v-tab :key="2" ripple>
              <b>PLAN DE ACCIÓN</b>
            </v-tab>
            <v-tab-item :key="2">
              <v-card flat>
                <v-card-text>
                  <v-layout wrap row align-center>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="NÚMERO"
                        placeholder="123456789"
                        readonly
                        v-model="idNumero"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-autocomplete
                        :items="gerencias"
                        item-text="gerencias"
                        item-value="id"
                        label="UGB"
                        placeholder="seleccionar UGB"
                        v-model="datos.ugb"
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
                      />
                    </v-flex>

                    <v-flex xs12>
                      <v-textarea label="Descripción" v-model="datos.descripcion"></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-menu
                        v-model="menu3"
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
                            v-model="datos.fecha_prevista"
                            label="Fecha Prevista"
                            placeholder="1992-05-10"
                            prepend-icon="event"
                            readonly
                            data-vv-name="datos.fecha_prevista"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="datos.fecha_prevista"
                          no-title
                          locale="es"
                          @input="menu3 = false;"
                        />
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-autocomplete
                        v-model="datos.responsable_registro"
                        v-validate="'required'"
                        :items="personal"
                        item-text="trabajador"
                        item-value="id"
                        :error-messages="
                          errors.collect('datos.responsable_registro')
                        "
                        label="Responsable"
                        data-vv-name="datos.responsable_registro"
                        data-vv-as="Tipo"
                        required
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea label="Observación" v-model="datos.observacion"></v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <!-- ESTA VARIABLE DEBE SER datos.estado -->
                      <v-switch v-model="datos.grupo_de_tareas" label="ACCION EJECUTADA"></v-switch>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-menu
                        v-model="menu"
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
                            v-model="datos.fecha_realizada"
                            label="Fecha Realizada"
                            placeholder="1992-05-10"
                            prepend-icon="event"
                            readonly
                            :data-vv-name="datos.fecha_realizada"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="datos.fecha_realizada"
                          no-title
                          locale="es"
                          @input="menu = false;"
                        />
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 text-xs-right>
                      <v-spacer></v-spacer>
                      <v-divider class="py-2"></v-divider>
                      <v-btn color="primary" @click.native="goStep(0);">Actualizar</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500">
      <v-card v-if="step==1" class="ld-modal">
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <h3 class="text-xs-center">
                <b>¿CONFIRMAR ACTUALIZACIÓN DE PLAN DE ACCIÓN?</b>
              </h3>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="dialog = false" small>Atras</v-btn>
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="updatePlan" :loading="loading" small>CONFIRMAR</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else class="ld-modal">
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <h3 class="text-xs-center">
                <b>¿Finalizar registro para el incidente N°-{{this.datos.id_incidencia |idNumero}}?</b>
              </h3>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" flat @click="addNewPlan" small>Agregar plan de acción</v-btn>
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="goPlan" :loading="loading" small>FINALIZAR</v-btn>
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
    idNumero(val) {
      let r = "" + val;
      const length = 10;
      while (r.length < length) {
        r = "0" + r;
      }
      return r;
    }
  },
  data() {
    return {
      dialog: false,
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
          state: true
        },
        {
          id: 2,
          icon: require("@/assets/tarjeta_export.png"),
          text: "Seguridad",
          state: false
        }
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
      loading: false
    };
  },
  computed: {
    idNumero() {
      const numero = parseInt(this.datos.id_incidencia);
      let r = "" + numero;
      const length = 10;
      while (r.length < length) {
        r = "0" + r;
      }
      return r;
    },
    ...mapState("incidencias", ["areas", "gerencias", "personal", "locales"]),
    ...mapState("planAccion", ["datos"]),
    itemsRiesgoAmbiente() {
      return itemsRiesgo.filter(val => val.tipo == 1);
    },
    itemsRiesgoSeguridad() {
      return itemsRiesgo.filter(val => val.tipo == 2);
    }
  },
  methods: {
    addNewPlan() {
      this.dialog = false;
      this.$store.commit("planAccion/RESET_DATOS");
    },
    goPlan() {
      this.active = 1;
      this.dialog = false;
      this.$router.push(`/planes-accion`);
    },
    async goSave() {
      this.loading = true;
      await this.$store.dispatch("planAccion/postPlan");
      this.loading = false;
      this.step = 2;
      //this.$router.push("/planes-accion");
    },
    async goStep(val) {
      console.log("step: " + val);
      this.dialog = true;

      /* this.active = val; */
    },
    async updatePlan() {
      this.loading = true;
      await this.$store.dispatch("planAccion/updatePlan");
      this.loading = false;
      this.$router.push("/planes-accion");
    }
  },
  async created() {
    await this.$store.dispatch("incidencias/getAreas");
    await this.$store.dispatch("incidencias/getGerencias");
    await this.$store.dispatch("incidencias/getPersonal");
    const id = parseInt(this.$route.params.id);
    console.log("----here----" + id);
    this.$store.commit("planAccion/RESET_DATOS");
    await this.$store.dispatch("planAccion/getOnePlan", { id: id });
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
