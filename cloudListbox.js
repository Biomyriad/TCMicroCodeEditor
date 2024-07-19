var cloudLB = {}
cloudLB.selected = null
cloudLB.selectedElem = null

cloudLB.listbox = document.getElementById('cloud-listbox')
cloudLB.nameTbx = document.getElementById('cloud-form-nametbx')
// localStorage current one and highlight on refresh


// Save

// ADD

// REMOVE

cloudLB.createEntryEle = (rec) => {
  let ele = document.createElement("div")
  let infoDiv = document.createElement("div")
  let btnsDiv = document.createElement("div")
  let nameTxt = document.createElement('span')
  let dateTxt = document.createElement("span")
  let saveBtn = document.createElement("button")
  let loadBtn = document.createElement("button")
  let deleteBtn = document.createElement("button")
  

  ele.addEventListener("click", cloudLB.entryClickHandler);
  ele.id = "cloudstate-" + rec.id
  ele.classList.add('cloud-state')
  
  infoDiv.classList.add('cloud-state-info')
  
  btnsDiv.classList.add('cloud-state-btns')
  
  nameTxt.innerText = rec.fields.name
  dateTxt.innerText = dateTimeToStr(parseInt(rec.fields.updatedAt))
  
  saveBtn.innerText = '📥'
  loadBtn.innerText = '📤'
  deleteBtn.innerText = '🗑'
  
  saveBtn.addEventListener("click", cloudLB.saveBtnClick);
  loadBtn.addEventListener("click", cloudLB.loadBtnClick);
  deleteBtn.addEventListener("click", cloudLB.deleteBtnClick);

  infoDiv.appendChild(nameTxt)
  infoDiv.appendChild(dateTxt)
  
  btnsDiv.appendChild(saveBtn)
  btnsDiv.appendChild(loadBtn)
  btnsDiv.appendChild(deleteBtn)
  
  ele.appendChild(infoDiv)
  ele.appendChild(btnsDiv)

  return ele
}

cloudLB.entryClickHandler = (event) => {
  cloudLB.selected = event.currentTarget.id.split('-')[1]
  
  if(cloudLB.selectedElem) {
    cloudLB.selectedElem.querySelector('.cloud-state-btns').style.display = 'none'
    cloudLB.selectedElem.querySelector('.cloud-state-info').style.display = 'flex'
  }
  
  cloudLB.selectedElem = event.currentTarget
  
  cloudLB.selectedElem.querySelector('.cloud-state-info').style.display = 'none'
  cloudLB.selectedElem.querySelector('.cloud-state-btns').style.display = 'flex'
}

cloudLB.newBtnClick = async () => {
  let data = {
    opCodeList: opCodes.opCodeList,
    ctrlLineLut: ctrlLines.clList,
    ctrlLineUID: ctrlLines.nextUID
  }
  
  let newItem = { 
    "fields": {
      "name": cloudLB.nameTbx.value,
      "updatedAt": `${Date.now()}`,
      "data": JSON.stringify(data)
    }
  }
  console.log(await cloudDb.new(newItem))
  
  cloudLB.refresh()
}

cloudLB.saveBtnClick = async () => {
  let data = {
    opCodeList: opCodes.opCodeList,
    ctrlLineLut: ctrlLines.clList,
    ctrlLineUID: ctrlLines.nextUID
  }
  
  let item = { 
    "fields": {
      "updatedAt": `${Date.now()}`,
      "data": JSON.stringify(data)
    }
  }
  console.log(await cloudDb.update(cloudLB.selected,item))
  
  cloudLB.refresh()
  
}

cloudLB.loadBtnClick = async () => {
  let rec = await cloudDb.getOne(cloudLB.selected)
  console.log(rec)
  
  let data = JSON.parse(rec.fields.data)
  
  opCodes.opCodeList = data.opCodeList
  ctrlLines.clList = data.ctrlLineLut
  ctrlLines.nextUID = data.ctrlLineUID
  
  saveState()
  
  location.reload()
}

cloudLB.deleteBtnClick = async () => {
  await cloudDb.delete(cloudLB.selected)
  cloudLB.refresh()
}

cloudLB.refresh = async () => {
  
    cloudLB.listbox.replaceChildren()
    cloudLB.listbox.appendChild(cloudLB.getLoadingEle())
    
    let listOfSaves = await cloudDb.getAll()
    
    cloudLB.listbox.replaceChildren()
    
    for(i in listOfSaves) {
      cloudLB.listbox.appendChild(
        cloudLB.createEntryEle(listOfSaves[i])
      )
      //console.log(listOfSaves[i])
    }
}

cloudLB.getLoadingEle = () => {
  let ele = document.createElement('div')
  let loadIcon = document.createElement('img')
  ele.id = 'cloud-loading'
  loadIcon.id = 'cloud-loading-img'
  ele.appendChild(loadIcon)
  return ele
}

function dateTimeToStr(mill) {
  var m = new Date(mill);
  var dateString =
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) + " " +
    ("0" + (m.getMonth() + 1)).slice(-2) + "/" +
    ("0" + m.getDate()).slice(-2) + "/" +
    (m.getFullYear()+'').slice(-2)
  
  return dateString
}

