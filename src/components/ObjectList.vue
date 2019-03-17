<template>
  <div class="sensor-body">
    <select v-model="selected">
      <option v-for="option in options" v-bind:key="option">{{ option }}</option>
    </select>
    <button v-on:click="Refresh">Refresh</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { serverHost } from "../global";
import Multiselect from "vue-multiselect";
// register globally
Vue.component("multiselect", Multiselect);
export default Vue.extend({
  props:[
    'selected'
  ],
  data() {
    return {
      value: null,
      options: [1, 2, 3]
    };
  },
  methods: {
    Refresh: function() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", serverHost + "/get-objects", true);
      let vm = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          vm.$data.options = Array(xhr.responseText['objects']);
        }
      };
      xhr.send(null);
    }
  }
});
</script>
