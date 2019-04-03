<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>


<script src="js/vue-resource.js"></script>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
// import "vue-form-generator/dist/vfg.css";
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
      updateHandler: undefined,
      model: {
        EPC: "",
        TagType: "",
        SensingType: ""
      },
      schema: {
        groups: [
          {
            legend: "Step1. Define EPC",
            fields: [
              {
                type: "label",
                label:
                  "Automatically detect or manually input the EPC of the new tag."
              },
              {
                type: "input",
                inputType: "text",
                model: "EPC",
                label: "Manual input",
                required: true,
                buttons: [
                  {
                    classes: "detect_btn",
                    label: "Detect",
                    onclick: function(model) {
                      let xhr = new XMLHttpRequest();
                      let v = model;
                      this.label = "Confirm";
                      this.updateHandler = setInterval(() => {
                        xhr.open("GET", epcAPI, true);
                        xhr.onreadystatechange = function() {
                          if (xhr.readyState == 4) {
                            if (xhr.responseText != "None") {
                              v.EPC = xhr.responseText;
                            }
                          }
                        };
                        xhr.send(null);
                      }, CONFIG.UPDATE_INTERVAL);
                    }
                  },
                  {
                    classes: "confirm_btn",
                    label: "Confirm",
                    onclick: function(model) {
                      clearInterval(this.updateHandler);
                      this.updateHandler = undefined;
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
                values: ["Interaction", "Sensor"],
                label: "What kind of the tag is?"
              },
              {
                type: "select",
                label: "Sensing type",
                values: ["open", "short"],
                model: "Sensing Type"
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
                    tagData["SensingType"] = model.SensingType;
                    router.push({ name: model.TagType });
                  }
                }
              }
            ]
          }
        ]
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

<style scoped>
.panel-body {
  width: 80%;
  margin-left: 10%;
  height: 600px;
}
</style>