<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <button id="contBtn" v-on:click="contBtnClicked" >Continue</button>
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import router from "../router/index"
Vue.use(VueFormGenerator);

export default {
    name: 'Form',
    data() {
        return {
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
                            label: "Manual input",
                        },
                        {
                            type: "select",
                            label: "Automatic detection",
                            values: []
                        }
                    ]
                }, 
                {
                    legend: "Step2. Which category is this tag?",
                    fields: [
                        {
                            type: "select",
                            values: [
                                "Interaction", "Sensor"
                            ]
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
        contBtnClicked: function(event) {
            // TODO: Jump to different page which depends on tag category.
            router.push({name: 'interaction'});
        }
    };
  }
};
</script>