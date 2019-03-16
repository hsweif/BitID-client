export let tagData = {
  RFID: '',
  TagType: '',
  Semantic: []
}

export const saveAPI = 'http://localhost:8888/save-tag'
export const epcAPI = 'http://localhost:8888/update-epc'
export let epcList = [1,3,4]


export function changeEpc () {
  epcList = [3,4,3];
}