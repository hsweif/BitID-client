import { inputConf } from "./control/Input";
import { selectConf } from "./control/Select";
import { radioConf } from "./control/Radio";
import { titleConf } from "./control/Title";
import { hrConf } from "./control/Hr";
import { pConf } from "./control/P";
import { toggleConf } from "./control/Toggle"
import { cascaderConf } from "./control/Cascader";

const formList = {
  title: titleConf,
  hr: hrConf,
  select: selectConf,
  toggle: toggleConf
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
export default list_arr;
