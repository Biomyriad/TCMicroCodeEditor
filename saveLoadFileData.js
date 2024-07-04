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

function saveBinFile(data, fileName, fileType) {
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