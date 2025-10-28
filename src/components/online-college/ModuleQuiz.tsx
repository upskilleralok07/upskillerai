import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trophy, X } from "lucide-react";
import confetti from "canvas-confetti";

interface ModuleQuizProps {
  topicId: string;
  studentId: string;
  topicTitle: string;
  onComplete: () => void;
  onClose: () => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

const ModuleQuiz = ({ topicId, studentId, topicTitle, onComplete, onClose }: ModuleQuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [topicId]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz_questions" as any)
        .select("*")
        .eq("topic_id", topicId)
        .limit(5);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setQuestions(data.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options as string[],
          correct_answer: q.correct_answer
        })));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load quiz questions");
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer");
      return;
    }

    const isCorrect = parseInt(selectedAnswer) === questions[currentQuestion].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      finishQuiz(isCorrect ? score + 1 : score);
    }
  };

  const finishQuiz = async (finalScore: number) => {
    const passed = finalScore >= 3; // Need 3/5 to pass
    
    try {
      const { error } = await supabase
        .from("quiz_attempts" as any)
        .insert({
          student_id: studentId,
          topic_id: topicId,
          score: finalScore,
          total_questions: questions.length,
          passed
        });

      if (error) throw error;

      if (passed) {
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Mark topic as completed
        const { error: progressError } = await supabase
          .from("student_topic_progress")
          .upsert({
            student_id: studentId,
            group_id: topicId,
            topic_id: topicId,
            is_completed: true,
            completed_at: new Date().toISOString()
          });

        if (progressError) throw progressError;

        toast.success("🎉 Congratulations! Module unlocked!");
        onComplete();
      } else {
        toast.error("You need 3/5 to pass. Try again!");
      }
      
      setShowResult(true);
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
      toast.error("Failed to save quiz results");
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading quiz...</div>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="mb-4">Quiz questions not available yet for this module.</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </Card>
    );
  }

  if (showResult) {
    const passed = score >= 3;
    return (
      <Card className="p-8 text-center">
        {passed ? (
          <>
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-lg mb-4">
              You scored {score}/{questions.length}
            </p>
            <p className="text-muted-foreground mb-6">
              Next module unlocked! Keep up the great work!
            </p>
          </>
        ) : (
          <>
            <X className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-2xl font-bold mb-2">Keep Trying!</h3>
            <p className="text-lg mb-4">
              You scored {score}/{questions.length}
            </p>
            <p className="text-muted-foreground mb-6">
              You need at least 3/5 to pass. Review the material and try again!
            </p>
          </>
        )}
        <Button onClick={onClose}>Close</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{topicTitle} - Quiz</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}/{currentQuestion}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">
          {questions[currentQuestion].question}
        </h4>
        
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button onClick={handleNext} className="w-full">
        {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
      </Button>
    </Card>
  );
};

export default ModuleQuiz;
