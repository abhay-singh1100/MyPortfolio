export interface Project {
  title: string;
  date: string;
  description: string[];
  technologies: string[];
  githubLink: string;
  demoLink: string;
  imagePath: string;
  category: string;
}

export const projects: Project[] = [
  {
    title: "Natural Language SQL Query System Using LLMs",
    date: "May 2025 – Jun 2025",
    description: [
      "Developed an NLP system using Mistral LLM to convert English to SQL with 95% accuracy, supporting joins, aggregations, and subqueries.",
      "Integrated voice interface with Vosk (ASR) and pyttsx3 (TTS) for hands-free SQL querying (<500ms latency, 85% accuracy in noise).",
      "Created a FastAPI + Streamlit app serving 100+ users; cut SQL query latency by 60% using SQLite and responsive UI design."
    ],
    technologies: ["Python", "LLMs", "NLP", "FastAPI", "Streamlit"],
    githubLink: "https://github.com/abhay-singh1100/Natural-Language-SQL-Query-System-Using-LLMs-.git",
    demoLink: "https://your-live-demo.com",
    imagePath: "/project1.jpg",
    category: "ML/AI"
  },
  {
    title: "Android Malware Detection System",
    date: "Nov 2024 – Jan 2025",
    description: [
      "Trained a stacking model (Logistic Regression, SVM, Random Forest) with 96.9% recall and 84.2% accuracy on malware classification.",
      "Increased accuracy by 12% using API and permission-based features; reduced false negatives on obfuscated apps by 18%.",
      "Processed 30K+ APKs in a scalable ML pipeline (96% recall), automating malware detection via API and permission feature extraction."
    ],
    technologies: ["Python", "Machine Learning", "scikit-learn", "TensorFlow"],
    githubLink: "https://github.com/abhay-singh1100/Android-Malware-Detection-System-Using-Machine-Learning-.git",
    demoLink: "https://your-live-demo.com",
    imagePath: "/project2.jpg",
    category: "ML/AI"
  },
  {
    title: "Real-Time Face Recognition Attendance System",
    date: "Aug 2024 – Sep 2024",
    description: [
      "Architected a FaceNet-based recognition engine using Flask and OpenCV, enabling real-time webcam attendance tracking for 100+ users.",
      "Deployed 10 REST endpoints covering user enrollment, attendance capture, analytics, and admin control.",
      "Encrypted facial embeddings and implemented session auditing, improving cross-device recognition consistency by 25%."
    ],
    technologies: ["Python", "OpenCV", "Flask", "FaceNet", "SQLite"],
    githubLink: "https://github.com/abhay-singh1100/Real-Time-Face-Recognition-Attendance-System-.git",
    demoLink: "https://your-live-demo.com",
    imagePath: "/project3.jpg",
    category: "Computer Vision"
  }
];
