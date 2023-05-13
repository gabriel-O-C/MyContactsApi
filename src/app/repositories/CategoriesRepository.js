const db = require('../../database');

/**
 * @typedef {Promise<import("./ContactsRepository").User[]>} PromiseUser
 * @typedef {PromiseUser} DBReturn
 * @typedef {string | number} ID
 */
class CategoriesRepository {
  /**
   *
   * @returns {Promise<string[][]>} all categories
   */
  async findAll() {
    const rows = await db.query('SELECT * FROM categories');
    return rows;
  }

  /**
   * @param {ID} id
   * @returns {DBReturn} category by id
   */
  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM categories
      WHERE id = $1
    `, [id]);
    return row;
  }

  /**
   *
   * @param {{ name: string }} name
   * @returns {DBReturn}
   */

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  /**
   *
   * @param {ID} id
   * @param {{ name: string}} name
   * @returns {DBReturn}
   */
  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);
    return row;
  }

  /**
   * @param {ID} id
   * @returns {Promise<boolean[][]>} if user is succesfully deleted
   */
  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM categories
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new CategoriesRepository();
