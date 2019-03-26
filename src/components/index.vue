<template>
  <div class="container">
    <i-row>
      <i-col span="12" class="sortable_container">
        <Form :label-width="100" class="b-a">
          <draggable :clone="cloneData" :list="form_list" :options="dragOptions1">
            <transition-group
              class="form-list-group"
              type="transition"
              :name="'flip-list'"
              tag="div"
            >
              <renders
                v-for="(element,index) in form_list"
                :key="index"
                :ele="element.ele"
                :obj="element.obj || {}"
              ></renders>
            </transition-group>
          </draggable>
        </Form>
      </i-col>
      <i-col span="12" class="sortable_item">
        <Form
          ref="formValidate"
          class="b-a"
          :label-width="100"
          :model="formData"
          @submit.native.prevent
        >
          <draggable :list="sortable_item" :options="dragOptions2">
            <transition-group
              class="form-list-group"
              type="transition"
              :name="'flip-list'"
              tag="div"
            >
              <renders
                @handleRemoveEle="removeEle"
                @handleConfEle="confEle"
                @changeVisibility="changeVisibility"
                v-for="(element,index) in sortable_item"
                :key="index"
                :index="index"
                :ele="element.ele"
                :obj="element.obj || {}"
                :data="formData"
                @handleChangeVal="val => handleChangeVal(val,element)"
                :sortableItem="sortable_item"
                :config-icon="true"
              ></renders>
            </transition-group>
          </draggable>
          <FormItem>
            <Button type="primary" @click="handleSubmit()">Submit</Button>
            <Button type="ghost" @click="handleAdd()" style="margin-left: 8px">Add</Button>
            <Button type="ghost" @click="handleReset()" style="margin-left: 8px">Reset</Button>
          </FormItem>
        </Form>
      </i-col>
      <Modal v-model="showModal" :title="'Settings'" :mask-closable="false">
        <Form class="form_content" :label-width="80" :model="modalFormData" ref="modalFormData">
          <FormItem label="Component" v-if="typeof modalFormData.label != 'undefined'">
            <i-input
              v-model="modalFormData.label"
              placeholder="Please input the component name"
              :maxlength="4"
            ></i-input>
          </FormItem>
          <FormItem label="Data type" v-if="showModal">
            <Select v-model="modalFormData.dict" filterable @on-change="handleDataDictChange">
              <!-- value绑定json字符串的原因是，需要用到parent_name，当handleDataDictChange触发，赋值到modalFormData -->
              <Option
                :disabled="dataDictSelected.indexOf(item.id) >= 0"
                v-for="item in dataDictList"
                :value="JSON.stringify({
                id: item.id, parent_name: item.parent_name})"
                :key="item.id"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'">
            <i-input v-model="modalFormData.placeholder" placeholder></i-input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" @click="handleCancel">Cancel</Button>
          <Button type="primary" :loading="modalFormData.loading" @click="handleOk">Confirm</Button>
        </div>
      </Modal>
    </i-row>
  </div>
</template>

<script src="js/vue-resource.js"></script>
<script>
import draggable from "vuedraggable";
import form_list from "./custom_form/FormList";
import {
  tagData,
  epcAPI,
  epcList,
  changeEpc,
  serverHost,
  LABEL,
  CONFIG
} from "../global";
export default {
  components: {
    draggable
  },
  data() {
    return {
      form_list: form_list,
      sortable_item: [],
      objList: [],
      showModal: false,
      // 深拷贝对象，防止默认空对象被更改
      // 颜色选择器bug，对象下color不更新
      modalFormData: {
        color: "",
        loading: false
      },
      formData: {},
      dataDict: []
    };
  },
  methods: {
    // 克隆表单提交事件
    handleSubmit() {
      let xhr = new XMLHttpRequest();
      let form = new FormData();
      form.append("content", JSON.stringify(tagData));
      xhr.open("POST", CONFIG.saveAPI, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          alert("successfully submitted");
          reset();
          router.replace({ name: "Form" });
        }
      };
      xhr.send(form);
      // this.formData['object'] = this.objList[this.formData['object']]['label_name']
      alert(JSON.stringify(tagData));
      // this.$router.push("/render");
    },
    processSortableItem() {
      let processedItems = [];
      for (let item in this.sortable_item) {
      }
    },
    // 清空克隆表单
    handleReset() {
      this.sortable_item = [];
      tagData["Semantic"] = [];
    },
    handleAdd() {
      let rObjState = "";
      let tgState = "";
      let rObj = "";
      let bv = "";
      alert(JSON.stringify(this.formData));
      if (this.formData["related state"] !== undefined) {
        rObjState = this.formData["related state"] == 0 ? "OFF" : "ON";
      }
      if (this.formData["tag state"] !== undefined) {
        tgState = this.formData["tag state"] == 0 ? "OFF" : "ON";
      }
      if (this.formData["object"] !== undefined) {
        if (this.$data.objList[this.formData["object"]] !== undefined) {
          rObj = this.$data.objList[this.formData["object"]]["label_name"];
        } else {
          rObj = this.formData["object"];
        }
      }
      if (this.formData["semantic meaning"] !== undefined) {
        bv = this.formData["semantic meaning"];
      }
      let correlateCase = {
        State: tgState,
        RelatedObject: rObj,
        RelatedObjState: rObjState,
        Behavior: bv
      };
      tagData["Semantic"].push(correlateCase);
    },
    // modal内数据字典选项发生改变触发事件
    handleDataDictChange(val) {
      // 选中后，val默认赋值到modalFormData.dict
      const obj = JSON.parse(val);
      // 数据加载中，禁止modal_submit提交按钮
      this.$set(this.modalFormData, "loading", true);
      if (obj.id == LABEL.OBJ_LIST) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", serverHost + "/get-complex-objects", true);
        let vm = this;
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText);
            vm.objList = response["objects"];
            vm.modalFormData = Object.assign({}, vm.modalFormData, {
              name: "object",
              loading: false,
              items: vm.objList,
              placeholder: "Please select the object from the list",
              label: "object",
              parent_name: null
            });
          }
        };
        xhr.send(null);
      }
      else if(obj.id >= CONFIG.OBJ_BOUND) {
        // TODO: Support renew
      }
      else {
        this.$http.get(`/static/label.${obj.id}.json`).then(d => {
          this.modalFormData = Object.assign({}, this.modalFormData, {
            name: d.data.name,
            loading: false,
            items: d.data.items,
            placeholder: d.data.placeholder,
            label: d.data.name,
            parent_name: obj.parent_name
          });
        });
      }
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 添加一个modal标题
      original.obj.modalTitle = original.obj.label || "";
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // modal点击确定执行事件
    handleOk() {
      const index = this.modalFormData.listIndex;
      this.sortable_item[index].obj = Object.assign(
        {},
        this.sortable_item[index].obj,
        this.modalFormData
      );
      this.handleCancel();
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.showModal = false;
      setTimeout(_ => {
        this.modalFormData = {
          color: "",
          loading: false
        };
      }, 500);
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.sortable_item[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj["color"]) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle(index) {
      let name = this.sortable_item[index].obj.name;
      this.sortable_item.splice(index, 1);
      if (!name) return;
      for (let i in this.sortable_item) {
        // 当relation为true并且关联字段被确认
        if (
          this.sortable_item[i].obj.relation &&
          this.sortable_item[i].obj.relation_name === name
        ) {
          this.$set(this.sortable_item[i].obj, "relation", false);
          this.$set(this.sortable_item[i].obj, "relation_name", "");
          this.$set(this.sortable_item[i].obj, "relation_value", "");
          break;
        }
      }
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.sortable_item[index].obj, "visibility", visibility);
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.handleCancel();
      }
    }
  },
  computed: {
    // 数据字典已选择项
    dataDictSelected() {
      return this.sortable_item.map(v => {
        const obj = JSON.parse(v.obj.dict || "{}");
        return obj.id || -1;
      });
    },
    // 对应控件的数据字典
    dataDictList() {
      return this.dataDict.filter(v => {
        return v.type == this.modalFormData.type;
      });
    },
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      };
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: "ghost",
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        }
      };
    },
    // 被关联字段列表
    relationList() {
      // 只有type内三项可作为被关联字段
      let type = ["select", "radio", "checkbox"];
      const arr = this.sortable_item.filter(k => {
        return type.indexOf(k.ele) >= 0 && !!k.obj.name;
      });
      return arr;
    },
    // 被关联字段数据
    relationValue() {
      const name = this.modalFormData.relation_name;
      let items = [];
      if (!name) return items;
      for (let i in this.sortable_item) {
        if (this.sortable_item[i].obj.name == name) {
          items = this.sortable_item[i].obj.items;
        }
      }
      return items;
    }
  },
  created() {
    // /static/label.json
    this.$http.get("/static/label.json").then(d => {
      this.dataDict = d.data.items; 
      let xhr = new XMLHttpRequest();
      xhr.open("GET", CONFIG.GET_OBJ, true);
      let vm = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let response = JSON.parse(xhr.responseText);
          let objList = response["objects"];
          let cnt = 0 
          for(let o in objList) {
            vm.dataDict.push({
              id: CONFIG.OBJ_BOUND+cnt,
              type: "select",
              label: objList[o],
              parent_name: null
            });
          }
        }
      };
      xhr.send(null);
    });
    this.sortable_item = JSON.parse(
      localStorage.getItem("template_form") || "[]"
    );
  }
};
</script>
<style>
.inline {
  display: inline-block;
}

.m-l-lg {
  margin-left: 30px;
}

.wrapper {
  padding: 15px;
}

.inline-block {
  display: inline-block;
}

.padder-sm {
  padding-right: 10px;
  padding-left: 10px;
}

.b-a {
  border: 1px solid #ccc;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.form-list-group {
  min-height: 200px;
  padding: 20px !important;
}

/* 设置items下所有鼠标样式为 move */

.items,
.items * {
  cursor: move;
}

/* 配置按钮默认位置 */

/* 例如P Hr Title按钮 */

.items .item-icon {
  transition: all 2s ease;
  position: absolute;
  top: -18px;
  right: 0px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* form控件下配置按钮位置 */

.ivu-form-item.items .item-icon {
  top: -25px;
}

/* 配置按钮样式 */

.item-icon i {
  cursor: pointer !important;
  margin-right: 5px;
}

.items:hover .item-icon {
  transition: inherit;
  opacity: 1;
  max-height: 50px;
}

/* 提交按钮下方无 margin-bottom */

.form_content .ivu-form-item:last-child {
  margin-bottom: 0;
}

/* 表单校验选项样式 */

.ivu-form-item-required .ivu-form-item-label:before {
  content: "";
}

.items.sortable-items-required .ivu-form-item-label:before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
</style>