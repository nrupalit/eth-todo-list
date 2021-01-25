const TodoList = artifacts.require("./TodoList.sol");

module.exports = async function (deployer) {
  await deployer.deploy(TodoList);
  // const todoList = await TodoList.deployed()
};
