<template>
<table border="1" style="float: middle">
  <tr>
      <span>Please define the tag behavior:</span>
  </tr>
  <tr>
      <span>Combination behavior. (with other objects)</span>
  </tr>
  <tr>
      <span>If this object is</span>
      <select v-model="self_state">
        <option disabled value>Define the state</option>
        <option>ON</option>
        <option>OFF</option>
      </select>
      <span>and the object (optional)</span>
  </tr>
  <tr>
      <input v-model="relatedObj" placeholder="Input manually">
      <objList @selectList="getSelected"></objList>
  </tr>
  <tr>
      <span>is on state</span>
      <select v-model="relatedState">
        <option disabled value>Unselected</option>
        <option>ON</option>
        <option>OFF</option>
      </select>
  </tr>
  <tr>
      <span>then the semantic meaning is:</span>
      <input v-model="sem_comb">
  </tr>
  <tr>
    <td>
      <button v-on:click="Add">Add</button>
    </td>
    <td>
      <button v-on:click="Submit">Submit</button>
    </td>
  </tr>
</table>
</template>

<script lang="ts">
import Vue from "vue";
import { tagData, saveAPI, serverHost, reset } from "../global";
import router from "../router/index";
export default Vue.extend({
  data() {
    return {
      semControl: "",
      relatedObj: "",
      relatedState: "",
      self_state: "",
      sem_comb: ""
    };
  },
  methods: {
    Add: function() {
      let correlateCase = {
        State: this.self_state,
        RelatedObj: this.relatedObj,
        RelatedObjState: this.relatedState,
        Behavior: this.sem_comb
      };
      tagData["Semantic"].push(correlateCase);
      alert("successfully add");
    },
    Submit: function() {
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
      this.relatedObj = msg;
    }
  }
});
</script>
