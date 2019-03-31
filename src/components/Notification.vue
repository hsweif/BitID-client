<template>
  <div class="outer">
    <div class="inter">
      <el-tooltip effect="dark" content="Confirm" placement="top">
        <el-button class="button1" type="success" icon="el-icon-check" round v-on:click="Confirm">Refresh</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Stop" placement="top">
        <el-button class="button2" type="danger" icon="el-icon-close" round v-on:click="Back">Stop</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Add a new tag" placement="top">
        <el-button class="button3"  type="primary" icon="el-icon-edit" circle v-on:click="DefineTag"></el-button>
      </el-tooltip>
    </div>
    <!-- <div class = "second">
    <objList class="myobjlist" @selectList="getSelected"></objList>
    </div> -->
    <div class="vfor">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Object"
        width="180"
        :filters="namefilter"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status">
      </el-table-column>
    </el-table>
      <!-- <el-card class="box-card">
        <div v-for="item in items" :key="item" class="text item">
          {{ item }}
        </div>
      </el-card> -->
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
      items: {},
      namefilter:[],
      stopHandler: undefined,
      options:['trophy'],
      tableData: [],
    };
  },
  methods: {
    getSelected: function(msg) {
      this.selectedObj = msg;
    },
    Refresh: function() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", serverHost + "/get-objects", true);
      let vm = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let response = JSON.parse(xhr.responseText)
          vm.$data.options = response['objects'];
        }
      };
      xhr.send(null);
    },
    getObjectState: function() {
      // TODO: Enclose to one HTTP request.
      let vm = this;
      // FIXME: Too frequent http request 
      let xhr = new XMLHttpRequest();
      xhr.open("GET", CONFIG.GET_ALL_OBJ, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let response = JSON.parse(xhr.responseText);
          for(let s in response){
            console.log(s);
            console.log(response[s])
            console.log(response[s][0])
            if(response[s][0] !== 'undetected') {
              vm.$data.items[s] = response[s][0];
            }
          }
        }
      }
      xhr.send(null)
      /*
      for (var i=0;i<this.options.length;i++) {
        let form = new FormData();
        let xhr = new XMLHttpRequest();
        let objName = this.options[i];
        form.append("objName", objName);
        xhr.open("POST", serverHost + "/get-object-state", true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText);
            vm.$data.items[objName] = response["info"][0]
            if(objName == 'book'){
              console.log(response["info"][0])
            }
          }
        };
        xhr.send(form);
      }
      */
      // console.log(this.$data.items);
      this.tableData = [];
      var tempdic={};
      for (var i=0;i<this.options.length;i++) {
        tempdic={};
        tempdic['name'] = this.options[i];
        tempdic['status'] = this.items[this.options[i]];
        this.tableData.push(tempdic);
      }
      // console.log(this.tableData);
      var name = "";
      this.namefilter = []
      for (var i=0;i<this.options.length;i++) {
        tempdic={};
        tempdic['text'] = this.options[i];
        tempdic['value'] = this.options[i];
        this.namefilter.push(tempdic);
      }
    },
    Confirm: function() {
      this.Refresh();
      this.stopHandler = setInterval(this.getObjectState, CONFIG.UPDATE_INTERVAL);
    },
    Back: function() {
      this.clearInterval(this.stopHandler);
    },
    DefineTag: function() {
      if(this.stopHandler !== undefined) {
        this.clearInterval(this.$data.stopHandler);
      }
      router.push({name: 'Form'});
    },
    created(){
      this.Refresh();
    },
    filterTag(value, row) {
        return row.name === value;
    }
  }
});
</script>

<style scoped>
  .outer{
    margin-top: 5%;
    text-align: center
  }
  .vfor{
    margin-top:1%;
    margin-left: 30%;
    width:600px;
  }
  .button1{
    width: 150px;
    margin-right: 50px;
    margin-bottom: 50px;
  }
  .button2{
    width: 150px;
  }
  .button3{
    margin-left: 12%;
  }
  .second{
  }
  .inter{
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
