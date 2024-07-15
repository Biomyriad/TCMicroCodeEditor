var macroLB = {}
var ctrlFormBitTbx = document.getElementById('ctrlform-bit')
macroLB.listbox = document.getElementById('macro')
macroLB.selectedUid = null
macroLB.selectedElem = null
macroLB.data = []

macroLB.addCtrlToMacro = () => {
  if(ctrlLineLB.selectedUid == null || 
     ctrlLineLB.editingUid == null) return
     
  if(ctrlLines.containsCode(ctrlLineLB.selectedUid).bit == 'M') return
  
  for(i in macroLB.data) {
    if(macroLB.data[i] == ctrlLineLB.selectedUid) return
  }
  macroLB.data.push(ctrlLineLB.selectedUid)
  
  if(macroLB.data.length > 0) {
    ctrlFormBitTbx.disabled = true
    ctrlFormBitTbx.value = 'M'
  }
  
  ctrlLineLB.selectedUid = null
  ctrlLineLB.selectedElem.classList.remove('selected-ctrlline')
  ctrlLineLB.selectedElem = null
  macroLB.selectedUid = null
  macroLB.selectedElem = null
  saveState()
  macroLB.refresh()
  
}

macroLB.removeCtrlFromMacro = () => {
  if (ctrlLineLB.editingUid == null || 
      macroLB.selectedUid == null ) return
  
  let selectedUidCtrlUID = macroLB.selectedUid
  for(i in macroLB.data) {
    if(macroLB.data[i] == selectedUidCtrlUID) {
      macroLB.data.splice(i, 1)
    }
  }
  
  if(!(macroLB.data.length > 0)) {
    ctrlFormBitTbx.disabled = false
    ctrlFormBitTbx.value = ctrlLines.containsCode(ctrlLineLB.editingUid).bit
  }
  
  macroLB.selectedUid = null
  macroLB.selectedElem = null
  saveState()
  macroLB.refresh()
}

macroLB.createEntryEle = (ctrlLineUid) => {
  let ele = document.createElement("div")
  //let tx1 = document.createElement("span")
  //let tx2 = document.createElement("span")
  let tx3 = document.createElement('span')
  //let tx4 = document.createElement("span")
  //let tx5 = document.createElement("span")
  

  ele.addEventListener("click", macroLB.entryClickHandler);
  ele.id = "ctrlmacroselectedUid-" + ctrlLineUid
  //tx1.innerText = bit
  //tx2.innerText = ' - '
  tx3.innerText = ctrlLines.containsCode(ctrlLineUid).name//name
  //tx4.innerText = ' - '
  //tx5.innerText = group
  //ele.appendChild(tx1)
  //ele.appendChild(tx2)
  ele.appendChild(tx3)
  //ele.appendChild(tx4)
  //ele.appendChild(tx5)

  return ele
}

macroLB.entryClickHandler = (event) => {
  macroLB.selectedUid = event.currentTarget.id.split('-')[1]
  if(macroLB.selectedElem) macroLB.selectedElem.classList.remove('selected-macroctrll')      
  macroLB.selectedElem = event.currentTarget
  macroLB.selectedElem.classList.add('selected-macroctrll')
}
  
macroLB.refresh = () => {
  //if(opCodeLB.selectedUidOpCode != null && 
  //   mStateLB.selectedUidStateIdx != null) return
  
    macroLB.selectedUid = null
    macroLB.listbox.replaceChildren()
    for(i in macroLB.data) {
      macroLB.listbox.appendChild(
        macroLB.createEntryEle(macroLB.data[i])
      )
    }
}

