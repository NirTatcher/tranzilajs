import { Tranzila, RetreiveStandingOrdersPayload, RetreiveStandingOrdersResponse, CreateStandingOrderResponse, CreateStandingOrderPayload } from '../../src';

/**
 * Example: Retrieve Standing Orders
 * 
 * This example demonstrates how to retrieve Standing Orders transactions
 * using the Tranzila library.
 */
export const retrieveStandingOrderExample = async (): Promise<RetreiveStandingOrdersResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the retreive standing orders payload
  const payload: RetreiveStandingOrdersPayload = {
    terminal_name: "your-terminal-name",
    // sto_id: 1234,
    sto_status:"active"
  }

  // Retrieve the standing orders
  const result = await tranzila.StandingOrders.retrieve(payload);
  if(result.error_code == 0){
    console.log('Standing orders retrieved successfully:', result.stos);
  }else{
    console.error('Standing orders retrieval failed:', result.message);
  }
  return result;
};