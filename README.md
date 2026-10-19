# Taher Enterprise — Frontend

A responsive gas management web application for Taher Enterprise, built with Next.js and TypeScript. The application provides interfaces for managing products, categories, brands, product types, sections, users, customer quotas, and payments.

## Features

- **Product Management:** Browse and manage gas products and related information.
- **Category Management:** Organize products into categories.
- **Brand Management:** Manage product brands.
- **Product Types and Sections:** Organize products and homepage content.
- **User Management:** Access user account management features.
- **Quota Management:** View and manage customer quota requests.
- **Payment Management:** Access customer payment information.
- **Authentication:** Integrate with the backend authentication system.
- **Responsive Interface:** Layout designed for desktop and mobile screens.
- **Image Uploads:** Integrate with the backend upload functionality for product images.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- REST API integration

## Prerequisites

- Node.js and npm
- Access to the Taher Enterprise backend API

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd <YOUR_FRONTEND_PROJECT_DIRECTORY>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the frontend project root.

Add the environment variables required by your application. For example, if your API URL is configured through `NEXT_PUBLIC_API_URL`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Replace the URL and variable name with the values expected by your actual frontend configuration. Use your deployed backend URL when deploying the application.

Never put private API keys, database credentials, JWT secrets, or other backend secrets in `NEXT_PUBLIC_` variables.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser, unless your development server uses another port.

### 5. Build for production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Project Structure

The application uses Next.js routing. The exact structure may vary by feature.

```text
frontend/
├── public/
├── src/
│   ├── app/
│   │   └── dashboard/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── ...
├── package.json
└── README.md
```

## Backend Integration

The frontend communicates with the Taher Enterprise backend through REST API endpoints. The backend handles business logic, database operations, authentication, and payment processing.

Ensure the backend is running and the frontend API configuration points to the correct backend URL.

## Security

- Keep private credentials out of the frontend source code.
- Do not commit `.env.local` or other files containing secrets.
- Use HTTPS for production API communication.
- Restrict administrative functionality according to the backend authorization rules.

## License

This project was developed by Shafiqul Islam.
