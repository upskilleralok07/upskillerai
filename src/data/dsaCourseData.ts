// DSA Calendar 2026 - Complete 3-Phase Learning Path
// Based on structured approach: Foundation → DSA Preparation → Problem Solving

export interface DSAProblem {
  id: number;
  title: string;
  link: string;
  leetcode?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies?: string[];
  prerequisites?: string[];
  solution: 'locked' | 'unlocked';
  solved?: boolean;
}

export interface DSAPattern {
  id: string;
  name: string;
  duration: string;
  minProblems: string;
  importance: number; // 1-5 stars
  difficulty: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  tags: string[];
  problems: DSAProblem[];
}

export interface DSATopic {
  id: string;
  name: string;
  icon: string;
  color: string;
  duration: string;
  minProblems: string;
  importance: number; // 1-5 stars
  difficulty: string;
  description: string;
  phase: 1 | 2 | 3;
  tags: string[];
  patterns: DSAPattern[];
  videoId?: string;
  template?: string;
  whenToUse?: string[];
}

export interface DSAPhase {
  id: number;
  name: string;
  title: string;
  description: string;
  duration: string;
  color: string;
  icon: string;
  topics: DSATopic[];
}

// Phase 1: Foundation Level (0 → Beginner)
const phase1Topics: DSATopic[] = [
  {
    id: 'time-space-complexity',
    name: 'Time & Space Complexity',
    icon: '⏱️',
    color: 'from-slate-500 to-gray-600',
    duration: '2-3 Days',
    minProblems: '10-15',
    importance: 5,
    difficulty: 'Easy',
    description: 'Understand how to analyze algorithm efficiency. This is the foundation for writing optimal code.',
    phase: 1,
    tags: ['Basics', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Before writing any algorithm',
      'Comparing different solutions',
      'Optimizing existing code',
      'Interview discussions about efficiency'
    ],
    template: `# Time Complexity Analysis
# O(1) - Constant
arr[0]

# O(log n) - Logarithmic
binary_search(arr, target)

# O(n) - Linear
for i in range(n): pass

# O(n log n) - Linearithmic
arr.sort()

# O(n²) - Quadratic
for i in range(n):
    for j in range(n): pass`,
    patterns: [
      {
        id: 'big-o-analysis',
        name: 'Big-O Analysis',
        duration: '1-2 Days',
        minProblems: '10-15',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Basics', 'Foundation'],
        problems: [
          { id: 1, title: 'Time Complexity of Loop', link: 'https://www.geeksforgeeks.org/practice-questions-time-complexity-analysis/', difficulty: 'Easy', solution: 'locked' },
          { id: 2, title: 'Space Complexity Basics', link: 'https://www.geeksforgeeks.org/g-fact-86/', difficulty: 'Easy', solution: 'locked' },
          { id: 3, title: 'Recursive Time Complexity', link: 'https://www.geeksforgeeks.org/time-complexity-of-a-recursive-function/', difficulty: 'Easy', solution: 'locked' },
        ]
      }
    ]
  }
];

// Phase 2: DSA Topics with Patterns
const phase2Topics: DSATopic[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    duration: '2 Weeks',
    minProblems: '40-50',
    importance: 5,
    difficulty: 'Easy-Medium',
    description: 'Master array manipulation, sorting, searching, and optimization techniques. Arrays are the foundation of DSA.',
    phase: 2,
    tags: ['Core', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Sequential data processing',
      'Finding patterns in data',
      'Optimization with two pointers',
      'Hash-based O(1) lookups'
    ],
    template: `def two_pointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
    patterns: [
      {
        id: 'two-pointers',
        name: 'Two Pointers',
        duration: '2-3 Days',
        minProblems: '15-20',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Two Sum II', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', leetcode: 'LC #167', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water/', leetcode: 'LC #11', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 3, title: '3Sum', link: 'https://leetcode.com/problems/3sum/', leetcode: 'LC #15', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 4, title: 'Remove Duplicates from Sorted Array', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', leetcode: 'LC #26', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 5, title: 'Move Zeroes', link: 'https://leetcode.com/problems/move-zeroes/', leetcode: 'LC #283', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 6, title: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', leetcode: 'LC #125', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 7, title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', leetcode: 'LC #42', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs'], solution: 'locked' },
          { id: 8, title: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors/', leetcode: 'LC #75', difficulty: 'Medium', companies: ['Microsoft', 'Amazon', 'Facebook'], solution: 'locked', prerequisites: ['Sorting'] },
        ]
      },
      {
        id: 'sliding-window',
        name: 'Sliding Window',
        duration: '2 Days',
        minProblems: '10-15',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Maximum Average Subarray', link: 'https://leetcode.com/problems/maximum-average-subarray-i/', leetcode: 'LC #643', difficulty: 'Easy', solution: 'locked' },
          { id: 2, title: 'Longest Substring Without Repeating', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', leetcode: 'LC #3', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'], solution: 'locked' },
          { id: 3, title: 'Minimum Size Subarray Sum', link: 'https://leetcode.com/problems/minimum-size-subarray-sum/', leetcode: 'LC #209', difficulty: 'Medium', companies: ['Microsoft', 'Goldman Sachs'], solution: 'locked' },
          { id: 4, title: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', leetcode: 'LC #567', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], solution: 'locked' },
          { id: 5, title: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', leetcode: 'LC #239', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
        ]
      },
      {
        id: 'prefix-sums',
        name: 'Prefix Sums',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Running Sum of 1d Array', link: 'https://leetcode.com/problems/running-sum-of-1d-array/', leetcode: 'LC #1480', difficulty: 'Easy', solution: 'locked' },
          { id: 2, title: 'Subarray Sum Equals K', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', leetcode: 'LC #560', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
          { id: 3, title: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self/', leetcode: 'LC #238', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
        ]
      },
      {
        id: 'kadanes-algorithm',
        name: "Kadane's Algorithm",
        duration: '1 Day',
        minProblems: '5-6',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', leetcode: 'LC #53', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple', 'LinkedIn'], solution: 'locked' },
          { id: 2, title: 'Maximum Sum Circular Subarray', link: 'https://leetcode.com/problems/maximum-sum-circular-subarray/', leetcode: 'LC #918', difficulty: 'Medium', solution: 'locked' },
          { id: 3, title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', leetcode: 'LC #121', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'merge-intervals',
        name: 'Merge Intervals',
        duration: '2 Days',
        minProblems: '10-12',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals/', leetcode: 'LC #56', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Insert Interval', link: 'https://leetcode.com/problems/insert-interval/', leetcode: 'LC #57', difficulty: 'Medium', companies: ['Google', 'LinkedIn'], solution: 'locked' },
          { id: 3, title: 'Meeting Rooms II', link: 'https://leetcode.com/problems/meeting-rooms-ii/', leetcode: 'LC #253', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'dutch-national-flag',
        name: 'Dutch National Flag',
        duration: '1 Day',
        minProblems: '4-5',
        importance: 3,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors/', leetcode: 'LC #75', difficulty: 'Medium', companies: ['Microsoft', 'Amazon', 'Facebook'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'strings',
    name: 'Strings',
    icon: '📝',
    color: 'from-green-500 to-teal-500',
    duration: '1 Week',
    minProblems: '25-30',
    importance: 4,
    difficulty: 'Easy-Medium',
    description: 'Master string manipulation, pattern matching, and common string algorithms.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Text processing problems',
      'Pattern matching',
      'Palindrome detection',
      'Anagram problems'
    ],
    template: `def two_pointer_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
    patterns: [
      {
        id: 'string-two-pointers',
        name: 'Two Pointers',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', leetcode: 'LC #125', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Valid Palindrome II', link: 'https://leetcode.com/problems/valid-palindrome-ii/', leetcode: 'LC #680', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 3, title: 'Reverse String', link: 'https://leetcode.com/problems/reverse-string/', leetcode: 'LC #344', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'string-sliding-window',
        name: 'Sliding Window',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', leetcode: 'LC #76', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', leetcode: 'LC #438', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 3, title: 'Longest Repeating Character Replacement', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', leetcode: 'LC #424', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'anagram-pattern',
        name: 'Anagram Pattern',
        duration: '1 Day',
        minProblems: '5-6',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram/', leetcode: 'LC #242', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', leetcode: 'LC #49', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'trie-based',
        name: 'Trie Based Problems',
        duration: '2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Implement Trie', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', leetcode: 'LC #208', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Word Search II', link: 'https://leetcode.com/problems/word-search-ii/', leetcode: 'LC #212', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'recursion',
    name: 'Recursion Basics',
    icon: '🔄',
    color: 'from-orange-500 to-red-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 5,
    difficulty: 'Medium',
    description: 'Master recursive thinking patterns essential for trees, graphs, and dynamic programming.',
    phase: 2,
    tags: ['Core', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Tree traversals',
      'Divide and conquer',
      'Generating combinations/permutations',
      'Problems with overlapping subproblems'
    ],
    template: `def recursion(input):
    # Base case
    if base_condition:
        return base_value
    
    # Recursive case
    return combine(
        recursion(smaller_input)
    )`,
    patterns: [
      {
        id: 'basic-recursion',
        name: 'Basic Recursive Functions',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Fibonacci Number', link: 'https://leetcode.com/problems/fibonacci-number/', leetcode: 'LC #509', difficulty: 'Easy', solution: 'locked' },
          { id: 2, title: 'Pow(x, n)', link: 'https://leetcode.com/problems/powx-n/', leetcode: 'LC #50', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 3, title: 'Reverse String', link: 'https://leetcode.com/problems/reverse-string/', leetcode: 'LC #344', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'backtracking',
        name: 'Backtracking',
        duration: '2-3 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Medium-Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Subsets', link: 'https://leetcode.com/problems/subsets/', leetcode: 'LC #78', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Permutations', link: 'https://leetcode.com/problems/permutations/', leetcode: 'LC #46', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 3, title: 'Combination Sum', link: 'https://leetcode.com/problems/combination-sum/', leetcode: 'LC #39', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 4, title: 'N-Queens', link: 'https://leetcode.com/problems/n-queens/', leetcode: 'LC #51', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 5, title: 'Sudoku Solver', link: 'https://leetcode.com/problems/sudoku-solver/', leetcode: 'LC #37', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 6, title: 'Word Search', link: 'https://leetcode.com/problems/word-search/', leetcode: 'LC #79', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Bloomberg'], solution: 'locked' },
        ]
      },
      {
        id: 'recursion-to-dp',
        name: 'Recursion → DP Conversion',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs/', leetcode: 'LC #70', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 2, title: 'House Robber', link: 'https://leetcode.com/problems/house-robber/', leetcode: 'LC #198', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: '🔗',
    color: 'from-indigo-500 to-purple-500',
    duration: '1 Week',
    minProblems: '25-30',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master linked list operations, reversal patterns, and cycle detection.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Dynamic data structures',
      'In-place reversal',
      'Cycle detection',
      'Merging sorted lists'
    ],
    template: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def reverse(head):
    prev = None
    while head:
        next = head.next
        head.next = prev
        prev = head
        head = next
    return prev`,
    patterns: [
      {
        id: 'fast-slow-pointers',
        name: 'Fast & Slow Pointers',
        duration: '2 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Middle of Linked List', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', leetcode: 'LC #876', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Linked List Cycle', link: 'https://leetcode.com/problems/linked-list-cycle/', leetcode: 'LC #141', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 3, title: 'Linked List Cycle II', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', leetcode: 'LC #142', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 4, title: 'Palindrome Linked List', link: 'https://leetcode.com/problems/palindrome-linked-list/', leetcode: 'LC #234', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'in-place-reversal',
        name: 'In-Place Reversal',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Reverse Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/', leetcode: 'LC #206', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], solution: 'locked' },
          { id: 2, title: 'Reverse Linked List II', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', leetcode: 'LC #92', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 3, title: 'Reverse Nodes in k-Group', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', leetcode: 'LC #25', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'merge-intersection',
        name: 'Merge & Intersection',
        duration: '1 Day',
        minProblems: '5-6',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', leetcode: 'LC #21', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 2, title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', leetcode: 'LC #23', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'stack',
    name: 'Stack',
    icon: '📚',
    color: 'from-yellow-500 to-orange-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master stack operations, monotonic stacks, and expression evaluation.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'LIFO operations',
      'Parsing expressions',
      'Next greater/smaller element',
      'Matching brackets'
    ],
    template: `# Monotonic Stack Pattern
stack = []
result = [-1] * n

for i in range(n):
    while stack and arr[stack[-1]] < arr[i]:
        idx = stack.pop()
        result[idx] = arr[i]
    stack.append(i)`,
    patterns: [
      {
        id: 'monotonic-stack',
        name: 'Monotonic Stack',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Next Greater Element I', link: 'https://leetcode.com/problems/next-greater-element-i/', leetcode: 'LC #496', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Next Greater Element II', link: 'https://leetcode.com/problems/next-greater-element-ii/', leetcode: 'LC #503', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 3, title: 'Daily Temperatures', link: 'https://leetcode.com/problems/daily-temperatures/', leetcode: 'LC #739', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'histogram-pattern',
        name: 'Histogram Pattern',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', leetcode: 'LC #84', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Maximal Rectangle', link: 'https://leetcode.com/problems/maximal-rectangle/', leetcode: 'LC #85', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
        ]
      },
      {
        id: 'expression-evaluation',
        name: 'Expression Evaluation',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses/', leetcode: 'LC #20', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Basic Calculator', link: 'https://leetcode.com/problems/basic-calculator/', leetcode: 'LC #224', difficulty: 'Hard', companies: ['Google', 'Amazon'], solution: 'locked' },
          { id: 3, title: 'Basic Calculator II', link: 'https://leetcode.com/problems/basic-calculator-ii/', leetcode: 'LC #227', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'queue',
    name: 'Queue & Deque',
    icon: '🚶',
    color: 'from-cyan-500 to-blue-500',
    duration: '3-4 Days',
    minProblems: '15-20',
    importance: 3,
    difficulty: 'Easy-Medium',
    description: 'Master queue operations and sliding window optimizations with deque.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'BFS traversal',
      'Sliding window max/min',
      'Level order processing',
      'Task scheduling'
    ],
    template: `from collections import deque

# Sliding Window with Deque
def sliding_window_max(nums, k):
    dq = deque()  # stores indices
    result = []
    
    for i in range(len(nums)):
        # Remove indices out of window
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result`,
    patterns: [
      {
        id: 'sliding-window-deque',
        name: 'Sliding Window + Monotonic Queue',
        duration: '2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', leetcode: 'LC #239', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'hashing',
    name: 'Hashing',
    icon: '#️⃣',
    color: 'from-violet-500 to-purple-500',
    duration: '1 Week',
    minProblems: '25-30',
    importance: 5,
    difficulty: 'Medium',
    description: 'Master hash tables for O(1) lookups and frequency counting.',
    phase: 2,
    tags: ['Core', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'O(1) lookup needed',
      'Counting frequencies',
      'Finding duplicates',
      'Two sum variants'
    ],
    template: `# HashMap for frequency
from collections import Counter

freq = Counter(arr)

# HashSet for O(1) lookup
seen = set()
for num in arr:
    if target - num in seen:
        return True
    seen.add(num)`,
    patterns: [
      {
        id: 'hashmap-frequency',
        name: 'HashMap / Frequency',
        duration: '2 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum/', leetcode: 'LC #1', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 2, title: 'Contains Duplicate', link: 'https://leetcode.com/problems/contains-duplicate/', leetcode: 'LC #217', difficulty: 'Easy', companies: ['Amazon', 'Apple'], solution: 'locked' },
          { id: 3, title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', leetcode: 'LC #347', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 4, title: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', leetcode: 'LC #128', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search (Pattern)',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    duration: '1 Week',
    minProblems: '25-30',
    importance: 5,
    difficulty: 'Medium',
    description: 'Master binary search variations for sorted arrays and answer-based problems.',
    phase: 2,
    tags: ['Core', 'Pattern'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Sorted array search',
      'Finding boundaries',
      'Answer on a range',
      'Optimization problems'
    ],
    template: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
    patterns: [
      {
        id: 'basic-binary-search',
        name: 'Basic Binary Search',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/', leetcode: 'LC #704', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 2, title: 'Search Insert Position', link: 'https://leetcode.com/problems/search-insert-position/', leetcode: 'LC #35', difficulty: 'Easy', solution: 'locked' },
          { id: 3, title: 'First Bad Version', link: 'https://leetcode.com/problems/first-bad-version/', leetcode: 'LC #278', difficulty: 'Easy', companies: ['Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'binary-search-on-answer',
        name: 'Binary Search on Answer',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium-Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas/', leetcode: 'LC #875', difficulty: 'Medium', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Capacity To Ship Packages', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', leetcode: 'LC #1011', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 3, title: 'Split Array Largest Sum', link: 'https://leetcode.com/problems/split-array-largest-sum/', leetcode: 'LC #410', difficulty: 'Hard', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 4, title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', leetcode: 'LC #4', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], solution: 'locked' },
        ]
      },
      {
        id: 'allocation-problems',
        name: 'Allocation Problems',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Allocate Minimum Pages', link: 'https://www.geeksforgeeks.org/allocate-minimum-number-pages/', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Aggressive Cows', link: 'https://www.spoj.com/problems/AGGRCOW/', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    icon: '🌲',
    color: 'from-emerald-500 to-green-500',
    duration: '2 Weeks',
    minProblems: '40-50',
    importance: 5,
    difficulty: 'Medium',
    description: 'Master tree traversals, properties, and common tree patterns.',
    phase: 2,
    tags: ['Core', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Hierarchical data',
      'Traversal problems',
      'Tree construction',
      'Path finding'
    ],
    template: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)`,
    patterns: [
      {
        id: 'tree-traversals',
        name: 'Traversals',
        duration: '2 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Binary Tree Inorder Traversal', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', leetcode: 'LC #94', difficulty: 'Easy', solution: 'locked' },
          { id: 2, title: 'Binary Tree Preorder Traversal', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', leetcode: 'LC #144', difficulty: 'Easy', solution: 'locked' },
          { id: 3, title: 'Binary Tree Postorder Traversal', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', leetcode: 'LC #145', difficulty: 'Easy', solution: 'locked' },
          { id: 4, title: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', leetcode: 'LC #102', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'tree-construction',
        name: 'Construction',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Construct Binary Tree from Preorder and Inorder', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', leetcode: 'LC #105', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Maximum Binary Tree', link: 'https://leetcode.com/problems/maximum-binary-tree/', leetcode: 'LC #654', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'lca-diameter',
        name: 'LCA & Diameter',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Diameter of Binary Tree', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', leetcode: 'LC #543', difficulty: 'Easy', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
          { id: 2, title: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', leetcode: 'LC #236', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'tree-path-sum',
        name: 'Path Sum / Root to Leaf',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Path Sum', link: 'https://leetcode.com/problems/path-sum/', leetcode: 'LC #112', difficulty: 'Easy', solution: 'locked' },
          { id: 2, title: 'Path Sum II', link: 'https://leetcode.com/problems/path-sum-ii/', leetcode: 'LC #113', difficulty: 'Medium', solution: 'locked' },
          { id: 3, title: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', leetcode: 'LC #124', difficulty: 'Hard', companies: ['Facebook', 'Microsoft', 'Amazon', 'Google'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'bst',
    name: 'Binary Search Tree (BST)',
    icon: '🌳',
    color: 'from-lime-500 to-green-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master BST properties, validation, and search operations.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Ordered data structure',
      'Range queries',
      'Predecessor/successor',
      'Validation problems'
    ],
    template: `def validate_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    
    if root.val <= min_val or root.val >= max_val:
        return False
    
    return (validate_bst(root.left, min_val, root.val) and
            validate_bst(root.right, root.val, max_val))`,
    patterns: [
      {
        id: 'bst-validation',
        name: 'Validation & Properties',
        duration: '1 Day',
        minProblems: '5-6',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', leetcode: 'LC #98', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', leetcode: 'LC #230', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    icon: '⛰️',
    color: 'from-red-500 to-rose-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master heap operations for efficient priority-based problems.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Top K problems',
      'Merge K sorted lists',
      'Streaming median',
      'Priority scheduling'
    ],
    template: `import heapq

# Min heap (default)
heap = []
heapq.heappush(heap, val)
smallest = heapq.heappop(heap)

# Max heap (negate values)
heapq.heappush(heap, -val)
largest = -heapq.heappop(heap)`,
    patterns: [
      {
        id: 'top-k-elements',
        name: 'Kth Largest / Smallest',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', leetcode: 'LC #215', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', leetcode: 'LC #347', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'merge-k-lists',
        name: 'Merge K Lists',
        duration: '1 Day',
        minProblems: '4-5',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', leetcode: 'LC #23', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'streaming-median',
        name: 'Streaming Data (Median)',
        duration: '1-2 Days',
        minProblems: '4-6',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Find Median from Data Stream', link: 'https://leetcode.com/problems/find-median-from-data-stream/', leetcode: 'LC #295', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'greedy',
    name: 'Greedy Algorithms',
    icon: '🎯',
    color: 'from-amber-500 to-yellow-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master greedy approach for optimization problems.',
    phase: 2,
    tags: ['Advanced'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Local optimal leads to global optimal',
      'Activity selection',
      'Interval scheduling',
      'Huffman coding'
    ],
    template: `def greedy_activity_selection(activities):
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    
    result = [activities[0]]
    last_end = activities[0][1]
    
    for start, end in activities[1:]:
        if start >= last_end:
            result.append((start, end))
            last_end = end
    
    return result`,
    patterns: [
      {
        id: 'interval-scheduling',
        name: 'Interval Scheduling',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Non-overlapping Intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/', leetcode: 'LC #435', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
          { id: 2, title: 'Minimum Number of Arrows to Burst Balloons', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', leetcode: 'LC #452', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    icon: '📈',
    color: 'from-pink-500 to-rose-500',
    duration: '3-4 Weeks',
    minProblems: '50-60',
    importance: 5,
    difficulty: 'Hard',
    description: 'Master DP patterns for complex optimization problems.',
    phase: 2,
    tags: ['Core', 'Advanced'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Overlapping subproblems',
      'Optimal substructure',
      'Counting problems',
      'Optimization over sequences'
    ],
    template: `# Bottom-up DP Template
def dp_solution(n):
    dp = [0] * (n + 1)
    dp[0] = base_case
    
    for i in range(1, n + 1):
        dp[i] = transition(dp[i-1], ...)
    
    return dp[n]`,
    patterns: [
      {
        id: 'basic-dp',
        name: 'Basic Dynamic Programming',
        duration: '2-3 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs/', leetcode: 'LC #70', difficulty: 'Easy', companies: ['Amazon', 'Apple', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'House Robber', link: 'https://leetcode.com/problems/house-robber/', leetcode: 'LC #198', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 3, title: 'House Robber II', link: 'https://leetcode.com/problems/house-robber-ii/', leetcode: 'LC #213', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'dp-subsequences',
        name: 'DP on Subsequences',
        duration: '2 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Longest Increasing Subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', leetcode: 'LC #300', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 2, title: 'Longest Common Subsequence', link: 'https://leetcode.com/problems/longest-common-subsequence/', leetcode: 'LC #1143', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'knapsack-problems',
        name: 'Knapsack Problems',
        duration: '3 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Partition Equal Subset Sum', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', leetcode: 'LC #416', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change/', leetcode: 'LC #322', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 3, title: 'Coin Change 2', link: 'https://leetcode.com/problems/coin-change-2/', leetcode: 'LC #518', difficulty: 'Medium', solution: 'locked' },
          { id: 4, title: 'Target Sum', link: 'https://leetcode.com/problems/target-sum/', leetcode: 'LC #494', difficulty: 'Medium', companies: ['Facebook', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'interval-dp',
        name: 'Interval / Range DP',
        duration: '2 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Burst Balloons', link: 'https://leetcode.com/problems/burst-balloons/', leetcode: 'LC #312', difficulty: 'Hard', companies: ['Google', 'Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'dp-trees',
        name: 'DP on Trees',
        duration: '2 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Advanced'],
        problems: [
          { id: 1, title: 'House Robber III', link: 'https://leetcode.com/problems/house-robber-iii/', leetcode: 'LC #337', difficulty: 'Medium', solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'graph-basics',
    name: 'Graph Basics (BFS/DFS)',
    icon: '🕸️',
    color: 'from-rose-500 to-pink-500',
    duration: '1 Week',
    minProblems: '25-30',
    importance: 5,
    difficulty: 'Medium',
    description: 'Master graph traversal, cycle detection, and basic algorithms.',
    phase: 2,
    tags: ['Core', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Network traversal',
      'Connectivity problems',
      'Shortest path in unweighted graph',
      'Cycle detection'
    ],
    template: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

def dfs(graph, node, visited):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
    patterns: [
      {
        id: 'connected-components',
        name: 'Connected Components',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/', leetcode: 'LC #200', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Number of Provinces', link: 'https://leetcode.com/problems/number-of-provinces/', leetcode: 'LC #547', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'grid-bfs-dfs',
        name: 'Grid-Based BFS / DFS',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Rotting Oranges', link: 'https://leetcode.com/problems/rotting-oranges/', leetcode: 'LC #994', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 2, title: '01 Matrix', link: 'https://leetcode.com/problems/01-matrix/', leetcode: 'LC #542', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
          { id: 3, title: 'Flood Fill', link: 'https://leetcode.com/problems/flood-fill/', leetcode: 'LC #733', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'cycle-detection',
        name: 'Cycle Detection',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule/', leetcode: 'LC #207', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 2, title: 'Course Schedule II', link: 'https://leetcode.com/problems/course-schedule-ii/', leetcode: 'LC #210', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'topological-sort',
        name: 'DAG / Topological Sort',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Course Schedule II', link: 'https://leetcode.com/problems/course-schedule-ii/', leetcode: 'LC #210', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 2, title: 'Alien Dictionary', link: 'https://leetcode.com/problems/alien-dictionary/', leetcode: 'LC #269', difficulty: 'Hard', companies: ['Facebook', 'Amazon', 'Google'], solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'advanced-graphs',
    name: 'Advanced Graphs (MST, SP, DAG)',
    icon: '🌐',
    color: 'from-fuchsia-500 to-purple-500',
    duration: '2 Weeks',
    minProblems: '30-35',
    importance: 4,
    difficulty: 'Hard',
    description: 'Master advanced graph algorithms for weighted graphs.',
    phase: 2,
    tags: ['Advanced'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Weighted shortest path',
      'Minimum spanning tree',
      'Network flow',
      'Advanced connectivity'
    ],
    template: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        dist, node = heapq.heappop(pq)
        if dist > distances[node]:
            continue
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    
    return distances`,
    patterns: [
      {
        id: 'shortest-path',
        name: 'Shortest Path (BFS / Dijkstra)',
        duration: '2-3 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium-Hard',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Network Delay Time', link: 'https://leetcode.com/problems/network-delay-time/', leetcode: 'LC #743', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 2, title: 'Cheapest Flights Within K Stops', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', leetcode: 'LC #787', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 3, title: 'Path with Maximum Probability', link: 'https://leetcode.com/problems/path-with-maximum-probability/', leetcode: 'LC #1514', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'union-find',
        name: 'Union-Find (DSU)',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern', 'Core'],
        problems: [
          { id: 1, title: 'Redundant Connection', link: 'https://leetcode.com/problems/redundant-connection/', leetcode: 'LC #684', difficulty: 'Medium', solution: 'locked' },
          { id: 2, title: 'Accounts Merge', link: 'https://leetcode.com/problems/accounts-merge/', leetcode: 'LC #721', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'mst',
        name: 'Minimum Spanning Tree',
        duration: '2 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 1, title: 'Min Cost to Connect All Points', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', leetcode: 'LC #1584', difficulty: 'Medium', solution: 'locked' },
        ]
      }
    ]
  }
];

// Phase 3: Problem Solving (Advanced Practice)
const phase3Topics: DSATopic[] = [
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    icon: '🔢',
    color: 'from-gray-500 to-zinc-600',
    duration: '3-4 Days',
    minProblems: '15-20',
    importance: 3,
    difficulty: 'Easy-Medium',
    description: 'Master bit manipulation techniques for optimization.',
    phase: 3,
    tags: ['Optional'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'Toggle and check bits',
      'Power of 2 checks',
      'XOR tricks',
      'Bit counting'
    ],
    template: `# Common bit operations
n & 1       # Check if odd
n >> 1      # Divide by 2
n << 1      # Multiply by 2
n & (n-1)   # Remove lowest set bit
n ^ n = 0   # XOR same number = 0`,
    patterns: [
      {
        id: 'bit-basics',
        name: 'Basic Bit Operations',
        duration: '1-2 Days',
        minProblems: '8-10',
        importance: 3,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Optional'],
        problems: [
          { id: 1, title: 'Single Number', link: 'https://leetcode.com/problems/single-number/', leetcode: 'LC #136', difficulty: 'Easy', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 2, title: 'Number of 1 Bits', link: 'https://leetcode.com/problems/number-of-1-bits/', leetcode: 'LC #191', difficulty: 'Easy', solution: 'locked' },
          { id: 3, title: 'Counting Bits', link: 'https://leetcode.com/problems/counting-bits/', leetcode: 'LC #338', difficulty: 'Easy', solution: 'locked' },
        ]
      }
    ]
  },
  {
    id: 'math-number-theory',
    name: 'Math & Number Theory',
    icon: '🔢',
    color: 'from-slate-500 to-gray-500',
    duration: '3-4 Days',
    minProblems: '10-15',
    importance: 2,
    difficulty: 'Easy',
    description: 'Basic mathematical concepts for competitive programming.',
    phase: 3,
    tags: ['Optional'],
    videoId: 'AT14lCXuMKI',
    whenToUse: [
      'GCD/LCM problems',
      'Prime numbers',
      'Modular arithmetic',
      'Combinatorics'
    ],
    template: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True`,
    patterns: [
      {
        id: 'math-basics',
        name: 'Basic Math Problems',
        duration: '2-3 Days',
        minProblems: '10-15',
        importance: 2,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Optional'],
        problems: [
          { id: 1, title: 'Pow(x, n)', link: 'https://leetcode.com/problems/powx-n/', leetcode: 'LC #50', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 2, title: 'Sqrt(x)', link: 'https://leetcode.com/problems/sqrtx/', leetcode: 'LC #69', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      }
    ]
  }
];

// Export phases
export const dsaPhases: DSAPhase[] = [
  {
    id: 1,
    name: 'Phase 1',
    title: 'Foundation Level (0 → Beginner)',
    description: 'Build your base with programming fundamentals and logical thinking. This phase is for absolute beginners.',
    duration: '2-4 Weeks',
    color: 'from-green-500 to-emerald-500',
    icon: '🌱',
    topics: phase1Topics
  },
  {
    id: 2,
    name: 'Phase 2',
    title: 'DSA Preparation (Core Learning)',
    description: 'Structured DSA learning with focus on understanding concepts, patterns, and algorithm flow.',
    duration: '3-4 Months',
    color: 'from-blue-500 to-indigo-500',
    icon: '📚',
    topics: phase2Topics
  },
  {
    id: 3,
    name: 'Phase 3',
    title: 'Problem Solving (Advanced Practice)',
    description: 'Stop learning, start practicing. Solve POTD, random problems, and participate in contests.',
    duration: '4-6 Months',
    color: 'from-purple-500 to-pink-500',
    icon: '🚀',
    topics: phase3Topics
  }
];

// Helper function to get all topics flattened
export const getAllTopics = (): DSATopic[] => {
  return dsaPhases.flatMap(phase => phase.topics);
};

// Helper function to get topic by ID
export const getTopicById = (id: string): DSATopic | undefined => {
  return getAllTopics().find(topic => topic.id === id);
};

// Stats calculations
export const getCourseStats = () => {
  const allTopics = getAllTopics();
  let totalProblems = 0;
  let totalPatterns = 0;
  
  allTopics.forEach(topic => {
    topic.patterns.forEach(pattern => {
      totalPatterns++;
      totalProblems += pattern.problems.length;
    });
  });
  
  return {
    totalTopics: allTopics.length,
    totalPatterns,
    totalProblems,
    estimatedTime: '6-10 months'
  };
};

// For backward compatibility - map old pattern IDs to new topic IDs
export const allPatternData: Record<string, any> = {};

getAllTopics().forEach(topic => {
  allPatternData[topic.id] = {
    name: topic.name,
    icon: topic.icon,
    color: topic.color,
    difficulty: topic.difficulty,
    estimatedTime: topic.duration,
    progress: 0,
    tags: topic.tags,
    videoId: topic.videoId || 'AT14lCXuMKI',
    description: topic.description,
    whenToUse: topic.whenToUse || [],
    template: topic.template || '',
    patterns: topic.patterns,
    problems: {
      easy: topic.patterns.flatMap(p => p.problems.filter(prob => prob.difficulty === 'Easy')),
      medium: topic.patterns.flatMap(p => p.problems.filter(prob => prob.difficulty === 'Medium')),
      hard: topic.patterns.flatMap(p => p.problems.filter(prob => prob.difficulty === 'Hard'))
    },
    commonMistakes: []
  };
});
