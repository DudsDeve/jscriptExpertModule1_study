class Transaction {
  constructor({ car, customer, amount, dueDate }) {
   this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.dueDate = dueDate;
  }
}

module.exports = Transaction;