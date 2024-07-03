//localStorage.setItem("lastname", "Smith")
//localStorage.getItem("lastname")
//localStorage.removeItem("lastname")
//localStorage.clear()


var opCodes = {}
opCodes.opCodeList = []

var ctrlLines = {}
ctrlLines.nextUID = 0
ctrlLines.clList = []

function saveState() {
  console.log("Data Saved")
  localStorage.setItem("opCodeList", JSON.stringify(opCodes.opCodeList))
  localStorage.setItem("ctrlLineLut", JSON.stringify(ctrlLines.clList))
  localStorage.setItem('ctrlLineUID', ctrlLines.nextUID)
}

function loadState() {
  console.log("Data Loaded")
  let opListHldr = localStorage.getItem("opCodeList")
  let ctrlLineHldr = localStorage.getItem("ctrlLineLut")
  let ctrlLineUID = localStorage.getItem('ctrlLineUID')

  if(opListHldr != null) {opCodes.opCodeList = JSON.parse(opListHldr)}
  if(ctrlLineHldr != null) {ctrlLines.clList = JSON.parse(ctrlLineHldr)}
  if(ctrlLineUID != null) {ctrlLines.nextUID = ctrlLineUID}

}

//-------------- Ctrl Line List Functions ---------
function ctrlLineEntry(bit,name,group,overrideColor=false) {
  this.uid = ctrlLines.nextUID
  this.bit = bit // 0
  this.name = name//'IP_TO_ADDY'
  this.group = group//'ALU'
  this.overrideColor = overrideColor// hex color or false
  ctrlLines.nextUID++
}

ctrlLines.addUpdate = (bit=false,name=false,group=false,
                       overrideColor=false,
                       ctrlLineUID=false) => {
  let ctrlL = ctrlLines.containsCode(ctrlLineUID)
  if(ctrlLineUID != false && ctrlL) {
    if(bit) ctrlL.bit = bit
    if(name) ctrlL.name = name
    if(group) ctrlL.group = group
    if(overrideColor) ctrlL.overrideColor = overrideColor
  } else {
    ctrlLines.clList.push(new ctrlLineEntry(
      bit,
      name,
      group,
      overrideColor
    ))    
  }
  saveState()
}

ctrlLines.remove = (ctrlLineUID) => {
  for(i in ctrlLines.clList) {
    if(ctrlLines.clList[i].uid == ctrlLineUID) {
      const x = ctrlLines.clList.splice(i, 1);
      console.log("Deleted ctrlLine: " + x)
      saveState()
      break
    }
  }
}

// returns modifiable instance of if found
ctrlLines.containsCode = (ctrlLineUID) => {
  for(x in ctrlLines.clList) {
    if(ctrlLines.clList[x].uid == ctrlLineUID) return ctrlLines.clList[x]
  }
  return false
}

//-------------- opCodeList Functions ---------
function opCodeEntry(code,mnemonic) {
  this.code = code
  this.mnemonic = mnemonic
  this.mStateList = []
}

// *TODO*: ADD SORTING OPCODES MY CODE

// returns modifiable instance of if found
opCodes.containsCode = (opCode) => {
  for(x in opCodes.opCodeList) {
    if(opCodes.opCodeList[x].code == opCode) return opCodes.opCodeList[x]
  }
  return false
}

//make changeCode to an opcode to update the opcodes code value
opCodes.addUpdate = (code, mnemonic, codeChange = false) => {
  let opCode = opCodes.containsCode(code)
  if(opCode) {
    if(codeChange) opCode.code = codeChange
    opCode.mnemonic = mnemonic
  } else {
    opCodes.opCodeList.push(new opCodeEntry(
      code,
      mnemonic
    ))    
  }
  saveState()
}

opCodes.remove = (code) => {
  for(i in opCodes.opCodeList) {
    if(opCodes.opCodeList[i].code == code) {
      const x = opCodes.opCodeList.splice(i, 1);
      console.log("Deleted ctrlLine: " + x)
      saveState()
      break
    }
  }
}
