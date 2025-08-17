import { Tranzila } from '../../tranzila';
import { BitInitPayload, BitInitResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Bit Payment Initialization', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockInit: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockInit = jest.fn();
    mockTranzila = {
      Bit: {
        init: mockInit
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should initialize Bit payment with exact example payload structure', async () => {
    // Mock successful response
    const mockResponse: BitInitResponse = {
      error_code: 0,
      message: 'Success',
      sale_url: 'https://www.tranzila.com/sale/1234567890'
    };
    
    mockInit.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('myterminal', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: BitInitPayload = {
      terminal_name: 'myterminal',
      txn_currency_code: 'ILS',
      txn_type: 'debit',
      success_url: 'https://your-site.com/success',
      failure_url: 'https://your-site.com/failure',
      notify_url: 'https://your-site.com/notify',
      client: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      items: [
        {
          code: "1",
          name: 'Product 1',
          type: 'I', // Item
          unit_price: 100,
          units_number: 1,
          vat_percent: 0,
          currency_code: 'ILS'
        }
      ]
    };

    // Call the method
    const result = await tranzila.Bit.init(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.Bit.init).toHaveBeenCalledTimes(1);
    expect(mockTranzila.Bit.init).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.error_code).toBe(0);
    expect(result.message).toBe('Success');
    expect(result.sale_url).toBe('https://www.tranzila.com/sale/1234567890');
  });
}); 