function loadFile(callBack) {
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {

    // getting a hold of the file reference
    var file = e.target.files[0];
    if (!file) {
      return;
    }

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      //console.log(content);
      callBack(content)
    }

  }

  input.click();
}

//-----------------------------

function saveBinFile(data, fileName) {
  data = new Uint8Array(data)
  data = new File([data], fileName, { type: "application/octet-stream" });
  const url = URL.createObjectURL(data);
  initDownload(data, fileName)
}


function saveTxtFile(data, fileName) {
  data = new File([data], fileName, { type: "" });
  initDownload(data, fileName)
}

function initDownload(data, fileName) {
  const anchor = document.getElementById('local_filesaver') || document.createElement('a')
  const url = URL.createObjectURL(data);
  if (!anchor.id) {
    anchor.id = 'local_filesaver';
    anchor.download = fileName;
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
  }
  anchor.setAttribute('href', url);
  anchor.click();
  URL.revokeObjectURL(url);
}

function embLoad(param) {
  let xyz = '{"opCodeList":[{"code":"00","mnemonic":"NOP","mStateList":[["41","47","44","0","48","37","34"],[],[]]},{"code":"01","mnemonic":"LD BC, u16","mStateList":[["44","37","34","48","41","12"],["44","41","37","34","48","9"],["44","37","34","48","41","0"]]}],"ctrlLineLut":[{"uid":0,"bit":"0","name":"REG_IR_SAVE","group":"Reg","overrideColor":""},{"uid":1,"bit":"1","name":"REG_A_OE_A","group":"Reg","overrideColor":""},{"uid":2,"bit":"2","name":"REG_A_OE_B","group":"Reg","overrideColor":""},{"uid":3,"bit":"3","name":"REG_A_SAVE","group":"Reg","overrideColor":""},{"uid":4,"bit":"4","name":"REG_F_OE_A","group":"Reg","overrideColor":""},{"uid":5,"bit":"5","name":"REG_F_OE_B","group":"Reg","overrideColor":""},{"uid":6,"bit":"6","name":"REG_F_SAVE","group":"Reg","overrideColor":""},{"uid":7,"bit":"7","name":"REG_B_OE_A","group":"Reg","overrideColor":""},{"uid":8,"bit":"8","name":"REG_B_OE_B","group":"Reg","overrideColor":""},{"uid":9,"bit":"9","name":"REG_B_SAVE","group":"Reg","overrideColor":""},{"uid":10,"bit":"10","name":"REG_C_OE_A","group":"Reg","overrideColor":""},{"uid":11,"bit":"11","name":"REG_C_OE_B","group":"Reg","overrideColor":""},{"uid":12,"bit":"12","name":"REG_C_SAVE","group":"Reg","overrideColor":""},{"uid":13,"bit":"13","name":"REG_D_OE_A","group":"Reg","overrideColor":""},{"uid":14,"bit":"14","name":"REG_D_OE_B","group":"Reg","overrideColor":""},{"uid":15,"bit":"15","name":"REG_D_SAVE","group":"Reg","overrideColor":""},{"uid":16,"bit":"16","name":"REG_E_OE_A","group":"Reg","overrideColor":""},{"uid":17,"bit":"17","name":"REG_E_OE_B","group":"Reg","overrideColor":""},{"uid":18,"bit":"18","name":"REG_E_SAVE","group":"Reg","overrideColor":""},{"uid":19,"bit":"19","name":"REG_H_OE_A","group":"Reg","overrideColor":""},{"uid":20,"bit":"20","name":"REG_H_OE_B","group":"Reg","overrideColor":""},{"uid":21,"bit":"21","name":"REG_H_SAVE","group":"Reg","overrideColor":""},{"uid":22,"bit":"22","name":"REG_L_OE_A","group":"Reg","overrideColor":""},{"uid":24,"bit":"23","name":"REG_L_OE_B","group":"Reg","overrideColor":""},{"uid":"25","bit":"24","name":"REG_L_SAVE","group":"Reg","overrideColor":""},{"uid":"26","bit":"25","name":"REG_SP_H_OE_A","group":"Reg","overrideColor":""},{"uid":27,"bit":"26","name":"REG_SP_H_OE_B","group":"Reg","overrideColor":""},{"uid":28,"bit":"27","name":"REG_SP_H_SAVE","group":"Reg","overrideColor":""},{"uid":29,"bit":"28","name":"REG_SP_L_OE_A","group":"Reg","overrideColor":""},{"uid":30,"bit":"29","name":"REG_SP_L_OE_B","group":"Reg","overrideColor":""},{"uid":31,"bit":"30","name":"REG_SP_L_SAVE","group":"Reg","overrideColor":""},{"uid":32,"bit":"31","name":"REG_IP_H_OE_A","group":"Reg","overrideColor":""},{"uid":33,"bit":"32","name":"REG_IP_H_OE_B","group":"Reg","overrideColor":""},{"uid":34,"bit":"33","name":"REG_IP_H_SAVE","group":"Reg","overrideColor":""},{"uid":35,"bit":"34","name":"REG_IP_L_OE_A","group":"Reg","overrideColor":""},{"uid":36,"bit":"35","name":"REG_IP_L_OE_B","group":"Reg","overrideColor":""},{"uid":37,"bit":"36","name":"REG_IP_L_SAVE","group":"Reg","overrideColor":""},{"uid":38,"bit":"37","name":"SP_INC_OE","group":"Ctrl","overrideColor":""},{"uid":39,"bit":"38","name":"SP_/INC_DEC","group":"Ctrl","overrideColor":""},{"uid":"48","bit":"39","name":"IP_INC_OE","group":"Ctrl","overrideColor":""},{"uid":41,"bit":"40","name":"IP_TO_ADDY","group":"Ctrl","overrideColor":""},{"uid":42,"bit":"41","name":"SP_TO_ADDY","group":"Ctrl","overrideColor":""},{"uid":43,"bit":"42","name":"16_TO_ADDY","group":"Ctrl","overrideColor":""},{"uid":44,"bit":"43","name":"DATA_IN_/OUT","group":"Ctrl","overrideColor":""},{"uid":45,"bit":"44","name":"DATA_B_TO_BUS","group":"Ctrl","overrideColor":""},{"uid":46,"bit":"45","name":"DATA_A_TO_BUS","group":"Ctrl","overrideColor":""},{"uid":"47","bit":"63","name":"END_INST","group":"Ctrl","overrideColor":""}],"ctrlLineUID":"49"}'

  
  data = JSON.parse(xyz)
  
  opCodes.opCodeList = data.opCodeList
  ctrlLines.clList = data.ctrlLineLut
  ctrlLines.nextUID = data.ctrlLineUID
  
  saveState()
  location.reload()
}