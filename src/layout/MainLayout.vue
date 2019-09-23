<template>
  <v-content class="mainLayoutLD">
    <home-toolbar></home-toolbar>
    <!-- <menu-float></menu-float> -->
    <router-view></router-view>
  </v-content>
</template>

<script>
import HomeToolbar from "../components/toolbar/HomeToolbar";
export default {
  components: {
    HomeToolbar
    //     MenuFloat: () =>
    //       import(/* webpackChunkName: "menu-float"*/ "../components/MenuFloat.vue")
  }
};
//
</script>
<style>
.mainLayoutLD {
  background: #f1f1f1;
}
.container {
  width: 100%;
  /* max-width: 1024px !important; */
  height: 100% !important;
  min-height: calc(100vh - 64px) !important;
  padding: 8px;
}

@media (max-width: 768px) {
  .container {
    min-height: calc(100vh - 56px) !important;
    padding: 0px !important;
  }
}
/* modals */
.ld-modal {
  border-radius: 12px !important;
  overflow: inherit !important;
  border: 2px solid #ffffff !important;
  width: 100% !important;

  background: rgba(255, 255, 255, 1) !important;
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 5%,
    rgba(255, 255, 255, 1) 18%,
    rgba(246, 246, 246, 1) 37%,
    rgba(238, 238, 238, 1) 91%,
    rgba(237, 237, 237, 1) 100%
  ) !important;
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(5%, rgba(255, 255, 255, 1)),
    color-stop(18%, rgba(255, 255, 255, 1)),
    color-stop(37%, rgba(246, 246, 246, 1)),
    color-stop(91%, rgba(238, 238, 238, 1)),
    color-stop(100%, rgba(237, 237, 237, 1))
  ) !important;
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 5%,
    rgba(255, 255, 255, 1) 18%,
    rgba(246, 246, 246, 1) 37%,
    rgba(238, 238, 238, 1) 91%,
    rgba(237, 237, 237, 1) 100%
  ) !important;
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 5%,
    rgba(255, 255, 255, 1) 18%,
    rgba(246, 246, 246, 1) 37%,
    rgba(238, 238, 238, 1) 91%,
    rgba(237, 237, 237, 1) 100%
  ) !important;
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 5%,
    rgba(255, 255, 255, 1) 18%,
    rgba(246, 246, 246, 1) 37%,
    rgba(238, 238, 238, 1) 91%,
    rgba(237, 237, 237, 1) 100%
  ) !important;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 1) 5%,
    rgba(255, 255, 255, 1) 18%,
    rgba(246, 246, 246, 1) 37%,
    rgba(238, 238, 238, 1) 91%,
    rgba(237, 237, 237, 1) 100%
  ) !important;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed', GradientType=1);
}
</style>
