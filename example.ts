// Example usage of the SDK
import { Contabull } from "./src/sdk"

async function main() {
  // Initialize the SDK
  const sdk = new Contabull({
    baseUrl: "https://api.contabull.com",
    apiKey: "your-api-key",
    privateKey: 'your-private-key'
  });

  try {
    // Get all users
    const users = await sdk.users.getAll({ page: 1, limit: 10 })
    console.log("Users:", users)

    // Get a specific user
    const user = await sdk.users.getById("user-id")
    console.log("User:", user)

    // Create a new product
    const newProduct = await sdk.products.create({
      name: "New Product",
      description: "This is a new product",
      price: 99.99,
    })
    console.log("Created product:", newProduct)

    // Update a product
    const updatedProduct = await sdk.products.update("product-id", {
      price: 89.99,
    })
    console.log("Updated product:", updatedProduct)

    // Delete a product
    await sdk.products.delete("product-id")
    console.log("Product deleted successfully")

    // Make a custom request
    const customData = await sdk.request({
      method: "GET",
      url: "/custom-endpoint",
      params: { foo: "bar" },
    })
    console.log("Custom data:", customData)
  } catch (error) {
    console.error("Error:", error)
  }
}

main()

