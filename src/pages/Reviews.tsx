
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Review {
  name: string;
  college: string;
  rating: number;
  comment: string;
  rank: string;
  batch: string;
}

const reviews: Review[] = [
  {
    name: "Raj Patel",
    college: "IIT Bombay",
    rating: 5,
    comment: "College Sarthi helped me make an informed decision about my branch selection. Their mentors provided valuable insights about campus life and future prospects.",
    rank: "AIR 1205",
    batch: "2023",
  },
  {
    name: "Priya Singh",
    college: "NIT Trichy",
    rating: 5,
    comment: "The personalized counseling sessions were incredibly helpful. They considered my interests and helped me choose the right specialization.",
    rank: "AIR 3456",
    batch: "2023",
  },
  {
    name: "Aditya Kumar",
    college: "IIT Delhi",
    rating: 4,
    comment: "Great guidance on college selection. The mentors shared their personal experiences which helped me understand the practical aspects of different branches.",
    rank: "AIR 892",
    batch: "2023",
  },
  {
    name: "Neha Sharma",
    college: "BITS Pilani",
    rating: 5,
    comment: "The mentorship program is worth every penny. They helped me understand the pros and cons of different colleges and make the right choice.",
    rank: "AIR 2145",
    batch: "2023",
  },
  {
    name: "Arjun Reddy",
    college: "IIT Madras",
    rating: 5,
    comment: "Excellent counseling service! The mentors are very knowledgeable and helped me understand the placement scenarios of different colleges.",
    rank: "AIR 567",
    batch: "2023",
  },
  {
    name: "Ananya Gupta",
    college: "NIT Surathkal",
    rating: 4,
    comment: "The rank analysis feature is amazing. It gave me a realistic picture of my options and helped me make an informed decision.",
    rank: "AIR 4567",
    batch: "2023",
  },
  {
    name: "Rohan Verma",
    college: "IIT Kanpur",
    rating: 5,
    comment: "The mentors are very supportive and available whenever needed. They provided excellent guidance throughout the counseling process.",
    rank: "AIR 789",
    batch: "2023",
  },
  {
    name: "Kavya Nair",
    college: "IIIT Hyderabad",
    rating: 5,
    comment: "Great platform for JEE counseling! The mentors helped me understand the cut-offs and admission process of different colleges.",
    rank: "AIR 3789",
    batch: "2023",
  },
  {
    name: "Karthik Raja",
    college: "IIT Kharagpur",
    rating: 4,
    comment: "The college comparison tools and insights were very helpful. Made my decision-making process much easier.",
    rank: "AIR 1678",
    batch: "2023",
  },
  {
    name: "Shreya Mehta",
    college: "DTU Delhi",
    rating: 5,
    comment: "Excellent service! The mentors provided detailed information about college culture and helped me choose the right college.",
    rank: "AIR 5678",
    batch: "2023",
  },
  {
    name: "Aman Verma",
    college: "IIIT Delhi",
    rating: 5,
    comment: "The counseling sessions were very informative. Got great insights about different branches and their future scope.",
    rank: "AIR 4123",
    batch: "2023",
  },
  {
    name: "Riya Patel",
    college: "NIT Warangal",
    rating: 4,
    comment: "Very professional service. The mentors are experienced and provide practical advice based on current industry trends.",
    rank: "AIR 6789",
    batch: "2023",
  }
];

const Reviews = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Student Reviews</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Hear from our students who successfully secured admissions in their dream colleges
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 glass-card"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-muted-foreground text-sm">{review.college}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground/90 mb-4">{review.comment}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Rank: {review.rank}</span>
                <span>Batch: {review.batch}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
