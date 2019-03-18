<template>
  <div>
    <div style="float: middle">
      <span>1. Select the object name from the list or input manually</span>
    </div>
    <div style="float: middle">
      <input type="radio" id="one" value="Manually" v-model="picked">
      <input v-model="objectName" placeholder="Input manually">
      <br>
      <input type="radio" id="two" value="Auto" v-model="picked">
      <label for="two">Select from the list</label>
      <objList @selectList="getSelected"></objList>
    </div>
    <div style="float: middle">
      <select v-model="state">
        <option disabled value>Define the state</option>
        <option>ON</option>
        <option>OFF</option>
      </select>
    </div>
    <div style="float: middle">
      <span>2. Define the semantic meaning.</span>
      <input v-model="semantic">
    </div>
    <div>
      <button v-on:click="Submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ObjectList from "./ObjectList.vue";
import { tagData, saveAPI, serverHost } from "../global";
import router from "../router/index";
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
