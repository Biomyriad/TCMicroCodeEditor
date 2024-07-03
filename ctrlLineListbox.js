var ctrlLineLB = {}
ctrlLineLB.selectedUid = null
ctrlLineLB.listbox = document.getElementById('ctrllines-available')

var ctrlFormBitTbx = document.getElementById('ctrlform-bit')
var ctrlFormNameTbx = document.getElementById('ctrlform-name')
var ctrlFormGroupTbx = document.getElementById('ctrlform-group')
var ctrlFormOverrideColorTbx = document.getElementById('ctrlform-overridecolor')

ctrlLineLB.saveEntry = () => {
  if(ctrlFormBitTbx.value == '' || ctrlFormNameTbx.value == '') return
  ctrlLines.addUpdate(
    ctrlFormBitTbx.value,
    ctrlFormNameTbx.value,
    ctrlFormGroupTbx.value,
    ctrlFormOverrideColorTbx.value
  )
  ctrlFormBitTbx.value = ''
  ctrlFormNameTbx.value = ''
  ctrlFormGroupTbx.value = ''
  ctrlFormOverrideColorTbx.value = ''
  ctrlLineLB.selectedUid = null
  ctrlLineLB.refresh()
}

ctrlLineLB.deleteEntry = () => {
  if (ctrlLineLB.selectedUid == null) return
  ctrlLines.remove(ctrlLineLB.selectedUid)
  ctrlLineLB.selectedUid = null
  
  // REMOVE ALL REF FROM ALL OPCODE STATES?
  
  ctrlLineLB.selectedUid = null
  ctrlLineLB.refresh()
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
  //alert(event.currentTarget.id.split('-')[1]);
  ctrlLineLB.selectedUid = event.currentTarget.id.split('-')[1]
  let obj = ctrlLines.containsCode(ctrlLineLB.selectedUid)
  ctrlFormBitTbx.value = obj.bit
  ctrlFormNameTbx.value = obj.name
  ctrlFormGroupTbx.value = obj.group
  ctrlFormOverrideColorTbx.value = obj.overrideColor
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
