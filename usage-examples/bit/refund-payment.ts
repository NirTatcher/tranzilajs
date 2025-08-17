import { Tranzila, BitRefundPayload, BitRefundResponse, BitInitResponse, BitInitPayload } from '../../src';

/**
 * Example: Refund a Bit payment
 * 
 * This example demonstrates how to refund a Bit payment transaction
 * using the Tranzila library.
 */
export const bitRefundExample = async (): Promise<BitRefundResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the payment payload
  const payload: BitRefundPayload = {
    terminal_name: 'your-terminal',
    transaction_id: 12345,
    amount: 5
  };

  // Refund the payment
  const result = await tranzila.Bit.refund(payload);
  
  if (result.error_code === 0) {
    console.log('Bit payment refunded successfully:', result.message);
    console.log('Refund result:', result);
  } else {
    console.error('Bit payment refund failed:', result.message);
  }

  return result;
};