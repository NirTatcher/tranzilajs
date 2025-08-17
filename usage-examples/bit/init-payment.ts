import { Tranzila, BitInitPayload, BitInitResponse } from '../../src';

/**
 * Example: Initialize a Bit payment
 * 
 * This example demonstrates how to create a new Bit payment transaction
 * using the Tranzila library.
 */
export const bitInitExample = async (): Promise<BitInitResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the payment payload
  const payload: BitInitPayload = {
    terminal_name: 'your-terminal',
    txn_currency_code: "ILS",
    txn_type: "debit",
    success_url: 'https://your-site.com/success',
    failure_url: 'https://your-site.com/failure',
    notify_url: 'https://your-site.com/notify',
    client: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    items: [
      {
        code: "1",
        name: 'Product 1',
        type: "I", // Item
        unit_price: 100,
        units_number: 1,
        vat_percent: 0,
        currency_code: "ILS"
      }
    ]
  };

  // Initialize the payment
  const result = await tranzila.Bit.init(payload);
  
  if (result.error_code === 0) {
    console.log('Bit payment initialized successfully:', result.message);
    console.log('Sale URL:', result.sale_url);
  } else {
    console.error('Bit payment initialization failed:', result.message);
  }

  return result;
};

