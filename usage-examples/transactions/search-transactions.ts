import { Tranzila, SearchTransactionsPayload, SearchTransactionsResponse, RetreiveStandingOrdersPayload } from '../../src';

/**
 * Example: Search Transactions
 * 
 * This example demonstrates how to search transactions
 * using the Tranzila library.
 */
export const searchTransactionsExample = async (): Promise<SearchTransactionsResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the search transactions payload
  const payload: SearchTransactionsPayload = {
    terminal_name:"myterminal",
    dfields:[
        {
            name: "transaction_date",
            operator: "equals",
            value: "2025-03-11"
        },
        {
            name: "credit_card_token",
            operator: "equals",
            value: "1234567890"
        },
    ]
  }

  const payload2: SearchTransactionsPayload = {
    terminal_name:"myterminal",
    transaction_index:123456
  }

  const payload3: SearchTransactionsPayload = {
    terminal_name:"myterminal",
    transaction_start_date:"2025-01-01",
    transaction_end_date:"2025-01-02"
  }

  // Search the transactions
  const result = await tranzila.Transactions.search(payload3);
  if(result?.error){
    console.error('Transactions retrieval failed:', result.error);
  }else{
    console.log('Transactions retrieved successfully:', result.transactions);
  }
  return result;
};
