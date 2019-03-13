<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <select name="test" id="test"></select>
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import router from "../router/index";
import {tagData} from "../global";
Vue.use(VueFormGenerator);

export default {
  name: "Form",
  data() {
    return {
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
                label: "Select or input the RFID of the new tag."
              },
              {
                type: "input",
                inputType: "text",
                model: "RFID",
                label: "Manual input"
              },
              {
                type: "select",
                model: "RFID",
                label: "Automatic detection",
                values: function() {
                  // TODO: Add detection for tags with rssi over threshold.
                }
              }
            ]
          },
          {
            legend: "Step2. Which category is this tag?",
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
                  // alert(JSON.stringify(tagData));
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
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    };
  }
};
</script>