const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

//шлях до файлу
const contactsPath = path.join(__dirname, "contacts.json");
//читання файлу
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};
//запис файлу
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  };
// пошук контакта за id
async function getContactById(id) {
  const contacts = await listContacts();
  const  contact = contacts.find((contact)=>contact.id ===id);
  return contact;
};
// повернення всіх контактів
async function getAll(){
  const contacts = await listContacts();
  return contacts;
}
// створення контакту
async function addContact(contact) {
  const contacts = await listContacts();

  crypto.randomUUID();

  contacts.push( {...contact, id: crypto.randomUUID() } );

  await writeContacts(contacts);

  return contact;

};
// оновлення контакту
async function updateContact(id, contact){
  const contacts = await listContacts();

  const index = contacts.findIndex((contact)=> contact.id === id);

  const newContact = [...contacts.slice(0, index),{...contact, id}, ...contacts.slice(index + 1),
  ];

  await writeContacts(newContact);

  return {...contact, id};
}
async function remove (id){
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  const newContacts = [...contacts.slice(0 , index), ...contacts.slice(index+ 1)];
  await writeContacts(newContacts);
  return "Success"
}
module.exports = {
  listContacts,
  writeContacts,
  getContactById,
  getAll,
  addContact,
  updateContact,
  remove,
};


