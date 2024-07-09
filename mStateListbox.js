
var mStateLB = {}
mStateLB.listbox = document.getElementById('opcode-statelist')
mStateLB.selectedElem = null
mStateLB.selectedStateIdx = null

mStateLB.addState = () => {
  if(opCodeLB.selectedOpCode == null) return
  opCodeLB.selectedOpCode.mStateList.push([])
  if(mStateLB.selectedElem) mStateLB.selectedElem.classList.remove('selected-mstate')
  mStateLB.selectedStateIdx = null
  saveState()
  mStateLB.refresh()
}

mStateLB.removeState = () => {
  if(mStateLB.selectedStateIdx == null) return
  opCodeLB.selectedOpCode.mStateList.splice(
    mStateLB.selectedStateIdx,1
  )
  if(mStateLB.selectedElem) mStateLB.selectedElem.classList.remove('selected-mstate')
  mStateLB.selectedStateIdx = null
  saveState()
  mStateLB.refresh()
  ctrlLineStateLB.refresh()
}

mStateLB.createEntryEle = (idx,arr) => {
  let ele = document.createElement("div")

  ele.addEventListener("click", mStateLB.entryClickHandler);
  ele.id = 'mstatelistidx-' + idx
  ele.className ="mstate-container"
  
  for(i in arr) {
    let ctrlSpan = document.createElement("span")
    ctrlSpan.className = 'mStateCtrlLabelSpan'
    ctrlSpan.innerText = ctrlLines.containsCode(arr[i]).name
    ele.appendChild(ctrlSpan)
  }

  return ele
}

mStateLB.entryClickHandler = (event) => {
  //alert(event.currentTarget.id.split('-')[1]);
  if(mStateLB.selectedElem) mStateLB.selectedElem.classList.remove('selected-mstate')
  mStateLB.selectedElem = event.currentTarget
  mStateLB.selectedElem.classList.add('selected-mstate')
  mStateLB.selectedStateIdx = event.currentTarget.id.split('-')[1]
  ctrlLineStateLB.refresh()
}

mStateLB.refresh = () => {
  if(opCodeLB.selectedOpCode != null) {
    mStateLB.listbox.replaceChildren()
    opCodeLB.selectedOpCode.mStateList.forEach((item,idx) => {
      let elemHldr = mStateLB.createEntryEle(idx,item)
      if(elemHldr.id == 'mstatelistidx-' + mStateLB.selectedStateIdx) {
        mStateLB.selectedElem = elemHldr
        elemHldr.classList.add('selected-mstate')
      }
      mStateLB.listbox.appendChild(elemHldr)
    })
    ctrlLineStateLB.refresh()
  } else {
    mStateLB.listbox.replaceChildren()
    ctrlLineStateLB.refresh()
  }
}
