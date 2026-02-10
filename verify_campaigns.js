
// Verification Script
import { addCampaignProduct, getCampaignProducts, removeCampaignProduct, setCampaignProducts } from './src/modules/campaigns.js';

console.log("--- Starting Verification ---");

// Reset for test
setCampaignProducts([]);
console.log("Cleared products. Count:", getCampaignProducts().length);

// Test String ID
console.log("Adding product ID '10' (string)...");
addCampaignProduct('10');
let products = getCampaignProducts();
console.log("Products:", products);
if (products.includes(10) && typeof products[0] === 'number') {
    console.log("PASS: Product '10' added as number 10.");
} else {
    console.error("FAIL: Product '10' not added correctly.");
}

// Test Duplicate
console.log("Adding product ID 10 (number) again...");
addCampaignProduct(10);
products = getCampaignProducts();
console.log("Products:", products);
if (products.length === 1) {
    console.log("PASS: Duplicate prevented.");
} else {
    console.error("FAIL: Duplicate added.");
}

// Test Remove String ID
console.log("Removing product ID '10' (string)...");
removeCampaignProduct('10');
products = getCampaignProducts();
console.log("Products:", products);
if (products.length === 0) {
    console.log("PASS: Product '10' removed.");
} else {
    console.error("FAIL: Product '10' not removed.");
}

console.log("--- Verification Complete ---");
