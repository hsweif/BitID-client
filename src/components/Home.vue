<template>
  <div>
    <div style="float: middle">
      <span>1. Select the object name from the list or input manually</span>
    </div>
    <div style="float: middle">
      <input type="radio" id="one" value="One" v-model="picked">
      <input v-model="objectName" placeholder="Input manually">
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Select from the list</label>
      <objList></objList>
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
Vue.component("objList", ObjectList);

export default Vue.extend({
  data() {
    return {
      msg: "hello",
      picked: ""
    };
  },
  methods:{
      Submit: function(){
          alert('submit');
      }
  }
});
</script>
