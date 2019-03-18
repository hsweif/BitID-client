<template>
  <div class="sensor-body">
    <select v-model="selected" @change="listChange">
      <option v-for="option in options" v-bind:key="option">{{ option }}</option>
    </select>
    <button v-on:click="Refresh">refresh</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { serverHost } from "../global";
import Multiselect from "vue-multiselect";
// register globally
Vue.component("multiselect", Multiselect);
export default Vue.extend({
  data() {
    return {
      selected: '',
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
          let response = JSON.parse(xhr.responseText)
          vm.$data.options = response['objects'];
          alert('Successful to refresh')
        }
      };
      xhr.send(null);
    },
    listChange: function(){
      this.$emit('selectList', this.selected);
    }
  }
});
</script>
