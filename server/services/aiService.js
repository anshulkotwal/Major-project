const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIResponse(message, chatHistory) {
  try {
    // Smart mock AI responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    // Math/Science topics
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra')) {
      return `Great question about mathematics! Here's what I can help you with:

📐 **Key Concepts:**
- Start with fundamentals and build up gradually
- Practice regularly with different problem types
- Understand the 'why' behind formulas, not just memorization

📚 **Recommended Resources:**
- Khan Academy for step-by-step tutorials
- Practice problems on Brilliant.org
- YouTube: 3Blue1Brown for visual explanations

💡 **Study Tip:** Break complex problems into smaller steps and solve them one at a time!

What specific topic would you like to explore?`;
    }
    
    if (lowerMessage.includes('physics') || lowerMessage.includes('science')) {
      return `Physics is fascinating! Let me help you understand it better:

🔬 **Learning Approach:**
- Connect concepts to real-world examples
- Draw diagrams to visualize problems
- Practice numerical problems regularly

📖 **Best Resources:**
- Khan Academy Physics
- PhET Interactive Simulations
- YouTube: Physics Girl, Veritasium

🎯 **Pro Tip:** Always write down what you know, what you need to find, and the relevant formulas before solving!

Which physics topic are you studying?`;
    }
    
    if (lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('javascript') || lowerMessage.includes('python')) {
      return `Coding is an amazing skill! Here's how to master it:

💻 **Learning Path:**
1. Start with basics (variables, loops, functions)
2. Build small projects to practice
3. Read others' code to learn patterns
4. Debug and fix errors patiently

🛠️ **Best Platforms:**
- freeCodeCamp for structured learning
- LeetCode for practice problems
- GitHub for real-world code examples

✨ **Key Tip:** Code every day, even if just for 30 minutes. Consistency beats intensity!

What programming language are you learning?`;
    }
    
    if (lowerMessage.includes('chemistry') || lowerMessage.includes('chemical')) {
      return `Chemistry can be fun when you understand the patterns!

⚗️ **Study Strategy:**
- Memorize the periodic table gradually
- Understand reaction mechanisms, not just equations
- Practice balancing equations daily

📚 **Resources:**
- Khan Academy Chemistry
- Crash Course Chemistry (YouTube)
- ChemCollective for virtual labs

🧪 **Remember:** Chemistry is about understanding how atoms interact. Visualize the molecules!

What chemistry topic do you need help with?`;
    }
    
    if (lowerMessage.includes('history') || lowerMessage.includes('geography')) {
      return `History and Geography are stories of our world!

🌍 **Effective Learning:**
- Create timelines to connect events
- Use maps to visualize locations
- Connect historical events to current affairs

📖 **Great Resources:**
- Crash Course History (YouTube)
- National Geographic
- BBC History documentaries

💡 **Memory Trick:** Create stories or mnemonics to remember dates and facts!

Which period or region are you studying?`;
    }
    
    if (lowerMessage.includes('english') || lowerMessage.includes('grammar') || lowerMessage.includes('writing')) {
      return `Let's improve your English skills!

📝 **Writing Better:**
- Read widely to expand vocabulary
- Practice writing daily (even short paragraphs)
- Get feedback and revise your work

📚 **Resources:**
- Grammarly for grammar checking
- Hemingway Editor for clarity
- Read classic literature and modern articles

✍️ **Pro Tip:** The best writers are avid readers. Read for 20 minutes daily!

What aspect of English do you want to improve?`;
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('preparation')) {
      return `Exam preparation strategy for success:

📅 **Study Plan:**
1. Start early (at least 2 weeks before)
2. Break syllabus into daily chunks
3. Practice previous year papers
4. Take mock tests regularly

🎯 **During Exam:**
- Read all questions first
- Attempt easy ones first
- Manage time wisely
- Review answers if time permits

💪 **Stay Healthy:**
- Sleep 7-8 hours
- Eat nutritious food
- Take short breaks while studying
- Stay hydrated

You've got this! What subject are you preparing for?`;
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('stressed') || lowerMessage.includes('difficult')) {
      return `I understand learning can be challenging sometimes. Here's some encouragement:

💪 **Remember:**
- Every expert was once a beginner
- Mistakes are proof you're trying
- Progress, not perfection, is the goal
- Small daily efforts lead to big results

🌟 **Stay Motivated:**
- Set small, achievable goals
- Celebrate small wins
- Take breaks when needed
- Ask for help when stuck

🎯 **You're doing great by seeking help!** That's the first step to improvement.

What specific challenge are you facing? Let's tackle it together!`;
    }
    
    // Default helpful response
    return `Hello! I'm your AI learning assistant. I'm here to help you learn better! 🎓

I can help you with:
📚 **Subject Help:** Math, Science, Programming, English, History, and more
📝 **Study Tips:** Effective learning strategies and techniques
🎯 **Exam Prep:** Preparation strategies and time management
💡 **Concept Clarity:** Breaking down complex topics
🔗 **Resources:** Recommending best learning materials

**Popular topics students ask about:**
- "Help me with calculus"
- "Explain photosynthesis"
- "How to learn JavaScript?"
- "Study tips for exams"
- "I'm feeling stressed about studies"

What would you like to learn about today? Just ask me anything! 😊`;
    
  } catch (err) {
    console.error('AI Service Error:', err);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}

async function generateRecommendations(performances) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const topicScores = {};
    performances.forEach(p => {
      if (!topicScores[p.topic]) {
        topicScores[p.topic] = [];
      }
      topicScores[p.topic].push(p.score);
    });

    const weakTopics = Object.entries(topicScores)
      .map(([topic, scores]) => ({
        topic,
        avgScore: scores.reduce((a, b) => a + b, 0) / scores.length
      }))
      .filter(t => t.avgScore < 70)
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 3)
      .map(t => t.topic);

    const prompt = `Based on student performance data, they are struggling with: ${weakTopics.join(', ')}.
    
Generate a JSON response with:
1. A personalized study plan (2-3 sentences)
2. 3 recommended YouTube video titles for these topics
3. 3 next topics to study
4. 2 learning resources

Format: { "studyPlan": "...", "videoTitles": [...], "nextTopics": [...], "resources": [...] }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      studyPlan: 'Focus on practicing weak topics regularly.',
      videoTitles: weakTopics.map(t => `${t} Tutorial for Beginners`),
      nextTopics: ['Review basics', 'Practice problems', 'Take quizzes'],
      resources: ['Khan Academy', 'Coursera']
    };

    return {
      weakTopics,
      studyPlan: aiData.studyPlan,
      videos: aiData.videoTitles.map((title, i) => ({
        title,
        url: `https://youtube.com/results?search_query=${encodeURIComponent(title)}`,
        thumbnail: `https://via.placeholder.com/320x180?text=Video+${i + 1}`
      })),
      resources: aiData.resources.map(r => ({
        title: r,
        url: '#',
        type: 'article'
      })),
      nextTopics: aiData.nextTopics
    };
  } catch (err) {
    console.error('Recommendation Error:', err);
    return {
      weakTopics: [],
      studyPlan: 'Keep practicing and reviewing your materials.',
      videos: [],
      resources: [],
      nextTopics: []
    };
  }
}

async function getChatResponse(message, chatHistory) {
  return generateAIResponse(message, chatHistory);
}

async function generateRecommendationsForStudent(studentId, topic, score) {
  const Recommendation = require('../models/Recommendation');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  try {
    const prompt = `A student scored ${score}% on ${topic}. Generate 3 personalized learning recommendations.
    
Format as JSON: [
  { "type": "video", "title": "...", "description": "...", "url": "...", "priority": "high" },
  { "type": "article", "title": "...", "description": "...", "url": "...", "priority": "medium" },
  { "type": "topic", "title": "...", "description": "...", "priority": "medium" }
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : [
      { type: 'video', title: `${topic} Tutorial`, description: 'Learn the basics', priority: 'high' },
      { type: 'article', title: `${topic} Guide`, description: 'Comprehensive guide', priority: 'medium' },
      { type: 'topic', title: `Practice ${topic}`, description: 'Practice problems', priority: 'medium' }
    ];
    
    for (const rec of recommendations) {
      await Recommendation.create({
        studentId,
        type: rec.type,
        content: {
          title: rec.title,
          description: rec.description,
          url: rec.url || `https://youtube.com/results?search_query=${encodeURIComponent(rec.title)}`
        },
        topic,
        priority: rec.priority
      });
    }
  } catch (err) {
    console.error('Generate recommendations error:', err);
  }
}

module.exports = { 
  generateAIResponse, 
  generateRecommendations,
  getChatResponse,
  generateRecommendations: generateRecommendationsForStudent
};
