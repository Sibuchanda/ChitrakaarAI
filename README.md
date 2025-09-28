# ChitrakaarAI  

ChitrakaarAI is a **text-to-image web application** powered by the **Stable Diffusion model**.  
It allows users to generate AI-driven artwork from text prompts with a simple and user-friendly interface.  

## Live link : https://chitrakaarai.onrender.com


## 🚀 Features  

- **User Authentication**  
  - Sign Up & Sign In with secure flow  
  - Sign Out option to manage sessions  

- **Free Credits System**  
  - Every new user gets **5 free credits** to generate images  

- **Credit Purchase with Razorpay**  
  - Users can buy credits once free credits are used  
  - Three affordable plans available  
  - Razorpay integrated for secure payments  

- **AI Image Generation**  
  - Uses **Stable Diffusion** model to convert text prompts into high-quality images  
 

## Tech Stack  

- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB  
- **AI Model**: Stable Diffusion  
- **Payment Gateway**: Razorpay  
- **Validation**: Zod  




## ⚙️ Setup & Installation  

```bash
# Clone this repository (choose one)

# HTTPS
git clone https://github.com/Sibuchanda/ChitrakaarAI.git

# SSH
git clone git@github.com:Sibuchanda/ChitrakaarAI.git


# Navigate to project folder
cd chitrakaarai

# Install frontend dependencies
cd frontend
npm install

# Start frontend
npm run dev

# Open a new terminal, then install backend dependencies
cd backend
npm install

# Start backend
npm start

```
## 🔑 Environment Variables

### Frontend
```
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
FRONTEND_URL=http://localhost:5173
```



