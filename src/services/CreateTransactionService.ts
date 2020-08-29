import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestNewTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestNewTransaction): Transaction {

    if(type != 'income' && type != 'outcome')
      throw Error('Type is invalid! Accept Types: income or outcome');

    const balance = this.transactionsRepository.getBalance();

    if(type == 'outcome' && (value > balance.total))
      throw Error(`You dont have enough balance! Balance: ${balance.total}`);


    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
