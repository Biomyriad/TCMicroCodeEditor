//localStorage.setItem("lastname", "Smith")
//localStorage.getItem("lastname")
//localStorage.removeItem("lastname")
//localStorage.clear()


var opCodes = {}
opCodes.opCodeList = []

var ctrlLines = {}
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




//-------------- opCodeList Functions ---------
function opCodeEntry(code,mnemonic) {
  this.code = code
  this.mnemonic = mnemonic
  this.mCycles = [] // 1 item per state
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