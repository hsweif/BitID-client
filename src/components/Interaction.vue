<template>
  <div class="interaction-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <button id="contBtn" v-on:click="submitBtnClicked">Submit</button>
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
      model:{

      },
      schema: {
        groups: [
          {
            legend: "Step3. Define interaction behavior",
            fields: [
              {
                label: "1. Do you want to input manully or select from existed objects?",
                type: "select",
                values: ['Manually input', 'Select from existed list'],
              },
              {
                type: "input",
                inputType: "text",
                label: "2. Input the related objects of this tag."
              },
              {
                type: "select",
                label: "or choose from the list",
                values: []
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      submitBtnClicked: function(event) {
        alert("Successfully submitted");
        router.replace({ name: "Form" });
      }
    };
  }
};
</script>