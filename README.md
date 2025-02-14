# Next.js API Documentation

## Run the App Locally

To run the app on your local machine, follow these steps:

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

Clone the repository:

```bash
https://github.com/mabuhanifa/everything-green
```

Navigate to the project directory:

```bash
cd everything-green
```

## Required env variables for direct testing

```bash
MONGODB_URI = "mongodb+srv://devhanif96:pJTBeVg7BC846JfS@everything-green.7bpsq.mongodb.net/?retryWrites=true&w=majority&appName=everything-green"

JWT_SECRET = "0da72812f33dad5c4415483803bd912597b7448e1f136616e860edd43ab85963"
WEB_HOOK_SECRET = "c58341e3906304975b508b6ae770ee4db549abe550e47b547248db12d06ccce4"
```

Install the dependencies:

```bash
npm install
```

### Starting the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

The server will start running at `http://localhost:3000`.

## Routes

### Login

**URL:** `/api/login`  
**Method:** `POST`  
**Required Authorization:** None  
**Description:** Authenticate and log in a user.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Credentials

```json
{
  "email": "rahim@gmail.com",
  "password": "123456"
}
```

### Create a User

**URL:** `/api/users`  
**Method:** `POST`  
**Required Authorization:** JWT token by logged user  
**Description:** Create a new user.

#### Request Body Sample

```json
{
  "name": "Abdul",
  "email": "abdul@gmail.com",
  "password": "random123456"
}
```

### Get All Users

**URL:** `/api/users`  
**Method:** `GET`  
**Required Authorization:** JWT token by logged user  
**Description:** Get all users.

### Get a Single User by ID

**URL:** `/api/users/:id`  
**Method:** `GET`  
**Required Authorization:** JWT token by logged user  
**Description:** Get a single user by its ID.

### Webhook Endpoint

**URL:** `/api/webhook`  
**Method:** `POST`  
**Required Authorization:** None  
**Description:** Processes incoming POST requests, validates the request signature, and stores the data in a `db.json` file.

#### Request Headers

- `Content-Type`: application/json
- `X-Signature`: The HMAC signature of the request payload.

#### Request Body

```bash
curl -X POST http://localhost:3000/api/webhook -H "Content-Type: application/json" -H "x-signature: 1234abcd" -d '{
    "eventType": "user.signup",
    "data": {
        "userId": 123,
        "email": "test@example.com"
    }
}'

```

## Environment Variables

To run this project, you need to set up the following environment variables in a `.env.local` file:

```bash
# .env.local
WEBHOOK_SECRET=1234abcd
or
WEBHOOK_SECRET=c58341e3906304975b508b6ae770ee4db549abe550e47b547248db12d06ccce4
```

## Notes

- The `db.json` file is used to store data received by the webhook. Ensure the file exists and is writable.
- Replace the mock user database with a real database (e.g., PostgreSQL, MongoDB) in a production environment.
- Use HTTPS in production to secure API requests and responses.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
