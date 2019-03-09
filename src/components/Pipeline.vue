<template>
  <div id="continue_btn">
    <button v-on:click="continue_btn_clicked">Continue</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export const continue_btn = Vue.extend({
    el: '#continue_btn',
    data: {
        name: 'Vue.js'
    },
    methods: {
        continue_btn_clicked: function(event){
            // `this` 在方法里指向当前 Vue 实例
            alert('Hello ' + this.name + '!')
            if (event) {
                alert(event.target.tagName)
            }
        }
    }
}) 
</script>
