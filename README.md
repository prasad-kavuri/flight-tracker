# Flight Tracker

A modern, full-stack flight tracking application built with Next.js and TypeScript, enabling users to search, track, and monitor real-time flight information with an intuitive user interface.

## Features

- **Real-Time Flight Search** - Search for flights by route, date, and airline
- **Flight Tracking** - Monitor live flight status, departure, and arrival times
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **TypeScript Support** - Fully typed codebase for better development experience
- **Modern UI/UX** - Clean, intuitive interface built with Next.js and optimized fonts

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript
- **Styling**: CSS/Tailwind CSS (configure as per your setup)
- **Backend**: Next.js API Routes
- **Font Optimization**: Geist font family via Vercel
- **Package Manager**: npm/yarn/pnpm/bun

## Getting Started

### Prerequisites
- Node.js 18+ installed on your system
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prasad-kavuri/flight-tracker.git
cd flight-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

The application uses Next.js App Router. You can start editing pages by modifying `app/page.tsx`. The page will auto-update as you make changes.

### Project Structure
```
flight-tracker/
├── app/                  # Next.js app directory
│   ├── page.tsx         # Main page component
│   └── layout.tsx       # Root layout
├── components/          # Reusable React components
├── public/              # Static assets
├── package.json
└── README.md
```

## API Integration

This application uses the [Aviation Stack API](https://aviationstack.com/) to provide real-time flight data.
 
 ### Setup
 
 1. Get your API key from [Aviation Stack](https://aviationstack.com/).
 2. Create a `.env.local` file in the root directory.
 3. Add your API key:
 
 ```env
 AVIATION_STACK_API_KEY=your_api_key_here
 ```
 
 ### API Usage
 
 The application fetches flight data using the `/api/flights` endpoint, which acts as a proxy to the Aviation Stack API to keep your API key secure.
 
 ```typescript
 // Example: Fetching flight status
 const response = await fetch(`/api/flights?flight_iata=${flightNumber}`);
 const data = await response.json();
 ```

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your flight tracker is using [Vercel](https://vercel.com/new?utm_medium=default-template&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform created by the Next.js team.

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your app will be deployed and available at a live URL

### Deploy on Other Platforms

You can also deploy to:
- **Netlify** - Follow [Next.js on Netlify guide](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
- **AWS** - Using Amplify or EC2
- **Docker** - Containerize and deploy to any Docker-compatible platform

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Next.js Tutorial](https://nextjs.org/learn) - Interactive Next.js learning experience
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - View source code and contribute

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Prasad Kavuri** - AI Engineering Executive | Full-Stack Developer

- Portfolio: [prasadkavuri.com](https://prasadkavuri.com)
- GitHub: [@prasad-kavuri](https://github.com/prasad-kavuri)
- LinkedIn: [Prasad Kavuri](https://linkedin.com/in/prasad-kavuri)

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/prasad-kavuri/flight-tracker/issues).
