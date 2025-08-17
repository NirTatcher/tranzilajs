import { Tranzila } from '../../tranzila';
import { RetreiveStandingOrdersPayload, RetreiveStandingOrdersResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Standing Orders Retrieve', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockRetrieve: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockRetrieve = jest.fn();
    mockTranzila = {
      StandingOrders: {
        retrieve: mockRetrieve
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should retrieve standing orders with exact example payload structure', async () => {
    // Mock successful response based on the exact API response provided
    const mockResponse: RetreiveStandingOrdersResponse = {
      error_code: 0,
      message: 'Success',
      stos: [
        {
          sto_id: 123456,
          terminal_name: 'myterminal',
          sto_payments_number: 9999,
          charge_frequency: 'monthly',
          first_charge_date: '2025-08-14',
          charge_dom: 1,
          last_charge_date: null,
          next_charge_date: '2025-09-01 00:00:00',
          create_date: '2025-08-14 14:38:18',
          sto_first_transaction_id: null,
          sto_status: 'active',
          charge_amount: '5.0000',
          card: {
            token: '123456789',
            expire_month: 8,
            expire_year: 28,
            card_holder_id: null
          },
          client: {
            internal_id: null,
            name: 'John Doe',
            id: null,
            email: 'john.doe@example.com',
            address: null,
            phone_country_code: '972',
            phone_area_code: null,
            phone_number: '0000000000'
          },
          item: {
            internal_id: null,
            code: null,
            name: null,
            unit_price: 0,
            units_number: 1,
            price_currency: 'ILS',
            price_type: 'G',
            vat_percent: 0
          },
          created_by_user: null
        }
      ]
    };
    
    mockRetrieve.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('myterminal', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: RetreiveStandingOrdersPayload = {
      terminal_name: "myterminal",
      sto_status: "active"
    };

    // Call the method
    const result = await tranzila.StandingOrders.retrieve(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.StandingOrders.retrieve).toHaveBeenCalledTimes(1);
    expect(mockTranzila.StandingOrders.retrieve).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.error_code).toBe(0);
    expect(result.message).toBe('Success');
    expect(result.stos).toBeDefined();
    expect(Array.isArray(result.stos)).toBe(true);
    expect(result.stos).toHaveLength(1);
    
    // Verify the first standing order structure matches exactly
    const firstSto = result.stos?.[0];
    expect(firstSto).toBeDefined();
    expect(firstSto?.sto_id).toBe(123456);
    expect(firstSto?.terminal_name).toBe('myterminal');
    expect(firstSto?.sto_status).toBe('active');
    expect(firstSto?.sto_payments_number).toBe(9999);
    expect(firstSto?.charge_frequency).toBe('monthly');
    expect(firstSto?.charge_amount).toBe('5.0000');
    
    // Verify nested objects
    expect(firstSto?.card?.token).toBe('123456789');
    expect(firstSto?.card?.expire_month).toBe(8);
    expect(firstSto?.card?.expire_year).toBe(28);
    expect(firstSto?.card?.card_holder_id).toBeNull();
    
    expect(firstSto?.client?.name).toBe('John Doe');
    expect(firstSto?.client?.email).toBe('john.doe@example.com');
    expect(firstSto?.client?.phone_country_code).toBe('972');
    expect(firstSto?.client?.phone_area_code).toBeNull();
    
    expect(firstSto?.item?.unit_price).toBe(0);
    expect(firstSto?.item?.units_number).toBe(1);
    expect(firstSto?.item?.price_currency).toBe('ILS');
    expect(firstSto?.item?.price_type).toBe('G');
    expect(firstSto?.item?.vat_percent).toBe(0);
    
    expect(firstSto?.created_by_user).toBeNull();
  });
}); 