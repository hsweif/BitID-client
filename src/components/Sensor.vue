<template>
  <div class="sensor-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import router from "../router/index";
import tagData from "../global"
import "vue-form-generator/dist/vfg.css";
Vue.use(VueFormGenerator);

export default Vue.extend({
  name: "Sensor",
  data() {
    return {
        model: {
            RelatedObject: "",
            Semantic: ""
        },
      schema: {
        groups: [
          {
            legend: "Step3. Define sensor behavior.",
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
                label: "Select the object name from the list",
                values: function(){
                    // TODO: This function enumerate object list.
                    let array2:string[] = ["a", "b", "c"];
                    return array2;
                }, 
                model: "RelatedObject"
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
                      let deepCopyModel = JSON.parse(JSON.stringify(this.model));
                      tagData['Semantic'].push(deepCopyModel);
                      alert("successfully add" + JSON.stringify(tagData));
                    }
                  }
                ]
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                buttonText: "Submit",
                onSubmit: function(model) {
                  // alert(JSON.stringify(model));
                  alert("Successfully submit");
                  router.replace({ name: "Form" });
                }
              }
            ]
          }
        ]
      }
    };
  }
});
</script>
