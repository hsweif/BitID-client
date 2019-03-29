export default (_self, h) => {
  return [
    h('p', {
      style: {
        'margin-bottom': _self.obj.marginBottom + 'px',
        'margin-top': _self.obj.marginTop + 'px',
        'color': _self.obj.color || "#000"
      },
      domProps: {
        innerHTML: _self.obj.label || "Please drag the combination of conidtions and toggles into the left-bottom box."
      }
    })
  ]
}

export const pConf = {
  config: true,
  label: 'Please drag the conidtions and toggles into the left-bottom box. After dragging, please select which object/toggle do you mean. (Click the gear icon on the right-up of the select box)',
  color: '#000',
  marginTop: 0,
  marginBottom: 24
}
