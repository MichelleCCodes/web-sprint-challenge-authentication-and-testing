const db = require("../../data/dbConfig.js");

module.exports = {
  add
};

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return db("users as u")
  .select("u.id", "u.username")
  .where("u.id", id)
  .first();
}