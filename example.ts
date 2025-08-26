// Example usage of the Contabull SDK
import { Contabull, Currency, TransferMethod, BeneficiaryAccountType, CustomerType } from "./src"

async function main() {
  // Initialize the SDK
  const contabull = new Contabull({
    baseUrl: "https://api.contabull.com",
    apiKey: "sk_your_api_key_here",
    privateKey: "your_private_key_here"
  });

  try {
    console.log("🚀 Testing Contabull SDK...\n");

    // 1. Test authorization
    console.log("1. Testing authorization...");
    const authResult = await contabull.authorization.try();
    console.log("✅ Authorization:", authResult.message);

    // 2. Get all accounts
    console.log("\n2. Getting all accounts...");
    const accounts = await contabull.accounts.getAll();
    console.log("✅ Accounts:", accounts);
    
    // Use the first account for examples (if available)
    const accountId = accounts[0]?.id || "your_account_id_here";

    // 3. Get bank institutions
    console.log("\n3. Getting bank institutions...");
    const bankInstitutions = await contabull.bankInstitution.getAll({
      page: 1,
      totalPerPage: 10
    });
    console.log("✅ Bank institutions:", bankInstitutions);

    // 4. Create a charge
    console.log("\n4. Creating a charge...");
    const newCharge = await contabull.charges.create({
      accountId: accountId,
      amountCents: 10000, // R$ 100.00
      currency: Currency.BRL,
      methods: ["pix", "boleto"],
      customer: {
        name: "João da Silva",
        document: "12345678901",
        type: "individual",
        address: {
          street: "Rua das Flores",
          number: "123",
          postalCode: "01234-567",
          neighborhood: "Centro",
          city: "São Paulo",
          countryCode: "BR",
          state: "SP"
        }
      },
      externalId: "order_12345",
      dueAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    });
    console.log("✅ Created charge:", newCharge);

    // 5. Get all charges
    console.log("\n5. Getting all charges...");
    const charges = await contabull.charges.getAll({
      page: 1,
      account: accountId,
      status: "ALL"
    });
    console.log("✅ Charges:", charges);

    // 6. Get customers
    console.log("\n6. Getting customers...");
    const customers = await contabull.customers.getAll({
      page: 1,
      type: CustomerType.INDIVIDUAL
    });
    console.log("✅ Customers:", customers);

    // 7. Get transactions
    console.log("\n7. Getting transactions...");
    const transactions = await contabull.transactions.getAll({
      page: 1,
      accountId: accountId,
      status: "all",
      type: "all"
    });
    console.log("✅ Transactions:", transactions);

    // 8. Prepare a PIX transfer
    console.log("\n8. Preparing a PIX transfer...");
    const transferPreparation = await contabull.transfers.prepare({
      accountId: accountId,
      method: TransferMethod.PIX_KEY,
      pixKey: "joao@example.com"
    });
    console.log("✅ Transfer prepared:", transferPreparation);

    // 9. Crypto wallet operations
    console.log("\n9. Getting crypto wallets...");
    const wallets = await contabull.crypto.listWallets();
    console.log("✅ Crypto wallets:", wallets);

    // 10. Get crypto products
    console.log("\n10. Getting crypto products...");
    const cryptoProducts = await contabull.crypto.getProducts();
    console.log("✅ Crypto products:", cryptoProducts);

    console.log("\n🎉 All examples completed successfully!");

  } catch (error) {
    console.error("❌ Error:", error);
    
    // Handle specific error types
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
  }
}

// Run the examples
main().catch(console.error);

