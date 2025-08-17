import { Tranzila } from '../../tranzila';
import { CardRefundPayload, CardRefundResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Credit Card Refund', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockRefund: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockRefund = jest.fn();
    mockTranzila = {
      CreditCard: {
        refund: mockRefund
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should refund credit card payment with exact example payload structure', async () => {
    // Mock successful response (URL parameters format)
    const mockResponse: CardRefundResponse = 'Response=000&contact=John Doe&email=john.doe@example.com&currency=1&supplier=myterminal&expdate=0828&sum=5&name=John Doe&TranzilaTK=1234567890&phone=0000000000&cred_type=1&DclickTK=&authnr=00000000&tranmode=C12345&ConfirmationCode=1234567&index=12345&Responsesource=3&Responsecvv=3&Responseid=0&Tempref=12345678&DBFIsForeign=0&DBFcard=2&cardtype=2&DBFcardtype=2&cardissuer=2&DBFsolek=1&cardaquirer=1&tz_parent=myterminal&cred_type_shva=1';
    
    mockRefund.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('myterminal', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: CardRefundPayload = {
      supplier: "myterminal",
      sum: 5,
      currency: 1,
      TranzilaTK: "1234567890",
      expdate: "0828",
      cred_type: 1,
      TranzilaPW: "1234567890",
      CreditPass: "1234567890",
      tranmode: "C12345",
      authnr: "00000000",
      contact: "John Doe",
      email: "john.doe@example.com",
      phone: "0000000000"
    };

    // Call the method
    const result = await tranzila.CreditCard.refund(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.CreditCard.refund).toHaveBeenCalledTimes(1);
    expect(mockTranzila.CreditCard.refund).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(typeof result).toBe('string');
    expect(result).toContain('Response=000');
    expect(result).toContain('email=john.doe@example.com');
    expect(result).toContain('currency=1');
    expect(result).toContain('supplier=myterminal');
    expect(result).toContain('sum=5');
    expect(result).toContain('tranmode=C12345');
  });
}); 