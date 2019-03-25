<template>
  <div class="sensor-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <objList></objList>
    <button v-on:click="testList">test</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import router from "../router/index";
import { tagData,  serverHost, CONFIG } from "../global";
import "vue-form-generator/dist/vfg.css";
import ObjectList from './ObjectList.vue'
Vue.component("objList", ObjectList);
// register globally
Vue.use(VueFormGenerator);

export default Vue.extend({
  name: "Sensor",
  data() {
    let objList = ["obj1"];
    return {
      objList: objList,
      vm: this,
      selected: "A",
      options: [
        1,2,3
      ],
      model: {
        RelatedObject: "",
        State: "",
        Behavior: ""
      },
      schema: {
        // groups: [
        //   {
        //     legend: "Step3. Define sensor behavior.",
             fields: [
              {
                type: "select",
                label:
                  "1. Do you want to input object name manually or select from existed objects?",
                values: ["Input manually", "Select from existed objects"]
              },
              {
                type: "input",
                inputType: "text",
                label:
                  "Input the object name. If the object is not existed yet, it will be automatically added",
                model: "RelatedObject"
              },
              {
                type: "select",
                label: "When the tag in this state:",
                values: ["ON", "OFF"],
                model: "State"
              },
              {
                type: "select",
                label: "Select the object name from the list",
                values: objList,
                model: "RelatedObject",
                buttons: [
                  {
                    class: "refresh_btn",
                    label: "Refresh",
                    onclick: function(model) {
                      let xhr = new XMLHttpRequest();
                      xhr.open("GET", serverHost + "/get-objects", true);
                      let v:Vue = this
                      alert(v.$data.objList)
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                          let newList = xhr.responseText;
                          alert(v.$data.$schema.$groups[3].$values)
                        }
                      };
                      xhr.send(null);
                    }
                  }
                ]
              },
              {
                type: "input",
                inputType: "text",
                label: "Semantic meaning.",
                model: "Semantic",
                buttons: [
                  {
                    classes: "sem_btn",
                    label: "Add",
                    onclick: function(model) {
                      let deepCopyModel = JSON.parse(
                        JSON.stringify(this.model)
                      );
                      tagData["Semantic"].push(deepCopyModel);
                      alert("successfully add");
                    }
                  }
                ]
              }
            ]
            /*
          },
          {
            fields: [
              {
                type: "submit",
                buttonText: "Submit",
                onSubmit: function(model) {
                  let xhr = new XMLHttpRequest();
                  let form = new FormData();
                  form.append("content", JSON.stringify(tagData));
                  xhr.open("POST", CONFIG.saveAPI, true);
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                      alert("successfully submitted");
                      router.replace({ name: "Form" });
                    }
                  };
                  xhr.send(form);
                }
              }
            ]
          }
        ]*/
      }
    };
  },
  methods: {
    testList: function(){
      this.options.append({text: "four", value: "D"}) 
    }
  }
});
</script>
