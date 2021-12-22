const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Kuroko',
    email: 'kuroko@mail.com',
    phone: 1232137912,
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'kagami',
    email: 'kagami@mail.com',
    phone: 1232137912,
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        name,
        email,
        phone,
        category_id,
        id: v4(),
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }
}

module.exports = new ContactsRepository();
