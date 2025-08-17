import { Tranzila } from '../../tranzila';
import { SearchTransactionsPayload, SearchTransactionsResponse } from '../../types';

// Mock the Tranzila class
jest.mock('../../tranzila');

describe('Transactions Search', () => {
  let mockTranzila: jest.Mocked<Tranzila>;
  let mockSearch: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mock instance with proper typing
    mockSearch = jest.fn();
    mockTranzila = {
      Transactions: {
        search: mockSearch
      }
    } as unknown as jest.Mocked<Tranzila>;
    
    // Mock the constructor
    (Tranzila as jest.Mock).mockImplementation(() => mockTranzila);
  });

  it('should search transactions with exact example payload structure', async () => {
    // Mock successful response based on the exact API response from usage example
    const mockResponse: SearchTransactionsResponse = {
      transactions: [
        {
          index: "123456",
          transaction_date: "2025-01-01",
          transaction_time: "09:23:02",
          amount: "5500",
          credit_card_token: "1234",
          expiration_month: "08",
          expiration_year: "27",
          credit_card_owner_id: "1234567890",
          card_type: "",
          card_description: "",
          card_brand: "2",
          clearing_processor: "",
          is_foreign: "0",
          authorization_number: "012345",
          bank: "",
          bank_branch: "",
          bank_account: "",
          payment_plan: "1",
          currency: "1",
          number_of_payments: "0",
          first_payment_amount: "0",
          other_payment_amount: "0",
          host_ip: "127.0.0.1",
          processor_response_code: "000",
          tranmode: "A",
          refnr: "1234567890",
          tempref: "",
          cavv: "",
          eci: "",
          child_terminal: "myterminal",
          uid: "",
          transtatus: "1",
          telauthability: "1",
          txnfdid: "12345",
          cancelfdid: "",
          txnfdnumber: "123456",
          cancelfdnumber: "",
          txn_payment_method: "BIT",
          txn_type: "DEBIT",
          pan_entry_mode: "",
          shopify_id: "",
          processor: "PAYME",
          broker: "",
          broker_product: "",
          user_defined_1: "",
          user_defined_2: "",
          user_defined_3: "",
          user_defined_4: "",
          user_defined_5: "",
          user_defined_6: "",
          user_defined_7: "",
          user_defined_8: "",
          user_defined_9: "",
          user_defined_10: "",
          user_defined_11: "",
          user_defined_12: "",
          user_defined_13: "",
          user_defined_14: "",
          user_defined_15: "",
          user_defined_16: "",
          user_defined_17: "",
          user_defined_18: "",
          user_defined_19: "",
          user_defined_20: ""
        },
        {
          index: "123457",
          transaction_date: "2025-01-01",
          transaction_time: "12:33:20",
          amount: "10000",
          credit_card_token: "123efa321e1234",
          expiration_month: "08",
          expiration_year: "27",
          credit_card_owner_id: "",
          card_type: "1" as any,
          card_description: "",
          card_brand: "1" as any,
          clearing_processor: "1" as any,
          is_foreign: "0",
          authorization_number: "1234567890",
          bank: "",
          bank_branch: "",
          bank_account: "",
          payment_plan: "1",
          currency: "1" as any,
          number_of_payments: "0",
          first_payment_amount: "0",
          other_payment_amount: "0",
          host_ip: "127.0.0.1",
          processor_response_code: "000",
          tranmode: "A",
          refnr: "1234567890",
          tempref: "12345678",
          cavv: "",
          eci: "",
          child_terminal: "myterminal",
          uid: "123432",
          transtatus: "1",
          telauthability: "1",
          txnfdid: "1234",
          cancelfdid: "",
          txnfdnumber: "12345",
          cancelfdnumber: "",
          txn_payment_method: "CC",
          txn_type: "DEBIT",
          pan_entry_mode: "50",
          shopify_id: "",
          processor: "SHVA",
          broker: "",
          broker_product: "",
          user_defined_1: "",
          user_defined_2: "",
          user_defined_3: "",
          user_defined_4: "",
          user_defined_5: "",
          user_defined_6: "",
          user_defined_7: "",
          user_defined_8: "",
          user_defined_9: "",
          user_defined_10: "",
          user_defined_11: "",
          user_defined_12: "",
          user_defined_13: "",
          user_defined_14: "",
          user_defined_15: "",
          user_defined_16: "",
          user_defined_17: "",
          user_defined_18: "",
          user_defined_19: "",
          user_defined_20: ""
        },
        {
          index: "1234568",
          transaction_date: "2025-01-01",
          transaction_time: "14:26:45",
          amount: "20000",
          credit_card_token: "12345aa4124r11234",
          expiration_month: "11",
          expiration_year: "30",
          credit_card_owner_id: "",
          card_type: "2" as any,
          card_description: "",
          card_brand: "2" as any,
          clearing_processor: "1" as any,
          is_foreign: "0",
          authorization_number: "1234567",
          bank: "",
          bank_branch: "",
          bank_account: "",
          payment_plan: "1",
          currency: "1" as any,
          number_of_payments: "0",
          first_payment_amount: "0",
          other_payment_amount: "0",
          host_ip: "127.0.0.1",
          processor_response_code: "000",
          tranmode: "A",
          refnr: "123456789",
          tempref: "12345678",
          cavv: "",
          eci: "",
          child_terminal: "myterminal",
          uid: "123456",
          transtatus: "1",
          telauthability: "1",
          txnfdid: "1234",
          cancelfdid: "",
          txnfdnumber: "12345",
          cancelfdnumber: "",
          txn_payment_method: "CC",
          txn_type: "DEBIT",
          pan_entry_mode: "50",
          shopify_id: "",
          processor: "SHVA",
          broker: "",
          broker_product: "",
          user_defined_1: "",
          user_defined_2: "",
          user_defined_3: "",
          user_defined_4: "",
          user_defined_5: "",
          user_defined_6: "",
          user_defined_7: "",
          user_defined_8: "",
          user_defined_9: "",
          user_defined_10: "",
          user_defined_11: "",
          user_defined_12: "",
          user_defined_13: "",
          user_defined_14: "",
          user_defined_15: "",
          user_defined_16: "",
          user_defined_17: "",
          user_defined_18: "",
          user_defined_19: "",
          user_defined_20: ""
        }
      ],
      total: 3,
      rows: 3
    };
    
    mockSearch.mockResolvedValue(mockResponse);

    // Create instance
    const tranzila = new Tranzila('your-terminal-name', 'your-public-key', 'your-private-key');
    
    // Use the EXACT payload structure from your usage examples (payload3)
    const payload: SearchTransactionsPayload = {
      terminal_name: "myterminal",
      transaction_start_date: "2025-01-01",
      transaction_end_date: "2025-01-02"
    };

    // Call the method
    const result = await tranzila.Transactions.search(payload);

    // Verify the mock was called with correct payload
    expect(mockTranzila.Transactions.search).toHaveBeenCalledTimes(1);
    expect(mockTranzila.Transactions.search).toHaveBeenCalledWith(payload);

    // Verify the response
    expect(result).toEqual(mockResponse);
    expect(result.transactions).toBeDefined();
    expect(Array.isArray(result.transactions)).toBe(true);
    expect(result.transactions).toHaveLength(3);
    expect(result.total).toBe(3);
    expect(result.rows).toBe(3);
    
    // Verify the first transaction structure matches exactly
    const firstTransaction = result.transactions?.[0];
    expect(firstTransaction).toBeDefined();
    expect(firstTransaction?.index).toBe('123456');
    expect(firstTransaction?.transaction_date).toBe('2025-01-01');
    expect(firstTransaction?.transaction_time).toBe('09:23:02');
    expect(firstTransaction?.amount).toBe('5500');
    expect(firstTransaction?.credit_card_token).toBe('1234');
    expect(firstTransaction?.expiration_month).toBe('08');
    expect(firstTransaction?.expiration_year).toBe('27');
    expect(firstTransaction?.credit_card_owner_id).toBe('1234567890');
    expect(firstTransaction?.card_brand).toBe('2');
    expect(firstTransaction?.authorization_number).toBe('012345');
    expect(firstTransaction?.tranmode).toBe('A');
    expect(firstTransaction?.txn_payment_method).toBe('BIT');
    expect(firstTransaction?.txn_type).toBe('DEBIT');
    expect(firstTransaction?.processor).toBe('PAYME');
    expect(firstTransaction?.child_terminal).toBe('myterminal');

    // Verify the second transaction
    const secondTransaction = result.transactions?.[1];
    expect(secondTransaction?.index).toBe('123457');
    expect(secondTransaction?.amount).toBe('10000');
    expect(secondTransaction?.credit_card_token).toBe('123efa321e1234');
    expect(secondTransaction?.txn_payment_method).toBe('CC');
    expect(secondTransaction?.processor).toBe('SHVA');

    // Verify the third transaction
    const thirdTransaction = result.transactions?.[2];
    expect(thirdTransaction?.index).toBe('1234568');
    expect(thirdTransaction?.amount).toBe('20000');
    expect(thirdTransaction?.credit_card_token).toBe('12345aa4124r11234');
    expect(thirdTransaction?.txn_payment_method).toBe('CC');
    expect(thirdTransaction?.processor).toBe('SHVA');
  });
}); 