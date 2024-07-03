var opCodeLB = {}
opCodeLB.listbox = document.getElementById('opcode-listbox')

var newOpCodeTbx = document.getElementById('new-op-code')
var newOpMnemTbx = document.getElementById('new-op-mnem')
var updateOpCodeTbx = document.getElementById('update-op-code')

opCodeLB.deleteEntry = () => {
  if (newOpCodeTbx.value == "") return
  opCodes.remove(newOpCodeTbx.value)
  mStateLB.selectedOpCode = null
  mStateLB.refresh()
  opCodeLB.refresh()
  newOpCodeTbx.value = ''
}

opCodeLB.saveEntry = () => {
  if (newOpCodeTbx.value == "" || newOpMnemTbx.value == "") return
  opCodes.addUpdate(
    newOpCodeTbx.value,
    newOpMnemTbx.value,
    updateOpCodeTbx.value != "" ? updateOpCodeTbx.value : false
  )
  mStateLB.selectedOpCode = null
  mStateLB.refresh()
  opCodeLB.refresh()
  newOpCodeTbx.value = ''
  newOpMnemTbx.value = ''
  updateOpCodeTbx.value = ''
}

opCodeLB.createEntryEle = (opCode, opMnem) => {
  let ele = document.createElement("div")
  let tx1 = document.createElement("span")
  let tx2 = document.createElement("span")
  let tx3 = document.createElement("span")

  ele.addEventListener("click", entryClickHandler);
  ele.id = "opcodeid-" + opCode
  tx1.innerText = opCode
  tx2.innerText = ' - '
  tx3.innerText = opMnem
  ele.appendChild(tx1)
  ele.appendChild(tx2)
  ele.appendChild(tx3)

  return ele
}

function entryClickHandler(event) {
  //alert(this.id + " --- " + event.target);
  let code = event.currentTarget.id.split('-')[1]
  let codeObj = opCodes.containsCode(code)
  if(codeObj != false) {
    mStateLB.selectedOpCode = codeObj
    mStateLB.refresh()
  }
  
}

opCodeLB.refresh = () => {
  if (opCodes.opCodeList != null) {
    opCodeLB.listbox.replaceChildren()
    opCodes.opCodeList.forEach((item) => {
      opCodeLB.listbox.appendChild(
        opCodeLB.createEntryEle(item.code, item.mnemonic)
      )
    })
  }
}