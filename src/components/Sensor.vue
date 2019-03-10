<template>
  <div class="sensor-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <button id="submitBtn" v-on:click="submitBtnClicked">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import router from "../router/index";
import "vue-form-generator/dist/vfg.css";
Vue.use(VueFormGenerator);

export default Vue.extend({
  name: "Sensor",
  data() {
    return {
        schema:{
            groups: [
                {
                    legend: "Step3. Define sensor behavior.",
                    fields:[
                        {
                            type: "select",
                            label: "1. Do you want to input object name manually or select from existed objects?",
                            values: ["Input manually", "Select from existed objects"]
                        },
                        {
                            type: "input",
                            inputType: "text",
                            label: "Input the object name. If the object is not existed yet, it will be automatically added"                            
                        },
                        {
                            type: "select",
                            label: "Select the object name from the list"
                        }
                    ]
                }
            ]
        },
        submitBtnClicked: function(event) {
            alert("Successfully submitted");
            router.replace({ name: "Form" });
        }
    };
  }
});
</script>
