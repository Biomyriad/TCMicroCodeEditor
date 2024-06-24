//localStorage.setItem("lastname", "Smith")
//localStorage.getItem("lastname")
//localStorage.removeItem("lastname")
//localStorage.clear()


var opCodeList = []
var ctrlLineLut = []




function saveState() {
  console.log("Data Saved")
  localStorage.setItem("opCodeList", JSON.stringify(opCodeList))
  localStorage.setItem("ctrlLineLut", JSON.stringify(ctrlLineLut))
}

function loadState() {
  console.log("Data Loaded")
  let opListHldr = localStorage.getItem("opCodeList")
  let ctrlLineHldr = localStorage.getItem("ctrlLineLut")

  if(opListHldr != null) {opCodeList = JSON.parse(opListHldr)}
  if(opListHldr != null) {ctrlLineLut = JSON.parse(ctrlLineHldr)}
}


//-------------- opCodeList Functions ---------
function opCodeEntry(code,mnemonic) {
  this.code = code
  this.mnemonic = mnemonic
  this.mCycles = [] // 1 item per state
}

// *TODO*: ADD SORTING OPCODES MY CODE

// returns modifiable instance of if found
function opCodeListContainsCode(opCode) {
  for(x in opCodeList) {
    if(opCodeList[x].code == opCode) return opCodeList[x]
  }
  return false
}

//make changeCode to an opcode to update the opcodes code value
function addUpdateOpCode(code, mnemonic, codeChange = false) {
  let opCode = opCodeListContainsCode(code)
  if(opCode) {
    if(codeChange) opCode.code = codeChange
    opCode.mnemonic = mnemonic
  } else {
    opCodeList.push(new opCodeEntry(
      code,
      mnemonic
    ))    
  }
  saveState()
}

function removeOpCode(code) {
  let opCode = opCodeListContainsCode(code)
  if(opCode) {
    const x = opCodeList.splice(opCode, 1);
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