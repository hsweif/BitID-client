<template>
<table border="1" style="float: middle">
  <tr>
      <span>1. Select the object name from the list or input manually</span>
  </tr>
  <tr>
      <input v-model="objectName" placeholder="Input manually">
  </tr>
  <tr>
      <objList @selectList="getSelected"></objList>
  </tr>
    <tr>
      <span>When it is detected, its semantic meaning is:</span>
      <input v-model="on_semantic">
    </tr>
    <tr>
      <span>When it is undetected, its semantic meaning is:</span>
      <input v-model="off_semantic">
    </tr>
    <tr>
      <button v-on:click="Submit">Submit</button>
    </tr>
</table>
</template>

<script lang="ts">
import Vue from "vue";
import { tagData, serverHost, reset, CONFIG } from "../global";
import router from "../router/index";
import ObjectList from "./ObjectList.vue";
Vue.component("objList", ObjectList);


export default Vue.extend({
  data() {
    return {
      picked: "",
      objectName: "",
      state: "",
      semantic: ""
    };
  },
  methods: {
    Submit: function() {
      let result = {
        RelatedObject: this.objectName,
        ON: this.on_semantic,
        OFF: this.off_semantic,
      };
      let deepCopyModel = JSON.parse(JSON.stringify(result));
      tagData["Semantic"].push(deepCopyModel);
      let xhr = new XMLHttpRequest();
      let form = new FormData();
      form.append("content", JSON.stringify(tagData));
      xhr.open("POST", CONFIG.saveAPI, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          alert("successfully submitted");
          reset();
          router.replace({ name: "Form" });
        }
      };
      xhr.send(form);
    },
    getSelected: function(msg) {
      this.objectName = msg;
    }
  }
});
</script>
