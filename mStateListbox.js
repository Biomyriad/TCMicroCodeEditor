
var mStateLB = {}
mStateLB.listbox = document.getElementById('opcode-statelist')
mStateLB.selectedOpCode = null
mStateLB.selectedStateIdx = null

mStateLB.addState = () => {
  if(mStateLB.selectedOpCode == null) return
  mStateLB.selectedOpCode.mStateList.push([])
  saveState()
  mStateLB.refresh()
}

mStateLB.removeState = () => {
  if(mStateLB.selectedStateIdx == null) return
  mStateLB.selectedOpCode.mStateList.splice(
    mStateLB.selectedStateIdx,1
  )
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
  mStateLB.selectedStateIdx = event.currentTarget.id.split('-')[1]
  ctrlLineStateLB.refresh()
}

mStateLB.refresh = () => {
  if(mStateLB.selectedOpCode != null) {
    mStateLB.listbox.replaceChildren()
    mStateLB.selectedOpCode.mStateList.forEach((item,idx) => {
      mStateLB.listbox.appendChild(
        mStateLB.createEntryEle(
          idx,
          item
        )
      )
    })
    ctrlLineStateLB.refresh()
  } else {
    mStateLB.listbox.replaceChildren()
    ctrlLineStateLB.refresh()
  }
}
