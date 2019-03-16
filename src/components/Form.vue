<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <select v-model="selected">
      <option v-for="option in options" v-bind:key="option">{{ option }}</option>
    </select>
    <span>Selected: {{ selected }}</span>
  </div>
</template>


<script src="js/vue-resource.js"></script>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import router from "../router/index";
import { tagData, epcAPI, epcList, changeEpc } from "../global";
import axios from "axios";
const request = require("request");
const schedule = require("node-schedule");
const rp = require("request-promise");

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
                label: "Select or input the RFID of the new tag."
              },
              {
                type: "input",
                inputType: "text",
                model: "RFID",
                label: "Manual input",
                placeholder: "Please input the epc of the tag"
              },
              {
                type: "select",
                model: "RFID",
                id: "auto_rfid",
                label: "Automatic detection",
                values: function() {
                  // let response = undefined;
                  // try {
                  //   response = await request(epcAPI);
                  //   response = [3, 3, 3];
                  // } catch (err) {
                  //   return ["x"];
                  // }
                  // resolve(response['epc'])
                  return epcList;
                  /*
                  rp(options)
                    .then(function(repos) {
                      return repos;
                    })
                    .catch(function(err) {
                      return [4, 5, 6];
                    });
                    */
                },
                buttons: [
                  {
                    classes: "refresh_btn",
                    label: "Refresh",
                    onclick: function(model) {
                      let xhr = new XMLHttpRequest();
                      xhr.timeout = 3000;
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                          alert(this.responseText);
                          model.RFID = this.status;
                        }
                      };
                      xhr.open("GET", epcAPI, true);
                      xhr.send();
                      model.RFID = xhr.response;
                    }
                  }
                ]
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
      ready: function() {
        this.getPeoples();
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      methods: {
        getRFIDList() {
          this.options.data = [3, 3, 3];
        },
        getPeoples: function() {
          alert("get");
          var vm = this;
          $.ajax({
            url: epcAPI,
            type: "get",
            dataType: "json",
            success: function(data) {
              vm.$set("options", data.result);
            },
            error: function(xhr, errorType, error) {
              alert(
                "Ajax request error, errorType: " +
                  errorType +
                  ", error: " +
                  error
              );
            }
          });
        }
      }
    };
  }
};
</script>