<div align="center">
  <br />
    <a href="https://www.youtube.com/watch?v=E-fdPfRxkzQ" target="_blank">
      <img src="public/server-side-banner.jpg" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  </div>

  <h3 align="center">📡 Speaker — Server Side</h3>

   <div align="center">
 This is the backend of the <strong>Speaker</strong> mobile app — a language learning platform.  
    It handles user authentication and lesson data storage.  
    Built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB (Mongoose)</strong>.
     </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🤸 [Quick Start](#quick-start)
4. 📍 [API Endpoints](#api-endpoints)
5. 📁 [Structure](#structure)
6. 🛡️ [License](#license)
7. ✍️ [Author](#author)

---

## <a name="introduction">🤖 Introduction</a>

**Speaker** is a backend server for a cross-platform mobile application built with **React Native**.  
Its main goal is to help users learn **Language** through structured lessons and quizzes.

This backend includes:
- User authentication via JWT
- Lesson and user storage

---
## <a name="tech-stack">⚙️ Tech Stack</a>

- **Node.js** — JavaScript runtime environment
- **Express.js** — Web framework for Node.js
- **MongoDB + Mongoose** — NoSQL database with ODM for schema and validation

---

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/andreytr449/speaker-app-backend
cd speaker-app-backend
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
PORT=5500
NODE_ENV=development
BASE_URL=/api/v1

MONGODB_URI=
JWT_SECRET=

# NODEMAILER
EMAIL_PASSWORD=
EMAIL_ADDRESS_SENDER=
```

**Running the Project**

```bash
npm run dev
```

Once the server is running, you can access it at:

- 🌐 Base URL: [http://localhost:5500](http://localhost:5500/)
- 🛠️ API Root: [http://localhost:5500/api/v1](http://localhost:5500/api/v1)


---

## <a name="api-endpoints">📍API Endpoints</a>

### 📘 Auth API Endpoints

Base URL: `/api/v1/auth`

🔐 POST `/sign-up`

| Field    | Type        |     Required     |    Description                             
|----------|-------------|------------------|----------------------
| email    | string       |✅|User's email address
| password | string     |✅|Password (min 6 chars)
| name | string     |✅|User's full name


Response

```json
{
  "success": true,
  "data": {
    "token": "string",
    "user": {
      "_id": "string",
      "email": "string",
      "name": "string",
      "isVerified": false,
      "role": "user",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
}

```

🔓 POST `/sign-in`

**Description:** Authenticates a user and returns a token. If user is not verified, a verification code is sent.


| Field    | Type        |     Required     |    Description                             
|----------|-------------|------------------|----------------------
| email    | string       |✅|Registered email
| password | string     |✅|Password 


**Response**

```json
{
  "success": true,
  "data": {
    "token": "string",
    "user": {
      "_id": "string",
      "email": "string",
      "name": "string",
      "isVerified": true,
      "role": "user",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
}


```


✅ POST `/verify`

**Description:** Verifies a user with a verification code. Requires a valid JWT token in the Authorization header.

**Headers**

| Header    | Type        |     Required     |    Description                             
|----------|-------------|------------------|----------------------
| Authorization    | string       |✅|	Bearer token

**Request Body**

| Field    | Type   |     Required     |    Description                             
|----------|--------|------------------|----------------------
| code    | number |✅|	Verification code sent to email


**Response**

```json
{
  "success": true
}
```

📧 POST `/check-email`

**Description:** Checks if an email is already in use and whether it’s verified.


| Field    | Type        |     Required     |    Description                             
|----------|-------------|------------------|----------------------
| Authorization    | string       |✅|	Email to check

**Response**

```json
{
  "success": true,
  "isUserExist": boolean,
  "isVerified": boolean
}

```
---


## <a name="structure">📁 Structure</a>

```
├── public/                     # Publicly accessible static files
├── src/                        # Main source code folder
│   ├── config/                 # Configuration-related files
│   │   ├── env.ts              # Environment variable loader
│   │   └── node-mailer.ts      # NodeMailer configuration for sending emails
│
│   ├── controllers/            # Handles the request-response logic
│   │   ├── auth.controller.ts     # Handles authentication logic (login, register, etc.)
│   │   ├── chapter.controller.ts  # Operations for chapters
│   │   ├── lesson.controller.ts   # Operations for lessons
│   │   ├── topic.controller.ts    # Operations for topics
│   │   └── user.controller.ts     # Handles user-related logic
│
│   ├── database/               # Database connection configuration
│   │   └── mongodb.ts          # MongoDB connection setup
│
│   ├── middlewares/           # Express middleware functions
│   │   ├── auth.middleware.ts       # JWT authentication checker
│   │   ├── error-handler.middleware.ts # Global error handler
│   │   └── is-admin.middleware.ts     # Admin role checker
│
│   ├── models/                # Mongoose schemas and models
│   │   ├── chapter.model.ts
│   │   ├── code.model.ts
│   │   ├── lesson.model.ts
│   │   ├── topic.model.ts
│   │   └── user.model.ts
│
│   ├── routes/                # Route definitions for each resource
│   │   ├── auth.routes.ts
│   │   ├── chapter.routes.ts
│   │   ├── lesson.routes.ts
│   │   ├── topic.routes.ts
│   │   └── user.routes.ts
│
│   ├── types/                 # Custom TypeScript type definitions
│   │   └── express/index.d.ts     # Extending Express types, like `Request` or `User`
│
│   ├── utils/                 # Helper and utility functions
│   │   ├── email-template.ts         # HTML email templates
│   │   ├── error-type.ts             # Custom error types
│   │   ├── generate-and-send-code.ts# Function to generate and send confirmation code
│   │   └── send-email.ts             # General email sending function
│
│   └── app.ts                 # Express app entry point (where routes and middlewares are used)
│
└── tsconfig.json                  # TypeScript compiler configuration
```

