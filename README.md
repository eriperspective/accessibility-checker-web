# Accessibility Checker Web Application

Beautiful, professional web interface for the Accessibility Checker tool with neumorphic design and slate blue gradients.

## 🚀 Live Demo

**Try it now:** [https://accessibility-perspective.vercel.app](https://accessibility-perspective.vercel.app)

## Features

- 🎨 **Modern Neumorphic Design** - Beautiful soft UI with depth and shadows
- 🌊 **Slate Blue Gradients** - Professional color scheme throughout
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Analysis** - Instant accessibility scanning
- 📊 **Interactive Dashboard** - Visual results with score cards and issue breakdown
- 🎯 **Smooth Animations** - Polished hover effects and transitions
- 🦆 **Professional UI/UX** - Clean, intuitive interface

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **CSS3** - Custom neumorphic styling with gradients
- **Inter Font** - Professional typography

### Backend
- **Flask** - Python web framework
- **BeautifulSoup4** - HTML parsing
- **Flask-CORS** - Cross-origin resource sharing

## Installation

### Prerequisites
- Python 3.7+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Flask API server:
```bash
python app.py
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The web app will run on `http://localhost:3000`

## Usage

1. **Start both servers** (backend and frontend)
2. **Open your browser** to `http://localhost:3000`
3. **Enter a URL** in the input field
4. **Click "Scan Website"** to analyze
5. **View results** with score, issues, and recommendations

## Project Structure

```
accessibility-checker/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Header with title and branding
│   │   ├── Hero.css
│   │   ├── ScanForm.jsx      # URL input and scan button
│   │   ├── ScanForm.css
│   │   ├── Results.jsx       # Results dashboard
│   │   ├── Results.css
│   │   ├── Footer.jsx        # Footer with links
│   │   └── Footer.css
│   ├── App.jsx               # Main application component
│   ├── App.css
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── app.py                    # Flask API backend
├── check_accessibility.py    # Original CLI tool
├── requirements.txt          # Python dependencies
├── package.json              # Node.js dependencies
├── vite.config.js            # Vite configuration
└── index.html                # HTML entry point
```

## API Endpoints

### `POST /api/check`
Scan a website for accessibility issues.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "score": 7.1,
  "summary": {
    "critical": 1,
    "warnings": 0,
    "passed": 6
  },
  "issues": {
    "critical": [...],
    "warnings": [...]
  },
  "passed": [...]
}
```

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## Design Features

### Neumorphism
- Soft shadows creating depth
- Inset shadows for inputs
- Elevated cards with light/dark shadows
- Smooth, tactile interface

### Gradients
- Slate blue gradient buttons
- Purple gradient accents
- Gradient borders on score cards
- Subtle background gradients

### Animations
- Floating duck emoji
- Hover effects on cards and buttons
- Smooth transitions
- Loading spinner
- Slide-in animations for results

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Optimized for all screen sizes

## Building for Production

### Frontend
```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Backend
For production deployment, use a WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn app:app
```

## Environment Variables

Create a `.env` file for production:

```env
FLASK_ENV=production
FLASK_DEBUG=False
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Credits

Built with ❤️ using goose AI-assisted development

## Author

**[@eriperspective](https://github.com/eriperspective)**

---

## Links

- **Live App:** [https://accessibility-perspective.vercel.app](https://accessibility-perspective.vercel.app)
- **API:** [https://accessibility-checker-api.onrender.com](https://accessibility-checker-api.onrender.com)
- **GitHub:** [https://github.com/eriperspective/accessibility-checker-web](https://github.com/eriperspective/accessibility-checker-web)

---

**Note:** This web application extends the original CLI tool with a beautiful, professional interface while maintaining all the core accessibility checking functionality.

