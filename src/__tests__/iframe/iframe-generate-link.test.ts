import { Tranzila } from '../../tranzila';
import { IFrameParams } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('IFrame Generate Link', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockGenerateLink: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockGenerateLink = jest.fn();
    mockTranzila = {
      IFrame: {
        generateLink: mockGenerateLink
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should generate IFrame payment link with exact example payload structure', async () => {
    // Mock successful response
    const mockResponse = 'https://direct.tranzila.com/zazim/iframenew.php?sum=1&cred_type=1&currency=1&tranmode=AK&success_url_address=https%3A%2F%2Fexample.com%2Fsuccess&fail_url_address=https%3A%2F%2Fexample.com%2Ffail&notify_url_address=https%3A%2F%2Fexample.com%2Fnotify&contact=John+Doe&email=john.doe%40example.com&phone=0000000000';
    
    mockGenerateLink.mockReturnValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('myterminal', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples
    const payload: Partial<IFrameParams> = {
      sum: "1",
      cred_type: 1,
      currency: 1,
      tranmode: "AK",
      accessibility: 2,
      success_url_address: "https://your-site.com/success",
      fail_url_address: "https://your-site.com/failure",
      notify_url_address: "https://your-site.com/notify",
      contact: "John Doe",
      email: "john.doe@example.com",
      phone: "0000000000"
    };

    // Call the method
    const result = tranzila.IFrame.generateLink("iframenew.php", payload);

    // Verify the mock was called with correct parameters
    expect(mockTranzila.IFrame.generateLink).toHaveBeenCalledTimes(1);
    expect(mockTranzila.IFrame.generateLink).toHaveBeenCalledWith("iframenew.php", payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(typeof result).toBe('string');
    expect(result).toContain('tranzila.com');
    expect(result).toContain('iframenew.php');
    expect(result).toContain('sum=1');
    expect(result).toContain('email=john.doe%40example.com');
    expect(result).toContain('phone=0000000000');
  });
}); 