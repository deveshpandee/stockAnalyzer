# Stock Analyzer

A full-stack application for analyzing stock market data, featuring a Next.js frontend and Python backend.

## Project Structure

```
stock-analyzer/
├── frontend/           # Next.js frontend application
└── backend/           # Python backend application
```

## Frontend

The frontend is built with Next.js, TypeScript, and Tailwind CSS. See the [frontend README](frontend/README.md) for more details.

## Backend

The backend is built with Python and provides RESTful APIs for stock data. See the [backend README](backend/README.md) for more details.

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stock-analyzer
```

2. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

3. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 