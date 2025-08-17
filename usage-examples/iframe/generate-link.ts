import { Tranzila, IFrameParams, IframePaths, CardRefundResponse } from '../../src';

/**
 * Example: Refund a Credit Card payment
 * 
 * This example demonstrates how to refund a Credit Card payment transaction
 * using the Tranzila library.
 */
export const iframeGenerateLinkExample = async (): Promise<string> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the refund payload
  const payload: Partial<IFrameParams> = {
    sum: "50",
    cred_type: 1,
    currency: 1,
    tranmode: "AK",
    accessibility: 2,
    success_url_address: "https://your-site.com/success",
    fail_url_address: "https://your-site.com/failure",
    notify_url_address: "https://your-site.com/notify",
    contact: "John Doe",
    email: "john.doe@example.com",
    phone: "0000000000", 
  }

  // Build the payment link
  const result = await tranzila.IFrame.generateLink("iframenew.php",payload);
  
  return result;
};