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
import { tagData, epcAPI, epcList, changeEpc } from "../global";

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
        RFID: "",
        TagType: ""
      },
      schema: {
        groups: [
          {
            legend: "Step1. Define RFID",
            fields: [
              {
                type: "label",
                label: "Automatically detect or manually input the EPC of the new tag."
              },
              {
                type: "input",
                inputType: "text",
                model: "RFID",
                label: "Manual input",
                placeholder: "Please input the epc of the tag",
                required: true,
                buttons: [
                  {
                    classes: "detect_btn",
                    label: "Detect",
                    onclick: function(model) {
                      let xhr = new XMLHttpRequest();
                      let vm = this;
                      xhr.open("GET", epcAPI, true);
                      xhr.timeout = 3000;
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                          alert("Succesfully detected.");
                          model.RFID = xhr.responseText;
                        }
                      };
                      xhr.send(null);
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
                values: ["Interaction", "Sensor"]
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
                    tagData["RFID"] = model.RFID;
                    tagData["TagType"] = model.TagType;
                    router.push({ name: model.TagType });
                  } else {
                    alart("Please select your tag type");
                  }
                }
              }
            ]
          }
        ]
      },
      ready: function() {
        this.getPeoples();
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