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
}

function loadState() {
  console.log("Data Loaded")
  let opListHldr = localStorage.getItem("opCodeList")
  let ctrlLineHldr = localStorage.getItem("ctrlLineLut")

  if(opListHldr != null) {opCodes.opCodeList = JSON.parse(opListHldr)}
  if(ctrlLineHldr != null) {ctrlLines.clList = JSON.parse(ctrlLineHldr)}
}

//-------------- Ctrl Line List Functions ---------
function ctrlLineEntry(bit,name,group,overrideColor=false) {
  this.uid = ctrlLines.nextUID++
  this.bit = bit // 0
  this.name = name//'IP_TO_ADDY'
  this.group = group//'ALU'
  this.overrideColor = overrideColor// hex color or false
}

ctrlLines.addUpdate = (bit=false,name=false,group=false,
                       overrideColor=false,
                       ctrlLineUID=false) => {
  let ctrlL = ctrlLines.containsCode(ctrlLineUID)
  if(ctrlL) {
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
  let ctrlL = ctrlLines.containsCode(ctrlLineUID)
  if(ctrlL) {
    const x = ctrlLines.clList.splice(ctrlL, 1);
    console.log("Deleted ctrlLine: " + x)
  } else {
    return
  }
  saveState()
}

// returns modifiable instance of if found
ctrlLines.containsCode = (ctrlLineUID) => {
  for(x in ctrlLines.clList) {
    if(ctrlLines.clList.uid == ctrlLineUID) return ctrlLines.clList[x]
  }
  return false
}

//-------------- opCodeList Functions ---------
function opCodeEntry(code,mnemonic) {
  this.code = code
  this.mnemonic = mnemonic
  this.mCycles = [[1,2,3,4,5,6,7,8,9,0,10,11],[4,1,2]] // 1 item per state
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
  let opCode = opCodes.containsCode(code)
  if(opCode) {
    const x = opCodes.opCodeList.splice(opCode, 1);
    console.log("Deleted OpCode: " + x)
  } else {
    return
  }
  saveState()
}


// ------------ Example Data Structure -------

// var opCodeList = []
// var ctrlLineLut = []

// function opCodeEntry(code,mnemonic) {
//   this.code = code
//   this.mnemonic = mnemonic
//   this.mCycles = [] // 1 item per state
// }

// const myOp = new opCodeEntry('00', 'nop')
// myOp.mCycles.push(
//     // array of bits or ctrl lines
//     [653,43,1967,44,1,55] // needs to be as long as # ctrl lines
//   )
// opCodeList.push(myOp)