# ExamEase Quiz Component

![ExamEase Screenshot](./images/react.png)

# Vercel WebAPP
Link: https://ease-exam-dev-quest-hg1t.vercel.app/

# ExamEase Quiz Application

A modern, interactive quiz application built with React that tests technical knowledge across various programming and web development topics. The application features real-time feedback, detailed explanations, and comprehensive performance analytics.

## 🌟 Features

- 📝 Multiple choice questions with timed responses
- ⏰ Automatic progression when time runs out
- ✨ Instant feedback and explanations
- 📊 Detailed performance analysis with category breakdown
- 📈 Visual statistics with pie charts
- 🎯 Category-wise performance tracking
- 🔄 Option to retake the quiz
- 💡 Comprehensive feedback system

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React (v17 or higher)

### Required Dependencies

```bash
npm install recharts @/components/ui/card tailwindcss
```

## Installation

1. Clone the repository:
```sh
git clone https://github.com/NishantKumar-CSE/Ease_Exam_DevQuest.git
```

2. Navigate to the project directory:
```sh
cd my-quiz-app
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

## 📚 Quiz Structure

The quiz consists of questions from the following categories:
- Web Development
- Web Security
- Development Tools
- Data Structures
- Algorithms
- Web Infrastructure
- Databases

Each question includes:
- Multiple choice options
- Time limit
- Detailed explanation
- Category classification

## 🎨 UI Components

1. **ProgressBar**
   - Shows quiz completion progress
   - Customizable color scheme

2. **Question Display**
   - Category indicator
   - Question counter
   - Timer display

3. **Results Dashboard**
   - Overall score
   - Category-wise performance pie chart
   - Detailed analysis
   - Improvement recommendations

## 📊 Analytics Features
![ExamEase Screenshot](./images/Analysis.png)

The application provides:
- Overall score percentage
- Category-wise performance breakdown
- Visual representation through pie charts
- Personalized recommendations based on performance

## Feedback

![ExamEase Screenshot](./images/feedback.png)


The application provides comprehensive feedback at multiple levels:

1. **Immediate Question Feedback**
   - Correct/incorrect answer indication
   - Detailed explanation for each question
   - Visual cues with color-coded responses

2. **Category Performance**
   - Interactive pie chart showing performance by topic
   - Percentage scores for each category
   - Visual representation of strong and weak areas

3. **Overall Performance Analysis**
   - Total score and percentage
   - Category-wise breakdown
   - Personalized recommendations for improvement
   - Status indicators (Needs Improvement, Good, Excellent)
   - Specific learning suggestions for each category

4. **Progress Tracking**
   - Visual progress bar during the quiz
   - Time management feedback
   - Question-by-question performance tracking


## 🛠️ Technical Implementation

### Key Features Implementation

1. **Timer System**
```javascript
useEffect(() => {
  if (timeLeft > 0 && !answered) {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }
}, [timeLeft, answered]);
```

2. **Score Tracking**
```javascript
const handleAnswerSubmit = (selectedIndex) => {
  if (!answered) {
    const correct = selectedIndex === quizData[currentQuestion].correct;
    if (correct) {
      setScore(score + 1);
      // Update category scores
      setCategoryScores(prev => ({
        ...prev,
        [currentCategory]: (prev[currentCategory] || 0) + 1
      }));
    }
  }
};
```

## 🔧 Customization

### Adding New Questions

Add new questions to the `quizData` array following this format:
```javascript
{
  question: "Your question here?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correct: 0, // Index of correct answer
  timeLimit: 30, // Time in seconds
  category: "Category Name"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors
**Nishant Kumar**  
GitHub: [NishantKumar-CSE](https://github.com/NishantKumar-CSE)

## 🙏 Acknowledgments

- React team for the amazing framework
- Recharts for the charting library
- Tailwind CSS for the styling utility classes
