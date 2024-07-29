const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, "..", "data", "todos.js");

class Todo {
  static async read() {
    try {
      const fileContent = await fs.promises.readFile(filepath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    }
  }

  // Write todos to file
  static async write(todos) {
    await fs.promises.writeFile(filepath, JSON.stringify(todos), "utf-8");
  }
}

module.exports = Todo;