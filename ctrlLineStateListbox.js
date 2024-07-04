var ctrlLineStateLB = {}
ctrlLineStateLB.listbox = document.getElementById('ctrllines-selected')
ctrlLineStateLB.selected = null

ctrlLineStateLB.addCtrlToOpState = () => {
  if(mStateLB.selectedOpCode == null ||
     mStateLB.selectedStateIdx == null ||
     ctrlLineLB.selectedUid == null ) return
  
  let selectedCtrlUID = ctrlLineLB.selectedUid
  let selectedList = mStateLB.selectedOpCode.mStateList[mStateLB.selectedStateIdx]
  for(i in selectedList) {
    if(selectedList[i] == selectedCtrlUID) return
  }
  
  selectedList.push(selectedCtrlUID)
  ctrlLineLB.selectedUid = null
  ctrlLineStateLB.selected = null
  saveState()
  mStateLB.refresh()
  ctrlLineStateLB.refresh()
  
}

ctrlLineStateLB.removeCtrlFromOpState = () => {
  if(mStateLB.selectedOpCode == null ||
     mStateLB.selectedStateIdx == null ||
     ctrlLineStateLB.selected == null ) return
  
  let selectedCtrlUID = ctrlLineStateLB.selected
  let selectedList = mStateLB.selectedOpCode.mStateList[mStateLB.selectedStateIdx]
  for(i in selectedList) {
    if(selectedList[i] == selectedCtrlUID) {
      selectedList.splice(i, 1)
    }
  }
  
  ctrlLineStateLB.selected = null
  saveState()
  mStateLB.refresh()
  ctrlLineStateLB.refresh()
}

ctrlLineStateLB.deselectCtrl = () => {
  ctrlLineLB.selectedUid = null
  ctrlFormBitTbx.value = ''
  ctrlFormNameTbx.value = ''
  ctrlFormGroupTbx.value = ''
  ctrlFormOverrideColorTbx.value = ''
}

ctrlLineStateLB.createEntryEle = (ctrlLineUid) => {
  let ele = document.createElement("div")
  //let tx1 = document.createElement("span")
  //let tx2 = document.createElement("span")
  let tx3 = document.createElement('span')
  //let tx4 = document.createElement("span")
  //let tx5 = document.createElement("span")
  

  ele.addEventListener("click", ctrlLineStateLB.entryClickHandler);
  ele.id = "ctrllineselected-" + ctrlLineUid
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

ctrlLineStateLB.entryClickHandler = (event) => {
  ctrlLineStateLB.selected = event.currentTarget.id.split('-')[1]
}
  
ctrlLineStateLB.refresh = () => {
  if(mStateLB.selectedOpCode != null && 
     mStateLB.selectedStateIdx != null) {
  
    ctrlLineStateLB.selected = null
    let selectedList = mStateLB.selectedOpCode.mStateList[mStateLB.selectedStateIdx]
    ctrlLineStateLB.listbox.replaceChildren()
    for(i in selectedList) {
      ctrlLineStateLB.listbox.appendChild(
        ctrlLineStateLB.createEntryEle(selectedList[i])
      )
    }
  } else {
    ctrlLineStateLB.listbox.replaceChildren()
  }
}
