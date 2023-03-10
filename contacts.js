const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

//   Розкоментуйте і запиши значення
  const contactsPath = path.join(__dirname, "db/contacts.json");

  // отримати всі контакти

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

// отримати контакт ById

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

// видалити контакт 
const removeContact = async (contactId) => {
   try {
    const data = await listContacts();
    const deleteContact = data.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, 2));
    console.log(`User with id: ${contactId} has been deleted`);
  } catch (error) {
    console.log("removeConract", error);
  }
}


// додати контакт 
const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContacts = { name, email, phone, id: v4() };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return newContacts;
  } catch (err) {
    console.log(err.message);
  }
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};