function exportData() {
  let stats = getStats()
  
  console.log('Num Opcodes: ' + stats.maxOpCode + '\n' +
              'has states ea: ' + stats.maxStates + '\n' +
              'containing num bytes: ' + stats.numBytes + '\n' +
              'split between num files: ' + stats.numFiles + '\n' 
  )

  // maxOpCode
  let finalOutput = []

  for (let opCnt = 0; opCnt < stats.maxOpCode; opCnt++) {
    let curOpCode = opCodes.containsCode('0' + toHex(opCnt))
    console.log('OpCode: '+ '0' + toHex(opCnt) + '  - ' + (curOpCode ? curOpCode.mnemonic : '/-- No Imp --/'))
    if (curOpCode) {
      finalOutput = finalOutput.concat(resolveOpCode(curOpCode, stats))
    } else {
      finalOutput = finalOutput.concat(resolveOpCode(false, stats))
    }
  }
  console.log(finalOutput)
  //alert(finalOutput)
  return finalOutput
}

// maxStates, maxBit, bitIdx, byteIdx
function resolveOpCode(opCode, stats) {
  let result = []
  let curOpCodeStateCnt = opCode ? opCode.mStateList.length : 0
  
  for (let stateCnt = 0; stateCnt < stats.maxStates; stateCnt++) {
    
    if(stateCnt < curOpCodeStateCnt) { // create array of bytes for a state
      let curStateArr = opCode.mStateList[stateCnt]
      let byteHldr = new Array(stats.numBytes).fill(0)
      
      for (let stateIdx = 0; stateIdx < curStateArr.length; stateIdx++) {
        let bitPos = ctrlLines.containsCode(curStateArr[stateIdx]).bit
        let byteIdx = stats.byteIdx(bitPos) // <- if it is larger then max bytes per file (8) then separate 
        byteHldr[byteIdx] = byteHldr[byteIdx] | 2**stats.bitIdx(bitPos) // maybe [file#,byte#]? file = ÷ byteIdx by (8)ish?
        //if(opCode.code == '07') console.log(byteIdx + ' - ' + bitPos + ' - ' + stats.bitIdx(bitPos) + ' - ' + 2**stats.bitIdx(bitPos))
      }
      result = result.concat(byteHldr)
      console.log(byteHldr)
      
    } else { // create empty state
      let byteHldr = new Array(stats.numBytes).fill(0)
      result = result.concat(byteHldr)
      console.log(byteHldr)
    }
  }
  
  return result
}

function getStats() {
  let clItem = ctrlLines.clList
  let maxBit = 0
  
  for (i in clItem) {
    if (parseInt(clItem[i].bit) > maxBit) maxBit = parseInt(clItem[i].bit)
  }
  //alert(maxBit)

  let numBytes = Math.ceil((maxBit + 1) / 8)
  let numFiles = Math.ceil(numBytes / 8)
  //alert(numBytes + ' ' + numFiles)

  let opItem = opCodes.opCodeList
  let maxStates = 0
  let maxOpCode = 0
  for (i in opItem) {
    if (Number('0x' + opItem[i].code) > maxOpCode) maxOpCode = Number('0x' + opItem[i].code)
    if (opItem[i].mStateList.length > maxStates) maxStates = opItem[i].mStateList.length
  }
  if(maxOpCode == 0 && opItem.length == 1) maxOpCode = 1 // fix if single op == 0x00 
  //alert(maxStates + ' - ' + maxOpCode)

  //let bitPos = 16
  //let byteIdx = Math.floor(bitPos / 8)
  //let bitIdx = bitPos - (byteIdx * 8)
  //alert(byteIdx + ' - ' + bitIdx)
  
  let stats = {
    'maxBit': maxBit,
    'numBytes': numBytes,
    'numFiles': numFiles,
    'maxOpCode': maxOpCode,
    'maxStates': maxStates,
    'byteIdx': (bitPos) => {
      return Math.floor(bitPos/8)
    },
    'bitIdx': (bitPos) => {
      return bitPos - (Math.floor(bitPos/8)*8)
    }
  }
  //console.log(JSON.stringify(stats, null, 2))
  return stats
}

function toHex(val) {
  if (typeof(val) == "number") {
    let out = val.toString(16)
    if (out.lenth <= 1) out = '0'
    return out
  } else { // use for if type == string
    return val
  }
}

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}