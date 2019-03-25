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
import {tagData, CONFIG} from "../global";
Vue.use(VueFormGenerator);

export default {
  name: "Interaction",
  data() {
    return {
      model: {
        RelatedObject: '',
        State: '',
        State2: '', //Used in optinoal part
        RelatedObjectState: '',
        Behavior: '',
        RelatedBehavior: ''
      },
      schema: {
        groups: [
          {
            legend: "Step3. Define interaction behavior",
            fields: [
              {
                type: "select",
                label: "When the tag is ON/OFF:",
                values: ["ON", "OFF"],
                model: "State"
              },
              {
                type: "input",
                inputType: "text",
                label: "Semantic meaning of this state.",
                model: "Behavior",
                buttons: [
                  {
                    classes: "sem_btn",
                    label: "Add",
                    onclick: function(model){
                      let directCase = {
                        State: model.State,
                        Behavior: model.Behavior
                      }
                      let deepCopyModel = JSON.parse(JSON.stringify(directCase));
                      tagData['Semantic'].push(deepCopyModel);
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
                model: "State2",
                values: ["ON", "OFF"]
              },
              {
                type: "input",
                inputType: "text",
                model: "RelatedObject",
                label: "Please input the name of the related object"
              },
              {
                type: "select",
                label: "When the state of that object is ON/OFF:",
                model: "RelatedObjectState",
                values: ["ON", "OFF"]
              },
              {
                type: "input",
                inputType: "text",
                model: "RelatedBehavior",
                label: "Semantic meaning.",
                buttons: [
                  {
                    classes: "sem_btn",
                    label: "Add",
                    onclick: function(model){
                      let correlateCase = {
                        State: model.State2,
                        RelatedObj: model.RelatedObject,
                        RelatedObjState: model.RelatedObjectState,
                        Behavior: model.RelatedBehavior
                      }
                      tagData['Semantic'].push(correlateCase);
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
                  let xhr = new XMLHttpRequest();
                  let form = new FormData();
                  form.append("content", JSON.stringify(tagData));
                  xhr.open("POST", CONFIG.saveAPI, true);
                  xhr.send(form);
                  xhr.onload = function(e) {
                    alert(this.responseText);
                  };
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