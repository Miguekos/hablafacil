<template>
  <v-radio-group column>
    <v-layout wrap row>
      <v-flex xs12 md6 v-for="(item, key) in items" :key="key">
        <v-radio :value="item.id">
          <template v-slot:label>
            <v-layout wrap row align-center class="maintext">
              <v-flex xs2 v-if="item.icon">
                <v-img aspect-ratio="1" :src="item.icon" width="48"></v-img>
              </v-flex>
              <v-flex xs10>
                <strong style="  word-wrap: break-word; ">{{ item.text }}</strong>
              </v-flex>
            </v-layout>
          </template>
        </v-radio>
      </v-flex>
    </v-layout>
  </v-radio-group>
</template>

<script>
export default {
  name: "Chart",
  props: ["items"],
  data: function() {
    return {};
  }
};
</script>
<style scoped>
.maintext {
  min-width: 360px !important;
  width: 100% !important;
}
@media (max-width: 480px) {
  .maintext {
    min-width: 280px !important;
    width: 100% !important;
  }
}
</style>