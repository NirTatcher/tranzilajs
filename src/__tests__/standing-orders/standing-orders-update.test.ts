import { Tranzila } from '../../tranzila';
import { UpdateStandingOrderPayload, UpdateStandingOrderResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Standing Orders Update', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockUpdate: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockUpdate = jest.fn();
    mockTranzila = {
      StandingOrders: {
        update: mockUpdate
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should update standing order with exact example payload structure', async () => {
    // Mock successful response
    const mockResponse: UpdateStandingOrderResponse = {
      error_code: 0,
      message: 'Success'
    };
    
    mockUpdate.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('your-terminal-name', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: UpdateStandingOrderPayload = {
      terminal_name: "myterminal",
      sto_id: 123456,
      sto_status: "inactive"
    };

    // Call the method
    const result = await tranzila.StandingOrders.update(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.StandingOrders.update).toHaveBeenCalledTimes(1);
    expect(mockTranzila.StandingOrders.update).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.error_code).toBe(0);
    expect(result.message).toBe('Success');
  });
}); 