import { inputConf } from "./control/Input";
import { selectConf } from "./control/Select";
import { radioConf } from "./control/Radio";
import { checkBoxConf } from "./control/CheckBox";
import { cascaderConf } from "./control/Cascader";
import { textConf } from "./control/Text";
import { titleConf } from "./control/Title";
import { hrConf } from "./control/Hr";
import { pConf } from "./control/P";

const formList = {
  title: titleConf,
  hr: hrConf,
  input: inputConf,
  select: selectConf,
  radio: radioConf,
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
export default list_arr;
