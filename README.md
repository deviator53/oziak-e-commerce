# Oziak E-commerce Website

A sophisticated e-commerce website for Oziak, a bespoke men's clothing line. Built with Next.js 15, Payload CMS 3.74, and PostgreSQL.

## Features

- **Modern E-commerce Frontend**: Elegant, responsive design with custom styling
- **Payload CMS Admin Panel**: Full content management for products, categories, orders, and blog posts
- **Product Management**: Complete product catalog with images, variants, and customization options
- **Shopping Cart**: Persistent cart with local storage
- **Order Management**: Orders are automatically sent via WhatsApp and email for follow-up
- **Blog/Journal**: Content management for news and articles
- **Responsive Design**: Mobile-first approach with elegant typography

## Collections

- **Products**: Complete product management with images, pricing, sizes, colors, and customization options
- **Categories**: Hierarchical product categorization
- **Orders**: Order management with customer info, shipping details, and payment status
- **Blog**: News and articles with rich text content
- **Pages**: Static page management
- **Users**: Admin user management
- **Media**: File and image management

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Payload CMS 3.74
- **Database**: PostgreSQL
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Inter (body) and Playfair Display (headings)

## Getting Started

### Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- PostgreSQL database
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database connection and other settings:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/oziak_db
   PAYLOAD_SECRET=your-secret-key-here
   ```

4. Generate types:
   ```bash
   npm run generate:types
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` for the frontend
7. Visit `http://localhost:3000/admin` for the Payload admin panel

### Setting Up the Admin User

1. Go to `http://localhost:3000/admin`
2. Create your first admin user
3. Configure site settings in the admin panel

### WhatsApp Integration

To enable WhatsApp notifications for orders:

1. Go to the admin panel → Settings
2. Add your WhatsApp number with country code (e.g., +1234567890)
3. Orders will automatically generate WhatsApp messages that open in a new tab

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Frontend pages
│   └── (payload)/           # Payload admin and API routes
├── collections/             # Payload collections
├── globals/                 # Payload globals
├── components/              # React components
├── context/                 # React context providers
└── utils/                   # Utility functions
```

## Key Features

### E-commerce Functionality
- Product catalog with filtering and sorting
- Shopping cart with persistent storage
- Checkout process with customer information
- Order management and tracking

### Admin Features
- Product management with images and variants
- Category management
- Order tracking and status updates
- Blog/content management
- Site settings configuration

### WhatsApp & Email Integration
- Automatic order notifications
- Formatted messages with order details
- Customer information and shipping details
- Order tracking and follow-up

## Customization

### Styling
The website uses CSS custom properties for easy theming. Main variables are defined in `src/app/(frontend)/styles.css`:

```css
:root {
  --primary-black: #000000;
  --primary-white: #ffffff;
  --font-primary: 'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;
}
```

### Adding New Collections
1. Create a new collection file in `src/collections/`
2. Import and add it to `src/payload.config.ts`
3. Run `npm run generate:types` to update TypeScript types

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Make sure to set all required environment variables:
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- Any email service configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.