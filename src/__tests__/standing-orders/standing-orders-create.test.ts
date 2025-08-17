import { Tranzila } from '../../tranzila';
import { CreateStandingOrderPayload, CreateStandingOrderResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Standing Orders Create', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockCreate = jest.fn();
    mockTranzila = {
      StandingOrders: {
        create: mockCreate
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should create standing order with exact example payload structure', async () => {
    // Mock successful response
    const mockResponse: CreateStandingOrderResponse = {
      error_code: 0,
      message: 'Success',
      sto_id: 123456
    };
    
    mockCreate.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('myterminal', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: CreateStandingOrderPayload = {
      terminal_name: "myterminal",
      sto_payments_number: 9999,
      charge_frequency: "monthly",
      first_charge_date: "2025-08-14",
      charge_dom: 1,
      vat_percent: 0,
      client: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone_number: "0000000000"
      },
      items: [
        {
          code: "1",
          name: "Test Product",
          unit_price: 5,
          units_number: 1,
          price_currency: "ILS",
          vat_percent: 0
        }
      ],
      card: {
        token: "1231234567890",
        expire_month: 8,
        expire_year: 2028
      }
    };

    // Call the method
    const result = await tranzila.StandingOrders.create(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.StandingOrders.create).toHaveBeenCalledTimes(1);
    expect(mockTranzila.StandingOrders.create).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.error_code).toBe(0);
    expect(result.message).toBe('Success');
    expect(result.sto_id).toBe(123456);
  });
}); 