<template>
  <div class="outer">
    <div class="inter">
      <el-tooltip effect="dark" content="Confirm" placement="top">
        <el-button class="button1" type="success" icon="el-icon-check" circle v-on:click="Confirm"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Stop" placement="top">
        <el-button class="button2" type="danger" icon="el-icon-close" circle v-on:click="Back"></el-button>
      </el-tooltip>
    </div>
    <div class = "second">
    <objList class="myobjlist" @selectList="getSelected"></objList>
    </div>
    <div class="vfor">
      <el-card class="box-card">
        <div v-for="item in items" :key="item" class="text item">
          {{ item }}
        </div>
      </el-card>
    <!-- <li v-for="item in items">{{ item }}</li> -->
    </div>
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

<style scoped>
  .outer{
    margin-top: 5%;
  }
  .vfor{
    margin-top:1%;
    margin-left: 30%;
    width:600px;
  }
  .second{
  }
  .inter{
    width:7%;
    float:left;
    margin-left: 33%;
    margin-right: 0%; 
  }
  .text {
    font-size: 20px;
  }

  .item {
    padding: 5px 0;
  }
  .box-card {
    height:480px;
    text-align: left;
    padding-left: 10%;
  }
</style>
