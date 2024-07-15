var ctrlLineLB = {}
ctrlLineLB.selectedElem = null
ctrlLineLB.selectedUid = null
ctrlLineLB.editingUid = null
ctrlLineLB.editingElem = null
ctrlLineLB.listbox = document.getElementById('ctrllines-available')

var ctrlFormUidTbx = document.getElementById('ctrlform-uid')
var ctrlFormBitTbx = document.getElementById('ctrlform-bit')
var ctrlFormNameTbx = document.getElementById('ctrlform-name')
var ctrlFormGroupTbx = document.getElementById('ctrlform-group')
var ctrlFormOverrideColorTbx = document.getElementById('ctrlform-overridecolor')
var ctrlFormDeSelBtn = document.getElementById('ctrlform-desel')
var ctrlFormEditBtn = document.getElementById('ctrlform-edit')
var ctrlFormSaveBtn = document.getElementById('ctrlform-save')
var ctrlFormDeleteBtn = document.getElementById('ctrlform-delete')
var ctrlFormMacroAddBtn = document.getElementById('ctrlform-macroadd')
var ctrlFormMacroRemoveBtn = document.getElementById('ctrlform-macroremove')

ctrlLineLB.saveEntry = () => {
  if(ctrlFormBitTbx.value == '' || ctrlFormNameTbx.value == '') return
  if(ctrlFormBitTbx.value != 'M') {
    if(ctrlLines.containsCodeBit(ctrlFormBitTbx.value)) {
      alert('Dup bit number')
      return
    }
  }
  if(ctrlFormUidTbx.value == '') ctrlFormUidTbx.value = false
  console.log(isNaN(ctrlFormUidTbx.value))
  ctrlLines.addUpdate(
    ctrlFormUidTbx.value,
    ctrlFormBitTbx.value,
    ctrlFormNameTbx.value,
    ctrlFormGroupTbx.value,
    macroLB.data,
    ctrlFormOverrideColorTbx.value
  )
  ctrlLineLB.deselectCtrl()
  ctrlLineLB.refresh()
  ctrlLineLB.setFormBtnsEnabled(false)
}

ctrlLineLB.deleteEntry = () => {
  if (ctrlLineLB.editingUid == null) return
  ctrlLines.remove(ctrlLineLB.editingUid)
  
  // REMOVE ALL REF FROM ALL OPCODE STATES?
  
  ctrlLineLB.deselectCtrl()
  ctrlLineLB.refresh()
  ctrlLineLB.setFormBtnsEnabled(false)
}

ctrlLineLB.deselectCtrl = () => {
  if(ctrlLineLB.selectedElem) ctrlLineLB.selectedElem.classList.remove('selected-ctrlline')
  if(ctrlLineLB.editingElem) ctrlLineLB.editingElem.classList.remove('selected-ctrledit')
  ctrlLineLB.editingUid = null
  ctrlLineLB.editingElem = null
  ctrlLineLB.selectedElem = null
  ctrlLineLB.selectedUid = null
  ctrlFormUidTbx.value = ''
  ctrlFormBitTbx.value = ''
  ctrlFormNameTbx.value = ''
  ctrlFormGroupTbx.value = ''
  ctrlFormOverrideColorTbx.value = ''
  ctrlFormBitTbx.disabled = false
  macroLB.data = []
  macroLB.refresh()
}

ctrlLineLB.editCtrl = () => {
  
  if(ctrlFormEditBtn.innerText == 'edit') {
    ctrlLineLB.setFormBtnsEnabled(true)
    if(ctrlLineLB.selectedElem) ctrlLineLB.selectedElem.classList.remove('selected-ctrlline')
    if(ctrlLineLB.selectedUid == null) ctrlLineLB.selectedUid = true
    ctrlLineLB.editingUid = ctrlLineLB.selectedUid
    ctrlLineLB.editingElem = ctrlLineLB.selectedElem
    ctrlLineLB.selectedElem = null
    ctrlLineLB.selectedUid = null
    
    if(ctrlLineLB.editingElem) ctrlLineLB.editingElem.classList.add('selected-ctrledit')

  } else {

    ctrlLineLB.setFormBtnsEnabled(false)
    if(ctrlLineLB.editingElem) ctrlLineLB.editingElem.classList.remove('selected-ctrledit')
    if(ctrlLineLB.selectedElem) ctrlLineLB.selectedElem.classList.remove('selected-ctrlline')
    
    ctrlLineLB.deselectCtrl()
  }
  
}

ctrlLineLB.setFormBtnsEnabled = (setEnabled) => {
  ctrlFormDeSelBtn.disabled = setEnabled
  ctrlFormSaveBtn.disabled = !setEnabled
  ctrlFormDeleteBtn.disabled = !setEnabled
  ctrlFormMacroAddBtn.disabled = !setEnabled
  ctrlFormMacroRemoveBtn.disabled = !setEnabled
  
  if(setEnabled) {
    ctrlFormEditBtn.innerText = 'cancel'
  } else {
    ctrlFormEditBtn.innerText = 'edit'
  }
}

ctrlLineLB.createEntryEle = (bit,name,group,uid,overridecolor=false) => {
  let ele = document.createElement("div")
  let tx1 = document.createElement("span")
  let tx2 = document.createElement("span")
  let tx3 = document.createElement('span')
  let tx4 = document.createElement("span")
  let tx5 = document.createElement("span")

  ele.addEventListener("click", ctrlLineLB.entryClickHandler);
  ele.id = "ctrlline-" + uid
  tx1.innerText = bit
  tx2.innerText = ' - '
  tx3.innerText = name
  tx4.innerText = ' - '
  tx5.innerText = group
  ele.appendChild(tx1)
  ele.appendChild(tx2)
  ele.appendChild(tx3)
  ele.appendChild(tx4)
  ele.appendChild(tx5)

  return ele
}

ctrlLineLB.entryClickHandler = (event) => {
  if(event.currentTarget.id.split('-')[1] == ctrlLineLB.editingUid) return
  if(ctrlLineLB.selectedElem) ctrlLineLB.selectedElem.classList.remove('selected-ctrlline')
  ctrlLineLB.selectedElem = event.currentTarget
  ctrlLineLB.selectedElem.classList.add('selected-ctrlline')
  ctrlLineLB.selectedUid = event.currentTarget.id.split('-')[1]
  if(!ctrlLineLB.editingUid) {
    let obj = ctrlLines.containsCode(ctrlLineLB.selectedUid)
    ctrlFormUidTbx.value = obj.uid
    ctrlFormBitTbx.value = obj.bit
    if(obj.bit == 'M') ctrlFormBitTbx.disabled = true
    else ctrlFormBitTbx.disabled = false
    ctrlFormNameTbx.value = obj.name
    ctrlFormGroupTbx.value = obj.group
    ctrlFormOverrideColorTbx.value = obj.overrideColor
    if(obj.macroData == undefined) macroLB.data = [] //needed because macroData is new
    else macroLB.data = obj.macroData.slice()         // to work with old save
    macroLB.refresh()
  }
}

ctrlLineLB.refresh = () => {
  if (ctrlLines.clList != null) {
    ctrlLineLB.listbox.replaceChildren()
    ctrlLines.clList.forEach((item) => {
      ctrlLineLB.listbox.appendChild(
        ctrlLineLB.createEntryEle(
          item.bit,
          item.name,
          item.group,
          item.uid
        )
      )
    })
  }
}


