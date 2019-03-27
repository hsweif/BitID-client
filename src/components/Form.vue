<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>


<script src="js/vue-resource.js"></script>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import router from "../router/index";
import { tagData, epcAPI, epcList, changeEpc, CONFIG } from "../global";

Vue.use(VueFormGenerator);

export default {
  name: "Form",
  beforeCreate() {
    epcList = [4, 4, 4];
  },
  data() {
    return {
      selected: "A",
      options: epcList,
      model: {
        EPC: "",
        TagType: ""
      },
      schema: {
        groups: [
          {
            legend: "Step1. Define EPC",
            fields: [
              {
                type: "label",
                label: "Automatically detect or manually input the EPC of the new tag."
              },
              {
                type: "input",
                inputType: "text",
                model: "EPC",
                label: "Manual input",
                placeholder: "Keep empty if you just want to check the state",
                required: true,
                buttons: [
                  {
                    classes: "detect_btn",
                    label: "Detect",
                    onclick: function(model) {
                      let xhr = new XMLHttpRequest();
                      let vm = this;
                      let v = model;
                      setInterval(() =>{
                        xhr.open("GET", epcAPI, true);
                        xhr.timeout = 3000;
                        xhr.onreadystatechange = function() {
                          if (xhr.readyState == 4) {
                            if(xhr.responseText != 'None') {
                              v.EPC = xhr.responseText;
                            }
                          }
                        };
                        xhr.send(null);
                      }, CONFIG.UPDATE_INTERVAL)
                    }
                  }
                ]
              }
            ]
          },
          {
            legend: "Step2. Which category is this tag?",
            placeholder: "Tag type.",
            required: true,
            fields: [
              {
                type: "select",
                model: "TagType",
                values: ["Interaction", "Sensor", "Notification"]
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                buttonText: "Continue",
                onSubmit: function(model) {
                  if (
                    model.TagType === "Interaction" ||
                    model.TagType === "Sensor"
                  ) {
                    tagData["EPC"] = model.EPC;
                    tagData["TagType"] = model.TagType;
                    router.push({ name: model.TagType });
                  } else if (model.TagType === 'Notification'){
                    router.push({ name: 'Notification'})
                  }
                }
              }
            ]
          }
        ]
      },
      ready: function() {
        // this.getPeoples();
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    };
  }
};
</script>