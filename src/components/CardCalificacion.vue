<template>
  <v-layout wrap row align-center>
    <v-flex xs6 sm4 md3 v-for="(item, key) in items" :key="key">
      <v-card
        :color="isEqual(item) ? 'primary' : '#FAFAFA'"
        :style="{ cursor: 'pointer' }"
        @click="selectItem(item);"
      >
        <v-card-text :min-height="90">
          <v-layout wrap row align-center>
            <v-flex hidden-xs-only xs12 sm2 text-xs-center>
              <!--
                <v-icon :class="!isEqual(item) ? '' : 'white--text'"></v-icon>
              -->
              <v-img :src="item.icon"></v-img>
            </v-flex>
            <v-flex
              xs12
              sm10
              class="classText"
              :class="!isEqual(item) ? '' : 'white--text'"
            >
              <small>{{ item.text }}</small>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["item", "items"],
  computed: {
    ...mapState("incidencias", ["datos"])
  },
  data() {
    return {
      isSelected: 1
    };
  },
  methods: {
    selectItem(e) {
      console.log("******");
      console.log(e);
      /* this.$emit("click", e); */
      this.isSelected = e.id;
      this.$emit("input", e.id);
    },
    isEqual(val) {
      if (this.isSelected === val.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
.classText {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
@media only screen and (max-width: 768px) {
  .classText {
    font-size: 12px;
    word-wrap: break-word;
  }
}
@media only screen and (min-width: 768px) {
  .classText {
    font-size: 14px;
    word-wrap: break-word;
  }
}
</style>
