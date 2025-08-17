import * as CryptoJS from 'crypto-js';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BitInitPayload, BitInitResponse, BitRefundPayload, BitRefundResponse, CardRefundPayload, CardRefundResponse, CreateStandingOrderPayload, CreateStandingOrderResponse, SearchTransactionsResponse, IFrameParams, RetreiveStandingOrdersPayload, RetreiveStandingOrdersResponse, SearchTransactionsPayload, UpdateStandingOrderPayload, UpdateStandingOrderResponse } from './types';
import { IframePaths, ApiBaseUrls, ApiEndpoints } from './constants';

/**
 * Main Tranzila API client for payment processing
 * 
 * This class provides a comprehensive interface to the Tranzila payment gateway API.
 * It handles authentication, request signing, and provides methods for all major
 * payment operations including Bit payments, credit card processing, and standing orders.
 */
export class Tranzila {
    private terminalName: string
    private publicKey: string
    private privateKey: string
    private paymentsApi: AxiosInstance
    private reportsApi: AxiosInstance
    private secure5Api: AxiosInstance
    private readonly checkoutPageBaseUrl = ApiBaseUrls.CHECKOUT
    /**
     * Creates a new Tranzila API client instance
     * 
     * @param terminalName - Your Tranzila terminal identifier
     * @param publicKey - Your Tranzila public API key
     * @param privateKey - Your Tranzila private API key for request signing
     * 
     */
    constructor(terminalName: string, publicKey: string, privateKey: string) {
      this.terminalName = terminalName
      this.publicKey = publicKey
      this.privateKey = privateKey

        this.paymentsApi = axios.create({
            baseURL: ApiBaseUrls.PAYMENTS
        })
        this.reportsApi = axios.create({
            baseURL: ApiBaseUrls.REPORTS
        })
        this.secure5Api = axios.create({
            baseURL: ApiBaseUrls.SECURE5
        })

        this.paymentsApi.interceptors.request.use((config: AxiosRequestConfig & { headers: any }) => {
            config.headers = { ...this.generateRequestHeadersForAuth(), ...config.headers }
            return config
        })
        this.reportsApi.interceptors.request.use((config: AxiosRequestConfig & { headers: any }) => {
            config.headers = { ...this.generateRequestHeadersForAuth(), ...config.headers }
            return config
        })
        this.secure5Api.interceptors.request.use((config: AxiosRequestConfig & { headers: any }) => {
            config.headers = { ...this.generateRequestHeadersForAuth(), ...config.headers }
            return config
        })
    }

    /**
     * Generates a random ID string for request nonce
     * @param length - Length of the ID string to generate
     * @returns Random alphanumeric string
     * @private
     */
    private makeId(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }

    /**
     * Generates authentication headers for API requests
     * @returns Object containing all required authentication headers
     * @private
     */
    private generateRequestHeadersForAuth(): {
        'X-tranzila-api-app-key': string,
        'X-tranzila-api-request-time': number,
        'X-tranzila-api-nonce': string,
        'X-tranzila-api-access-token': string
    } {
        const time = Math.round((new Date()).getTime() / 1000);
        const nonce = this.makeId(80);
        const hash = CryptoJS.HmacSHA256(this.publicKey, this.privateKey + time + nonce).toString(CryptoJS.enc.Hex);
    
        const headers = {
          'X-tranzila-api-app-key': this.publicKey,
          'X-tranzila-api-request-time': time,
          'X-tranzila-api-nonce': nonce,
          'X-tranzila-api-access-token': hash
        };
        return headers
      }
    /**
     * Bit payment operations
     * 
     * Provides methods for initializing and refunding Bit payments.
     *
     */
    get Bit() {
        return {
            /**
             * Initializes a new Bit payment transaction
             * 
             * Creates a Bit payment request and returns a sale URL for the customer.
             * 
             * @param payload - Bit payment initialization parameters @see {@link BitInitPayload}
             * @returns Promise resolving to payment initialization response @see {@link BitInitResponse}
             * 
             */
            init: async (payload: BitInitPayload): Promise<BitInitResponse> => {
                const endpoint = ApiEndpoints.BIT_INIT
                const response: AxiosResponse<BitInitResponse> = await this.paymentsApi.post(endpoint, payload)
                return response.data
            },
            /**
             * Refunds a completed Bit payment transaction
             * 
             * Processes a refund for a previously completed Bit payment.
             * 
             * @param payload - Bit refund parameters including transaction details @see {@link BitRefundPayload}
             * @returns Promise resolving to refund response with success/error status @see {@link BitRefundResponse}
             * 
            
             */
            refund: async (payload: BitRefundPayload): Promise<BitRefundResponse> => {
                const endpoint = ApiEndpoints.BIT_REFUND
                const response: AxiosResponse<BitRefundResponse> = await this.paymentsApi.post(endpoint, payload)
                return response.data
            }
        }
    }
    
    /**
     * IFrame payment operations
     * 
     * Provides methods for generating payment links that can be embedded in iframes
     * or used for direct redirects to Tranzila's hosted payment pages.
     * 
     */
    get IFrame() {
        return {
            /**
             * Generates a payment URL for iframe or direct redirect
             * 
             * Creates a complete payment URL with all parameters encoded as query
             * parameters. This URL can be used in an iframe src or for direct
             * user redirects to Tranzila's payment page.
             * 
             * @param iframePath - The iframe path to use (e.g., 'iframenew.php')
             * @param payload - Payment parameters (can be partial for optional fields) @see {@link IFrameParams}
             * @returns Complete payment URL with encoded parameters @see {@link IframePaths}
             * 
             */
            generateLink: (iframePath: (typeof IframePaths)[keyof typeof IframePaths], payload: Partial<IFrameParams>): string => {
                const baseUrl = `${this.checkoutPageBaseUrl}/${this.terminalName}/${iframePath}`
                const params = new URLSearchParams(payload);
                return `${baseUrl}?${params.toString()}`
            }
        }
    }
    /**
     * Credit Card payment operations
     * 
     * Provides methods for managing credit card payments including refunds
     * for completed transactions.
     * 
     */
    get CreditCard() {
        return {
            /**
             * Refunds a completed credit card transaction
             * 
             * Processes a refund for a previously completed credit card payment.
             * 
             * @param payload - Credit card refund parameters @see {@link CardRefundPayload}
             * @returns Promise resolving to refund response with success/error status @see {@link CardRefundResponse}
             * 
            
             */
            refund: async (payload: CardRefundPayload): Promise<CardRefundResponse> => {
                const endpoint = ApiEndpoints.CARD_REFUND
                const response: AxiosResponse<CardRefundResponse> = await this.secure5Api.get(endpoint, { params: payload })
                return response.data
            }
        }
    }
    
    /**
     * Standing Orders operations
     * 
     * Provides methods for managing recurring payment orders including creation,
     * updates, and retrieval of standing order configurations.
     */
    get StandingOrders() {
        return {
            /**
             * Creates a new standing order
             * 
             * Sets up a recurring payment order that will automatically process
             * payments according to the specified frequency and date range.
             * 
             * @param payload - Standing order creation parameters @see {@link CreateStandingOrderPayload}
             * @returns Promise resolving to creation response @see {@link CreateStandingOrderResponse}
             * 
            
             */
            create: async (payload: CreateStandingOrderPayload): Promise<CreateStandingOrderResponse> => {
                const endpoint = ApiEndpoints.STO_CREATE
                const response: AxiosResponse<CreateStandingOrderResponse> = await this.paymentsApi.post(endpoint, payload)
                return response.data
            },
            /**
             * Updates an existing standing order
             * 
             * Modifies the configuration of a previously created standing order,
             * allowing changes to amounts, frequency, dates, or other parameters.
             * 
             * @param payload - Standing order update parameters @see {@link UpdateStandingOrderPayload}
             * @returns Promise resolving to update response @see {@link UpdateStandingOrderResponse}
             * 

             */
            update: async (payload: UpdateStandingOrderPayload): Promise<UpdateStandingOrderResponse> => {
                const endpoint = ApiEndpoints.STO_UPDATE
                const response: AxiosResponse<UpdateStandingOrderResponse> = await this.paymentsApi.post(endpoint, payload)
                return response.data
            },
            /**
             * Retrieves standing order details
             * 
             * Fetches information about a specific standing order including
             * its current configuration, status, and processing history.
             * 
             * @param payload - Standing order retrieval parameters @see {@link RetreiveStandingOrdersPayload}
             * @returns Promise resolving to standing order details @see {@link RetreiveStandingOrdersResponse}
             * 
            
             */
            retrieve: async (payload: RetreiveStandingOrdersPayload): Promise<RetreiveStandingOrdersResponse> => {
                const endpoint = ApiEndpoints.STO_RETRIEVE
                const response: AxiosResponse<RetreiveStandingOrdersResponse> = await this.paymentsApi.post(endpoint, payload)
                return response.data
            }
        }
    }

    /**
     * Transaction operations
     * 
     * Provides methods for searching and retrieving transaction information
     * across all payment methods and transaction types.
     */
    get Transactions() {
        return {
            /**
             * Searches for transactions based on various criteria
             * 
             * Performs a comprehensive search across all transaction types
             * 
             * @param payload - Transaction search parameters @see {@link SearchTransactionsPayload}
             * @returns Promise resolving to search results @see {@link SearchTransactionsResponse}
             */
            search: async (payload: SearchTransactionsPayload): Promise<SearchTransactionsResponse> => {
                const endpoint = ApiEndpoints.SEARCH_TRANSACTIONS
                const response: AxiosResponse<SearchTransactionsResponse> = await this.reportsApi.post(endpoint, payload)
                return response.data
            },
        }
    }
}