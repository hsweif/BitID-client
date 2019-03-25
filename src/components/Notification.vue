<template>
  <div>
    <objList @selectList="getSelected"></objList>
    <button v-on:click="Confirm">Confirm</button>
    <button v-on:click="Back">Stop</button>
    <li v-for="item in items">{{ item }}</li>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tagData, serverHost, CONFIG } from "../global";
import router from "../router/index";
import ObjectList from "./ObjectList.vue";
Vue.component("objList", ObjectList);

export default Vue.extend({
  data() {
    return {
      selectedObj: "",
      items: [],
      stopHandler: undefined
    };
  },
  methods: {
    getSelected: function(msg) {
      this.selectedObj = msg;
    },
    getObjectState: function() {
      let xhr = new XMLHttpRequest();
      let form = new FormData();
      let vm = this;
      form.append("objName", this.selectedObj);
      xhr.open("POST", serverHost + "/get-object-state", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let response = JSON.parse(xhr.responseText);
          vm.$data.items = response["info"];
        }
      };
      xhr.send(form);
    },
    Confirm: function() {
      this.$data.stopHandler = setInterval(this.getObjectState, CONFIG.UPDATE_INTERVAL);
    },
    Back: function() {
      clearInterval(this.$data.stopHandler);
    }
  }
});
</script>

