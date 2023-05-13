const db = require('../../database');

/**
 *
 * @typedef {{name: string, email: string, phone: string, category_id: string}} User
 * @param {'ASC' | 'DESC'} orderBy
 * @returns {Promise<string[][]>}
 */
class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT contacts.*, categories.name AS category_name
     FROM contacts
     LEFT JOIN categories ON categories.id = contacts.category_id
     ORDER BY contacts.name ${direction}`);
    return rows;
  }

  /**
   *
   * @param {import("./CategoriesRepository").ID} id
   * @returns {import("./CategoriesRepository").DBReturn}
   */

  async findById(id) {
    const [row] = await db.query(`SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1`, [id]);
    return row;
  }

  /**
   *
   * @param {string} email
   * @returns {import("./CategoriesRepository").DBReturn}
   */
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  /**
   *
   * @param {import("./CategoriesRepository").ID} id
   * @returns {Promise<boolean[][]>}
   */

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM contacts
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
  /**
   * @param {User} user
   * @returns {import("./CategoriesRepository").DBReturn} user created
   */

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);
    return row;
  }

  /**
   *
   * @param {import("./CategoriesRepository").ID} id
   * @param {User} User
   * @returns {import("./CategoriesRepository").DBReturn} user updated
   */

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts 
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }
}

module.exports = new ContactsRepository();
