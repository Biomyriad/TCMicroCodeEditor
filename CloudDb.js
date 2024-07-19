var cloudDb = {}


cloudDb.base_host = "https://api.airtable.com/v0"
cloudDb.base_id = "appU9Tu1u6TzVrKnP"
cloudDb.token = "path0swCIFnGeAcBp.58a8ab3456e0b7124f14dcb6bb13a3a9d44275027b1eb3f2c7d8b47e98107591"

cloudDb.newRecObj = (keyValObj) => {
  var recObj = {fields: {}}
  let keys = Object.keys(keyValObj)
  
   keys.forEach((item) => {
     console.log(item + ' ' + keyValObj[item])
     recObj.fields[item] = keyValObj[item]
   })
   console.log(recObj)
  
}

cloudDb.getAll = async (offsetId='') => {
  let retRecs = []
  try {
    let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Updates?pageSize=3${offsetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cloudDb.token}`
      }
    });
    let data = await response.json();
    
    retRecs.push(...data.records)
    if(data.offset) retRecs.push(...await cloudDb.getAll('&offset='+data.offset))

    //var currentUpdate = null
    //data.records.forEach(rec => {
    //  if (rec.fields.current) {
    //    currentUpdate = rec.fields
    //  }
    //});
    return retRecs
  } catch (err) {
    console.log('AT error: ' + err)
    return false
  }
}

cloudDb.getOne = async (recId) => {
  let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Updates/`+recId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cloudDb.token}`
    }
  });
  let data = await response.json();
  return data
}

cloudDb.new = async (recObj) => {
  //var reqData = {
  //  records: [
  //    {
  //      fields: {
  //        email: email,
  //        timestamp: `${new Date().getTime()}`
  //      }
  //    }
  //  ]
  //}
  let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Updates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cloudDb.token}`
    },
    body: JSON.stringify(recObj)
  });
  let data = await response.json();
  return data
}

cloudDb.update = async (recId,recObj) => {
  //var reqData = {
  //  records: [
  //    {
  //      fields: {
  //        email: email,
  //        timestamp: `${new Date().getTime()}`
  //      }
  //    }
  //  ]
  //}
  let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Updates/`+recId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cloudDb.token}`
    },
    body: JSON.stringify(recObj)
  });
  let data = await response.json();
  return data
}

cloudDb.delete = async (recId) => {
  let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Updates/`+recId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cloudDb.token}`
    }
  });
  let data = await response.json();
  return data
}

