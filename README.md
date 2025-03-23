# Contabull SDK

This is the official SDK for using our Contabull Public API.

## Client Options

- `privateKey` : the private key generated with your public key
- `apiKey` : a secret key we've generated while creating your application in the Contabull's dashboard
- `baseUrl` **(optional)** : `api.contabull.com` by default
- `timeout` **(optional)** : `10000`ms by default

To start working with our SDK, you've to instantiate it first.

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

The response must be like :

```json
{ "message": "Hello World, it's all good. 🚀" }
```

## Accounts

Access and manage your accounts using the SDK.

### Get all accounts

```typescript
// const contabull = new Contabull({ ... });

await contabull.accounts.getAll();
```

The response must be like :

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

Most of the time you'll be using the SDK you'll have to pass an `account` in query parameters or in the body. The `account` corresponds to the bank account `number`, like shown in the above response example.

You can also find this bank account number in your Contabull's dashboard.

## Charges

Access and manage your charges using the SDK.

### Get charge

Get the details of charge. You can retrieve the boleto bar code or the PIX information using this method.

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

## Transactions

Access and manage your transactions using our API.

### Get all transactions

You can list your transactions using this method. This method is paginated.

Filter the results by using `from`, `to`, `status`, `type`, `page`. All of them are properly typed.

```typescript
// const contabull = new Contabull({ ... });

await contabull.transactions.getAll({ ...your filters... });
```
