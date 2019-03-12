<template>
  <div class="interaction-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import router from "../router/index";
Vue.use(VueFormGenerator);

export default {
  name: "Interaction",
  data() {
    return {
      model: {
        RFID: "",
        Objects: []
      },
      schema: {
        groups: [
          {
            legend: "Step3. Define interaction behavior",
            fields: [
              {
                type: "select",
                label: "When the tag is ON/OFF:",
                values: ["ON", "OFF"]
              },
              {
                type: "input",
                inputType: "text",
                label: "Semantic meaning of this state.",
                buttons: [
                  {
                    classes: "sem_btn",
                    label: "Add",
                    onclick: function(model){
                      alert("successfully add");
                    }
                  }
                ]
              }
            ]
          },
          {
            legend: "Step4(Optional). Define related behavior",
            fields: [
              {
                type: "select",
                label: "When the tag is ON/OFF:",
                values: ["ON", "OFF"]
              },
              {
                type: "input",
                inputType: "text",
                label: "Please input the name of the related object"
              },
              {
                type: "select",
                label: "When the state of that object is ON/OFF:",
                values: ["ON", "OFF"]
              },
              {
                type: "input",
                inputType: "text",
                label: "Semantic meaning.",
                buttons: [
                  {
                    classes: "sem_btn",
                    label: "Add",
                    onclick: function(model){
                      alert("successfully add");
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
                  alert(JSON.stringify(model));
                  router.replace({ name: "Form" });
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