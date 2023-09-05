const { SENDINBLUE_API_KEY } = process.env;

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SENDINBLUE_API_KEY;

let apiInstance = new SibApiV3Sdk.ContactsApi();


export default async (req, res) => {

  let opts = {
    'limit': 500,
  };

  let contacts = {};
  let allContacts = [];
  let globalContacts = [];


  try {
    await apiInstance.getContactsFromList(9, opts).then(function(data) {
        allContacts.push(...data.contacts)
    }, function(error) {
        res.status(200).json(error);
    });

    await apiInstance.getContactsFromList(12, opts).then(function(data) {
        allContacts.push(...data.contacts)
    }, function(error) {
        res.status(200).json(error);
    });

    await apiInstance.getContactsFromList(15, opts).then(function(data) {
      globalContacts.push(...data.contacts)
      contacts.allContacts = allContacts;
      contacts.globalContacts = globalContacts;
      res.status(200).json(contacts);
    }, function(error) {
        res.status(200).json(error);
    });    

  } catch {}
};