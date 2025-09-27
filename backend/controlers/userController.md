
## registerUser

`registerUser` is an asynchronous function that handles new user registration.  
It validates user input using **Zod**, hashes passwords with **SHA-256 + salt**, and generates a **JWT token** upon successful registration.

### Parameters

- **req**: `Request` – Express request object containing `name`, `email`, and `password` in `req.body`.  
- **res**: `Response` – Express response object used to send the HTTP response.

###  Returns

`Promise<void>`  
- **200** – Returns a JSON object with the JWT token and user details on successful registration.  
- **400** – For missing fields, invalid inputs, or if user already exists.  
- **500** – For server errors.


## loginUser

`loginUser` is an asynchronous function that handles user login by verifying email and password.  
It recreates the hashed password using the stored salt and compares it with the database.

### Parameters

- **req**: `Request` – Express request object containing `email` and `password` in `req.body`.  
- **res**: `Response` – Express response object used to send the HTTP response.

### Returns

`Promise<void>`  
- **200** – Returns JWT token and user data upon successful login.  
- **401** – If email or password is invalid.  
- **500** – For server errors.



## userCredit

`userCredit` is an asynchronous function that returns the authenticated user’s current credit balance and profile info.

### Parameters

- **req**: `AuthenticatedRequest` – Express request object containing `userId` from authentication middleware.  
- **res**: `Response` – Express response object used to send the user credit information.

### 📤 Returns

`Promise<void>`  
- **200** – Returns the credit balance and user name.  
- **401** – If user is unauthorized.  
- **500** – For server errors.



## paymentRazorpay

`paymentRazorpay` is an asynchronous function that creates a **Razorpay order** for credit purchasing.  
It maps `planId` to credits and amount, stores transaction details, and returns the order object to the frontend.

### Parameters

- **req**: `AuthenticatedRequest` – Express request object containing the `planId` in `req.body` and `userId` from auth middleware.  
- **res**: `Response` – Express response object used to send the Razorpay order details.

### Returns

`Promise<void>`  
- **200** – Returns the Razorpay order object.  
- **400** – If required details are missing or plan not found.  
- **500** – For server errors.

### Flow
1. Extract `planId` and `userId`.  
2. Match plan to determine credits and amount.  
3. Create a transaction document in MongoDB.  
4. Create Razorpay order using `razorpayInstance.orders.create()`.  
5. Send the order object to the frontend.



## verifyRazorpay

`verifyRazorpay` is an asynchronous function that **verifies payment** after successful Razorpay checkout.  
It fetches the order from Razorpay, checks the payment status, updates user credits, and marks the transaction as paid.

### Parameters

- **req**: `Request` – Express request object containing `razorpay_order_id` in `req.body`.  
- **res**: `Response` – Express response object used to send verification results.

### Returns

`Promise<void>`  
- **200** – If payment is verified and credits are successfully added.  
- **400** – If payment fails or transaction is already marked as paid.  
- **500** – For server errors.


