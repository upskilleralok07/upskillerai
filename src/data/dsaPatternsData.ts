// Pattern-wise DSA Problems Data
export interface PatternProblem {
  id: string;
  problemNumber?: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  link: string;
  isPremium?: boolean;
  companies?: string[];
  solution?: boolean;
}

export interface DSAPattern {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  problems: PatternProblem[];
}

export const dsaPatterns: DSAPattern[] = [
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    icon: '👆👆',
    color: 'from-blue-500 to-cyan-500',
    description: 'Use two pointers to traverse array/string from different positions to find pairs, triplets, or solve in-place problems efficiently.',
    problems: [
      { id: 'tp-1', problemNumber: '88', title: 'Merge Sorted Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/merge-sorted-array/' },
      { id: 'tp-2', problemNumber: '125', title: 'Valid Palindrome', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-palindrome/' },
      { id: 'tp-3', problemNumber: '15', title: '3Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/' },
      { id: 'tp-4', problemNumber: '19', title: 'Remove Nth Node From End of List', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
      { id: 'tp-5', problemNumber: '75', title: 'Sort Colors', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-colors/' },
      { id: 'tp-6', problemNumber: '151', title: 'Reverse Words in a String', difficulty: 'Medium', link: 'https://leetcode.com/problems/reverse-words-in-a-string/' },
      { id: 'tp-7', problemNumber: '2193', title: 'Minimum Number of Moves to Make Palindrome', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome/' },
      { id: 'tp-8', problemNumber: '2444', title: 'Count Subarrays With Fixed Bounds', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-subarrays-with-fixed-bounds/' },
      { id: 'tp-9', problemNumber: '1537', title: 'Get the Maximum Score', difficulty: 'Hard', link: 'https://leetcode.com/problems/get-the-maximum-score/' },
      { id: 'tp-10', problemNumber: '321', title: 'Create Maximum Number', difficulty: 'Hard', link: 'https://leetcode.com/problems/create-maximum-number/' },
      { id: 'tp-11', title: 'Valid Word Abbreviation', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-word-abbreviation/', isPremium: true },
      { id: 'tp-12', title: 'Strobogrammatic Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/strobogrammatic-number/', isPremium: true },
      { id: 'tp-13', title: 'Next Palindrome Using Same Digits', difficulty: 'Hard', link: 'https://leetcode.com/problems/next-palindrome-using-same-digits/', isPremium: true },
      { id: 'tp-14', title: 'Lowest Common Ancestor of a Binary Tree III', difficulty: 'Medium', link: 'https://neetcode.io/problems/lowest-common-ancestor-of-a-binary-tree-iii' },
      { id: 'tp-15', problemNumber: '2486', title: 'Append Characters to String to Make Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/append-characters-to-string-to-make-subsequence/' },
      { id: 'tp-16', problemNumber: '977', title: 'Squares of a Sorted Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/squares-of-a-sorted-array/' },
      { id: 'tp-17', problemNumber: '344', title: 'Reverse String', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-string/' },
      { id: 'tp-18', problemNumber: '680', title: 'Valid Palindrome II', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-palindrome-ii/' },
      { id: 'tp-19', problemNumber: '2824', title: 'Count Pairs Whose Sum is Less than Target', difficulty: 'Easy', link: 'https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/' },
      { id: 'tp-20', problemNumber: '1', title: 'Two Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/' },
      { id: 'tp-21', problemNumber: '167', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
    ]
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast and Slow Pointers',
    icon: '🐢🐇',
    color: 'from-green-500 to-emerald-500',
    description: 'Floyd\'s cycle detection algorithm - use two pointers moving at different speeds to detect cycles, find middle elements, and more.',
    problems: [
      { id: 'fsp-1', problemNumber: '202', title: 'Happy Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/happy-number/' },
      { id: 'fsp-2', problemNumber: '141', title: 'Linked List Cycle', difficulty: 'Easy', link: 'https://leetcode.com/problems/linked-list-cycle/' },
      { id: 'fsp-3', problemNumber: '876', title: 'Middle of the Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
      { id: 'fsp-4', problemNumber: '457', title: 'Circular Array Loop', difficulty: 'Medium', link: 'https://leetcode.com/problems/circular-array-loop/' },
      { id: 'fsp-5', problemNumber: '287', title: 'Find the Duplicate Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-the-duplicate-number/' },
      { id: 'fsp-6', problemNumber: '234', title: 'Palindrome Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/palindrome-linked-list/' },
      { id: 'fsp-7', problemNumber: '2130', title: 'Maximum Twin Sum of a Linked List', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/' },
      { id: 'fsp-8', title: 'Split a Circular Linked List', difficulty: 'Medium', link: 'https://leetcode.com/problems/split-a-circular-linked-list/', isPremium: true },
      { id: 'fsp-9', problemNumber: '142', title: 'Linked List Cycle II', difficulty: 'Medium', link: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
      { id: 'fsp-10', title: 'Find Length of Loop', difficulty: 'Medium', link: 'https://www.geeksforgeeks.org/problems/find-length-of-loop/1' },
    ]
  },
  {
    id: 'heaps',
    name: 'Heaps',
    icon: '🏔️',
    color: 'from-purple-500 to-pink-500',
    description: 'Use heap/priority queue data structure to efficiently find min/max elements, schedule tasks, and solve top-k problems.',
    problems: [
      { id: 'hp-1', problemNumber: '502', title: 'IPO', difficulty: 'Hard', link: 'https://leetcode.com/problems/ipo/' },
      { id: 'hp-2', problemNumber: '295', title: 'Find Median from Data Stream', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/' },
      { id: 'hp-3', problemNumber: '480', title: 'Sliding Window Median', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-median/' },
      { id: 'hp-4', problemNumber: '621', title: 'Task Scheduler', difficulty: 'Medium', link: 'https://leetcode.com/problems/task-scheduler/' },
      { id: 'hp-5', problemNumber: '2402', title: 'Meeting Rooms III', difficulty: 'Hard', link: 'https://leetcode.com/problems/meeting-rooms-iii/' },
      { id: 'hp-6', problemNumber: '2231', title: 'Largest Number After Digit Swaps by Parity', difficulty: 'Easy', link: 'https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/' },
      { id: 'hp-7', problemNumber: '436', title: 'Find Right Interval', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-right-interval/' },
      { id: 'hp-8', title: 'Minimum Cost to Connect Sticks', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/', isPremium: true },
      { id: 'hp-9', problemNumber: '1405', title: 'Longest Happy String', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-happy-string/' },
      { id: 'hp-10', problemNumber: '1792', title: 'Maximum Average Pass Ratio', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-average-pass-ratio/' },
      { id: 'hp-11', problemNumber: '1942', title: 'The Number of the Smallest Unoccupied Chair', difficulty: 'Medium', link: 'https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/' },
      { id: 'hp-12', problemNumber: '1354', title: 'Construct Target Array With Multiple Sums', difficulty: 'Hard', link: 'https://leetcode.com/problems/construct-target-array-with-multiple-sums/' },
    ]
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    icon: '🪟',
    color: 'from-orange-500 to-amber-500',
    description: 'Use a window that slides over data to find subarrays/substrings satisfying certain conditions in O(n) time.',
    problems: [
      { id: 'sw-1', problemNumber: '187', title: 'Repeated DNA Sequences', difficulty: 'Medium', link: 'https://leetcode.com/problems/repeated-dna-sequences/' },
      { id: 'sw-2', problemNumber: '239', title: 'Sliding Window Maximum', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/' },
      { id: 'sw-3', title: 'Minimum Window Subsequence', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-subsequence/', isPremium: true },
      { id: 'sw-4', problemNumber: '424', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
      { id: 'sw-5', problemNumber: '76', title: 'Minimum Window Substring', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/' },
      { id: 'sw-6', problemNumber: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { id: 'sw-7', problemNumber: '209', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
      { id: 'sw-8', problemNumber: '643', title: 'Maximum Average Subarray I', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
    ]
  },
  {
    id: 'intervals',
    name: 'Intervals',
    icon: '📊',
    color: 'from-red-500 to-rose-500',
    description: 'Handle overlapping intervals, merge intervals, find gaps, and solve scheduling problems using sorting and sweep line algorithms.',
    problems: [
      { id: 'iv-1', problemNumber: '56', title: 'Merge Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/merge-intervals/' },
      { id: 'iv-2', problemNumber: '57', title: 'Insert Interval', difficulty: 'Medium', link: 'https://leetcode.com/problems/insert-interval/' },
      { id: 'iv-3', problemNumber: '986', title: 'Interval List Intersections', difficulty: 'Medium', link: 'https://leetcode.com/problems/interval-list-intersections/' },
      { id: 'iv-4', title: 'Employee Free Time', difficulty: 'Hard', link: 'https://leetcode.com/problems/employee-free-time/', isPremium: true },
      { id: 'iv-5', problemNumber: '3169', title: 'Count Days Without Meetings', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-days-without-meetings/' },
      { id: 'iv-6', problemNumber: '1288', title: 'Remove Covered Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-covered-intervals/' },
      { id: 'iv-7', problemNumber: '1094', title: 'Car Pooling', difficulty: 'Medium', link: 'https://leetcode.com/problems/car-pooling/' },
      { id: 'iv-8', problemNumber: '352', title: 'Data Stream as Disjoint Intervals', difficulty: 'Hard', link: 'https://leetcode.com/problems/data-stream-as-disjoint-intervals/' },
      { id: 'iv-9', title: 'Meeting Rooms II (Line Sweep)', difficulty: 'Medium', link: 'https://www.geeksforgeeks.org/meeting-rooms-ii/' },
      { id: 'iv-10', problemNumber: '56', title: 'Merge Intervals (Brute Force)', difficulty: 'Medium', link: 'https://leetcode.com/problems/merge-intervals/' },
    ]
  }
];

export const getPatternById = (id: string): DSAPattern | undefined => {
  return dsaPatterns.find(pattern => pattern.id === id);
};

export const getPatternStats = () => {
  const totalPatterns = dsaPatterns.length;
  const totalProblems = dsaPatterns.reduce((sum, pattern) => sum + pattern.problems.length, 0);
  const easyCount = dsaPatterns.reduce((sum, pattern) => 
    sum + pattern.problems.filter(p => p.difficulty === 'Easy').length, 0);
  const mediumCount = dsaPatterns.reduce((sum, pattern) => 
    sum + pattern.problems.filter(p => p.difficulty === 'Medium').length, 0);
  const hardCount = dsaPatterns.reduce((sum, pattern) => 
    sum + pattern.problems.filter(p => p.difficulty === 'Hard').length, 0);
  
  return { totalPatterns, totalProblems, easyCount, mediumCount, hardCount };
};
