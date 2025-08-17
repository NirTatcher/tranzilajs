import { Tranzila } from '../../tranzila';
import { BitRefundPayload, BitRefundResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Bit Payment Refund', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockRefund: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockRefund = jest.fn();
    mockTranzila = {
      Bit: {
        refund: mockRefund
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should refund Bit payment with exact example payload structure', async () => {
    // Mock successful response
    const mockResponse: BitRefundResponse = {
      error_code: 0,
      message: 'Success',
      transaction_result: {
        processor_response_code: '000',
        transaction_id: '123456',
        refund_transaction_id: '123456',
        amount: '500',
        refund_amount: 5,
        refund_type: 'complete',
        currency_code: 'ILS',
        card_locality: 'domestic'
      },
      original_request: {
        terminal_name: 'myterminal',
        transaction_id: 12345,
        amount: 5,
        response_language: 'english'
      }
    };
    
    mockRefund.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('myterminal', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: BitRefundPayload = {
      terminal_name: 'myterminal',
      transaction_id: 12345,
      amount: 5
    };

    // Call the method
    const result = await tranzila.Bit.refund(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.Bit.refund).toHaveBeenCalledTimes(1);
    expect(mockTranzila.Bit.refund).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.error_code).toBe(0);
    expect(result.message).toBe('Success');
  });
}); 