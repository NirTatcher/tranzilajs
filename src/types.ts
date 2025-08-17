import { BitItemTypes, BitUnitTypes, CardAcquirers, CardIssuers, CardTypes, ChargeFrequencies, CredTypes, CurrencyCodesAlpha, CurrencyCodesNumeric, DiscountTypes, Languages, PriceTypes, RecurTransactions, ResponseLanguages, shvaResponseCodes, ShvaResponseCodesEn, StandingOrderStatuses, TranModes } from "./constants"

export type CredType = (typeof CredTypes)[keyof typeof CredTypes]
export type CardIssuer = (typeof CardIssuers)[keyof typeof CardIssuers]
export type CardAcquirer = (typeof CardAcquirers)[keyof typeof CardAcquirers]
export type CardType = (typeof CardTypes)[keyof typeof CardTypes]
export type TranMode = (typeof TranModes)[keyof typeof TranModes]
export type Language = (typeof Languages)[keyof typeof Languages]
export type ResponseLanguage = (typeof ResponseLanguages)[keyof typeof ResponseLanguages]
export type CurrencyCodeNumeric = (typeof CurrencyCodesNumeric)[keyof typeof CurrencyCodesNumeric]
export type CurrencyCodeAlpha = (typeof CurrencyCodesAlpha)[keyof typeof CurrencyCodesAlpha]
export type RecurTransaction = (typeof RecurTransactions)[keyof typeof RecurTransactions]
export type StandingOrderStatus = (typeof StandingOrderStatuses)[keyof typeof StandingOrderStatuses]
export type ChargeFrequency = (typeof ChargeFrequencies)[keyof typeof ChargeFrequencies]
export type DiscountType = (typeof DiscountTypes)[keyof typeof DiscountTypes]
export type BitUnitType = (typeof BitUnitTypes)[keyof typeof BitUnitTypes]
export type PriceType = (typeof PriceTypes)[keyof typeof PriceTypes]
export type BitItemType = (typeof BitItemTypes)[keyof typeof BitItemTypes]
export type ShvaResponseCodeEn = keyof typeof ShvaResponseCodesEn
export type ShvaResponseCode = keyof typeof shvaResponseCodes

/**
 * API Response Base Type
 * @type {Object} APIResponseBase
 * @property {number} error_code - 0 - Success, else - Error
 * @property {string} message - Success or Error message
 * @example 
 * ```json
 * { "error_code": 0, "message": "Success" }
 * ```
 */
type APIResponseBase = {
  /** 0 - Success, else - Error */
  error_code: number,
  /** Success or Error message */
  message: string
}

/**
 * Basic IFrame Params Type
 * @type {Object} BasicIFrameParams
 * @property {string} sum - Positive Decimal Number
 * @property {number} cred_type - 1 - Credit card 6- Credit 8 - installments @see {@link CredTypes}
 * @property {number} currency - 1 - NIS, 2 - US dollar 978 - Euro, 826 - Pound Sterling GBP @see {@link CurrencyCodesNumeric}
 * @property {string} tranmode - A - Standard, V - Verification (J5), K - create token without checking card N - Verification (J2), With token add K (AK, NK, VK) @see {@link TranModes}
 * @property {number} accessibility - 2 - Adds accessibility button
 * @property {string} success_url_address - The url the user will be redirected to after a successful purchase, for example: https://my-website.com/success
 * @property {string} fail_url_address - The url the user will be redirected to after a failed purchase for exmaple: https://my-website.com/failure
 * @property {string} notify_url_address - The "Notify" page is intended to receive transaction data as they were actually performed and identify changes that occurred in the transaction data after they were sent, for exmaple: https://my-website.com/notify
 * @property {number} Z_field - If you include the Z_field parameter in your request, its value will replace the corresponding value in zData that is sent to SHVA. Parameter Name: Z_field Maximum Length: 8 digits Type: Numeric
 */
export type BasicIFrameParams = {
  /** Positive Decimal Number */
  sum: string
  /** 1 - Credit card 6- Credit 8 - installments */
  cred_type: CredType
  /** 1 - NIS, 2 - US dollar 978 - Euro, 826 - Pound Sterling GBP */
  currency: CurrencyCodeNumeric,
  /** A - Standard, V - Verification (J5), K - create token without checking card N - Verification (J2) With token add K (AK, NK, VK) */
  tranmode: TranMode; // A- Stantard, V - Verification (J5), K -create token without checking card, N - Verification (J2), With token add K (AK, NK, VK)	
  /** pass accessibility=2 to have an accessibility button */
  accessibility: 2 // Adds accessibility button
  /** The url the user will be redirected to after a successful purchase, for example: https://my-website.com/success */
  success_url_address: string;
  /** The url the user will be redirected to after a failed purchase for exmaple: https://my-website.com/failure */
  fail_url_address: string;
  /** The "Notify" page is intended to receive transaction data as they were actually performed and identify changes that occurred in the transaction data after they were sent, for exmaple: https://my-website.com/notify */
  notify_url_address: string
  /** If you include the Z_field parameter in your request, its value will replace the corresponding value in zData that is sent to SHVA. Parameter Name: Z_field Maximum Length: 8 digits Type: Numeric */
  Z_field?: number
}

/**
 * Additional Fields IFrame Params Type
 * @type {Object} AdditionalFieldsIFrameParams
 * @property {string} company - Company name
 * @property {string} contact - Contact name
 * @property {string} email - Email
 * @property {string} address - Address
 * @property {string} phone - Phone number
 * @property {string} city - City
 * @property {string} pdesc - Basic Product description for invoice
 * @property {string} remarks - Remarks
 */
export type AdditionalFieldsIFrameParams = {
  /** Company name */
  company: string;
  /** Contact name */
  contact: string;
  /** Email */
  email: string;
  /** Address */
  address: string;
  /** Phone number */
  phone: string;
  /** City */
  city: string;
  /** Basic Product description for invoice */
  pdesc: string;
  /** Remarks */
  remarks: string;
}

/**
 * Installments IFrame Params Type
 * @type {Object} InstallmentsIFrameParams
 * @property {number} npay - Positive integer	number of installments after the first installment. npay= number of total installments - 1
 * @property {number} fpay - Positive integer/decimal number maxium 2 numbers after the dot	amount to pay on the first transaction
 * @property {number} spay - Positive integer/decimal number maxium 2 numbers after the dot	amount to pay for every transaction after the first transaction
 * @property {number} maxpay - Positive integer	maximum amount of installments
 * @description must be with cred_type=8 The formula for calculating payments is: sum = fpay + spay*npay * The calculation formula for Installments is as follows: * The sum is equal to the first payment (fpay) plus the second payment (spay) multiplied by the number of payments (npay).
 */
export type InstallmentsIFrameParams = {
  /** Positive integer	number of installments after the first installment. npay= number of total installments - 1 */
  npay: number
  /** Positive integer/decimal number maxium 2 numbers after the dot	amount to pay on the first transaction */
  fpay: number
  /** Positive integer/decimal number maxium 2 numbers after the dot	amount to pay for every transaction after the first transaction */
  spay: number
  /** Positive integer	maximum amount of installments */
  maxpay: number
}

/**
 * Display Settings IFrame Params Type
 * @type {Object} DisplaySettingsIFrameParams
 * @property {string} trBgColor - Hexadecimal	background color
 * @property {string} trTextColor - Hexadecimal	text color
 * @property {string} trButtonColor - Hexadecimal payment button color
 * @property {string} buttonLabel - String payment button text
 * @property {string} hidesum - Hide payment sum - it is possible to pass this parmater only if the transaction is made through the token system and only if one of the following variables is sent: tranmode=VK or tranmode=K or tranmode=NK.
 */
export type DisplaySettingsIFrameParams = {
  /** Hexadecimal	background color */
  trBgColor: string,
  /** Hexadecimal	text color */
  trTextColor: string,
  /** Hexadecimal payment button color */
  trButtonColor: string,
  /** String payment button text */
  buttonLabel: string,
  /** Hide payment sum - it is possible to pass this parmater only if the transaction is made through the token system and only if one of the following variables is sent: tranmode=VK or tranmode=K or tranmode=NK. */
  hidesum: "1"
  /** Remove tranzila logo */
  nologo: '1',
  /** Hide the option to pay with credit card */
  hide_cc: "1"
  /** Template (hosted iframe) */
  template: "custom"
}

/**
 * Add Payment Options IFrame Params Type
 * @type {Object} AddPaymentOptionsIFrameParams
 * @property {string} ppnewwin - Add the option to pay with paypal
 * @property {string} bit_pay - Add the option to pay with Bit
 * @property {string} google_pay - Add the option to pay with Google, Note: add the allowpaymentrequest=true to the iframe
 * @property {string} allowpaymentrequest - Allow payment request
 */
export type AddPaymentOptionsIFrameParams = {
  /** Add the option to pay with paypal */
  ppnewwin: "2"
  /** Add the option to pay with Bit */
  bit_pay: "1"
  /** Add the option to pay with Google, Note: add the allowpaymentrequest=true to the iframe */
  google_pay: "1"
  /** Allow payment request */
  allowpaymentrequest: "true"
}
/**
 * Language IFrame Params Type
 * @type {Object} LangIFrameParams
 * @property {string} lang - Language
 * @see {@link Languages}
 */
export type LangIFrameParams = {
  /** Language */
  lang: Language
}

/**
 * 3DS2 IFrame Params Type
 * @type {Object} ThreeDS2IFrameParams
 * @property {string} newprocess - activating V2 on the 3DS system if it was not set in the settings
 */
export type ThreeDS2IFrameParams = {
  /** activating V2 on the 3DS system if it was not set in the settings */
  newprocess: "1"
}

/**
 * Recurring IFrame Params Type
 * @type {Object} RecurringIFrameParams
 * @property {number} recur_payments - The number of recurring charges that will be made - If this field is not passed, the recurring charge will not be limited and will run every month/quarter/year until manually turned off from the terminal.
 * @property {string} recur_start_date - yyyy-mm-dd (recur_start_date=2023-08-28)	The start date of the recurring charges
 * @property {string} recur_transaction - 4 - monthly payment Customer Choice 5 - quarterly payment Customer Choice 7 - yearly payment Not Customer Choice 4_approved - monthly payment Not Customer Choice approved 5_approved - quarterly payment Not Customer Choice approved 7_approved - yearly payment Not Customer Choice approved @see {@link RecurTransactions}
 */
export type RecurringIFrameParams = {
  /** Integer	The number of recurring charges that will be made - If this field is not passed, the recurring charge will not be limited and will run every month/quarter/year until manually turned off from the terminal. */
  recur_payments: number //The number of recurring charges that will be made - If this field is not passed, the recurring charge will not be limited and will run every month/quarter/year until manually turned off from the terminal. 
  /** yyyy-mm-dd (recur_start_date=2023-08-28)	The start date of the recurring charges */
  recur_start_date: string
  /** 4 - monthly payment Customer Choice 5 - quarterly payment Customer Choice 7 - yearly payment Not Customer Choice 4_approved - monthly payment Not Customer Choice approved 5_approved - quarterly payment Not Customer Choice approved 7_approved - yearly payment Not Customer Choice approved */
  recur_transaction: RecurTransaction
}

/**
 * Product Details IFrame Params Type
 * @type {Object} ProductDetailsIFrameParams
 * @property {Object} json_purchase_data - Product Details
 * @property {string} product_name - Product Name
 * @property {number} product_quantity - Product Quantity - Number
 * @property {number} product_price - Product Price
 */
export type ProductDetailsIFrameParams = {
  json_purchase_data: {
    /** Product Name */
    product_name: string
    /** Product Quantity - Number */
    product_quantity: number
    /** Product Price */
    product_price: number
  }[]
}

/**
 * IFrame Params Type
 * @type {Object} IFrameParams
 * @property {BasicIFrameParams} basic - Basic IFrame Params @see {@link BasicIFrameParams}
 * @property {AdditionalFieldsIFrameParams} additional - Additional Fields IFrame Params @see {@link AdditionalFieldsIFrameParams}
 * @property {InstallmentsIFrameParams} installments - Installments IFrame Params @see {@link InstallmentsIFrameParams}
 * @property {DisplaySettingsIFrameParams} display - Display Settings IFrame Params @see {@link DisplaySettingsIFrameParams}
 * @property {AddPaymentOptionsIFrameParams} payment - Add Payment Options IFrame Params @see {@link AddPaymentOptionsIFrameParams}
 * @property {LangIFrameParams} lang - Language IFrame Params @see {@link LangIFrameParams}
 * @property {ThreeDS2IFrameParams} threeDS2 - 3DS2 IFrame Params @see {@link ThreeDS2IFrameParams}
 * @property {RecurringIFrameParams} recurring - Recurring IFrame Params @see {@link RecurringIFrameParams}
 * @property {ProductDetailsIFrameParams} productDetails - Product Details IFrame Params @see {@link ProductDetailsIFrameParams}
 * @property {Record<string, any>} [other] - Other IFrame Params
 */
export type IFrameParams =
  BasicIFrameParams &
  AdditionalFieldsIFrameParams &
  InstallmentsIFrameParams &
  DisplaySettingsIFrameParams &
  AddPaymentOptionsIFrameParams &
  LangIFrameParams &
  ThreeDS2IFrameParams &
  RecurringIFrameParams &
  ProductDetailsIFrameParams &
  Record<string, any>

/**
 * Bit Client Type
 * @type {Object} BitClient
 * @property {string} company - Company name
 * @property {string} name - Name
 * @property {string} id - ID
 * @property {string} email - Email
 * @property {string} address_line_1 - Address line 1
 */
export type BitClient = {
  /** Company name */
  company?: string
  /** Name */
  name?: string
  /** ID */
  id?: string
  /** Email */
  email?: string
  /** Address line 1 */
  address_line_1?: string
  /** Address line 2 */
  address_line_2?: string
  /** City */
  city?: string
  /** Zip */
  zip?: string
}


/** N – Net (Unit price includes does not include VAT tax) G – Gross (Unit price includes VAT tax) */

/**
 * Bit Item Type
 * @type {Object} BitItem
 * @property {string} code - Item code
 * @property {string} name - Item name
 * @property {string} type - Bit item type @see {@link BitItemType}
 * @property {number} unit_price - Item unit price
 * @property {number} units_number - Item units number
 * @property {number} unit_type - Item unit type @see {@link BitUnitType}
 * @property {string} price_type - Price type @see {@link PriceType}
 * @property {string} currency_code - Currency code (ILS for bit) @see {@link CurrencyCodesAlpha.ILS}
 * @property {number} to_txn_currency_exchange_rate - To transaction currency exchange rate
 * @property {string} discount_type - Discount type @see {@link DiscountType}
 * @property {number} vat_percent - Item vat percent
 * @property {Object} attributes - Item attributes
 */
export type BitItem = {
  /** Item code */
  code?: string
  /** Item name */
  name: string
  /** I – Item S - Shipping C – Coupon or discount */
  type?: BitItemType
  /** Item unit price */
  unit_price: number
  /** Item units number */
  units_number: number
  /** Item unit type */
  unit_type?: BitUnitType
  /** N – Net (Unit price includes does not include VAT tax) G – Gross (Unit price includes VAT tax) */
  price_type?: PriceType
  /** ILS for Bit */
  currency_code?: typeof CurrencyCodesAlpha.ILS
  /** If the currency is different than transaction currency, please send exchange rate to the transaction currency. */
  to_txn_currency_exchange_rate?: 1
  /** Values: fixed, percent */
  discount_type?: DiscountType
  /** Item vat percent. */
  vat_percent?: number
  /** Item attributes */
  attributes?: {
    language: Language
    name: string
    value: string
  }
}
/**
 * Bit Init Payload Type
 * @type {Object} BitInitPayload
 * @property {string} terminal_name - Terminal name
 * @property {string} txn_currency_code - Transaction currency code (ILS for bit) @see {@link CurrencyCodesAlpha.ILS}
 * @property {string} txn_type - Transaction type (debit for bit)
 * @property {string} success_url - Success URL (redirect address for success)
 * @property {string} notify_url - Callback URL (When a purchase is completed, regardless of success or failure, the API will send a notification to this URL. It acts as a callback to let you know about the outcome of the purchase, so you can take any necessary actions on your side based on that information.)
 * @property {string} failure_url - Failure URL (redirect address for failure)
 * @property {string} [expire_month] - Expire month
 * @property {number} [other_installments_amount] - Other installement amount for payment_plan - 8,6
 * @property {BitClient} [client] - Bit client @see {@link BitClient}
 * @property {BitItem[]} items - Bit items @see {@link BitItem}
 * @property {ResponseLanguage} [response_language] - Response language @see {@link ResponseLanguages}
 * @property {string | null} [created_by_user] - Created by user
 * @property {string} [created_by_system] - Created by system
 * @property {Object} [user_defined_fields] - User defined fields
 * @example 
 * ```json
 * { terminal_name: "myterminal", txn_currency_code: "ILS", txn_type: "debit", success_url: "https://www.mywebsite/success", notify_url: "https://www.mywebsite/notify", failure_url: "https://www.mywebsite/failure", client: { name: "John Doe", email: "john.doe@example.com", phone: "0000000000" }, items: [{ name: "Product 1", type: "I", unit_type:1, unit_price: 100, units_number: 1, vat_percent: 0, currency_code: "ILS" }], user_defined_fields: [{ name: "field1", value: "value1" }] }
 * ```
 */
export type BitInitPayload = {
  /** Terminal name */
  terminal_name: string;
  /** Transaction currency code (ILS for bit) */
  txn_currency_code: typeof CurrencyCodesAlpha.ILS;
  /** Transaction type (debit for bit) */
  txn_type: "debit";
  /** Success URL (redirect address for success) */
  success_url: string;
  /** Callback URL (When a purchase is completed, regardless of success or failure, the API will send a notification to this URL. It acts as a callback to let you know about the outcome of the purchase, so you can take any necessary actions on your side based on that information.) */
  notify_url: string;
  /** Failure URL (redirect address for failure) */
  failure_url: string;
  /** Expire month */
  expire_month?: number;
  /** Other installement amount for payment_plan - 8,6 */
  other_installments_amount?: number;
  /** Bit client */
  client?: BitClient;
  /** Bit items */
  items: BitItem[];
  /** Response language */
  response_language?: ResponseLanguage;
  /** Created by user */
  created_by_user?: string;
  /** Created by system */
  created_by_system?: string;
  /** User defined fields */
  user_defined_fields?: { "name": string, "value": string }[]
}

/**
 * Bit Init Response Type
 * @type {Object} BitInitResponse
 * @property {number} error_code - Error code @see {@link APIResponseBase}
 * @property {string} message - Message @see {@link APIResponseBase}
 * @property {string} sale_url - Sale URL (QR code page URL for desktop or deep link page URL for mobile)
 * @example 
 * ```json
 * { "error_code": 0, "message": "Success", "sale_url": "https://www.tranzila.com/sale/1234567890" }
 * ```
 */
export type BitInitResponse = APIResponseBase & {
  /** Sale URL (QR code page URL for desktop or deep link page URL for mobile) */
  sale_url: string
}

/** 
 * Bit Refund Payload Type
 * @type {Object} BitRefundPayload
 * @property {string} terminal_name - Terminal name
 * @property {number} transaction_id - Transaction ID
 * @property {number} amount - Amount (in cents)
 * @example 
 * ```json
 * { terminal_name: "myterminal", transaction_id: 123456, amount: 100 }
 * ```
 */
export type BitRefundPayload = {
  /** Terminal Name */
  terminal_name: string
  /** Transaction ID */
  transaction_id: number
  /** Amount (in cents) */
  amount: number
}

/**
 * Bit Transaction Result Type
 * @type {Object} BitTransactionResult
 * @property {string} processor_response_code - Processor response code
 * @property {string} transaction_id - Transaction ID
 * @property {string} refund_transaction_id - Refund transaction ID
 * @property {string} amount - Amount
 * @property {number} refund_amount - Refund amount
 * @property {string} refund_type - Refund type
 * @property {typeof CurrencyCodesAlpha.ILS} currency_code - Currency code
 * @property {string} card_locality - Card locality
 */
export type BitTransactionResult = {
  processor_response_code: string
  transaction_id: string
  refund_transaction_id: string
  amount: string
  refund_amount: number
  refund_type: string
  currency_code: typeof CurrencyCodesAlpha.ILS
  card_locality: string
}

/**
 * Bit Original Request Type
 * @type {Object} BitOriginalRequest
 * @property {string} terminal_name - Terminal name
 * @property {number} transaction_id - Transaction ID
 * @property {number} amount - Amount
 * @property {ResponseLanguage} response_language - Response language
 */
export type BitOriginalRequest = {
  terminal_name: string
  transaction_id: number
  amount: number
  response_language: ResponseLanguage
}

/**
 * Bit Refund Response Type
 * @type {Object} BitRefundResponse
 * @property {number} error_code - Error code @see {@link APIResponseBase}
 * @property {string} message - Message @see {@link APIResponseBase}
 * @property {Object} transaction_result - Transaction result
 * @property {Object} original_request - Original request
 * @example 
 * ```json
 * { "error_code": 0, "message": "Success", "transaction_result": { "processor_response_code": "000", "transaction_id": "123456", "refund_transaction_id": "123456", "amount": "500", "refund_amount": 5, "refund_type": "complete", "currency_code": "ILS", "card_locality": "domestic" }, "original_request": { "terminal_name": "myterminal", "transaction_id": 123456, "amount": 5, "response_language": "english" } }
 * ```
 */
export type BitRefundResponse = APIResponseBase & {
  transaction_result: BitTransactionResult
  original_request: BitOriginalRequest
}

/**
 * Card Refund Payload Type
 * @type {Object} CardRefundPayload
 * @property {string} supplier - Terminal name
 * @property {number} sum - Amount to refund
 * @property {number} currency - Currency code @see {@link CurrencyCodesNumeric}
 * @property {string} TranzilaTK - Tranzila generated unique card token
 * @property {string} expdate - Card expiration date
 * @property {number} cred_type - Credential type @see {@link CredTypes}
 * @property {string} TranzilaPW - Tranzila password
 * @property {string} CreditPass - Credit password
 * @property {string} tranmode - C + transaction index for refund
 * @property {string} authnr - Authorization number
 * @property {string} [contact] - Contact name
 * @property {string} [email] - Contact email
 * @property {string} [phone] - Contact phone
 * @property {string} [name] - Contact name
 * @property {string} [city] - Contact city
 * @property {string} [address] - Contact address
 * @example 
 * ```json
 * { supplier: "myterminal", sum: 5, currency: 1, TranzilaTK: "1234567890", expdate: "0828", cred_type: 1, TranzilaPW: "1234567890", CreditPass: "1234567890", tranmode: "C123456", authnr: "0000000", contact: "JohnDoe", email: "john.doe@example.com", phone: "0000000000", name: "John Doe", city: "Tel Aviv", address: "123 Main St" }
 * ```
 * @example Refund URL
 * ```text
 * https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=myterminal&sum=5&currency=1&TranzilaTK=[CardToken]&expdate=0828&cred_type=1&TranzilaPW=[YourTranzilaPW]&CreditPass=[YourCreditPass]&tranmode=C123456&authnr=0000000&contact=JohnDoe&email=john.doe@example.com&phone=0000000000&name=JohnDoe
 * ```
 */
export type CardRefundPayload = {
  /** Terminal Name */
  supplier: string,
  /** Amount to refund */
  sum: number,
  /** Currency code */
  currency: CurrencyCodeNumeric,
  /** Tranzila generated unique card token */
  TranzilaTK: string,
  /** Card expiration date */
  expdate: string,
  /** Credential type*/
  cred_type: CredType,
  /** Tranzila password */
  TranzilaPW: string,
  /** Credit password */
  CreditPass: string,
  /** "C" + transaction index for refund */
  tranmode: `C${string}`,
  /** Authorization number */
  authnr: string,
  /** Contact name */
  contact?: string,
  /** Contact email */
  email?: string,
  /** Contact phone */
  phone?: string,
  /** Contact name */
  name?: string,
  /** Contact city */
  city?: string,
  /** Contact address */
  address?: string
}

/**
 * Card Refund Response Type
 * @type {Object} CardRefundResponse
 * @property {string} Response - Response arrives in either string (URL query params format) or HTML (if the refund was not successful)
 * @example Success Response
 * ```text
 * "Response=000&contact=JohnDoe&email=john.doe@example.com&currency=1&supplier=myterminal&expdate=0828&sum=5&name=JohnDoe&TranzilaTK=[TranzilaTK]&phone=0000000000&cred_type=1&DclickTK=&authnr=0000000&tranmode=C123456&ConfirmationCode=1234567&index=123456&Responsesource=3&Responsecvv=3&Responseid=0&Tempref=12345678&DBFIsForeign=0&DBFcard=2&cardtype=2&DBFcardtype=2&cardissuer=2&DBFsolek=1&cardaquirer=1&tz_parent=myterminal&cred_type_shva=1"
 * ```
 * @example Error Response
 * ```html
 * <!DOCTYPE html>
    <html>
    <head>
        <title>Error</title>
    </head>
    <body>
        <font>Transaction failed: Invalid terminal name</font>
    </body>
    </html>
 * ```
 */
export type CardRefundResponse = string

/**
 * Standing Order Card Type
 * @type {Object} StandingOrderCard
 * @property {string} token - Card token string required Token Example: 1234567890
 * @property {number} expire_month - Card expiration month >= 1 <= 12 Example: 4
 * @property {number} expire_year - Card expiration year >= 2020 <= 2030 Example: 2024
 * @property {string} [card_holder_id] - Card holder ID Depending on merchant contract with credit card transactions acquirer, my be ommited or required to complete a transaction Example: 012345632 Match pattern: ^[0-9]{9}$
 * @property {string} [card_holder_name] - Card holder name Depending on merchant contract with credit card transactions acquirer, my be ommited or required to complete a transaction >= 2 characters <= 21 characters Example: לובנגולו מלך זולו
 */
export type StandingOrderCard = {
  /** Card token string required Token Example: 1234567890 */
  token: string,
  /** Card expiration month >= 1 <= 12 Example: 4 */
  expire_month: number,
  /** Card expiration year >= 2020 <= 2030 Example: 2024 */
  expire_year: number,
  /** Card holder ID Depending on merchant contract with credit card transactions acquirer, my be ommited or required to complete a transaction Example: 012345632 Match pattern: ^[0-9]{9}$ */
  card_holder_id?: string | null,
  /** Card holder name Depending on merchant contract with credit card transactions acquirer, my be ommited or required to complete a transaction >= 2 characters <= 21 characters Example: לובנגולו מלך זולו */
  card_holder_name?: string
}

/**
 * Standing Order Client Type
 * @type {Object} StandingOrderClient
 * @property {string} [name] - Client name Example: האקלברי פין
 * @property {string} [id] - Client Israeli ID number Example: 012345632 Match pattern: ^[0-9]{9}$
 * @property {string} [email] - Client email address, only one can be used Example: mailaddress@domain.com Match pattern: mail@example.com
 * @property {string} [address] - Client one liner address Example: רציף 9 ושלושה רבעים, קינגס קרוס, לונדון
 * @property {string} [phone_country_code] - Client phone country code Example: 001
 * @property {string} [phone_area_code] - Client phone number area code Example: 001
 * @property {string} [phone_number] - Client phone number Example: 555-8965
 */
export type StandingOrderClient = {
  /** string Client name Example: האקלברי פין */
  name?: string,
  /** string Client Israeli ID number Example: 012345632 Match pattern: ^[0-9]{9}$ */
  id?: string | null,
  /** string<email> Client email address, only one can be used Example: mailaddress@domain.com Match pattern: mail@example.com */
  email?: string,
  /** string Client one liner address Example: רציף 9 ושלושה רבעים, קינגס קרוס, לונדון */
  address?: string | null,
  /** string Client country international access code, default is 972 for Israel Default: 972 Example: 44 */
  phone_country_code?: string | null,
  /** phone_area_code string Client phone number area code Example: 001 */
  phone_area_code?: string | null,
  /** string Client phone number Example: 555-8965 */
  phone_number?: string
}

/**
 * Standing Order MSV Type
 * @type {Object} StandingOrderMSV
 * @property {number} bank_code - Client bank code, based on Israeli bank codes list Example: 12
 * @property {string} branch_code - Client branch code, based on Israeli bank branchs codes list Example: 659
 * @property {string} account_number - Client bank account to charge Example: 127963
 */
export type StandingOrderMSV = {
  /** Client bank code, based on Israeli bank codes list Example: 12 */
  bank_code: number,
  /** Client branch code, based on Israeli bank branchs codes list Example: 659 */
  branch_code: number,
  /** Client bank account to charge Example: 127963 */
  account_number: number

}

/**
 * Standing Order Item Type
 * @type {Object} StandingOrderItem
 * @property {string} code - Item code. Also used by Tranzila invoicing service (if applicable). Example: AA-1246-974-B
 * @property {string} name - Item name. Also used by Tranzila invoicing service (if applicable). Example: מפצל HDMI
 * @property {number} unit_price - Item single unit price >= 0.01 <= 99999 Example: 230
 * @property {number} [units_number] - Item units number chraged. Total charge amount will be set to unit_price times units number. If ommited, is considered to be 1 >= 0.01 <= 999 Example: 2
 * @property {string} [price_currency] - Item price currency. Supported currencies are ILS, USD, EUR Allowed values: ILS USD EUR Default: ILS @see {@link CurrencyCodesNumeric} @see {@link CurrencyCodesAlpha}
 * @property {string} [price_type] - Item price type. If Gross, sent price/amount is processed as is, with VAT extracted from sent price/amount, if Net, VAT is added to sent amount. price type can either be G - Gross N - Net Allowed values: N G Default: G Example: G @see {@link PriceTypes}
 * @property {number} [vat_percent] - If omitted, current Bank Of Israel VAT will be used >= 0 Example: 17
 */
export type StandingOrderItem = {
  /** string Item code. Also used by Tranzila invoicing service (if applicable). Example: AA-1246-974-B */
  code?: string | null,
  /** string required Item name. Also used by Tranzila invoicing service (if applicable). Example: מפצל HDMI */
  name: string | null,
  /** number required Item single unit price >= 0.01 <= 99999 Example: 230 */
  unit_price: number,
  /** number Item units number chraged. Total charge amount will be set to unit_price times units number. If ommited, is considered to be 1 >= 0.01 <= 999 Example: 2 */
  units_number?: number,
  /** string currency supported currencies are ILS, USD, EUR Allowed values: ILS USD EUR Default: ILS */
  price_currency?: CurrencyCodeNumeric | CurrencyCodeAlpha, // deafult is 1=NIS
  /** string if Gross, sent price/amount is processed as is, with VAT extracted from sent price/amount, if Net, VAT is added to sent amount. price type can either be G - Gross N - Net Allowed values: N G Default: G Example: G */
  price_type?: PriceType // default G
  /** integer if omitted, current Bank Of Israel VAT will be used >= 0 Example: 17 */
  vat_percent?: number
}

/**
 * Standing Order Base Type
 * @type {Object} StandingOrderBase
 * @property {string} terminal_name - Terminal name Example: myterminal
 * @property {number} sto_payments_number - Standing order payments number >= 2 <= 9999 Example: 12
 * @property {string} charge_frequency - Charge frequency Example: monthly @see {@link ChargeFrequency}
 * @property {string} first_charge_date - First charge date Example: 2025-08-06
 * @property {string} charge_dom - Charge day of month >= 1 <= 28 Example: 25
 * @property {StandingOrderClient} [client] - Client information @see {@link StandingOrderClient}
 * @property {StandingOrderItem[]} items - Items to charge @see {@link StandingOrderItem}
 * @property {StandingOrderCard} [card] - Card information @see {@link StandingOrderCard}
 * @property {StandingOrderMSV} [msv] - MSV information @see {@link StandingOrderMSV}
 * @property {string} [created_by_user] - Created by user Example: demo user
 */
export type StandingOrderBase = {
  /** Terminal name Example:myterminal */
  terminal_name: string,
  /** Standing order payments number >= 2 <= 9999 Example: 12 */
  sto_payments_number: number,
  /** Charge frequency string Allowed values: weekly monthly quarterly half-yearly yearly Example: monthly */
  charge_frequency: ChargeFrequency,
  /** First charge date string<date> Example: 2025-08-06 */
  first_charge_date?: string,
  /** Charge day of month >= 1 <= 28 Example: 25 */
  charge_dom: number,
  /** Client information */
  client?: StandingOrderClient,
  /** Items to charge */
  items: StandingOrderItem[],
  /** Card information */
  card?: StandingOrderCard,
  /** MSV information */
  msv?: StandingOrderMSV,
  /** Created by user Example: demo user */
  created_by_user?: string | null
}

/**
 * Create Standing Order Payload Type
 * @type {Object} CreateStandingOrderPayload
 * @property {string} terminal_name - Terminal name Example: myterminal
 * @property {number} sto_payments_number - Standing order payments number >= 2 <= 9999 Example: 12
 * @property {string} charge_frequency - Charge frequency Example: monthly @see {@link ChargeFrequency}
 * @property {string} first_charge_date - First charge date Example: 2025-08-06
 * @property {string} charge_dom - Charge day of month >= 1 <= 28 Example: 25
 * @property {StandingOrderClient} [client] - Client information @see {@link StandingOrderClient}
 * @property {StandingOrderItem[]} items - Items to charge @see {@link StandingOrderItem}
 * @property {StandingOrderCard} [card] - Card information @see {@link StandingOrderCard}
 * @property {StandingOrderMSV} [msv] - MSV information @see {@link StandingOrderMSV}
 * @property {string | null} [created_by_user] - Created by user Example: demo user
 * @property {string} [currency_code] - Currency code allowed values: ILS USD EUR Default: ILS Example: ILS @see {@link CurrencyCodeAlpha}
 * @property {number} [vat_percent] - VAT percentage >= 0 <= 100 Example: 17
 * @property {string} [response_language] - Response language Allowed values: english hebrew Default: english Example: hebrew @see {@link ResponseLanguage}
 * @example
 * ```json
 * {"terminal_name":"myterminal","sto_payments_number":9999,"charge_frequency":"monthly","first_charge_date":"2025-10-01","charge_dom":1,"vat_percent":0,"client":{"name":"John Doe","email":"john.doe@example.com","address":"","phone_number":"0000000000"},"items":[{"code":"1","name":"Product1","units_number":1,"unit_price":5,"price_currency":"1"}],"card":{"token":"[CardToken]","expire_month":8,"expire_year":2028}}
 * ```
 */
export type CreateStandingOrderPayload = StandingOrderBase & {
  /** Currency code string Allowed values: ILS USD EUR Default: ILS Example: ILS */
  currency_code?: CurrencyCodeAlpha, // default is ILS
  /** VAT percentage >= 0 <= 100 Example: 17 */
  vat_percent?: number,
  /** Response language string Allowed values: english hebrew Default: english Example: hebrew */
  response_language?: ResponseLanguage,
}

/**
 * Create Standing Order Response Type
 * @type {Object} CreateStandingOrderResponse
 * @property {number} error_code - Error code Example: 0 @see {@link APIResponseBase}
 * @property {string} message - Message Example: Success @see {@link APIResponseBase}
 * @property {number} sto_id - Standing order ID Example: 123456
 * @example 
 * ```json
 * { "error_code": 0, "message": "Success", "sto_id": 123456 }
 * ```
 */
export type CreateStandingOrderResponse = APIResponseBase & {
  sto_id?: number
}

/**
 * Retreive Standing Orders Payload Type
 * @type {Object} RetreiveStandingOrdersPayload
 * @property {string} terminal_name - Terminal name Example: myterminal
 * @property {number} [sto_id] - Retrieve specific STO Example: 4192
 * @property {string} [sto_status] - Retrieve STOs with given status Allowed values: active inactive Example: active @see {@link StandingOrderStatuses}
 * @property {number} [client_internal_id] - integer Example:9678
 * @property {string} [client_name] - string Example: קים קרדשיאן
 * @property {string} [client_id] - string Example: 012345632 Match pattern: ^[0-9]{9}$
 * @property {string} [client_email] - string<email> Example: mail@example.com Match pattern: mail@example.com
 * @property {string} [token] - string Example: f12cF45cI7898t70126
 * @property {string} [last_4_digits] - string Example: 0126
 * @property {string} [bank_account_number] - string Example: 012345632 Match pattern: ^[0-9]{9}$
 * @property {string} [response_language] - string Allowed values: english hebrew Example: hebrew @see {@link ResponseLanguages}
 * @example { terminal_name: "myterminal", sto_id: 123456 }
 */
export type RetreiveStandingOrdersPayload = {
  /** string required Example:myterminal */
  terminal_name: string,
  /** integer Retrieve specific STO Example: 4192 */
  sto_id?: number,
  /** string Retrieve STOs with given status Allowed values: active inactive Example: active */
  sto_status?: StandingOrderStatus,
  /** integer Example:9678 */
  client_internal_id?: number,
  /** string Example: קים קרדשיאן*/
  client_name?: string,
  /** string Example: 012345632 Match pattern: ^[0-9]{9}$ */
  client_id?: string,
  /** string<email> Example: mail@example.com Match pattern: mail@example.com */
  client_email?: string,
  /** string Example:f12cF45cI7898t70126 */
  token?: string,
  /** string Example:0126 */
  last_4_digits?: string,
  /** string Example: 012345632 Match pattern: ^[0-9]{9}$ */
  card_holder_id?: string,
  /** string Example:073875 */
  bank_account_number?: string,
  /** string Allowed values: english hebrew */
  response_language?: ResponseLanguage,
  /** string Example: 1234 */
  sto_first_transaction_id?: null | string
}
/** 
 * Retreive Standing Orders Response Type
 * @type {Object} RetreiveStandingOrdersResponse
 * @property {number} error_code - Error code Example: 0 @see {@link APIResponseBase}
 * @property {string} message - Message Example: Success @see {@link APIResponseBase}
 * @property {Object} stos - Standing orders @see {@link StandingOrderBase}
 * @example 
 * ```json  
 * { "error_code": 0, "message": "Success", "stos": [ { "sto_id": "123456", "terminal_name": "myterminal", "sto_payments_number": "9999", "charge_frequency": "weekly", "first_charge_date": "2024-12-16", "charge_dom": "1", "last_charge_date": "2025-05-07 20:20:16", "next_charge_date": "2025-05-14 00:00:00", "create_date": "2024-12-15 16:53:04", "sto_first_transaction_id": "123456", "sto_status": "inactive", "charge_amount": "2.0000", "card": { "token": "[CardToken]", "expire_month": "8", "expire_year": "28", "card_holder_id": null }, "client": { "internal_id": null, "name": "John Doe", "id": null, "email": "john.doe@example.com", "address": "", "phone_country_code": "972", "phone_area_code": null, "phone_number": "0000000000" }, "item": { "internal_id": null, "code": null, "name": null, "unit_price": "0.0000", "units_number": "1", "price_currency": "ILS", "price_type": "G", "vat_percent": "0" }, "created_by_user": null } ] }
 * ```
*/
export type RetreiveStandingOrdersResponse = APIResponseBase & {
  stos?: (Omit<StandingOrderBase, 'items'> & {
    /** integer Example: 123456 */
    sto_id: number,
    /** string Example: 2025-05-07 20:20:16 */
    last_charge_date: string | null,
    /** string Example: 2025-05-14 00:00:00 */
    next_charge_date: string,
    /** string Example: 2024-12-15 16:53:04 */
    create_date: string,
    /** string Example: 123456 */
    sto_first_transaction_id: null | string,
    /** string Example: inactive */
    sto_status: StandingOrderStatus,
    /** string Example: 2.0000 */
    charge_amount: string,
    /** StandingOrderCard */
    client: StandingOrderClient & {
      internal_id: null | string,
    },
    /** StandingOrderItem - singular, not array */
    item: StandingOrderItem & {
      internal_id?: null | string,
    },
    /** string Example: null */
    created_by_user: string | null
  })[]
}

/**
 * Update Standing Order Payload Type
 * @type {Object} UpdateStandingOrderPayload
 * @property {string} terminal_name - Terminal name Example: myterminal
 * @property {number} sto_id - Standing order ID Example: 123456
 * @property {string} sto_status - Standing order status Example: inactive @see {@link StandingOrderStatuses}
 * @property {string} [response_language] - Response language Allowed values: english hebrew Default: english Example: hebrew @see {@link ResponseLanguages}
 * @property {string} [updated_by_user] - Updated by user Example: demo user
 * @example 
 * ```json
 * { terminal_name: "myterminal", sto_id: 123456, sto_status: "inactive"}
 * ```
 */
export type UpdateStandingOrderPayload = {
  terminal_name: string,
  sto_id: number,
  sto_status: StandingOrderStatus,
  response_language?: ResponseLanguage,
  updated_by_user?: string
}

/**
 * Update Standing Order Response Type
 * @type {Object} UpdateStandingOrderResponse
 * @property {number} error_code - Error code Example: 0 @see {@link APIResponseBase}
 * @property {string} message - Message Example: Success @see {@link APIResponseBase}
 * @property {string} [mismatch_info] - Mismatch information Example: Mismatch information
 * @example 
 * ```json
 * { "error_code": 0, "message": "Success" }
 * ```
 */
export type UpdateStandingOrderResponse = APIResponseBase & {
  mismatch_info?: string;
}

/**
 * Webhook Notification Payload For CC
 * @type {Object} WebhookNotificationPayloadForCC
 * @property {string} Response - Response code Example: 000 @see {@link shvaResponseCodes}
 * @property {string} o_tranmode - Transaction mode Example: AK
 * @property {string} trBgColor - Transaction background color Example: FFFFFFF
 * @property {string} expmonth - Expiration month Example: 08
 * @property {string} email - Email Example: john.doe@example.com
 * @property {string} address - Address Example: undefined
 * @property {string} sum - Sum Example: 200
 * @property {string} benid - Benid ,no relevant context
 * @property {string} recur_transaction - Recurring transaction Example: 4_approved
 * @property {string} template - Template Example: custom
 * @property {string} lang - Language Example: il @see {@link Languages}
 * @property {string} o_npay - No relevant context
 * @property {string} DclickTK - No relevant context
 * @property {string} trButtonColor - Transaction button color Example: aa0033
 * @property {string} bit_pay - Bit pay Example: 0
 * @property {string} buttonLabel - Button label Example: Pay
 * @property {string} contact - Contact Example: John Doe
 * @property {string} recur_start_date - Recurring start date Example: 2024-09-01
 * @property {string} currency - Currency Example: 1
 * @property {string} nologo - No logo Example: 1
 * @property {string} city - City Example: Test
 * @property {string} expyear - Expiration year Example: 28
 * @property {string} supplier - Supplier Example: myterminal
 * @property {string} trTextColor - Transaction text color Example: 000000
 * @property {string} country - Country Example: IL 
 * @property {string} o_cred_type - No relevant context
 * @property {string} ccard - No relevant context
 * @property {string} phone - Phone Example: 0000000000
 * @property {string} ccno - Credit card number Example: 1234
 * @property {string} IMaam - IMaam Example: 0 ,no relevant context
 * @property {string} tranmode - Transaction mode Example: AK or A123456
 * @property {string} ConfirmationCode - Confirmation code Example: 1234567
 * @property {string} index - Transaction index Example: 123456
 * @property {string} Responsesource - Responsesource Example: 1 ,no relevant context
 * @property {string} Responsecvv - Responsecvv Example: 0 ,no relevant context
 * @property {string} Responseid - Responseid Example: 0 ,no relevant context
 * @property {string} Tempref - Tempref Example: 12345678, no relevant context
 * @property {string} DBFIsForeign - DBFIsForeign Example: 0 ,no relevant context
 * @property {string} DBFcard - DBFcard Example: 2 ,no relevant context
 * @property {string} cardtype - Card type Example: 2 @see {@link CardTypes}
 * @property {string} DBFcardtype - DBFcardtype Example: 6 ,no relevant context
 * @property {string} cardissuer - Card issuer Example: 6 @see {@link CardIssuers}
 * @property {string} DBFsolek - DBFsolek Example: 1, ,no relevant context
 * @property {string} cardaquirer - Card acquirer Example: 1 @see {@link CardAcquirers}
 * @property {string} tz_parent - Tz parent Example: myterminal
 * @property {string} cred_type_shva - Cred type shva Example: 1, no relevant context
 * @example One Time {"Response":"000","o_tranmode":"AK","trBgColor":"FFFFFF","expmonth":"08","email":"john.doe@example.com","address":"undefined","sum":"200","benid":"","template":"custom","lang":"il","o_npay":"","trButtonColor":"aa0033","bit_pay":"0","buttonLabel":"Pay","contact":"John Doe","currency":"1","nologo":"1","city":"Test","expyear":"28","supplier":"myterminal","trTextColor":"000000","country":"","o_cred_type":"","ccard":"","phone":"undefined","IMaam":"0","tranmode":"AK","ConfirmationCode":"1234567","cardtype":"1","cardissuer":"1","cardaquirer":"1","index":"123456","Tempref":"12345678","TranzilaTK":"[CardToken]","ccno":""}
 * @example Recurring {"Response":"000","o_tranmode":"AK","expmonth":"08","trBgColor":"FFFFFF","email":"john.doe@example.com","address":"undefined","sum":"100","benid":"","recur_transaction":"4_approved","template":"custom","lang":"il","o_npay":"","DclickTK":"","trButtonColor":"aa0033","bit_pay":"0","buttonLabel":"Pay","contact":"John Doe","recur_start_date":"2024-09-01","currency":"1","nologo":"1","city":"Test","expyear":"28","supplier":"myterminal","trTextColor":"000000","country":"","o_cred_type":"","ccard":"","phone":"undefined","ccno":"1234","IMaam":"0","tranmode":"A123456","ConfirmationCode":"12345678","index":"123456","Responsesource":"1","Responsecvv":"0","Responseid":"0","Tempref":"12345678","DBFIsForeign":"0","DBFcard":"2","cardtype":"2","DBFcardtype":"6","cardissuer":"6","DBFsolek":"1","cardaquirer":"1","tz_parent":"myterminal","cred_type_shva":"1\n\n","u71":"1"}
 */
export type WebhookNotificationPayloadForCC = {
  /** Response code Example: 000 */
  Response: ShvaResponseCode;
  /** Transaction mode Example: AK */
  o_tranmode: string;
  /** Transaction background color Example: FFFFFFF */
  trBgColor: string;
  /** Expiration month Example: 08 */
  expmonth: string;
  /** Email Example: john.doe@example.com */
  email: string;
  /** Address Example: undefined */
  address?: string;
  /** Sum Example: 200 */
  sum: string;
  /** Benid ,no relevant context */
  benid: string;
  /** Recurring transaction Example: 4_approved */
  recur_transaction?: string;
  /** Template Example: custom */
  template?: string;
  /** Language Example: il */
  lang: Language;
  /** No relevant context */
  o_npay?: string;
  /** DclickTK Example: */
  DclickTK?: string;
  /** Transaction button color Example: aa0033 */
  trButtonColor: string;
  /** Bit pay Example: 0 */
  bit_pay: string;
  /** Button label Example: Pay */
  buttonLabel: string;
  /** Contact Example: John Doe */
  contact: string;
  /** Recurring start date Example: 2025-08-01 */
  recur_start_date?: string;
  /** Currency Example: 1 */
  currency: CurrencyCodeNumeric;
  /** No logo Example: 1 */
  nologo: string;
  /** City Example: Test */
  city: string;
  /** Expiration year Example: 28 */
  expyear: string;
  /** Supplier Example: myterminal */
  supplier: string;
  /** Transaction text color Example: 000000 */
  trTextColor: string;
  /** Country Example: IL */
  country: string;
  /** Cred type shva Example: 1 ,no relevant context */
  o_cred_type: string;
  /** Ccard, no relevant context */
  ccard: string;
  /** Phone Example: 0000000000 */
  phone: string;
  /** ccno Example: 1234 */
  ccno: string;
  /** IMaam, Example: 0, no relevant context */
  IMaam: string;
  /** Tranmode Example: AK or A123456 */
  tranmode: string;
  /** Confirmation code Example: 1234567 */
  ConfirmationCode: string;
  /** Transaction index Example: 123456 */
  index: string;
  /** Responsesource Example: 1, no relevant context */
  Responsesource: string;
  /** Responsecvv Example: 0, no relevant context */
  Responsecvv: string;
  /** Responseid Example: 0, no relevant context */
  Responseid: string;
  /** Tempref Example: 12345678, no relevant context */
  Tempref: string;
  /** DBFIsForeign Example: 0,no relevant context */
  DBFIsForeign: string;
  /** DBFcard Example: 2, no relevant context */
  DBFcard: string;
  /** Cardtype Example: 1 */
  cardtype: CardType;
  /** DBFcardtype Example: 1, no relevant context */
  DBFcardtype: string;
  /** Cardissuer Example: 1 */
  cardissuer: CardIssuer;
  /** DBFsolek Example: 1, no relevant context */
  DBFsolek: string;
  /** Cardaquirer Example: 1 */
  cardaquirer: CardAcquirer;
  /** Tz_parent Example: myterminal */
  tz_parent: string;
  /** Cred type shva Example: 1, no relevant context */
  cred_type_shva: string;
}

/**
 * Webhook notification payload for bit
 * @type {Object}WebhookNotificationPayloadForBit
 * @property {string} index - Transaction index Example: 123456
 * @property {string} ConfirmationCode - Confirmation code Example: 12345678
 * @property {string} notify_url - Notify url Example: https://mynotifyurl.com
 * @property {string} Response - Response Example: 000 @see {@link ShvaResponseCodes}
 * @property {string} processor_response_code - Processor response code Example: 000 @see {@link ShvaResponseCodes}
 * @property {string} supplier - Supplier Example: myterminal
 * @property {string} terminal_name - Terminal name Example: myterminal
 * @property {string} ccno - Credit card number Example: 123456******7891
 * @property {string} sum - Sum Example: 20000
 * @property {string} currency - Currency Example: ILS 
 * @property {string} expyear - Expiration year Example: 28
 * @property {string} expmonth - Expiration month Example: 08
 * @property {string} payment_method - Payment method Example: BIT
 * @property {string} bitTranzila - Bit Tranzila Example: 1
 * @property {string} contact - Contact Example: John Doe
 * @property {string} email - Email Example: john.doe@example.com
 * @property {string} city - City Example: Test
 * @property {string} phone - Phone Example: 0000000000
 * @property {string} json_purchase_data2 - Json purchase data Example: [{"product_name":"Product1","product_quantity":null,"product_price":200,"product_type":null}]
 * @example {"index":"123456","ConfirmationCode":"12345678","notify_url":"https://mynotifyurl.com","Response":"000","processor_response_code":"000","supplier":"myterminal","terminal_name":"myterminal","ccno":"123456******7891","sum":"20000","currency":"ILS","expyear":"28","expmonth":"08","bit":"bit","payment_method":"BIT","bitTranzila":"1","contact":"John Doe","email":"john.doe@example.com","city":"Test","json_purchase_data2":"[{"product_name":"Product1","product_quantity":null,"product_price":200,"product_type":null}]"}
 */
export type WebhookNotificationPayloadForBit = {
  /** Transaction index Example: 123456 */
  index: string;
  /** Confirmation code Example: 12345678 */
  ConfirmationCode: string;
  /** Notify url Example: https://mynotifyurl.com */
  notify_url: string;
  /** Response Example: 000 */
  Response: ShvaResponseCode;
  /** Processor response code Example: 000 */
  processor_response_code: string;
  /** Supplier Example: myterminal */
  supplier: string;
  /** Terminal name Example: myterminal */
  terminal_name: string;
  /** Credit card number Example: 1234 */
  ccno: string;
  /** Sum Example: 20000 */
  sum: string;
  /** Currency Example: ILS */
  currency: typeof CurrencyCodesAlpha.ILS;
  /** Expiration year Example: 28 */
  expyear: string;
  /** Expiration month Example: 08 */
  expmonth: string;
  /** Payment method Example: BIT */
  payment_method: "BIT";
  /** Bit Tranzila Example: 1 */
  bitTranzila: string;
  /** Contact Example: John Doe */
  contact: string;
  /** Email Example: john.doe@example.com */
  email: string;
  /** City Example: Test */
  city: string;
  /** Phone Example: 0000000000 */
  phone: string;
  /** Json purchase data Example: [{"product_name":"Product1","product_quantity":null,"product_price":200,"product_type":null}] */
  json_purchase_data2: ProductDetailsIFrameParams["json_purchase_data"]
}

type StringOperator = "equals" | "contains" | "starts_with" | "ends_with";
type NumberOperator = "<" | ">" | ">=" | "<=" | "=";

// Define interfaces for dfields and ufields
/**
 * Dfields = System defined fields
 * @type {Object} DField
 * @property {string} name - Name Example: transaction_date
 * @property {string} operator - Operator Example: equals
 * @property {number | string} value - Value Example: 2025-03-11
 */
export type DField = {
  name: string;
  operator: NumberOperator | StringOperator;
  value: number | string; // Assuming value can be number or string based on your context
}

/**
 * Ufields = User defined fields
 * @type {Object} UField
 * @property {string} name - Name Example: user_defined_1
 * @property {string} operator - Operator Example: equals
 * @property {number | string} value - Value Example: 1234567890
 */
export type UField = {
  name: string;
  operator: StringOperator | NumberOperator;
  value: number | string;
}

/**
 * Search transactions payload
 * @type {Object} SearchTransactionsPayload
 * @property {string} terminal_name - Terminal name Example: myterminal
 * @property {number} [transaction_index] - Transaction index Example: 123456
 * @property {string} [transaction_start_date] - Transaction start date Example: 2023-08-01
 * @property {string} [transaction_end_date] - Transaction end date Example: 2023-08-31
 * @property {Array} [dfields] - System defined fields Example: [ { "name": "transaction_date", "operator": "equals", "value": "2025-03-11" }, { "name": "credit_card_token", "operator": "equals", "value": "[CardToken]" }, { "name": "tranmode", "operator": "contains", "value": "A" } ]
 * @property {Array} [ufields] - User defined fields Example: [ { "name": "user_defined_1", "operator": "equals", "value": "1234567890" } ]
 * @property {number} [page] - Page Example: 2
 * @example { "terminal_name":"myterminal", "dfields":[ { "name": "transaction_date", "operator": "equals", "value": "2025-03-11" }, { "name": "credit_card_token", "operator": "equals", "value": "[CardToken]" }, { "name": "tranmode", "operator": "contains", "value": "A" } ] }
 * @example { "terminal_name":"myterminal", "transaction_index":123456 }
 */
export type SearchTransactionsPayload = {
  terminal_name: string;
  transaction_index?: number;
  /** Conditionally Required Example: 2023-08-01 Match pattern: ^\d{4}-\d{2}-\d{2}$ */
  transaction_start_date?: string;
  /** Conditionally Required Example: 2023-08-31 Match pattern: ^\d{4}-\d{2}-\d{2}$ */
  transaction_end_date?: string;
  /** Dfields = System defined fields */
  dfields?: DField[];
  /** Ufields = User defined fields */
  ufields?: UField[];
  /** When using dates range method, the maximum number of rows returned is 1000. If a certain dates range contains more than 1000 transactions, it is possible to add the “page” property to allow pagination, in order to get the next 1000 rows. Example: 2 */
  page?: number;
}
/**
 * @example 
 */
// export type GetTransactionPayload = {
//   terminal_name: string;
//   transaction_index?: number;
//   /** Conditionally Required Example: 2023-08-01 Match pattern: ^\d{4}-\d{2}-\d{2}$ */
//   transaction_start_date?: string;
//   /** Conditionally Required Example: 2023-08-31 Match pattern: ^\d{4}-\d{2}-\d{2}$ */
//   transaction_end_date?: string;
//   /** When using dates range method, the maximum number of rows returned is 1000. If a certain dates range contains more than 1000 transactions, it is possible to add the “page” property to allow pagination, in order to get the next 1000 rows. Example: 2 */
//   page?: number;
// }

/**
 * Transaction
 * @type {Object} Transaction
 * @property {string} index - Transaction index Example: 123456
 * @property {string} transaction_date - Transaction date Example: 2025-03-11
 * @property {string} transaction_time - Transaction time Example: 23:07:21
 * @property {string} amount - Amount Example: 200
 * @property {string} credit_card_token - Credit card token Example: [CardToken]
 * @property {string} expiration_month - Expiration month Example: 08
 * @property {string} expiration_year - Expiration year Example: 28
 * @property {string} credit_card_owner_id - Credit card owner id Example: 1234567890
 * @property {string} card_type - Card type Example: 6 @see {@link CardAcquirer}
 * @property {string} card_description - Card description Example: MAX VISA
 * @property {string} card_brand - Card brand Example: 2 @see {@link CardTypes}
 * @property {string} clearing_processor - Clearing processor Example: 1, no relevant context
 * @property {string} is_foreign - Is foreign Example: 0, no relevant context
 * @property {string} authorization_number - Authorization number Example: 1234567, no relevant context
 * @property {string} bank - Bank Example: 11
 * @property {string} bank_branch - Bank branch Example: 123
 * @property {string} bank_account - Bank account Example: 1234567890
 * @property {string} payment_plan - Payment plan Example: 1
 * @property {string} currency - Currency Example: 1 @see {@link CurrencyCodesNumeric}
 * @property {string} number_of_payments - Number of payments Example: 0
 * @property {string} first_payment_amount - First payment amount Example: 0
 * @property {string} other_payment_amount - Other payment amount Example: 0
 * @property {string} host_ip - Host ip Example: 127.0.0.1
 * @property {string} processor_response_code - Processor response code Example: 000 @see {@link ShvaResponseCodes}
 * @property {string} tranmode - Transaction mode Example: A123456
 * @property {string} refnr - Reference number Example: 12345678, no relevant context
 * @property {string} tempref - Tempref Example: 12345678, no relevant context
 * @property {string} cavv - Cavv, no relevant context
 * @property {string} eci - Eci, no relevant context
 * @property {string} child_terminal - Child terminal Example: myterminal
 * @property {string} uid - Uid, no relevant context
 * @property {string} transtatus - Transaction status Example: 1, no relevant context
 * @property {string} telauthability - Telauthability Example: 1, no relevant context
 * @property {string} txnfdid - Txnfdid Example: 12345, no relevant context
 * @property {string} cancelfdid - Cancelfdid Example: 1234567890, no relevant context
 * @property {string} txnfdnumber - Txnfdnumber Example: 1234567, no relevant context
 * @property {string} cancelfdnumber - Cancelfdnumber Example: 1234567890, no relevant context
 * @property {string} txn_payment_method - Txn payment method Example: CC, no relevant context
 * @property {string} txn_type - Txn type Example: DEBIT or DIRECT_DEBIT
 * @property {string} pan_entry_mode - Pan entry mode Example: 50, no relevant context
 * @property {string} shopify_id - Shopify id, no relevant context
 * @property {string} processor - Processor Example: SHVA, no relevant context
 * @property {string} broker - Broker, no relevant context
 * @property {string} broker_product - Broker product, no relevant context
 * @property {string} user_defined_1 - User defined 1 
 * @property {string} user_defined_2 - User defined 2 
 * @property {string} user_defined_3 - User defined 3 
 * @property {string} user_defined_4 - User defined 4 
 * @property {string} user_defined_5 - User defined 5 
 * @property {string} user_defined_6 - User defined 6 
 * @property {string} user_defined_7 - User defined 7 
 * @property {string} user_defined_8 - User defined 8  
 * @property {string} user_defined_9 - User defined 9 
 * @property {string} user_defined_10 - User defined 10 
 * @property {string} user_defined_11 - User defined 11 
 * @property {string} user_defined_12 - User defined 12 
 * @property {string} user_defined_13 - User defined 13  
 * @property {string} user_defined_14 - User defined 14  
 * @property {string} user_defined_15 - User defined 15 
 * @property {string} user_defined_16 - User defined 16 
 * @property {string} user_defined_17 - User defined 17   
 * @property {string} user_defined_18 - User defined 18 
 * @property {string} user_defined_19 - User defined 19 
 * @property {string} user_defined_20 - User defined 20 
 */
export type Transaction = {
  /** Transaction index Example: 123456 */
  index: string
  /** Transaction date Example: 2025-03-11 */
  transaction_date: string;
  /** Transaction time Example: 23:07:21 */
  transaction_time: string;
  /** Amount Example: 200 */
  amount: string;
  /** Credit card token Example: [CardToken] */
  credit_card_token: string;
  /** Expiration month Example: 08 */
  expiration_month: string
  /** Expiration year Example: 28 */
  expiration_year: string
  /** Credit card owner id Example: 1234567890 */
  credit_card_owner_id: string
  /** Card type Example: 6 */
  card_type: CardAcquirer
  /** Card description Example: MAX VISA */
  card_description: string
  /** Card brand Example: 2 */
  card_brand: CardType
  /** Clearing processor Example: 1, no relevant context */
  clearing_processor: string,
  /** Is foreign Example: 0, no relevant context */
  is_foreign: string
  /** Authorization number Example: 1234567, no relevant context */
  authorization_number: string;
  /** Bank Example: 11 */
  bank: string
  /** Bank branch Example: 123 */
  bank_branch: string
  /** Bank account Example: 1234567890 */
  bank_account: string
  /** Payment plan Example: 1 */
  payment_plan: string
  /** Currency Example: 1 */
  currency: CurrencyCodeNumeric
  /** Number of payments Example: 0 */
  number_of_payments: string;
  /** First payment amount Example: 0 */
  first_payment_amount: string;
  /** Other payment amount Example: 0 */
  other_payment_amount: string;
  /** Host ip Example: 127.0.0.1 */
  host_ip: string
  /** Processor response code Example: 000 */
  processor_response_code: ShvaResponseCode;
  /** Transaction mode Example: A123456 */
  tranmode: string
  /** Reference number Example: 12345678, no relevant context */
  refnr: string
  /** Tempref Example: 12345678, no relevant context */
  tempref: string
  /** Cavv Example: 1234567890, no relevant context */
  cavv: string
  /** Eci Example: 1234567890, no relevant context */
  eci: string
  /** Child terminal Example: myterminal */
  child_terminal: string
  /** Uid Example: 1234567890, no relevant context */
  uid: string
  /** Transaction status Example: 1, no relevant context */
  transtatus: string
  /** Telauthability Example: 1, no relevant context */
  telauthability: string
  /** Txnfdid Example: 12345, no relevant context */
  txnfdid: string
  /** Cancelfdid Example: 1234567890, no relevant context */
  cancelfdid: string
  /** Txnfdnumber Example: 1234567, no relevant context */
  txnfdnumber: string
  /** Cancelfdnumber Example: 1234567890, no relevant context */
  cancelfdnumber: string
  /** Txn payment method Example: CC, no relevant context */
  txn_payment_method: string
  /** Txn type Example: DEBIT or DIRECT_DEBIT */
  txn_type: string
  /** Pan entry mode Example: 50, no relevant context */
  pan_entry_mode: string
  /** Shopify id Example: 1234567890, no relevant context */
  shopify_id: string
  /** Processor Example: SHVA, no relevant context */
  processor: string
  /** Broker, no relevant context */
  broker: string
  /** Broker product, no relevant context */
  broker_product: string
  /** User defined 1 */
  user_defined_1: string;
  /** User defined 2 */
  user_defined_2: string;
  /** User defined 3 */
  user_defined_3: string;
  /** User defined 4 */
  user_defined_4: string;
  /** User defined 5 */
  user_defined_5: string;
  /** User defined 6 */
  user_defined_6: string;
  /** User defined 7 */
  user_defined_7: string;
  /** User defined 8 */
  user_defined_8: string;
  /** User defined 9 */
  user_defined_9: string;
  /** User defined 10 */
  user_defined_10: string;
  /** User defined 11 */
  user_defined_11: string;
  /** User defined 12 */
  user_defined_12: string;
  /** User defined 13 */
  user_defined_13: string;
  /** User defined 14 */
  user_defined_14: string;
  /** User defined 15 */
  user_defined_15: string;
  /** User defined 16 */
  user_defined_16: string;
  /** User defined 17 */
  user_defined_17: string;
  /** User defined 18 */
  user_defined_18: string;
  /** User defined 19 */
  user_defined_19: string;
  /** User defined 20 */
  user_defined_20: string;
}

/**
 * Search transactions response
 * @type {Object} SearchTransactionsResponse
 * @property {number} error_code - Error code Example: 0
 * @property {string} error_message - Error message Example: Success
 * @property {Array} transactions - Transactions Example: Transaction[] @see {@link Transaction}
 * @property {number} total - Total Example: 1
 * @property {number} rows - Rows Example: 1
 * @example 
 * ```json
 * { "transactions": [ { "index": "123456", "transaction_date": "2025-03-11", "transaction_time": "23:07:21", "amount": "200", "credit_card_token": "[CardToken]", "expiration_month": "08", "expiration_year": "28", "credit_card_owner_id": "", "card_type": "6", "card_description": "MAX VISA", "card_brand": "2", "clearing_processor": "1", "is_foreign": "0", "authorization_number": "1234567", "bank": "", "bank_branch": "", "bank_account": "", "payment_plan": "1", "currency": "1", "number_of_payments": "0", "first_payment_amount": "0", "other_payment_amount": "0", "host_ip": "127.0.0.1", "processor_response_code": "000", "tranmode": "A123456", "refnr": "12345678", "tempref": "12345678", "cavv": "", "eci": "", "child_terminal": "myterminal", "uid": "123456789", "transtatus": "1", "telauthability": "1", "txnfdid": "12345", "cancelfdid": "", "txnfdnumber": "1234567", "cancelfdnumber": "", "txn_payment_method": "CC", "txn_type": "DEBIT", "pan_entry_mode": "50", "shopify_id": "", "processor": "SHVA", "broker": "", "broker_product": "", "user_defined_1": "", "user_defined_2": "", "user_defined_3": "", "user_defined_4": "", "user_defined_5": "", "user_defined_6": "", "user_defined_7": "", "user_defined_8": "", "user_defined_9": "", "user_defined_10": "", "user_defined_11": "", "user_defined_12": "", "user_defined_13": "", "user_defined_14": "", "user_defined_15": "", "user_defined_16": "", "user_defined_17": "", "user_defined_18": "", "user_defined_19": "", "user_defined_20": "" } ], "total": 1, "rows": 1 }
 * ```
*/
export type SearchTransactionsResponse = {
  error?: number;
  mismatch_info?: any;
  rows?: number
  total: number
  transactions?: Transaction[]
}

