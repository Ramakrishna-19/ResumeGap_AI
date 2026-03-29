<h1 align="center">ResumeGap AI – AI Powered Interview Preparation Platform</h1>

ResumeGap AI is a full-stack AI-powered web application that helps users analyze their resume, identify skill gaps, and generate personalized interview preparation plans. The platform uses modern web technologies along with AI integration to simulate real interview scenarios and improve candidate readiness.

Users can upload their resume or provide a self-description along with a job description. The system then generates technical and behavioral questions, evaluates match score, highlights skill gaps, and provides a structured preparation roadmap. Additionally, users can generate a tailored resume PDF optimized for the job role.

<h2>🚀 FEATURES</h2>

⭐ **User Features**

- Upload resume (PDF) or enter self-description
- AI-generated interview report
- Technical interview questions with answers
- Behavioral interview questions with explanations
- Match score based on job description
- Skill gap analysis
- Personalized preparation roadmap
- Resume PDF generation tailored to job role
- Secure login/signup system
- Fully responsive UI

⭐ **AI Capabilities**

- Resume analysis
- Job-role matching
- Dynamic question generation
- Skill gap detection
- Roadmap generation
- Resume content generation (HTML → PDF)

⭐ **Backend Features**

- JWT-based authentication
- Secure API endpoints
- MongoDB data storage
- PDF parsing (resume extraction)
- AI integration via OpenRouter API
- Resume PDF generation using Puppeteer

<h2>🧰 Tech Stack</h2>

 * Frontend

        React.js
        React Router
        Axios
        CSS

 * Backend

        Node.js
        Express.js
        MongoDB + Mongoose
        JWT Authentication
        Multer (file upload)
        PDF-Parse
        Puppeteer
        OpenRouter API (AI)

<h2>📁 Folder Structure</h2>

```
ResumeGap_AI/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection setup
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # Authentication logic
│   │   │   └── interview.controller.js # Interview & AI logic
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js   # JWT authentication middleware
│   │   │   └── file.middleware.js   # File upload handling
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema
│   │   │   ├── interviewReport.model.js # Interview report schema
│   │   │   └── blacklist.model.js   # Token blacklist
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # Auth API routes
│   │   │   └── interview.routes.js  # Interview API routes
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js        # AI integration logic
│   │   │
│   │   └── app.js                   # Express app configuration
│   │
│   ├── server.js                   # Entry point of backend server
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Environment variables
│   └── .gitignore
│
├── Frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   └── Protected.jsx   # Route protection
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.js      # Auth logic hook
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   ├── Register.jsx
│   │   │   │   │   └── Profile.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.api.js     # API calls
│   │   │   │   └── auth.context.jsx    # Auth state management
│   │   │   │
│   │   │   ├── interview/
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useInterview.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Home.jsx
│   │   │   │   │   └── Interview.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── interview.api.js
│   │   │   │   └── interview.context.jsx
│   │   │
│   │   ├── style/
│   │   │   ├── home.css
│   │   │   ├── interview.css
│   │   │   └── Profile.css
│   │   │
│   │   ├── App.jsx                  # Main React component
│   │   ├── main.jsx                 # Entry point
│   │   ├── app.routes.jsx           # Routing configuration
│   │   └── style.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── vercel.json                 # Deployment config
│   └── README.md
│
└── README.md
```

<h2>⚙️ Environment Setup</h2>

* **Backend**
cd Backend
npm install
node server.js
Server runs at: http://localhost:3000

* **Frontend**
cd Frontend
npm install
npm run dev

Runs at:  http://localhost:5173 (or configured port)


<h2>📡 API Endpoints</h2>

* Interview APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/interview/ | Generate interview report |
| GET | /api/interview/ | Get all reports |
| GET | /api/interview/report/:id | Get report by ID |
| DELETE | /api/interview/:id | Delete report |
| POST | /api/interview/resume/pdf/:id | Generate resume PDF |

* Auth APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |

<h2>🧠 How It Works</h2>

1. User uploads resume or enters self-description  
2. Provides job description  
3. Backend extracts resume text (PDF-Parse)  
4. AI processes data via OpenRouter  
5. Generates:
   - Match Score  
   - Questions  
   - Skill Gaps  
   - Roadmap  
6. Data stored in MongoDB  
7. User can download AI-generated resume PDF  

<h2>🖼 Screenshots</h2>

### 📌 Interview Dashboard
(Add your screenshot here)

### 📌 Technical Questions
(Add your screenshot here)

### 📌 Behavioral Questions
(Add your screenshot here)

### 📌 Roadmap Section
(Add your screenshot here)

### 📌 Match Score & Skill Gaps
(Add your screenshot here)

<h2>🙌 Contributing</h2>

Pull requests are welcome!  
For major changes, please open an issue first.

<h2>📜 License</h2>

This project is licensed under the MIT License.
