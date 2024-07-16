var cloudDb = {}


cloudDb.base_host = "https://api.airtable.com/v0"
cloudDb.base_id = "appU9Tu1u6TzVrKnP"
cloudDb.token = "path0swCIFnGeAcBp.58a8ab3456e0b7124f14dcb6bb13a3a9d44275027b1eb3f2c7d8b47e98107591"

cloudDb.getData = async () => {
  try {
    let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Updates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cloudDb.token}`
      }
    });
    let data = await response.json();

    var currentUpdate = null
    data.records.forEach(rec => {
      if (rec.fields.current) {
        currentUpdate = rec.fields
      }
    });
    return currentUpdate
  } catch (err) {
    return false
  }
}

cloudDb.putData = async () => {
  var reqData = {
    records: [
      {
        fields: {
          email: email,
          timestamp: `${new Date().getTime()}`
        }
                }
            ]
  }
  let response = await fetch(`${cloudDb.base_host}/${cloudDb.base_id}/Logins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cloudDb.token}`
    },
    body: JSON.stringify(reqData)
  });
  let data = await response.json();
}