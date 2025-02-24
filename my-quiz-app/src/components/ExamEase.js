"use client";
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Quiz data
const quizData = [
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "PHP"],
    correct: 2,
    timeLimit: 10,
    category: "Web Development"
  },
  {
    question: "What is the primary purpose of a REST API?",
    options: ["Database management", "Server communication", "Front-end styling", "Code compilation"],
    correct: 1,
    timeLimit: 10,
    category: "Web Development"
  },
  {
    question: "What does DOM stand for in web development?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
    correct: 0,
    timeLimit: 10,
    category: "Web Development"
  },
  {
    question: "Which of these is NOT a valid HTTP method?",
    options: ["GET", "POST", "SEND", "PUT"],
    correct: 2,
    timeLimit: 15,
    category: "Web Development"
  },
  {
    question: "What is the purpose of localStorage in web browsers?",
    options: ["Server-side storage", "Client-side storage", "Database storage", "Cloud storage"],
    correct: 1,
    timeLimit: 15,
    category: "Web Development"
  },
  {
    question: "What is Git primarily used for?",
    options: ["Database management", "Version control", "Web hosting", "Code compilation"],
    correct: 1,
    timeLimit: 15,
    category: "Development Tools"
  },
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Tree"],
    correct: 1,
    timeLimit: 15,
    category: "Data Structures"
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    timeLimit: 15,
    category: "Algorithms"
  },
  {
    question: "Which protocol is used for secure data transmission over the web?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    timeLimit: 15,
    category: "Web Security"
  },
  {
    question: "What is the purpose of a CDN?",
    options: ["Content Distribution Network", "Code Development Network", "Computer Data Network", "Central Domain Name"],
    correct: 0,
    timeLimit: 10,
    category: "Web Infrastructure"
  },
  {
    question: "Which of these is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correct: 2,
    timeLimit: 15,
    category: "Databases"
  },
  {
    question: "What is the purpose of JWT?",
    options: ["Java Web Token", "JSON Web Token", "JavaScript Web Tool", "Java Web Tool"],
    correct: 1,
    timeLimit: 15,
    category: "Web Security"
  },
  {
    question: "Which tool is used for package management in Node.js?",
    options: ["npm", "pip", "maven", "gradle"],
    correct: 0,
    timeLimit: 10,
    category: "Development Tools"
  },
  {
    question: "What does CORS stand for?",
    options: ["Cross-Origin Resource Sharing", "Computer Operating Resource System", "Cross-Origin Request System", "Component Object Request Service"],
    correct: 0,
    timeLimit: 15,
    category: "Web Security"
  },
  {
    question: "Which of these is NOT a JavaScript framework/library?",
    options: ["React", "Vue", "Django", "Angular"],
    correct: 2,
    timeLimit: 15,
    category: "Web Development"
  }
];

const explanations = {
  0: "JavaScript is known as the 'language of the web' because it's the primary programming language that runs in web browsers and enables interactive web applications.",
  1: "REST APIs (Representational State Transfer) are primarily used for server communication, allowing different systems to interact over HTTP protocols.",
  2: "DOM (Document Object Model) is a programming interface for HTML documents. It represents the page as a tree structure where each node is an object representing part of the document.",
  3: "SEND is not a standard HTTP method. The standard methods are GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, etc.",
  4: "localStorage is a web browser feature that allows websites to store key-value pairs locally on the client-side, persisting even after the browser is closed.",
  5: "Git is a distributed version control system used to track changes in source code during software development.",
  6: "A Stack follows Last-In-First-Out (LIFO) principle where the last element added is the first one to be removed.",
  7: "Binary search has a time complexity of O(log n) as it repeatedly divides the search interval in half.",
  8: "HTTPS (HTTP Secure) is used for secure data transmission over the web using encryption.",
  9: "A CDN (Content Distribution Network) helps deliver content to users more quickly by serving it from locations closer to them.",
  10: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
  11: "JWT (JSON Web Token) is used for securely transmitting information between parties as a JSON object.",
  12: "npm (Node Package Manager) is the default package manager for Node.js.",
  13: "CORS (Cross-Origin Resource Sharing) is a security feature that controls how web pages in one domain can request and interact with resources from another domain.",
  14: "Django is a Python web framework, not a JavaScript framework/library like React, Vue, or Angular."
};

const ProgressBar = ({ value, color = 'bg-purple-300' }) => (
  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
    <div
      className={`h-full ${color} transition-all duration-300`}
      style={{ width: `${value}%` }}
    />
  </div>
);

const ExamEase = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quizData[0].timeLimit);
  const [answered, setAnswered] = useState(false);
  const [categoryScores, setCategoryScores] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const [categoryAttempts, setCategoryAttempts] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !answered) {
      // When time runs out, mark as unattempted and move to next question
      setAnswered(true);
      setShowExplanation(true);

      // Update category attempts
      const currentCategory = quizData[currentQuestion].category;
      setCategoryAttempts(prev => ({
        ...prev,
        [currentCategory]: (prev[currentCategory] || 0) + 1
      }));

      // Auto-advance after showing explanation briefly
      setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setAnswered(false);
          setShowExplanation(false);
          setTimeLeft(quizData[currentQuestion + 1].timeLimit);
        } else {
          setShowScore(true);
        }
      }, 2000);
    }
  }, [timeLeft, answered, currentQuestion]);

  const handleStartQuiz = () => {
    setShowIntro(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    if (!answered) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleAnswerSubmit = (selectedIndex) => {
    if (!answered) {
      const currentCategory = quizData[currentQuestion].category;
      const correct = selectedIndex === quizData[currentQuestion].correct;

      if (correct) {
        setScore(score + 1);
        setCategoryScores(prev => ({
          ...prev,
          [currentCategory]: (prev[currentCategory] || 0) + 1
        }));
      }

      setCategoryAttempts(prev => ({
        ...prev,
        [currentCategory]: (prev[currentCategory] || 0) + 1
      }));

      setAnswered(true);
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowExplanation(false);
      setTimeLeft(quizData[currentQuestion + 1].timeLimit);
    } else {
      setShowScore(true);
    }
  };

  const getOptionStyle = (index) => {
    if (!answered) {
      return selectedAnswer === index ?
        'bg-indigo-50 border-indigo-500 shadow-md' :
        'hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm';
    }
    if (index === quizData[currentQuestion].correct) {
      return 'bg-green-50 border-green-500 shadow-md';
    }
    if (selectedAnswer === index) {
      return 'bg-red-50 border-red-500 shadow-md';
    }
    return 'opacity-50';
  };

  const getPieChartData = () => {
    return Object.entries(categoryScores).map(([category, score]) => ({
      name: category,
      value: (score / (categoryAttempts[category] || 1)) * 100
    }));
  };

  const getPerformanceAnalysis = () => {
    const analysis = [];
    Object.entries(categoryAttempts).forEach(([category, attempts]) => {
      const correct = categoryScores[category] || 0;
      const percentage = (correct / attempts) * 100;

      if (percentage < 50) {
        analysis.push({
          category,
          status: 'Needs Improvement',
          message: `Focus on strengthening your knowledge in ${category}. Consider reviewing basic concepts and practicing more questions.`
        });
      } else if (percentage < 75) {
        analysis.push({
          category,
          status: 'Good',
          message: `You have a good foundation in ${category}. Focus on advanced concepts to improve further.`
        });
      } else {
        analysis.push({
          category,
          status: 'Excellent',
          message: `Strong performance in ${category}! Keep maintaining this level while helping others learn.`
        });
      }
    });
    return analysis;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  if (showIntro) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg overflow-hidden">
        <div className="text-center p-6">
          <h1 className="text-3xl font-bold text-indigo-800">Welcome to ExamEase 📚</h1>
          <p className="text-lg mt-2 text-gray-600">
            Test your technical knowledge with our interactive quiz
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Quiz Details:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>📝 {quizData.length} challenging questions</li>
              <li>⏰ Timer for each question</li>
              <li>✨ Instant feedback</li>
              <li>📊 Detailed performance analysis</li>
            </ul>
          </div>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-4 rounded-lg transition-colors duration-200"
            onClick={handleStartQuiz}
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    const percentage = (score / quizData.length) * 100;
    const pieData = getPieChartData();
    const analysis = getPerformanceAnalysis();

    return (
      <div className="w-full max-w-4xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl text-center text-indigo-800 font-bold">Quiz Completed! 🎉</h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Overall Score</h3>
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">
                  {score} / {quizData.length}
                </div>
                <div className="text-xl text-gray-600">
                  ({percentage.toFixed(1)}%)
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Detailed Analysis & Recommendations</h3>
            <div className="space-y-4">
              {analysis.map((item, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h4 className="font-semibold text-lg">{item.category}</h4>
                  <div className="text-sm text-gray-600">Status: {item.status}</div>
                  <p className="mt-1 text-gray-700">{item.message}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg transition-colors duration-200"
            onClick={() => window.location.reload()}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl text-indigo-800 font-bold">Question {currentQuestion + 1} of {quizData.length}</h2>
            <p className="text-sm text-gray-600">
              Category: {quizData[currentQuestion].category}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            ⏰ <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-indigo-600'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        <ProgressBar value={(currentQuestion / quizData.length) * 100} />
      </div>

      <div className="p-6 space-y-4">
        <div className="text-lg font-medium text-gray-800 bg-white p-6 rounded-lg shadow-sm">
          {quizData[currentQuestion].question}
        </div>

        <div className="space-y-3">
          {quizData[currentQuestion].options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${getOptionStyle(index)}`}
              onClick={() => {
                handleAnswerSelect(index);
                handleAnswerSubmit(index);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{option}</span>
                {answered && index === quizData[currentQuestion].correct && (
                  <span className="text-green-500">✅</span>
                )}
                {answered && selectedAnswer === index && index !== quizData[currentQuestion].correct && (
                  <span className="text-red-500">❌</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700">{explanations[currentQuestion]}</p>
            <button
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors duration-200"
              onClick={handleNextQuestion}
            >
              {currentQuestion < quizData.length - 1 ? 'Next Question' : 'Show Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamEase;