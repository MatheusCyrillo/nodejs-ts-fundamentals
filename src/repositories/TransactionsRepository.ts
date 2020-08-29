import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acumulado, transaction) => acumulado + transaction.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acumulado, transaction) => acumulado + transaction.value, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
