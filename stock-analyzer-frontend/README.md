# Stock Analyzer Frontend

A modern web application for analyzing stock market data, built with Next.js and TypeScript.

## Features

- Real-time stock quotes
- Historical data analysis
- Financial statements
- News updates
- Technical analysis

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- Axios

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stock-analyzer-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your API configuration:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
stock-analyzer-frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/            # Reusable components
│   ├── hooks/                # Custom React hooks
│   ├── services/            # API services
│   ├── types/              # TypeScript types
│   ├── utils/             # Utility functions
│   └── constants/         # Application constants
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
