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
  
  opCodes.opCodeList.sort((a,b) => {
    if(Number('0x'+ a.code) > Number('0x' + b.code)) return 1
    return -1
  })
  
  ctrlLines.clList.sort((a,b) =>  {
    if(Number(a.bit) > Number(b.bit)) return 1
    return -1
  })
  
  localStorage.setItem("opCodeList", JSON.stringify(opCodes.opCodeList))
  localStorage.setItem("ctrlLineLut", JSON.stringify(ctrlLines.clList))
  localStorage.setItem('ctrlLineUID', ctrlLines.nextUID)
}

function saveStateToFile() {
  let data = {
    opCodeList: opCodes.opCodeList,
    ctrlLineLut: ctrlLines.clList,
    ctrlLineUID: ctrlLines.nextUID
  }
  
  saveTxtFile(JSON.stringify(data), 'saveState.txt')
}

function loadStateFromFile() {
  localStorage.clear()
  loadFile(assignLoadedData)
}

function assignLoadedData(data) {
  data = JSON.parse(data)
  
  opCodes.opCodeList = data.opCodeList
  ctrlLines.clList = data.ctrlLineLut
  ctrlLines.nextUID = data.ctrlLineUID
  
  saveState()
  location.reload()
}

function exportProject() {
  var a = ''
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
function ctrlLineEntry(bit,name,group,macroData=[],overrideColor=false) {
 //if(macroData.length == 0) macroData = false
  this.uid = ctrlLines.nextUID
  this.bit = bit // 0
  this.name = name//'IP_TO_ADDY'
  this.group = group//'ALU'
  this.macroData = macroData
  this.overrideColor = overrideColor// hex color or false
  ctrlLines.nextUID++
}

ctrlLines.addUpdate = (uid=false,bit=false,name=false,
                       group=false,macroData=[],
                       overrideColor=false) => {
  //let ctrlL = ctrlLines.containsCode(ctrlLineUID)
  let ctrlL = ctrlLines.containsCode(uid)
  if(bit == 'm') bit = 'M'
  if(ctrlL) {
    if(bit) ctrlL.bit = bit
    if(name) ctrlL.name = name
    if(group) ctrlL.group = group
    if(overrideColor) ctrlL.overrideColor = overrideColor
    if(overrideColor == '') ctrlL.overrideColor = overrideColor
    if(macroData) ctrlL.macroData = macroData
  } else {
    ctrlLines.clList.push(new ctrlLineEntry(
      bit,
      name,
      group,
      macroData,
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
  if(isNaN(ctrlLineUID)) return false
  for(x in ctrlLines.clList) {
    if(ctrlLines.clList[x].uid == ctrlLineUID) return ctrlLines.clList[x]
  }
  return false
}

ctrlLines.containsCodeBit = (ctrlLineBit) => {
  for(x in ctrlLines.clList) {
    if(ctrlLines.clList[x].bit == ctrlLineBit) return ctrlLines.clList[x]
  }
  return false
}

//-------------- opCodeList Functions ---------
function opCodeEntry(code,mnemonic) {
  this.code = code
  this.mnemonic = mnemonic
  this.mStateList = [] //holds array per state the hold the UID of a ctrlLine
}

// returns modifiable instance of if found
opCodes.containsCode = (opCode) => {
  for(x in opCodes.opCodeList) {
    if(opCodes.opCodeList[x].code.toUpperCase() == opCode.toUpperCase()) return opCodes.opCodeList[x]
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
