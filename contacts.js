const fs = require("fs").promises;
const path = require("path");

const { uid } = require("uid");

//   Розкоментуйте і запиши значення
  const contactsPath = path.resolve(__dirname, "db/contacts.json");
console.log("contactsPath", contactsPath);


function listContacts() {
getAllContacts().then(console.table).catch(console.log);
}

function getContactById(contactId) {
   getAllContacts()
    .then((data) => console.table(data.find(({ id }) => id === contactId)))
    .catch(console.log);
}

function removeContact(contactId) {
  getAllContacts()
    .then((data) => {
      const newContacts = data.filter(({ id }) => id !== contactId);
      const stringifiedContacts = JSON.stringify(newContacts);
      fs.writeFile(contactsPath, stringifiedContacts, errorFirstCallback);
    })
    .catch(console.log);
}

function addContact(name, email, phone) {
   const id = uid();
  const newContact = { id, name, email, phone };
  getAllContacts()
    .then((data) => {
      const newContacts = [...data, newContact];
      const stringifiedContacts = JSON.stringify(newContacts);
      fs.writeFile(contactsPath, stringifiedContacts, errorFirstCallback);
    })
    .catch(console.log);
}


async function getAllContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

function errorFirstCallback(err) {
  if (err) {
    throw err;
  }
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};