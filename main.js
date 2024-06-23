//localStorage.setItem("lastname", "Smith")
//localStorage.getItem("lastname")
//localStorage.removeItem("lastname")
//localStorage.clear()


const opCodeList = []
const ctrlLineLut = []

function opCodeEntry(code,mnemonic) {
  this.code = code
  this.mnemonic = mnemonic
  this.mCycles = [] // 1 item per state
}

const myOp = new opCodeEntry('00', 'nop')
myOp.mCycles.push(
    // array of bits or ctrl lines
    [653,43,1967,44,1,55] // needs to be as long as # ctrl lines
  )

opCodeList.push(myOp)


