import { format } from "date-fns";

const defaultIncidente = {
  numero: 1,
  ugb: null,
  area: 0,
  nameArea: "LOCAL",
  local: 1,
  fecha: new Date().toISOString().substr(0, 10),
  responsable_del_registro: null,
  classRiesgo: 1,
  clasificacion: 1,
  potencial_de_gravedad: 3,
  riesgo: 1,
  descripcion: "",
  accion_de_bloqueo: false, // debe ser BOOLEAN
  generar_plan_accion: 0
};

const defaultPlan = {
  numero: 1,
  id_incidencia: 0,
  ugb: "",
  fecha_prevista: new Date().toISOString().substr(0, 10),
  fecha_realizada: new Date().toISOString().substr(0, 10),
  responsable_registro: "",
  area: "",
  local: 1,
  observacion: "",
  grupo_de_tareas: false,
  estado: false // FALTA ESTA VARIABLE EN LA BD
};
const itemsRiesgo = [
  {
    id: 1,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestiondeservicioseco.png"),
    text: "Gestión de servicios ecosistémicos",
    state: true
  },
  {
    id: 2,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/sistemadegestionambiental.png"),
    text: "Sistema de gestión ambiental",
    state: true
  },
  {
    id: 3,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/transportedeproductospeligrosos.png"),
    text: "Transporte de productos peligrosos",
    state: true
  },
  {
    id: 4,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestiondepresasydepositos.png"),
    text: "Gestión de presas y depósitos de relaves",
    state: true
  },
  {
    id: 5,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestiondemedioambiente.png"),
    text: "Gestión de medio ambiente en inversiones",
    state: true
  },
  {
    id: 6,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestionderecursos.png"),
    text: "Gestión de recursos naturales",
    state: true
  },
  {
    id: 7,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestionemisiones.png"),
    text: "Gestión de emisiones atmosfericas",
    state: true
  },
  {
    id: 8,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestionderesiduos.png"),
    text: "Gestión de residuos",
    state: true
  },
  {
    id: 9,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestionplancierre.png"),
    text: "Gestión del plan de cierre",
    state: true
  },
  {
    id: 10,
    tipo: 1,
    icon: require("@/assets/icons/ambiente/gestiondeaguas.png"),
    text: "Gestión de aguas y efluentes líquidos",
    state: true
  },
  /* --- */
  {
    id: 11,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/animales.png"),
    text: "Animales ponzoñosos",
    state: true
  },
  {
    id: 12,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/herramientasmanuales.png"),
    text: "Herramientas manuales",
    state: true
  },
  {
    id: 13,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/instalacioneselectricas.png"),
    text: "Instalaciones eléctricas",
    state: true
  },
  {
    id: 14,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/excavacionsubterranea.png"),
    text: "Excavación subterranea",
    state: true
  },
  {
    id: 15,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/protecciondemaquinas.png"),
    text: "Protección de máquinas",
    state: true
  },
  {
    id: 16,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/trabajoenaltura.png"),
    text: "Trabajo en alturas",
    state: true
  },
  {
    id: 17,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/excavaciones.png"),
    text: "Excavación a cielo abierto",
    state: true
  },
  {
    id: 18,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/espacioconfinado.png"),
    text: "Espacio confinado",
    state: true
  },
  {
    id: 19,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/sistemapresurizado.png"),
    text: "Sistemas presurizados",
    state: true
  },
  {
    id: 20,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/quimicaspeligrsos.png"),
    text: "Sustancias químicas peligrosas",
    state: true
  },
  {
    id: 21,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/bloqueoyaislamiento.png"),
    text: "Bloqueo y aislamiento de energías",
    state: true
  },
  {
    id: 22,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/excavacionesciviles.png"),
    text: "Excavaciones civiles",
    state: true
  },
  {
    id: 23,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/metalliquido.png"),
    text: "Metal liquido",
    state: true
  },
  {
    id: 24,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/vehiculoslivianos.png"),
    text: "Vehículos livianos y equipos móviles",
    state: true
  },
  {
    id: 25,
    tipo: 2,
    icon: require("@/assets/icons/seguridad/cargassuspendidas.png"),
    text: "Cargas suspendidas",
    state: true
  }
];
export { defaultIncidente, itemsRiesgo, defaultPlan };
