const argv = require('yargs').argv;
const contactsModule = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsModule.getAll();
      console.table(contacts);
      break;

    case 'get':
      const contactGet = await contactsModule.getContactById(id);
      console.log(contactGet);
      break;

    case 'add':
      const contactAdd = await contactsModule.addContact({ name, email, phone });
      console.log(contactAdd);
      break;

    case 'remove':
      const contactRemove = await contactsModule.remove(id);
      console.log(contactRemove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);
// invokeAction({ action: "list" }).then(console.log).catch(console.error);

