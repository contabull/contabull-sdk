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
    "label": "My Company Celcoin Account",
    "balance": {
      "availableBalance": 6000,
      "pendingBalance": 1000
    },
    "bankProvider": "celcoin",
    "number": "1234567890"
  }
]
```

While using the SDK, most of the time you'll have to pass an `account` in query parameters or in the body. The `account` corresponds to the bank account `number`, like shown in the above response example.

You can also find this bank account number in your accounts page of the Contabull's dashboard.

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
- `account` : **string** corresponding to the bank account number
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

```typescript
// const contabull = new Contabull({ ... });

await contabull.charges.create({ ... });
```

### Cancel charge

```typescript
// const contabull = new Contabull({ ... });

await contabull.charges.cancel("crg_...");
```

### Download charge

You can download the charge's PDF using our API.

```typescript
// const contabull = new Contabull({ ... });

const id = "crg_...";

const buffer = await contabull.charges.downloadPdfAsBuffer(id);

fs.writeFileSync(`${id}.pdf`, buffer as any); // save it locally
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

## Transactions

Access and manage your transactions using our API.

### Get all transactions

You can list your transactions using this method. This method returns paginated transactions by batch of 100 rows.

#### Request parameters

- `page` : a **number** corresponding to the current page you're fetching
- `account` : **string** corresponding to the bank account number
- `status` : refer to its type,
- `type` : refer to its type,
- `from` _(optional)_ : from the **date** you want to fetch transactions
- `to` _(optional)_ : to the **date** you want to fetch transactions
- `customer` _(optional)_ : a **string** corresponding to the customer's ID

```typescript
// const contabull = new Contabull({ ... });

await contabull.transactions.getAll({ ...your filters... });
```
