# Razorpay Payment Gateway Integration – Documentation

## Overview

In this AI Image Generator project, Razorpay is used to handle credit purchasing securely.

- New users get 5 free credits by default.
- To buy more credits, users can choose from three plans: Basic, Advanced, and Business.
- The payment flow uses Razorpay Orders API and frontend checkout for secure transactions.
- After successful payment, credits are added to the user's account.



# Payment Flow Overview 
**The Razorpay integration follows a secure 3-step process:**

### 1. Order Creation (Backend)
When a user selects a plan, the frontend calls our `/pay-razor` API. The backend creates both a **transaction record** in our database and a **Razorpay order**, then sends the order details back to the frontend.

### 2. Payment Processing (Frontend)
The frontend receives the order details and opens the Razorpay checkout popup. The user completes the payment through Razorpay's secure interface.

### 3. Payment Verification (Backend)
After payment, Razorpay automatically calls our frontend handler, which then sends the payment response to our `/verify-razor` API. The backend verifies the payment status with Razorpay's servers, and if successful, adds credits to the user's account and marks the transaction as paid.

## 1. **Razorpay payment flow has three main parts:**
   - Order Creation (Server)
   - Payment UI (Frontend)  
   - Verification (Server)

2. **Always create orders on backend** to prevent tampering.

3. **Verification must happen server-side** using Razorpay's secure APIs.

4. **Amount must be sent in paise** (₹1 = 100 paise).

5. **Store every transaction in a database** to avoid double crediting.



## 1. Creating Razorpay Orders (Backend)

### Step 1: Initialize Razorpay

```javascript
import razorpay from 'razorpay';

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

This sets up a Razorpay instance using the API keys stored in `.env`.

#
**Flow:**
1. Receive the selected `planId` from the frontend.
2. Match the plan to determine credits and amount.
3. Create a new transaction entry in MongoDB.
4. Create a Razorpay order using the `orders.create()` API.
5. Send the order details back to the frontend.

```javascript
const options = {
  amount: amount * 100,      // amount in paise
  currency: process.env.CURRENCY,
  receipt: newTransaction._id,
};

razorpayInstance.orders.create(options, (error, order) => {
  if (error) return res.status(400).json({ success: false, message: error });
  return res.status(200).json({ success: true, order });
});
```

### Why order creation happens on the server:
This ensures sensitive keys are not exposed on the frontend and prevents manipulation of pricing.

## 2. Opening Razorpay Checkout (Frontend)

After receiving the order object, the frontend uses Razorpay Checkout.js to open the payment popup.

```javascript
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  name: 'Credits Payment',
  description: 'Credits Payment',
  order_id: order.id,
  receipt: order.receipt,
  handler: async (response) => {
    await axios.post(`${backendURL}/api/user/verify-razor`, response, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

const rzp = new window.Razorpay(options);
rzp.open();
```

**Key points:**
- `key` is the public key (safe to expose on frontend).
- `handler` is called automatically by Razorpay after payment completion.
- The handler sends payment details to the backend for verification.

## 3. Verifying Payment (Backend)

**Endpoint:** `POST /api/user/verify-razor`

After successful payment, Razorpay sends back an `order_id`.

The backend verifies the payment status by fetching the order details:

```javascript
const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

if (orderInfo.status === 'paid') {
   // Add credits to user
}
```

**Verification Steps:**
1. Fetch the order from Razorpay using the `order_id`.
2. Check if the status is `'paid'`.
3. Get the corresponding transaction using the receipt ID.
4. Update the user's credit balance in MongoDB.
5. Mark the transaction as paid.

```javascript
const creditBalance = (userData.creditBalance || 0) + (transactionData.credits || 0);

await userModel.findByIdAndUpdate(userData._id, { creditBalance });
await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
```





