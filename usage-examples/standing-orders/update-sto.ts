import { CreateStandingOrderResponse, Tranzila, UpdateStandingOrderPayload, UpdateStandingOrderResponse } from '../../src';

/**
 * Example: Update a Standing Order
 * 
 * This example demonstrates how to update a Standing Order transaction
 * using the Tranzila library.
 */
export const updateStandingOrderExample = async (): Promise<UpdateStandingOrderResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the standing order payload
  const payload: UpdateStandingOrderPayload = {
    terminal_name: "your-terminal-name",
    sto_id: 9999,
    sto_status: "inactive"
  }

  // Update the standing order
  const result = await tranzila.StandingOrders.update(payload);
  if(result.error_code == 0){
    console.log('Standing order updated successfully:', result.message);
  }else{
    console.error('Standing order update failed:', result.message);
  }
  return result;
};
