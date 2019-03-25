export let tagData = {
  RFID: '',
  TagType: '',
  Semantic: []
}

export const saveAPI = 'http://localhost:8888/save-tag'
export const epcAPI = 'http://localhost:8888/update-epc'
export const serverHost = 'http://localhost:8888'
export let epcList = [1,3,4]


export function changeEpc () {
  epcList = [3,4,3];
}

export function reset(){
  tagData = {
    RFID: '',
    TagType: '',
    Semantic: []
  }
}

export const LABEL = {
  OBJ_LIST: 8
}