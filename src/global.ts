export let tagData = {
  EPC: '',
  TagType: '',
  SensingType: '',
  Semantic: []
}

export const epcAPI = 'http://192.168.3.156:8888/update-epc'
export const serverHost = 'http://192.168.3.156:8888'
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
  UPDATE_INTERVAL: 200,
  saveAPI: 'http://192.168.3.156:8888/save-tag',
  GET_OBJ: serverHost + '/get-objects',
  GET_TOGGLE: serverHost + '/get-toggle',
  GET_TOGGLE_ACTION: serverHost + '/get-toggle-action',
  GET_ALL_OBJ: serverHost + '/all-objects-state',
  SEM_POST: serverHost + '/get-object-sem',
  OBJ_LIST: 8,
  DEBUG: false,
  OBJ_BOUND: 100,
  TOGGLE_BOUND: 10000
}

/**
 * Short and open refers to two type of RFID deployment
 * on: the signal is visible to the reader
 * off: the signal is invisible to the reader
 */
export const INSTRUCT = {
  sensor: {
    short_on: 'the two parts are NOT contacted',
    short_off: 'the two parts are contacted',
    open_on: 'the two parts are contacted',
    open_off: 'the two parts are NOT contacted'
  }
}