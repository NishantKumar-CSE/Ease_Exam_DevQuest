import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertCircle, BarChart, Award, RefreshCw } from 'lucide-react';

const quizData = [
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "PHP"],
    correct: 2,
    timeLimit: 30,
    category: "Programming"
  },
  {
    question: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Program Unit"],
    correct: 1,
    timeLimit: 25,
    category: "Computer Basics"
  },
  {
    question: "What is the primary purpose of HTML?",
    options: ["Styling web pages", "Creating web structure", "Programming logic", "Database management"],
    correct: 1,
    timeLimit: 25,
    category: "Web Development"
  },
  {
    question: "Which of these is not a JavaScript framework?",
    options: ["React", "Angular", "Django", "Vue"],
    correct: 2,
    timeLimit: 30,
    category: "Programming"
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
    correct: 2,
    timeLimit: 25,
    category: "Web Development"
  },
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Tree"],
    correct: 1,
    timeLimit: 30,
    category: "Data Structures"
  },
  {
    question: "What is the purpose of SQL?",
    options: ["Styling web pages", "Database management", "Server configuration", "Network protocols"],
    correct: 1,
    timeLimit: 30,
    category: "Databases"
  },
  {
    question: "Which protocol is used for secure web browsing?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    timeLimit: 25,
    category: "Networking"
  },
  {
    question: "What is Git primarily used for?",
    options: ["Version control", "Web hosting", "Database management", "Web design"],
    correct: 0,
    timeLimit: 30,
    category: "Development Tools"
  },
  {
    question: "Which of these is a valid way to declare a variable in JavaScript?",
    options: ["variable x;", "var x;", "v x;", "variable: x;"],
    correct: 1,
    timeLimit: 25,
    category: "Programming"
  },
  {
    question: "What is the purpose of an API?",
    options: ["User interface design", "Application Programming Interface", "System maintenance", "Database storage"],
    correct: 1,
    timeLimit: 30,
    category: "Web Development"
  },
  {
    question: "Which language is primarily used for artificial intelligence?",
    options: ["JavaScript", "Python", "HTML", "CSS"],
    correct: 1,
    timeLimit: 30,
    category: "Programming"
  },
  {
    question: "What does DNS stand for?",
    options: ["Dynamic Name System", "Domain Name System", "Digital Network Service", "Data Name Service"],
    correct: 1,
    timeLimit: 25,
    category: "Networking"
  },
  {
    question: "Which of these is not a cloud service provider?",
    options: ["AWS", "Google Cloud", "Azure", "Oracle SQL"],
    correct: 3,
    timeLimit: 30,
    category: "Cloud Computing"
  },
  {
    question: "What is the purpose of a firewall?",
    options: ["Virus detection", "Network security", "Data backup", "System cooling"],
    correct: 1,
    timeLimit: 30,
    category: "Security"
  }
];

const ExamEase = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quizData[0].timeLimit);
  const [answered, setAnswered] = useState(false);
  const [categoryScores, setCategoryScores] = useState({});
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswerSubmit(-1);
    }
  }, [timeLeft, answered]);

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
      const correct = selectedIndex === quizData[currentQuestion].correct;
      if (correct) {
        setScore(score + 1);
        setCategoryScores(prev => ({
          ...prev,
          [quizData[currentQuestion].category]: (prev[quizData[currentQuestion].category] || 0) + 1
        }));
      }
      setAnswered(true);
      setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setAnswered(false);
          setTimeLeft(quizData[currentQuestion + 1].timeLimit);
        } else {
          setShowScore(true);
        }
      }, 1500);
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

  if (showIntro) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-indigo-800">Welcome to ExamEase</CardTitle>
          <CardDescription className="text-lg mt-2">
            Test your technical knowledge with our interactive quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Quiz Details:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 15 challenging questions</li>
              <li>• Timer for each question</li>
              <li>• Instant feedback</li>
              <li>• Detailed performance analysis</li>
            </ul>
          </div>
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showScore) {
    const percentage = (score / quizData.length) * 100;
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-indigo-800">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {score} / {quizData.length}
            </div>
            <div className="text-xl text-gray-600">
              ({percentage.toFixed(1)}%)
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-indigo-600" />
              Performance by Category
            </h3>
            {Object.entries(categoryScores).map(([category, categoryScore]) => (
              <div key={category} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{category}</span>
                  <span className="text-indigo-600 font-medium">{categoryScore} correct</span>
                </div>
                <Progress
                  value={categoryScore * 100}
                  className="h-2 bg-gray-100"
                />
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Performance Analysis
            </h3>
            <p className="text-gray-600">
              {percentage === 100 && "Outstanding! Perfect score achieved! 🏆"}
              {percentage >= 80 && percentage < 100 && "Excellent work! You've demonstrated strong knowledge! 🌟"}
              {percentage >= 60 && percentage < 80 && "Good job! You're on the right track! 👍"}
              {percentage >= 40 && percentage < 60 && "Keep practicing! You're making progress! 💪"}
              {percentage < 40 && "More practice will help improve your score! 📚"}
            </p>
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-5 h-5" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-indigo-50 to-white">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="text-xl text-indigo-800">Question {currentQuestion + 1} of {quizData.length}</CardTitle>
            <CardDescription className="text-sm">
              Category: {quizData[currentQuestion].category}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-500' : 'text-indigo-600'}`} />
            <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-indigo-600'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        <Progress
          value={(currentQuestion / quizData.length) * 100}
          className="h-2 bg-gray-100"
        />
      </CardHeader>
      <CardContent className="space-y-4">
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
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {answered && selectedAnswer === index && index !== quizData[currentQuestion].correct && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamEase;

