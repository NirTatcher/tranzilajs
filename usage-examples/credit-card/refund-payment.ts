import { Tranzila, CardRefundPayload, CardRefundResponse } from '../../src';

/**
 * Example: Refund a Credit Card payment
 * 
 * This example demonstrates how to refund a Credit Card payment transaction
 * using the Tranzila library.
 */
export const creditCardRefundExample = async (): Promise<CardRefundResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key',
    'your-private-key'
  );

  // Prepare the refund payload
  const payload: CardRefundPayload = {
    supplier: "myterminal",
    sum: 5,
    currency: 1,
    TranzilaTK: "1234567890",
    expdate: "0828",
    cred_type: 1,
    TranzilaPW: "1234567890",
    CreditPass: "1234567890",
    tranmode: `C12345`,
    authnr: "00000000",
    contact: "John Doe",
    email: "john.doe@example.com",
    phone: "0000000000"
  };

  // Refund the payment
  const result = await tranzila.CreditCard.refund(payload);

  if (result.includes("Response=")) {
    console.log('Credit card payment refunded successfully:', result);
    console.log('Refund result:', result);
  } else {
    console.error('Credit card payment refund failed:', result);
  }
  return result;
};