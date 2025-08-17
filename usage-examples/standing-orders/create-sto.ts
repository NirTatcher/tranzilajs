import { Tranzila, CreateStandingOrderPayload, CreateStandingOrderResponse } from '../../src';

/**
 * Example: Create a Standing Order
 * 
 * This example demonstrates how to create a Standing Order transaction
 * using the Tranzila library.
 */
export const createStandingOrderExample = async (): Promise<CreateStandingOrderResponse> => {
  // Initialize the Tranzila client
  const tranzila = new Tranzila(
    'your-terminal-name',
    'your-public-key', 
    'your-private-key'
  );

  // Prepare the standing order payload
  const payload: CreateStandingOrderPayload = 
  {
      "terminal_name": "myterminal",
      "sto_payments_number": 9999,
      "charge_frequency": "monthly",
      "first_charge_date": "2025-08-14",
      "charge_dom": 1,
      "vat_percent": 0,
      "client": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone_number": "0000000000"
      },
      "items": [
        {
          "code": "1",
          "name": "Test Product",
          "units_number": 1,
          "unit_price": 5,
          "price_currency": "ILS"
        }
      ],
      "card": {
        "token": "1231234567890",
        "expire_month": 8,
        "expire_year": 2028
      }
    }

  // Create the standing order
  const result = await tranzila.StandingOrders.create(payload);
  if(result.error_code == 0){
    console.log('Standing order created successfully:', result.sto_id);
  }else{
    console.error('Standing order creation failed:', result.message);
  }
  return result;
};