# Contabull SDK

This is the official SDK for using our Contabull Public API.

## Client Configuration

- `privateKey` : the private key generated with your public key
- `apiKey` : a secret key we've generated while creating your application in the Contabull's dashboard
- `baseUrl` _(optional)_ : `api.contabull.com` by default
- `timeout` _(optional)_ : `10000`ms by default

To start using our SDK, you've to instantiate it first.

```typescript
const contabull = new Contabull({
  apiKey: 'sk...',
  privateKey: '...',
  baseUrl: 'https://api.contabull.com'
  timeout: 10000,
});
```

## Authorization

If you want to make sure you're all set for using our SDK, the best way is checking your authorization.

```typescript
// const contabull = new Contabull({ ... });

await contabull.authorization.try();
```

#### Response Payload

```json
{ "message": "Hello World, it's all good. 🚀" }
```

Now you can use the SDK as your convenience.

```md
# Important

You've to enable resources your application can access and manage in your application's page within the Contabull's dashboard.
```

## Accounts

Access and manage your accounts using the SDK.

### Get all accounts

```typescript
// const contabull = new Contabull({ ... });

await contabull.accounts.getAll();
```

#### Response payload :

```json
[
  {
    "id": "ald23mvczlp150fdelk4",
    "label": "My Company Celcoin Account",
    "balance": {
      "availableBalance": 6000,
      "pendingBalance": 1000
    },
    "bankProvider": "celcoin",
    "number": "1234567890",
    "ispb": "12345669",
    "agency": "0001"
  }
]
```

While using the SDK, most of the time you'll have to pass an `account` in query parameters or in the body. The `account` corresponds to the bank account `id`, like shown in the above response example.

## Bank Institutions

Access and manage bank institutions information using the SDK.

### Get all bank institutions

You can list bank institutions using this method. This method returns paginated bank institutions by batch of 50 rows by default.

#### Request parameters

- `page` : a **number** corresponding to the current page you're fetching
- `query` _(optional)_ : **string** for search term, you can search by bank name, ISPB, or COMPE code
- `totalPerPage` _(optional)_ : **number** (default: 50) number of results per page

```typescript
// const contabull = new Contabull({ ... });

await contabull.bankInstitutions.getAll({
  page: 1,
  query: "Banco do Brasil", // optional
  totalPerPage: 50 // optional
});
```

#### Response payload :

```json
{
  "bankInstitutions": [
    {
      "id": "bank_id_123",
      "name": "Banco do Brasil S.A.",
      "ispb": "00000000",
      "compe": "001",
      "indexationNumber": 1
    }
  ],
  "total": 150,
  "totalPages": 3,
  "currentPage": 1,
  "hasMore": true
}
```

### Search bank institutions

Search for specific bank institutions using this method.

#### Request parameters

- `page` : a **number** corresponding to the current page you're fetching
- `query` _(optional)_ : **string** for search term
- `totalPerPage` _(optional)_ : **number** (default: 50) number of results per page

```typescript
// const contabull = new Contabull({ ... });

await contabull.bankInstitutions.search({
  page: 1,
  query: "Celcoin"
});
```

## Charges

Access and manage your charges using the SDK.

### Get all charges

You can list your charges using this method. This method returns paginated charges by batch of 100 rows.

```md
# Important

If you're looking for detailed information like the boleto bar code or the PIX, you must have to get a specific charge.
```

#### Request parameters

- `page` : a **number** corresponding to the current page you're fetching
- `account` : **string** corresponding to the bank account ID
- `status` : refer to its type
- `query` _(optional)_ : **string** for search term, you can search by charge's ID, customer's ID, customer name, customer document (cpf, cnpj, ...) and transaction ID
- `from` _(optional)_ : from the **date** you want to fetch charges (on their created date basis)
- `to` _(optional)_ : to the **date** you want to fetch charges (on their created date basis)

```typescript
// const contabull = new Contabull({ ... });

await contabull.charges.getAll({ ...your filters... });
```

### Get charge

Get the details of charge like the boleto bar code or the PIX information using this method.

```typescript
// const contabull = new Contabull({ ... });

await contabull.charges.getOne("crg_...");
```

### Create charge

Create a new charge with support for boleto and/or PIX payment methods.

#### Request parameters

- `accountId` : **string** corresponding to the bank account ID
- `amountCents` : **number** amount in cents (positive value)
- `currency` : **Currency** enum value (e.g., BRL)
- `methods` : **array** of payment methods (`["boleto", "pix"]` or just one)
- `customer` : **object** with customer information
  - `name` : **string** customer's full name
  - `document` : **string** customer's CPF or CNPJ
  - `type` : **"individual" | "company"**
  - `address` _(optional)_ : **object** with address details
- `externalId` _(optional)_ : **string** your internal reference ID
- `sourceKey` _(optional)_ : **string** source key for the charge
- `taxes` _(optional)_ : **object** with tax configuration
  - `fine` _(optional)_ : **number** fine percentage
  - `interest` _(optional)_ : **number** interest percentage
- `dueAt` _(optional)_ : **string** due date (ISO format)
- `expiredAt` _(optional)_ : **string** expiration date (ISO format)

```typescript
// const contabull = new Contabull({ ... });

await contabull.charges.create({
  accountId: "acc_123",
  amountCents: 10000, // R$ 100.00
  currency: Currency.BRL,
  methods: ["boleto", "pix"],
  customer: {
    name: "João Silva",
    document: "12345678901",
    type: "individual",
    address: {
      street: "Rua das Flores",
      number: "123",
      postalCode: "01234-567",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      countryCode: "BR",
      state: "SP"
    }
  },
  externalId: "order_123",
  taxes: {
    fine: 2.0, // 2% fine
    interest: 1.0 // 1% monthly interest
  },
  dueAt: "2024-12-31T23:59:59Z",
  expiredAt: "2025-01-31T23:59:59Z"
});
```

#### Response payload :

```json
{
  "id": "crg_123abc456def",
  "boleto": {
    "success": true,
    "status": "pending"
  },
  "pix": {
    "success": true,
    "emv": "00020126580014br.gov.bcb.pix...",
    "status": "pending"
  }
}
```

### Cancel charge

```typescript
// const contabull = new Contabull({ ... });

await contabull.charges.cancel("crg_...");
```

### Download charge

You can download the charge's PDF using our API.

#### Request parameters

- `id` : **string** corresponding to the charge ID
- `language` _(optional)_ : **AvailableLanguages** enum value (default: `pt`)

```typescript
// const contabull = new Contabull({ ... });

// Download with default language (Portuguese)
const buffer = await contabull.charges.downloadPdfAsBuffer({
  id: "crg_..."
});

// Download with specific language
const buffer = await contabull.charges.downloadPdfAsBuffer({
  id: "crg_...",
  language: AvailableLanguages.en
});

fs.writeFileSync(`charge.pdf`, buffer as any); // save it locally
```

## Customers

Access and manage your customers using our API.

### Get all customers

You can list your customers using this method. This method returns paginated customers by batch of 100 rows.

#### Request parameters

- `page` : a **number** corresponding to the current page you're fetching
- `type` : refer to its type
- `isBeneficiary` _(optional)_ : **boolean** to either fetch beneficiaries or not
- `query` _(optional)_ : **string** for search term, you can search by customer ID, name, email and document (cpf, cpnj, ...)

```typescript
// const contabull = new Contabull({ ... });

await contabull.transactions.getAll({ ...your filters... });
```

### Get one customer

You can access to a specific customer using this method. This method returns customer datas.

#### Request parameters

- `id` : a **string** corresponding to the customer identifier

```typescript
// const contabull = new Contabull({ ... });

await contabull.customers.getOne(id);
```

#### Response payload :

```json
{
  "customer": {
    "id": "cus_123abc456def",
    "name": "João Silva",
    "email": "joao.silva@example.com",
    "document": "12345678901",
    "type": "INDIVIDUAL",
    "isBeneficiary": false,
    "addressStreet": "Rua das Flores",
    "addressNumber": "123",
    "addressNeighborhood": "Centro",
    "addressCity": "São Paulo",
    "addressState": "SP",
    "addressPostalCode": "01234-567",
    "addressCountryCode": "BR",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Crypto

Access and manage crypto trading operations using the SDK.

### Wallet Management

#### Create a crypto wallet

Create a new crypto wallet for storing digital assets.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.createWallet({
  name: "My Wallet",
  symbol: CryptoSymbol.USDT,
  network: CryptoNetwork.bitcoin,
  address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
});
```

#### Response payload :

```json
{
  "id": "wallet_123abc456def",
  "name": "My Wallet",
  "symbol": "USDT",
  "network": "bitcoin",
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

#### List all crypto wallets

Get a list of all your crypto wallets.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.listWallets();
```

#### Response payload :

```json
[
  {
    "walletId": "wallet_123abc456def",
    "active": true,
    "name": "My BTC Wallet",
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "symbol": "BTC",
    "network": "bitcoin",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Trading Operations

#### Get available crypto products

Get a list of available crypto products for trading.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.getProducts();
```

#### Get a trading quote

Get a price quote for crypto trading.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.getQuote({
  symbol: CryptoSymbol.BTC,
  settlement: CryptoOtcSettlementSchedule.T0
});
```

#### Response payload :

```json
{
  "quoteId": "quote_123abc456def",
  "symbol": "BTC",
  "settlement": "T0",
  "price": 45000.50,
  "expireAtUnix": 1640995200
}
```

#### Execute a crypto trade

Execute a trade order using a quote.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.executeOrder({
  quoteId: "quote_123abc456def",
  cost: 1000, // Either cost or quantity, not both
  accountId: "acc_123",
  walletId: "wallet_123abc456def"
});
```

#### Response payload :

```json
{
  "cryptoTransactionId": "ctx_123abc456def",
  "quantity": 0.02222222,
  "cost": 1000,
  "price": 45000.50,
  "network": "bitcoin",
  "symbol": "BTC",
  "currency": "USD",
  "walletId": "wallet_123abc456def",
  "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "walletName": "My BTC Wallet",
  "settlementSchedule": "T0",
  "settlementDate": "2024-01-15T10:30:00Z"
}
```

#### Pay for a crypto transaction

Process payment for a crypto transaction.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.pay({
  accountId: "acc_123",
  amount: 1000
});
```

### Transaction Management

#### Get crypto transactions

List crypto transactions with optional filtering.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.getTransactions({
  symbol: CryptoSymbol.BTC, // optional
  status: CryptoOtcTransactionStatus.COMPLETED, // optional
  from: new Date("2024-01-01"), // optional
  to: new Date("2024-12-31"), // optional
  page: 1
});
```

#### Response payload :

```json
{
  "transactions": [
    {
      "transactionId": "ctx_123abc456def",
      "status": "COMPLETED",
      "quantity": 0.02222222,
      "cost": 1000,
      "price": 45000.50,
      "network": "bitcoin",
      "symbol": "BTC",
      "currency": "USD",
      "walletId": "wallet_123abc456def",
      "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "walletName": "My BTC Wallet",
      "settlementDate": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:31:00Z"
    }
  ],
  "total": 25,
  "totalPages": 3,
  "currentPage": 1,
  "hasMore": true
}
```

#### Get a specific crypto transaction

Get detailed information about a specific crypto transaction.

```typescript
// const contabull = new Contabull({ ... });

await contabull.crypto.getTransaction("ctx_123abc456def");
```

#### Response payload :

```json
{
  "transactionId": "ctx_123abc456def",
  "status": "COMPLETED",
  "quantity": 0.02222222,
  "cost": 1000,
  "price": 45000.50,
  "network": "bitcoin",
  "symbol": "BTC",
  "currency": "USD",
  "walletId": "wallet_123abc456def",
  "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "walletName": "My BTC Wallet",
  "settlementSchedule": "T0",
  "settlementDate": "2024-01-15T10:30:00Z",
  "debt": {
    "initial": 1000,
    "remaining": 0
  },
  "fills": [
    {
      "id": "fill_123abc456def",
      "amount": 1000,
      "hash": "abc123def456...",
      "filledAt": "2024-01-15T10:31:00Z"
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## Transactions

Access and manage your transactions using our API.

### Get all transactions

You can list your transactions using this method. This method returns paginated transactions by batch of 100 rows.

#### Request parameters

- `page` _(optional)_ : a **number** corresponding to the current page you're fetching (default: 1)
- `accountId` _(optional)_ : **string** corresponding to the bank account ID
- `customerId` _(optional)_ : **string** corresponding to the customer's ID
- `type` _(optional)_ : refer to its type (default: "all")
- `status` _(optional)_ : refer to its type (default: "all")
- `query` _(optional)_ : **string** for search term, you can search by transaction ID, customer name, etc.
- `from` _(optional)_ : from the **date** you want to fetch transactions
- `to` _(optional)_ : to the **date** you want to fetch transactions

```typescript
// const contabull = new Contabull({ ... });

await contabull.transactions.getAll({
  page: 1,
  accountId: "acc_123",
  customerId: "cus_456", // optional
  type: "inbound", // optional, default: "all"
  status: "succeeded", // optional, default: "all"
  query: "payment description", // optional
  from: new Date("2024-01-01"), // optional
  to: new Date("2024-12-31") // optional
});
```

#### Response payload :

```json
{
  "transactions": [
    {
      "id": "txn_123abc456def",
      "amountCents": 10000,
      "account": "acc_123",
      "customer": {
        "id": "cus_456",
        "name": "João Silva",
        "email": "joao@example.com",
        "cpfCnpj": "12345678901"
      },
      "payerName": "Maria Santos",
      "payerCpfCnpj": "98765432100",
      "description": "Payment for services",
      "e2eID": "E12345678202401011234567890",
      "status": "succeeded",
      "method": "pix",
      "type": "inbound",
      "currency": "BRL",
      "fees": 299,
      "disputed": false,
      "pixKey": "joao@example.com",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:31:00Z",
      "completedAt": "2024-01-15T10:31:00Z"
    }
  ],
  "total": 50,
  "totalPages": 5,
  "currentPage": 1,
  "hasMore": true
}
```
