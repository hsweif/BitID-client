export let tagData = {
  EPC: '',
  TagType: '',
  SensingType: '',
  Semantic: []
}

export const epcAPI = 'http://localhost:8888/update-epc'
export const serverHost = 'http://localhost:8888'
export let epcList = [1,3,4]


export function changeEpc () {
  epcList = [3,4,3];
}

export function reset(){
  tagData = {
    EPC: '',
    TagType: '',
    SensingType: '',
    Semantic: []
  }
}

export const LABEL = {
  OBJ_LIST: 8
}

export const CONFIG = {
  UPDATE_INTERVAL: 50,
  saveAPI: 'http://localhost:8888/save-tag',
  GET_OBJ: serverHost + '/get-objects',
  GET_TOGGLE: serverHost + '/get-toggle',
  GET_TOGGLE_ACTION: serverHost + '/get-toggle-action',
  SEM_POST: serverHost + '/get-object-sem',
  OBJ_LIST: 8,
  DEBUG: false,
  OBJ_BOUND: 100,
  TOGGLE_BOUND: 10000
}
