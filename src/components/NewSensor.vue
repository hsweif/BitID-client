<template>
<div class="outer">
<table class="mytable" border="1">
  <tr>
      <span class="mytext">1. Select the object name from the list or input manually</span>
  </tr>
  <tr>
      <input class="myinput" v-model="objectName" placeholder="Input manually">
  </tr>
  <tr>
      <objList class="input2" @selectList="getSelected"></objList>
  </tr>
    <tr>
      <span class="mytext">When it is detected, its semantic meaning is:</span>
      <input class="input3" v-model="on_semantic">
    </tr>
    <tr>
      <span class="mytext">When it is undetected, its semantic meaning is:</span>
      <input class="input4" v-model="off_semantic">
    </tr>
    <tr>
      <el-button class="mybutton" type="success" v-on:click="Submit" round>Submit</el-button>  
    </tr>
</table>
</div>
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

<style scoped>
.mytable {
  margin-left: 34%;
  margin-top: 5%;
  padding: 3%;
}
.mytext{
  font-size: 17px;
}
.myinput{
  width: 480px;
  height: 40px;
  margin: 10px;
}
.input2{
  margin: 10px;
  margin-bottom: 0px;
  width: 480px;
}
.input3{
  margin-left: 22px;
  height: 30px;
}
.input4{
  margin-left: 3px;
  height: 30px;
  margin-top: 5px;
}
.mybutton{
  margin-left: 380px;
  margin-top:20px;
  width: 120px;
}
</style>
