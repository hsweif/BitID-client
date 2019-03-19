<template>
  <div>
    <objList @selectList="getSelected"></objList>
    <button v-on:click="Confirm">Confirm</button>
    <li v-for="item in items">{{ item.tag }} : {{item.state}}</li>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tagData, saveAPI, serverHost } from "../global";
import router from "../router/index";
import ObjectList from "./ObjectList.vue";
Vue.component("objList", ObjectList);

export default Vue.extend({
  data() {
    return {
      selectedObj: "",
      items: [{ tag: "tag1", state: "off" }, { tag: "tag2", state: "off" }]
    };
  },
  methods: {
    getSelected: function(msg) {
      this.selectedObj = msg;
    },
    Confirm: function() {
      // TODO: Add the retur info from server.
      let xhr = new XMLHttpRequest();
      let form = new FormData();
      let vm = this;
      form.append("objName", this.selectedObj);
      xhr.open("POST", serverHost+'/get-object-state', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let response = JSON.parse(xhr.responseText)
          vm.$data.items = response['info'];
        }
      };
      xhr.send(form);
    }
  }
});
</script>

