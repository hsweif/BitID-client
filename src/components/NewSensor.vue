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
    <span>2. Define the state</span>
      <select v-model="state">
        <option disabled value>Unselected</option>
        <option>ON</option>
        <option>OFF</option>
      </select>
    </tr>
    <tr>
      <span>3. Define the semantic meaning.</span>
      <input v-model="semantic">
    </tr>
    <tr>
      <button v-on:click="Submit">Submit</button>
    </tr>
</table>
</template>

<script lang="ts">
import Vue from "vue";
import { tagData, saveAPI, serverHost, reset } from "../global";
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
        State: this.state,
        Behavior: this.semantic
      };
      let deepCopyModel = JSON.parse(JSON.stringify(result));
      tagData["Semantic"].push(deepCopyModel);
      let xhr = new XMLHttpRequest();
      let form = new FormData();
      form.append("content", JSON.stringify(tagData));
      xhr.open("POST", saveAPI, true);
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
