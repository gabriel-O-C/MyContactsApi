const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Kuroko',
    email: 'kuroko@mail.com',
    phone: 1232137912,
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
