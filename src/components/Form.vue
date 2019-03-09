<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";  // optional core css additions
Vue.use(VueFormGenerator);

export default {
    name: 'Form',
    data() {
        return {
        model: {
            id: 1,
            name: "John Doe",
            password: "J0hnD03!x4",
            skills: ["Javascript", "VueJS"],
            email: "john.doe@gmail.com",
            status: true
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
        }
    };
  }
};
</script>