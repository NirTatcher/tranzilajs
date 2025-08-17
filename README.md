# TranzilaJS

A comprehensive TypeScript library for integrating with the Tranzila payment gateway API. Provides type-safe, well-documented methods for all major Tranzila payment operations.

> 📚 **Official Documentation**: For detailed API specifications and advanced features, refer to the [official Tranzila documentation](https://docs.tranzila.com/).

## Features

- 🚀 **Full TypeScript Support** - Complete type definitions and IntelliSense
- 💳 **Multiple Payment Methods** - Bit payments, credit cards, standing orders, and more
- 🔐 **Automatic Authentication** - Built-in header generation and HMAC signing
- 📱 **IFrame Integration** - Generate payment links for embedded payments
- 🔍 **Transaction Management** - Search, retrieve, and manage transactions
- 📊 **Standing Orders** - Create, update, and manage recurring payments
- 🧪 **Comprehensive Testing** - Full test suite with mocked responses
- 📚 **Rich Documentation** - JSDoc comments and usage examples

## 🆘 Need Help?

- **🐛 Found a bug?** [Open an issue](https://github.com/NirTatcher/tranzilajs/issues)
- **💡 Have a feature request?** [Create a feature request](https://github.com/NirTatcher/tranzilajs/issues/new?template=feature_request.md)
- **❓ Need support?** [Open an issue](https://github.com/NirTatcher/tranzilajs/issues/new) with the "question" label
- **📚 Official docs?** [Tranzila API Documentation](https://docs.tranzila.com/)

## Installation

```bash
npm install tranzilajs
```

## Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Tranzila Account**: Merchant account with terminal credentials
- **Terminal Credentials**: Terminal name, public key, and private key

### Basic Setup

```typescript
import { Tranzila } from 'tranzilajs';

// Initialize the client with your credentials
const tranzila = new Tranzila(
  'your-terminal-name',    // From your Tranzila dashboard
  'your-public-key',       // From your Tranzila dashboard
  'your-private-key'       // From your Tranzila dashboard
);
```

### Quick Start Example

```typescript
// Simple Bit payment initialization
const result = await tranzila.Bit.init({
  terminal_name: 'myterminal',        // Use your actual terminal name
  txn_currency_code: "ILS",
  txn_type: "debit",
  success_url: 'https://your-site.com/success',
  failure_url: 'https://your-site.com/failure',
  notify_url: 'https://your-site.com/notify',
  client: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  items: [{
    name: 'Product',
    type: "I",
    unit_price: 100,
    units_number: 1,
    currency_code: "ILS"
  }]
});

if (result.error_code === 0) {
  console.log('Payment URL:', result.sale_url);
  // Redirect user to result.sale_url for payment or render in an iframe
} else {
  console.error('Error:', result.message);
}
```

### JavaScript Usage

```javascript
const { Tranzila } = require('tranzilajs');

const tranzila = new Tranzila(
  'your-terminal-name',
  'your-public-key',
  'your-private-key'
);

// All methods work the same way
const result = await tranzila.Bit.init({...});
```

## API Reference

### Core Classes

#### `Tranzila`

Main client class for interacting with the Tranzila API.

**Constructor:**
```typescript
new Tranzila(terminalName: string, publicKey: string, privateKey: string)
```

**Properties:**
- `Bit` - Bit payment operations
- `IFrame` - IFrame payment generation
- `CreditCard` - Credit card operations
- `StandingOrders` - Standing order management
- `Transactions` - Transaction search and retrieval

## Bit Payments

### `Tranzila.Bit.init(payload: BitInitPayload): Promise<BitInitResponse>`

Initialize a new Bit payment.

**Example:**
```typescript
const payload: BitInitPayload = {
  terminal_name: 'your-terminal',
  txn_currency_code: "ILS",
  txn_type: "debit",
  success_url: 'https://your-site.com/success',
  failure_url: 'https://your-site.com/failure',
  notify_url: 'https://your-site.com/notify',
  client: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  items: [
    {
      code: "1",
      name: 'Product 1',
      type: "I", // Item
      unit_price: 100,
      units_number: 1,
      vat_percent: 0,
      currency_code: "ILS"
    }
  ]
};

const result = await tranzila.Bit.init(payload);

if (result.error_code === 0) {
  console.log('Bit payment initialized successfully:', result.message);
  console.log('Sale URL:', result.sale_url);
} else {
  console.error('Bit payment initialization failed:', result.message);
}
```

**API Response:**
```typescript
{
  "error_code": 0,
  "message": "Success",
  "sale_url": "https://live.payme.io/sale/generate/..."
}
```

**📖 Full example:** [`usage-examples/bit/init-payment.ts`](usage-examples/bit/init-payment.ts)

### `Tranzila.Bit.refund(payload: BitRefundPayload): Promise<BitRefundResponse>`

Refund a Bit payment.

**Example:**
```typescript
const payload: BitRefundPayload = {
  terminal_name: 'your-terminal',
  transaction_id: 12345,
  amount: 5 // Amount in cents (5.00 ILS)
};

const result = await tranzila.Bit.refund(payload);

if (result.error_code === 0) {
  console.log('Bit payment refunded successfully:', result.message);
} else {
  console.error('Bit payment refund failed:', result.message);
}
```

**API Response:**
```typescript
{
  "error_code": 0,
  "message": "Success",
  "transaction_result": {
    "processor_response_code": "000",
    "transaction_id": "123456",
    "refund_transaction_id": "123456",
    "amount": "500",
    "refund_amount": 5,
    "refund_type": "complete",
    "currency_code": "ILS",
    "card_locality": "domestic"
  }
}
```

**📖 Full example:** [`usage-examples/bit/refund-payment.ts`](usage-examples/bit/refund-payment.ts)

## Credit Card Operations

### `Tranzila.CreditCard.refund(payload: CardRefundPayload): Promise<CardRefundResponse>`

Refund a credit card payment.

**Example:**
```typescript
const payload: CardRefundPayload = {
  supplier: "myterminal",
  sum: 5, // Amount in cents (5.00 ILS)
  currency: 1,
  TranzilaTK: "1234567890",
  expdate: "0828",
  cred_type: 1, // 1 = Credit card
  TranzilaPW: "1234567890",
  CreditPass: "1234567890",
  tranmode: `C12345`,
  authnr: "00000000",
  contact: "John Doe",
  email: "john.doe@example.com",
  phone: "0000000000"
};

const result = await tranzila.CreditCard.refund(payload);

if (result.includes("Response=000")) {
  console.log('Credit card payment refunded successfully:', result);
} else {
  console.error('Credit card payment refund failed:', result);
}
```

**API Response:**
```
Response=000&TranzilaTK=1234567890&contact=John Doe&phone=0000000000&email=john.doe@example.com&currency=1&cred_type=1&DclickTK=&supplier=myterminal&authnr=1234567&expdate=0828&tranmode=C123456&sum=1&ConfirmationCode=123456&index=123456&Responsesource=1&Responsecvv=0&Responseid=0&Tempref=123456789&DBFIsForeign=0&DBFcard=2&cardtype=2&DBFcardtype=6&cardissuer=6&DBFsolek=1&cardaquirer=1&tz_parent=myterminal&cred_type_shva=1
```

**📖 Full example:** [`usage-examples/credit-card/refund-payment.ts`](usage-examples/credit-card/refund-payment.ts)

## IFrame Integration

### `Tranzila.IFrame.generateLink(path: string, params: Partial<IFrameParams>): Promise<string>`

Generate a payment link for embedded payment forms.

**Example:**
```typescript
const payload: Partial<IFrameParams> = {
  sum: "1",
  cred_type: 1,
  currency: 1,
  tranmode: "AK",
  success_url_address: "https://example.com/success",
  fail_url_address: "https://example.com/fail",
  notify_url_address: "https://example.com/notify",
  email: "john.doe@example.com",
  phone: "0000000000"
};

const result = await tranzila.IFrame.generateLink("iframenew.php", payload);
// Returns: https://direct.tranzila.com/myterminal/iframenew.php?sum=1&cred_type=1&currency=1&tranmode=AK&success_url_address=https%3A%2F%2Fexample.com%2Fsuccess&fail_url_address=https%3A%2F%2Fexample.com%2Ffail&notify_url_address=https%3A%2F%2Fexample.com%2Fnotify&email=john.doe%40example.com&phone=0000000000
```

**📖 Full example:** [`usage-examples/iframe/generate-link.ts`](usage-examples/iframe/generate-link.ts)

## Standing Orders

### `Tranzila.StandingOrders.create(payload: CreateStandingOrderPayload): Promise<CreateStandingOrderResponse>`

Create a new standing order for recurring payments.

**Example:**
```typescript
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
      units_number: 1,
      unit_price: 5,
      price_currency: "ILS"
    }
  ],
  card: {
    token: "1231234567890",
    expire_month: 8,
    expire_year: 2028
  }
};

const result = await tranzila.StandingOrders.create(payload);

if (result.error_code == 0) {
  console.log('Standing order created successfully:', result.sto_id);
} else {
  console.error('Standing order creation failed:', result.message);
}
```

**API Response:**
```typescript
{
  "error_code": 0,
  "message": "Success",
  "sto_id": "123456"
}
```

**📖 Full example:** [`usage-examples/standing-orders/create-sto.ts`](usage-examples/standing-orders/create-sto.ts)

### `Tranzila.StandingOrders.retrieve(payload: RetreiveStandingOrdersPayload): Promise<RetreiveStandingOrdersResponse>`

Retrieve standing orders.

**Example:**
```typescript
const payload: RetreiveStandingOrdersPayload = {
  terminal_name: "your-terminal-name",
  sto_status: "active"
};

const result = await tranzila.StandingOrders.retrieve(payload);
```

**API Response:**
```typescript
{
  "stos": [
    {
      "sto_id": 123456,
      "terminal_name": "myterminal",
      "sto_payments_number": 9999,
      "charge_frequency": "monthly",
      "first_charge_date": "2025-08-14",
      "charge_dom": 1,
      "last_charge_date": null,
      "next_charge_date": "2025-09-01 00:00:00",
      "create_date": "2025-08-14 14:38:18",
      "sto_first_transaction_id": null,
      "sto_status": "active",
      "charge_amount": "5.0000",
      "card": {
        "token": "123456789",
        "expire_month": 8,
        "expire_year": 28
      },
      "client": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone_number": "0000000000"
      },
      "item": {
        "name": "Test Product",
        "unit_price": 5,
        "units_number": 1
      }
    }
  ]
}
```

**📖 Full example:** [`usage-examples/standing-orders/retrieve-sto.ts`](usage-examples/standing-orders/retrieve-sto.ts)

### `Tranzila.StandingOrders.update(payload: UpdateStandingOrderPayload): Promise<UpdateStandingOrderResponse>`

Update a standing order.

**Example:**
```typescript
const payload: UpdateStandingOrderPayload = {
  terminal_name: "myterminal",
  sto_id: 123456,
  sto_status: "inactive"
};

const result = await tranzila.StandingOrders.update(payload);
```
**API Response:**
```typescript
{
  "error_code": 0,
  "message": "Success"
}
```

**📖 Full example:** [`usage-examples/standing-orders/update-sto.ts`](usage-examples/standing-orders/update-sto.ts)

## Transaction Management

### `Tranzila.Transactions.search(payload: SearchTransactionsPayload): Promise<SearchTransactionsResponse>`

Search and retrieve transactions.

**Example:**
```typescript
// Search by date range
const payload: SearchTransactionsPayload = {
  terminal_name: "myterminal",
  transaction_start_date: "2025-01-01",
  transaction_end_date: "2025-01-02"
};

// Search by specific fields
const payload2: SearchTransactionsPayload = {
  terminal_name: "myterminal",
  dfields: [
    {
      name: "transaction_date",
      operator: "equals",
      value: "2025-03-11"
    },
    {
      name: "credit_card_token",
      operator: "equals",
      value: "1234567890"
    }
  ]
};

// Search by transaction index
const payload3: SearchTransactionsPayload = {
  terminal_name: "myterminal",
  transaction_index: 123456
};

const result = await tranzila.Transactions.search(payload);
```

**API Response:**
```typescript
{
  "transactions": [
    {
      "index": "123456",
      "transaction_date": "2025-01-01",
      "transaction_time": "09:23:02",
      "amount": "5500",
      "credit_card_token": "1234",
      "expiration_month": "08",
      "expiration_year": "27",
      "credit_card_owner_id": "1234567890",
      "card_type": "",
      "card_description": "",
      "card_brand": "2",
      "clearing_processor": "",
      "is_foreign": "0",
      "authorization_number": "012345",
      "bank": "",
      "bank_branch": "",
      "bank_account": "",
      "payment_plan": "1",
      "currency": "1",
      "number_of_payments": "0",
      "first_payment_amount": "0",
      "other_payment_amount": "0",
      "host_ip": "127.0.0.1",
      "processor_response_code": "000",
      "tranmode": "A",
      "refnr": "1234567890",
      "tempref": "",
      "cavv": "",
      "eci": "",
      "child_terminal": "myterminal",
      "uid": "",
      "transtatus": "1",
      "telauthability": "1",
      "txnfdid": "12345",
      "cancelfdid": "",
      "txnfdnumber": "123456",
      "cancelfdnumber": "",
      "txn_payment_method": "BIT",
      "txn_type": "DEBIT",
      "pan_entry_mode": "",
      "shopify_id": "",
      "processor": "PAYME",
      "broker": "",
      "broker_product": "",
      "user_defined_1": "",
      "user_defined_2": "",
      "user_defined_3": "",
      "user_defined_4": "",
      "user_defined_5": "",
      "user_defined_6": "",
      "user_defined_7": "",
      "user_defined_8": "",
      "user_defined_9": "",
      "user_defined_10": "",
      "user_defined_11": "",
      "user_defined_12": "",
      "user_defined_13": "",
      "user_defined_14": "",
      "user_defined_15": "",
      "user_defined_16": "",
      "user_defined_17": "",
      "user_defined_18": "",
      "user_defined_19": "",
      "user_defined_20": ""
    }
  ],
  "total": 1,
  "rows": 1
}
```

**📖 Full example:** [`usage-examples/transactions/search-transactions.ts`](usage-examples/transactions/search-transactions.ts)

## Callback Handling

When payments are completed, Tranzila sends POST requests to your configured URLs. These webhooks provide real-time updates about payment status and completion.

### When Callbacks Are Sent

- **Bit Payments**: After user completes payment on the Bit payment page
- **Credit Card Payments**: After successful/failed credit card processing
- **Standing Orders**: When recurring charges are processed

### Callback Types

- **Notify Callbacks** (`notify_url`): Real-time payment status updates sent to your server
- **Success Callbacks** (`success_url`): User redirected after successful payment
- **Failure Callbacks** (`failure_url`): User redirected after failed payment

### Implementing Callbacks

```typescript
// Example Express.js callback handler
app.post('/notify', (req, res) => {
  const callbackData = req.body;
  
  // Verify the callback is from Tranzila (check signatures, etc.)
  if (callbackData.Response === '000') {
    // Payment successful
    console.log('Payment completed:', callbackData);
    // Update your database, send confirmation emails, etc.
  } else {
    // Payment failed
    console.log('Payment failed:', callbackData);
    // Handle failure (refund, notify user, etc.)
  }
  
  res.status(200).send('OK');
});
```

### Example Callback Data

For complete callback examples and webhook data structures, see:

- **Bit Payment Notify**: [`usage-examples/callbacks/bit-notify-callback.json`](usage-examples/callbacks/bit-notify-callback.json)
- **Credit Card One Time Notify**: [`usage-examples/callbacks/card-notify-one-time-callback.example.json`](usage-examples/callbacks/card-notify-one-time-callback.example.json)
- **Credit Card Recurring Notify**: [`usage-examples/callbacks/card-notify-recurring-callback.example.json`](usage-examples/callbacks/card-notify-recurring-callback.example.json)
- **Bit Success**: [`usage-examples/callbacks/bit-success-callback.example.json`](usage-examples/callbacks/bit-success-callback.example.json)
- **Credit Card Success**: [`usage-examples/callbacks/card-success-callback.example.json`](usage-examples/callbacks/card-success-callback.example.json)



## Development

### Prerequisites

Before developing, ensure you have:
- **Node.js 18+** and **npm 8+** installed
- **Git** for version control
- **TypeScript** knowledge (recommended)

### Development Commands

#### Testing
```bash
npm test                    # Run all tests with Jest
npm test -- --watch        # Run tests in watch mode
npm test -- --testPathPattern=bit  # Run specific test files
```

#### Code Quality
```bash
npm run type-check         # TypeScript compilation check
npm run validate           # Full validation (type-check + test + build)
```

#### Building
```bash
npm run build             # Build package (CommonJS + ES Modules)
npm run clean             # Clean build artifacts
npm run package           # Create local package for testing
```

### Project Structure

```
tranzilajs/
├── src/                  # Source code
│   ├── __tests__/        # Test files
│   ├── constants.ts      # API constants
│   ├── index.ts          # Main exports
│   ├── tranzila.ts       # Core Tranzila class
│   └── types.ts          # TypeScript definitions
├── usage-examples/       # Working examples
├── scripts/              # Build and test scripts
└── .github/              # CI/CD workflows
```

### Common Issues & Solutions

#### TypeScript Errors
- Run `npm run type-check` to identify type issues
- Ensure all imports are correct
- Check that payload types match expected interfaces

#### Test Failures
- Verify mock responses match actual API responses
- Check that test data aligns with usage examples
- Run `npm test -- --verbose` for detailed output

#### Build Issues
- Clean build artifacts: `npm run clean`
- Check Node.js version compatibility
- Verify all dependencies are installed: `npm ci`

## Contributing

We welcome contributions! 

- **📖 Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md) - Complete guide for contributors
- **🐛 Report Issues**: [GitHub Issues](https://github.com/NirTatcher/tranzilajs/issues) - Bug reports and feature requests
- **💬 Questions**: [Open an issue](https://github.com/NirTcher/tranzilajs/issues/new) with "question" label for support
- **🔧 Development**: See the Development section above for local setup and testing

## Publishing

For information about the automated publishing process and CI/CD pipeline, see [PUBLISHING.md](PUBLISHING.md).

## License

MIT License - see [LICENSE](LICENSE) for details. 