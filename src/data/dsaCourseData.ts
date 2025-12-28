// DSA Calendar 2026 - Complete 3-Phase Learning Path
// Based on structured approach: Foundation → DSA Preparation → Problem Solving

export interface DSAProblem {
  id: string;
  title: string;
  link: string;
  leetcode?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies?: string[];
  prerequisites?: string[];
  solution: 'locked' | 'unlocked';
}

export interface DSAPattern {
  id: string;
  name: string;
  duration: string;
  minProblems: string;
  importance: number;
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
  importance: number;
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

// ============================================================================
// PHASE 1: FOUNDATION LEVEL (0 → Beginner)
// ============================================================================
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
    whenToUse: ['Before writing any algorithm', 'Comparing solutions', 'Optimizing code', 'Interview discussions'],
    template: `# Time Complexity Analysis
# O(1) - Constant: arr[0]
# O(log n) - Logarithmic: binary_search()
# O(n) - Linear: for loop
# O(n log n) - Linearithmic: sorting
# O(n²) - Quadratic: nested loops`,
    patterns: [
      {
        id: 'complexity-analysis',
        name: 'Complexity Analysis',
        duration: '2-3 Days',
        minProblems: '10-15',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Basics', 'Foundation'],
        problems: [
          { id: 'tc-1', title: 'Running Sum of 1d Array', link: 'https://leetcode.com/problems/running-sum-of-1d-array/', leetcode: 'LC #1480', difficulty: 'Easy', solution: 'locked' },
          { id: 'tc-2', title: 'Number of Steps to Reduce a Number to Zero', link: 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/', leetcode: 'LC #1342', difficulty: 'Easy', solution: 'locked' },
          { id: 'tc-3', title: 'Find Pivot Index', link: 'https://leetcode.com/problems/find-pivot-index/', leetcode: 'LC #724', difficulty: 'Easy', solution: 'locked' },
          { id: 'tc-4', title: 'Remove Linked List Elements', link: 'https://leetcode.com/problems/remove-linked-list-elements/', leetcode: 'LC #203', difficulty: 'Easy', solution: 'locked' },
          { id: 'tc-5', title: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers/', leetcode: 'LC #2', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'tc-6', title: 'Remove Nth Node From End of List', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', leetcode: 'LC #19', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'tc-7', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', leetcode: 'LC #53', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'tc-8', title: 'Pow(x, n)', link: 'https://leetcode.com/problems/powx-n/', leetcode: 'LC #50', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'tc-9', title: 'Maximum Product Subarray', link: 'https://leetcode.com/problems/maximum-product-subarray/', leetcode: 'LC #152', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tc-10', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', leetcode: 'LC #49', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'tc-11', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', leetcode: 'LC #23', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'tc-12', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', leetcode: 'LC #42', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs'], solution: 'locked' },
        ]
      }
    ]
  }
];

// ============================================================================
// PHASE 2: DSA PREPARATION
// ============================================================================
const phase2Topics: DSATopic[] = [
  // ==================== ARRAYS ====================
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
    whenToUse: ['Sequential data processing', 'Finding patterns', 'Two pointers optimization', 'Hash-based lookups'],
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
        id: 'array-easy',
        name: 'Array Fundamentals',
        duration: '3-4 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core', 'Foundation'],
        problems: [
          { id: 'arr-1', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum/', leetcode: 'LC #1', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'arr-2', title: 'Contains Duplicate', link: 'https://leetcode.com/problems/contains-duplicate/', leetcode: 'LC #217', difficulty: 'Easy', companies: ['Amazon', 'Apple'], solution: 'locked' },
          { id: 'arr-3', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', leetcode: 'LC #53', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'arr-4', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', leetcode: 'LC #121', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Facebook'], solution: 'locked' },
          { id: 'arr-5', title: 'Merge Sorted Array', link: 'https://leetcode.com/problems/merge-sorted-array/', leetcode: 'LC #88', difficulty: 'Easy', companies: ['Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'arr-6', title: 'Move Zeroes', link: 'https://leetcode.com/problems/move-zeroes/', leetcode: 'LC #283', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'arr-7', title: 'Squares of a Sorted Array', link: 'https://leetcode.com/problems/squares-of-a-sorted-array/', leetcode: 'LC #977', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'arr-8', title: 'Array Partition', link: 'https://leetcode.com/problems/array-partition/', leetcode: 'LC #561', difficulty: 'Easy', solution: 'locked' },
          { id: 'arr-9', title: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/', leetcode: 'LC #704', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'arr-10', title: 'Missing Number', link: 'https://leetcode.com/problems/missing-number/', leetcode: 'LC #268', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'arr-11', title: 'Min Cost Climbing Stairs', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', leetcode: 'LC #746', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'array-medium',
        name: 'Array Patterns',
        duration: '1 Week',
        minProblems: '20-25',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'arr-12', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals/', leetcode: 'LC #56', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'arr-13', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', leetcode: 'LC #49', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'arr-14', title: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image/', leetcode: 'LC #48', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'arr-15', title: 'Permutations', link: 'https://leetcode.com/problems/permutations/', leetcode: 'LC #46', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'arr-16', title: 'Combination Sum', link: 'https://leetcode.com/problems/combination-sum/', leetcode: 'LC #39', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'arr-17', title: '3Sum', link: 'https://leetcode.com/problems/3sum/', leetcode: 'LC #15', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'arr-18', title: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water/', leetcode: 'LC #11', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'], solution: 'locked' },
          { id: 'arr-19', title: 'Next Permutation', link: 'https://leetcode.com/problems/next-permutation/', leetcode: 'LC #31', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon'], solution: 'locked' },
          { id: 'arr-20', title: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors/', leetcode: 'LC #75', difficulty: 'Medium', companies: ['Microsoft', 'Amazon', 'Facebook'], prerequisites: ['Sorting'], solution: 'locked' },
          { id: 'arr-21', title: 'Find Minimum in Rotated Sorted Array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', leetcode: 'LC #153', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'arr-22', title: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', leetcode: 'LC #33', difficulty: 'Medium', companies: ['Microsoft', 'Google', 'Amazon', 'Facebook'], solution: 'locked' },
          { id: 'arr-23', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/', leetcode: 'LC #200', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'arr-24', title: 'Set Matrix Zeroes', link: 'https://leetcode.com/problems/set-matrix-zeroes/', leetcode: 'LC #73', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], solution: 'locked' },
          { id: 'arr-25', title: 'Daily Temperatures', link: 'https://leetcode.com/problems/daily-temperatures/', leetcode: 'LC #739', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'arr-26', title: 'Fruit Into Baskets', link: 'https://leetcode.com/problems/fruit-into-baskets/', leetcode: 'LC #904', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
          { id: 'arr-27', title: '4Sum II', link: 'https://leetcode.com/problems/4sum-ii/', leetcode: 'LC #454', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'arr-28', title: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', leetcode: 'LC #567', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], solution: 'locked' },
          { id: 'arr-29', title: 'Partition Equal Subset Sum', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', leetcode: 'LC #416', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'array-hard',
        name: 'Advanced Arrays',
        duration: '3-4 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'arr-30', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', leetcode: 'LC #42', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs'], solution: 'locked' },
          { id: 'arr-31', title: 'First Missing Positive', link: 'https://leetcode.com/problems/first-missing-positive/', leetcode: 'LC #41', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'arr-32', title: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', leetcode: 'LC #239', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'arr-33', title: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', leetcode: 'LC #76', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'arr-34', title: 'Best Time to Buy and Sell Stock III', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', leetcode: 'LC #123', difficulty: 'Hard', companies: ['Amazon'], solution: 'locked' },
          { id: 'arr-35', title: 'Best Time to Buy and Sell Stock IV', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/', leetcode: 'LC #188', difficulty: 'Hard', companies: ['Amazon'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== STRINGS ====================
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
    whenToUse: ['Text processing', 'Pattern matching', 'Palindrome detection', 'Anagram problems'],
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
        id: 'string-easy',
        name: 'String Basics',
        duration: '2-3 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'str-1', title: 'Reverse String', link: 'https://leetcode.com/problems/reverse-string/', leetcode: 'LC #344', difficulty: 'Easy', solution: 'locked' },
          { id: 'str-2', title: 'Find the Difference', link: 'https://leetcode.com/problems/find-the-difference/', leetcode: 'LC #389', difficulty: 'Easy', solution: 'locked' },
          { id: 'str-3', title: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram/', leetcode: 'LC #242', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'str-4', title: 'Reverse Vowels of a String', link: 'https://leetcode.com/problems/reverse-vowels-of-a-string/', leetcode: 'LC #345', difficulty: 'Easy', solution: 'locked' },
          { id: 'str-5', title: 'Valid Palindrome II', link: 'https://leetcode.com/problems/valid-palindrome-ii/', leetcode: 'LC #680', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'str-6', title: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', leetcode: 'LC #125', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'str-7', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses/', leetcode: 'LC #20', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'str-8', title: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix/', leetcode: 'LC #14', difficulty: 'Easy', companies: ['Google', 'Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'string-medium',
        name: 'String Patterns',
        duration: '4-5 Days',
        minProblems: '12-15',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'str-9', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', leetcode: 'LC #3', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'], solution: 'locked' },
          { id: 'str-10', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', leetcode: 'LC #49', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'str-11', title: 'Multiply Strings', link: 'https://leetcode.com/problems/multiply-strings/', leetcode: 'LC #43', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'str-12', title: 'Permutations II', link: 'https://leetcode.com/problems/permutations-ii/', leetcode: 'LC #47', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'str-13', title: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', leetcode: 'LC #567', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], solution: 'locked' },
          { id: 'str-14', title: 'Longest Repeating Character Replacement', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', leetcode: 'LC #424', difficulty: 'Medium', solution: 'locked' },
          { id: 'str-15', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring/', leetcode: 'LC #5', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'str-16', title: 'Simplify Path', link: 'https://leetcode.com/problems/simplify-path/', leetcode: 'LC #71', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'str-17', title: 'Decode String', link: 'https://leetcode.com/problems/decode-string/', leetcode: 'LC #394', difficulty: 'Medium', companies: ['Google', 'Amazon'], solution: 'locked' },
          { id: 'str-18', title: 'Sequential Digits', link: 'https://leetcode.com/problems/sequential-digits/', leetcode: 'LC #1291', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'string-hard',
        name: 'Advanced Strings',
        duration: '2-3 Days',
        minProblems: '3-5',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'str-19', title: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', leetcode: 'LC #76', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'str-20', title: 'Valid Number', link: 'https://leetcode.com/problems/valid-number/', leetcode: 'LC #65', difficulty: 'Hard', companies: ['Facebook'], solution: 'locked' },
          { id: 'str-21', title: 'Wildcard Matching', link: 'https://leetcode.com/problems/wildcard-matching/', leetcode: 'LC #44', difficulty: 'Hard', companies: ['Google', 'Facebook', 'Amazon'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== RECURSION BASICS ====================
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
    whenToUse: ['Tree traversals', 'Divide and conquer', 'Generating combinations/permutations', 'Problems with subproblems'],
    template: `def recursion(input):
    # Base case
    if base_condition:
        return base_value
    # Recursive case
    return combine(recursion(smaller_input))`,
    patterns: [
      {
        id: 'recursion-easy',
        name: 'Basic Recursion',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core', 'Foundation'],
        problems: [
          { id: 'rec-1', title: 'Pow(x, n)', link: 'https://leetcode.com/problems/powx-n/', leetcode: 'LC #50', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'rec-2', title: 'Maximum Subarray (Divide & Conquer)', link: 'https://leetcode.com/problems/maximum-subarray/', leetcode: 'LC #53', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'rec-3', title: 'Merge Two Sorted Lists (Recursive)', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', leetcode: 'LC #21', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 'rec-4', title: 'Remove Linked List Elements (Recursive)', link: 'https://leetcode.com/problems/remove-linked-list-elements/', leetcode: 'LC #203', difficulty: 'Easy', solution: 'locked' },
          { id: 'rec-5', title: 'Reverse Linked List (Recursive)', link: 'https://leetcode.com/problems/reverse-linked-list/', leetcode: 'LC #206', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'rec-6', title: 'Fibonacci Number', link: 'https://leetcode.com/problems/fibonacci-number/', leetcode: 'LC #509', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'recursion-medium',
        name: 'Tree Recursion',
        duration: '3-4 Days',
        minProblems: '12-15',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'rec-7', title: 'Binary Tree Inorder Traversal', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', leetcode: 'LC #94', difficulty: 'Easy', solution: 'locked' },
          { id: 'rec-8', title: 'Binary Tree Preorder Traversal', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', leetcode: 'LC #144', difficulty: 'Easy', solution: 'locked' },
          { id: 'rec-9', title: 'Binary Tree Postorder Traversal', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', leetcode: 'LC #145', difficulty: 'Easy', solution: 'locked' },
          { id: 'rec-10', title: 'Maximum Depth of Binary Tree', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', leetcode: 'LC #104', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'rec-11', title: 'Balanced Binary Tree', link: 'https://leetcode.com/problems/balanced-binary-tree/', leetcode: 'LC #110', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'rec-12', title: 'Diameter of Binary Tree', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', leetcode: 'LC #543', difficulty: 'Easy', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
          { id: 'rec-13', title: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', leetcode: 'LC #98', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'rec-14', title: 'Symmetric Tree', link: 'https://leetcode.com/problems/symmetric-tree/', leetcode: 'LC #101', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'rec-15', title: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', leetcode: 'LC #236', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'rec-16', title: 'Combination Sum II', link: 'https://leetcode.com/problems/combination-sum-ii/', leetcode: 'LC #40', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'rec-17', title: 'Subsets II', link: 'https://leetcode.com/problems/subsets-ii/', leetcode: 'LC #90', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'recursion-hard',
        name: 'Advanced Recursion',
        duration: '2 Days',
        minProblems: '2-3',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'rec-18', title: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', leetcode: 'LC #124', difficulty: 'Hard', companies: ['Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'rec-19', title: 'Find Median from Data Stream', link: 'https://leetcode.com/problems/find-median-from-data-stream/', leetcode: 'LC #295', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== LINKED LIST ====================
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
    whenToUse: ['Dynamic data structures', 'In-place reversal', 'Cycle detection', 'Merging sorted lists'],
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
        id: 'll-easy',
        name: 'Linked List Basics',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'll-1', title: 'Reverse Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/', leetcode: 'LC #206', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'll-2', title: 'Remove Duplicates from Sorted List', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', leetcode: 'LC #83', difficulty: 'Easy', solution: 'locked' },
          { id: 'll-3', title: 'Remove Linked List Elements', link: 'https://leetcode.com/problems/remove-linked-list-elements/', leetcode: 'LC #203', difficulty: 'Easy', solution: 'locked' },
          { id: 'll-4', title: 'Intersection of Two Linked Lists', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', leetcode: 'LC #160', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'll-5', title: 'Delete Node in a Linked List', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', leetcode: 'LC #237', difficulty: 'Medium', solution: 'locked' },
          { id: 'll-6', title: 'Middle of the Linked List', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', leetcode: 'LC #876', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
        ]
      },
      {
        id: 'll-medium',
        name: 'Linked List Patterns',
        duration: '4-5 Days',
        minProblems: '12-15',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'll-7', title: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers/', leetcode: 'LC #2', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'll-8', title: 'Remove Nth Node From End of List', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', leetcode: 'LC #19', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'll-9', title: 'Linked List Cycle II', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', leetcode: 'LC #142', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'll-10', title: 'Linked List Cycle', link: 'https://leetcode.com/problems/linked-list-cycle/', leetcode: 'LC #141', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 'll-11', title: 'Rotate List', link: 'https://leetcode.com/problems/rotate-list/', leetcode: 'LC #61', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'll-12', title: 'Reverse Linked List II', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', leetcode: 'LC #92', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'll-13', title: 'Partition List', link: 'https://leetcode.com/problems/partition-list/', leetcode: 'LC #86', difficulty: 'Medium', solution: 'locked' },
          { id: 'll-14', title: 'Convert Sorted List to Binary Search Tree', link: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/', leetcode: 'LC #109', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
          { id: 'll-15', title: 'Copy List with Random Pointer', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', leetcode: 'LC #138', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'll-16', title: 'Reorder List', link: 'https://leetcode.com/problems/reorder-list/', leetcode: 'LC #143', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'll-hard',
        name: 'Advanced Linked List',
        duration: '2 Days',
        minProblems: '2-3',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'll-17', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', leetcode: 'LC #23', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'll-18', title: 'Reverse Nodes in k-Group', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', leetcode: 'LC #25', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== STACK ====================
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
    whenToUse: ['LIFO operations', 'Parsing expressions', 'Next greater/smaller element', 'Matching brackets'],
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
        id: 'stack-easy',
        name: 'Stack Basics',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'stk-1', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses/', leetcode: 'LC #20', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'stk-2', title: 'Min Stack', link: 'https://leetcode.com/problems/min-stack/', leetcode: 'LC #155', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'stk-3', title: 'Remove Outermost Parentheses', link: 'https://leetcode.com/problems/remove-outermost-parentheses/', leetcode: 'LC #1021', difficulty: 'Easy', solution: 'locked' },
          { id: 'stk-4', title: 'Backspace String Compare', link: 'https://leetcode.com/problems/backspace-string-compare/', leetcode: 'LC #844', difficulty: 'Easy', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 'stk-5', title: 'Baseball Game', link: 'https://leetcode.com/problems/baseball-game/', leetcode: 'LC #682', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'stk-6', title: 'Score of Parentheses', link: 'https://leetcode.com/problems/score-of-parentheses/', leetcode: 'LC #856', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'stack-medium',
        name: 'Monotonic Stack',
        duration: '3-4 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'stk-7', title: 'Simplify Path', link: 'https://leetcode.com/problems/simplify-path/', leetcode: 'LC #71', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'stk-8', title: 'Evaluate Reverse Polish Notation', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', leetcode: 'LC #150', difficulty: 'Medium', companies: ['Amazon', 'LinkedIn'], solution: 'locked' },
          { id: 'stk-9', title: 'Daily Temperatures', link: 'https://leetcode.com/problems/daily-temperatures/', leetcode: 'LC #739', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'stk-10', title: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', leetcode: 'LC #84', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'stk-11', title: 'Remove Duplicate Letters', link: 'https://leetcode.com/problems/remove-duplicate-letters/', leetcode: 'LC #316', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
          { id: 'stk-12', title: 'Remove K Digits', link: 'https://leetcode.com/problems/remove-k-digits/', leetcode: 'LC #402', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 'stk-13', title: 'Decode String', link: 'https://leetcode.com/problems/decode-string/', leetcode: 'LC #394', difficulty: 'Medium', companies: ['Google', 'Amazon'], solution: 'locked' },
          { id: 'stk-14', title: 'Online Stock Span', link: 'https://leetcode.com/problems/online-stock-span/', leetcode: 'LC #901', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'stack-hard',
        name: 'Advanced Stack',
        duration: '1-2 Days',
        minProblems: '2-3',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'stk-15', title: 'Maximal Rectangle', link: 'https://leetcode.com/problems/maximal-rectangle/', leetcode: 'LC #85', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== QUEUE & DEQUE ====================
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
    whenToUse: ['BFS traversal', 'Sliding window max/min', 'Level order processing', 'Task scheduling'],
    template: `from collections import deque

def sliding_window_max(nums, k):
    dq = deque()  # stores indices
    result = []
    
    for i in range(len(nums)):
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`,
    patterns: [
      {
        id: 'queue-easy',
        name: 'Queue Basics',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 3,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'q-1', title: 'Design Circular Queue', link: 'https://leetcode.com/problems/design-circular-queue/', leetcode: 'LC #622', difficulty: 'Medium', solution: 'locked' },
          { id: 'q-2', title: 'Number of Recent Calls', link: 'https://leetcode.com/problems/number-of-recent-calls/', leetcode: 'LC #933', difficulty: 'Easy', solution: 'locked' },
          { id: 'q-3', title: 'Number of Students Unable to Eat Lunch', link: 'https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/', leetcode: 'LC #1700', difficulty: 'Easy', solution: 'locked' },
          { id: 'q-4', title: 'Time Needed to Buy Tickets', link: 'https://leetcode.com/problems/time-needed-to-buy-tickets/', leetcode: 'LC #2073', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'q-5', title: 'Implement Queue using Stacks', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', leetcode: 'LC #232', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'q-6', title: 'Implement Stack using Queues', link: 'https://leetcode.com/problems/implement-stack-using-queues/', leetcode: 'LC #225', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'queue-medium',
        name: 'Deque Patterns',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 'q-7', title: 'Design Circular Deque', link: 'https://leetcode.com/problems/design-circular-deque/', leetcode: 'LC #641', difficulty: 'Medium', solution: 'locked' },
          { id: 'q-8', title: 'Design Front Middle Back Queue', link: 'https://leetcode.com/problems/design-front-middle-back-queue/', leetcode: 'LC #1670', difficulty: 'Medium', solution: 'locked' },
          { id: 'q-9', title: 'Shortest Subarray with Sum at Least K', link: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/', leetcode: 'LC #862', difficulty: 'Hard', companies: ['Google'], solution: 'locked' },
          { id: 'q-10', title: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', leetcode: 'LC #239', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'q-11', title: 'Find the Winner of the Circular Game', link: 'https://leetcode.com/problems/find-the-winner-of-the-circular-game/', leetcode: 'LC #1823', difficulty: 'Medium', solution: 'locked' },
          { id: 'q-12', title: 'Constrained Subsequence Sum', link: 'https://leetcode.com/problems/constrained-subsequence-sum/', leetcode: 'LC #1425', difficulty: 'Hard', solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== HASHING ====================
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
    whenToUse: ['O(1) lookup needed', 'Counting frequencies', 'Finding duplicates', 'Two sum variants'],
    template: `from collections import Counter

freq = Counter(arr)

seen = set()
for num in arr:
    if target - num in seen:
        return True
    seen.add(num)`,
    patterns: [
      {
        id: 'hash-easy',
        name: 'Hash Basics',
        duration: '2-3 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core', 'Foundation'],
        problems: [
          { id: 'hash-1', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum/', leetcode: 'LC #1', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'hash-2', title: 'Contains Duplicate', link: 'https://leetcode.com/problems/contains-duplicate/', leetcode: 'LC #217', difficulty: 'Easy', companies: ['Amazon', 'Apple'], solution: 'locked' },
          { id: 'hash-3', title: 'Contains Duplicate II', link: 'https://leetcode.com/problems/contains-duplicate-ii/', leetcode: 'LC #219', difficulty: 'Easy', solution: 'locked' },
          { id: 'hash-4', title: 'Find the Difference', link: 'https://leetcode.com/problems/find-the-difference/', leetcode: 'LC #389', difficulty: 'Easy', solution: 'locked' },
          { id: 'hash-5', title: 'Isomorphic Strings', link: 'https://leetcode.com/problems/isomorphic-strings/', leetcode: 'LC #205', difficulty: 'Easy', solution: 'locked' },
          { id: 'hash-6', title: 'Word Pattern', link: 'https://leetcode.com/problems/word-pattern/', leetcode: 'LC #290', difficulty: 'Easy', solution: 'locked' },
          { id: 'hash-7', title: 'Intersection of Two Arrays', link: 'https://leetcode.com/problems/intersection-of-two-arrays/', leetcode: 'LC #349', difficulty: 'Easy', solution: 'locked' },
          { id: 'hash-8', title: 'Intersection of Two Arrays II', link: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/', leetcode: 'LC #350', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'hash-medium',
        name: 'Hash Patterns',
        duration: '4-5 Days',
        minProblems: '15-18',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'hash-9', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', leetcode: 'LC #49', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'hash-10', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', leetcode: 'LC #3', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'], solution: 'locked' },
          { id: 'hash-11', title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', leetcode: 'LC #347', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'hash-12', title: '4Sum II', link: 'https://leetcode.com/problems/4sum-ii/', leetcode: 'LC #454', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'hash-13', title: 'Number of Provinces', link: 'https://leetcode.com/problems/number-of-provinces/', leetcode: 'LC #547', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'hash-14', title: 'Contiguous Array', link: 'https://leetcode.com/problems/contiguous-array/', leetcode: 'LC #525', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
          { id: 'hash-15', title: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', leetcode: 'LC #438', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'hash-16', title: 'Target Sum', link: 'https://leetcode.com/problems/target-sum/', leetcode: 'LC #494', difficulty: 'Medium', companies: ['Facebook', 'Google'], solution: 'locked' },
          { id: 'hash-17', title: 'Subarray Sum Equals K', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', leetcode: 'LC #560', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
          { id: 'hash-18', title: 'Design HashMap', link: 'https://leetcode.com/problems/design-hashmap/', leetcode: 'LC #706', difficulty: 'Easy', solution: 'locked' },
          { id: 'hash-19', title: 'Design HashSet', link: 'https://leetcode.com/problems/design-hashset/', leetcode: 'LC #705', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'hash-hard',
        name: 'Advanced Hashing',
        duration: '2 Days',
        minProblems: '3-4',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'hash-20', title: 'Max Points on a Line', link: 'https://leetcode.com/problems/max-points-on-a-line/', leetcode: 'LC #149', difficulty: 'Hard', companies: ['Google', 'LinkedIn'], solution: 'locked' },
          { id: 'hash-21', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache/', leetcode: 'LC #146', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'hash-22', title: 'LFU Cache', link: 'https://leetcode.com/problems/lfu-cache/', leetcode: 'LC #460', difficulty: 'Hard', companies: ['Amazon', 'Google'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== BINARY SEARCH ====================
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
    whenToUse: ['Sorted array search', 'Finding boundaries', 'Answer on a range', 'Optimization problems'],
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
        id: 'bs-easy',
        name: 'Binary Search Basics',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'bs-1', title: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/', leetcode: 'LC #704', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'bs-2', title: 'Search Insert Position', link: 'https://leetcode.com/problems/search-insert-position/', leetcode: 'LC #35', difficulty: 'Easy', solution: 'locked' },
          { id: 'bs-3', title: 'Valid Perfect Square', link: 'https://leetcode.com/problems/valid-perfect-square/', leetcode: 'LC #367', difficulty: 'Easy', solution: 'locked' },
          { id: 'bs-4', title: 'First Bad Version', link: 'https://leetcode.com/problems/first-bad-version/', leetcode: 'LC #278', difficulty: 'Easy', companies: ['Facebook'], solution: 'locked' },
          { id: 'bs-5', title: 'Sqrt(x)', link: 'https://leetcode.com/problems/sqrtx/', leetcode: 'LC #69', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'bs-6', title: 'Count Negative Numbers in a Sorted Matrix', link: 'https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/', leetcode: 'LC #1351', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'bs-medium',
        name: 'Binary Search Patterns',
        duration: '4-5 Days',
        minProblems: '12-15',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'bs-7', title: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', leetcode: 'LC #33', difficulty: 'Medium', companies: ['Microsoft', 'Google', 'Amazon', 'Facebook'], solution: 'locked' },
          { id: 'bs-8', title: 'Search in Rotated Sorted Array II', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', leetcode: 'LC #81', difficulty: 'Medium', solution: 'locked' },
          { id: 'bs-9', title: 'Find Minimum in Rotated Sorted Array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', leetcode: 'LC #153', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'bs-10', title: 'Find Minimum in Rotated Sorted Array II', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/', leetcode: 'LC #154', difficulty: 'Hard', solution: 'locked' },
          { id: 'bs-11', title: 'Find Peak Element', link: 'https://leetcode.com/problems/find-peak-element/', leetcode: 'LC #162', difficulty: 'Medium', companies: ['Facebook', 'Google'], solution: 'locked' },
          { id: 'bs-12', title: 'Search a 2D Matrix', link: 'https://leetcode.com/problems/search-a-2d-matrix/', leetcode: 'LC #74', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'bs-13', title: 'Search a 2D Matrix II', link: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', leetcode: 'LC #240', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 'bs-14', title: 'H-Index II', link: 'https://leetcode.com/problems/h-index-ii/', leetcode: 'LC #275', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
          { id: 'bs-15', title: 'Time Based Key-Value Store', link: 'https://leetcode.com/problems/time-based-key-value-store/', leetcode: 'LC #981', difficulty: 'Medium', companies: ['Google', 'Amazon'], solution: 'locked' },
          { id: 'bs-16', title: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas/', leetcode: 'LC #875', difficulty: 'Medium', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 'bs-17', title: 'Capacity To Ship Packages Within D Days', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', leetcode: 'LC #1011', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'bs-hard',
        name: 'Advanced Binary Search',
        duration: '2 Days',
        minProblems: '2-3',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'bs-18', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', leetcode: 'LC #4', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'bs-19', title: 'Divide Two Integers', link: 'https://leetcode.com/problems/divide-two-integers/', leetcode: 'LC #29', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== BINARY TREE ====================
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
    whenToUse: ['Hierarchical data', 'Traversal problems', 'Tree construction', 'Path finding'],
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
        id: 'tree-easy',
        name: 'Tree Traversals',
        duration: '2-3 Days',
        minProblems: '12-15',
        importance: 5,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'tree-1', title: 'Binary Tree Preorder Traversal', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', leetcode: 'LC #144', difficulty: 'Easy', solution: 'locked' },
          { id: 'tree-2', title: 'Binary Tree Inorder Traversal', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', leetcode: 'LC #94', difficulty: 'Easy', solution: 'locked' },
          { id: 'tree-3', title: 'Binary Tree Postorder Traversal', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', leetcode: 'LC #145', difficulty: 'Easy', solution: 'locked' },
          { id: 'tree-4', title: 'Maximum Depth of Binary Tree', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', leetcode: 'LC #104', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tree-5', title: 'Balanced Binary Tree', link: 'https://leetcode.com/problems/balanced-binary-tree/', leetcode: 'LC #110', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'tree-6', title: 'Path Sum', link: 'https://leetcode.com/problems/path-sum/', leetcode: 'LC #112', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'tree-7', title: 'Symmetric Tree', link: 'https://leetcode.com/problems/symmetric-tree/', leetcode: 'LC #101', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tree-8', title: 'Invert Binary Tree', link: 'https://leetcode.com/problems/invert-binary-tree/', leetcode: 'LC #226', difficulty: 'Easy', companies: ['Google'], solution: 'locked' },
          { id: 'tree-9', title: 'Subtree of Another Tree', link: 'https://leetcode.com/problems/subtree-of-another-tree/', leetcode: 'LC #572', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'tree-10', title: 'Diameter of Binary Tree', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', leetcode: 'LC #543', difficulty: 'Easy', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'tree-medium',
        name: 'Tree Patterns',
        duration: '1 Week',
        minProblems: '20-25',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'tree-11', title: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', leetcode: 'LC #102', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'tree-12', title: 'Binary Tree Zigzag Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', leetcode: 'LC #103', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tree-13', title: 'Binary Tree Right Side View', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', leetcode: 'LC #199', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'tree-14', title: 'Binary Tree Level Order Traversal II', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal-ii/', leetcode: 'LC #107', difficulty: 'Medium', solution: 'locked' },
          { id: 'tree-15', title: 'Construct Binary Tree from Preorder and Inorder Traversal', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', leetcode: 'LC #105', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tree-16', title: 'Construct Binary Tree from Inorder and Postorder Traversal', link: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/', leetcode: 'LC #106', difficulty: 'Medium', solution: 'locked' },
          { id: 'tree-17', title: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', leetcode: 'LC #236', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tree-18', title: 'Two Sum IV - Input is a BST', link: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/', leetcode: 'LC #653', difficulty: 'Easy', solution: 'locked' },
          { id: 'tree-19', title: 'Path Sum II', link: 'https://leetcode.com/problems/path-sum-ii/', leetcode: 'LC #113', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'tree-20', title: 'Sum Root to Leaf Numbers', link: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', leetcode: 'LC #129', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'tree-21', title: 'Count Complete Tree Nodes', link: 'https://leetcode.com/problems/count-complete-tree-nodes/', leetcode: 'LC #222', difficulty: 'Medium', solution: 'locked' },
          { id: 'tree-22', title: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', leetcode: 'LC #230', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'tree-23', title: 'Maximum Width of Binary Tree', link: 'https://leetcode.com/problems/maximum-width-of-binary-tree/', leetcode: 'LC #662', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'tree-24', title: 'Find Bottom Left Tree Value', link: 'https://leetcode.com/problems/find-bottom-left-tree-value/', leetcode: 'LC #513', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'tree-hard',
        name: 'Advanced Trees',
        duration: '3-4 Days',
        minProblems: '4-6',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'tree-25', title: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', leetcode: 'LC #124', difficulty: 'Hard', companies: ['Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'tree-26', title: 'Serialize and Deserialize Binary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', leetcode: 'LC #297', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'tree-27', title: 'Recover Binary Search Tree', link: 'https://leetcode.com/problems/recover-binary-search-tree/', leetcode: 'LC #99', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== BST ====================
  {
    id: 'bst',
    name: 'Binary Search Tree (BST)',
    icon: '🌳',
    color: 'from-teal-500 to-green-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master BST properties, operations, and common patterns.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: ['Sorted data operations', 'Range queries', 'In-order traversal gives sorted order'],
    template: `def search_bst(root, val):
    if not root:
        return None
    if root.val == val:
        return root
    elif val < root.val:
        return search_bst(root.left, val)
    else:
        return search_bst(root.right, val)`,
    patterns: [
      {
        id: 'bst-easy',
        name: 'BST Basics',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'bst-1', title: 'Search in a Binary Search Tree', link: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', leetcode: 'LC #700', difficulty: 'Easy', solution: 'locked' },
          { id: 'bst-2', title: 'Insert into a Binary Search Tree', link: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', leetcode: 'LC #701', difficulty: 'Medium', solution: 'locked' },
          { id: 'bst-3', title: 'Minimum Absolute Difference in BST', link: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/', leetcode: 'LC #530', difficulty: 'Easy', solution: 'locked' },
          { id: 'bst-4', title: 'Range Sum of BST', link: 'https://leetcode.com/problems/range-sum-of-bst/', leetcode: 'LC #938', difficulty: 'Easy', solution: 'locked' },
          { id: 'bst-5', title: 'Find Mode in Binary Search Tree', link: 'https://leetcode.com/problems/find-mode-in-binary-search-tree/', leetcode: 'LC #501', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'bst-medium',
        name: 'BST Operations',
        duration: '3-4 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'bst-6', title: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', leetcode: 'LC #98', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'bst-7', title: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', leetcode: 'LC #230', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'bst-8', title: 'Convert Sorted Array to Binary Search Tree', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', leetcode: 'LC #108', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'bst-9', title: 'Convert Sorted List to Binary Search Tree', link: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/', leetcode: 'LC #109', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
          { id: 'bst-10', title: 'Trim a Binary Search Tree', link: 'https://leetcode.com/problems/trim-a-binary-search-tree/', leetcode: 'LC #669', difficulty: 'Medium', solution: 'locked' },
          { id: 'bst-11', title: 'Delete Node in a BST', link: 'https://leetcode.com/problems/delete-node-in-a-bst/', leetcode: 'LC #450', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'bst-12', title: 'Convert BST to Greater Tree', link: 'https://leetcode.com/problems/convert-bst-to-greater-tree/', leetcode: 'LC #538', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'bst-hard',
        name: 'Advanced BST',
        duration: '2 Days',
        minProblems: '2-3',
        importance: 3,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'bst-13', title: 'Recover Binary Search Tree', link: 'https://leetcode.com/problems/recover-binary-search-tree/', leetcode: 'LC #99', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'bst-14', title: 'Maximum Sum BST in Binary Tree', link: 'https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/', leetcode: 'LC #1373', difficulty: 'Hard', solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== HEAP / PRIORITY QUEUE ====================
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    icon: '⛰️',
    color: 'from-amber-500 to-orange-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master heap operations for priority-based processing.',
    phase: 2,
    tags: ['Core'],
    videoId: 'AT14lCXuMKI',
    whenToUse: ['Find k largest/smallest', 'Merge K sorted lists', 'Streaming median', 'Priority scheduling'],
    template: `import heapq

# Min heap
heap = []
heapq.heappush(heap, val)
smallest = heapq.heappop(heap)

# Max heap (negate values)
heapq.heappush(heap, -val)
largest = -heapq.heappop(heap)`,
    patterns: [
      {
        id: 'heap-easy',
        name: 'Heap Basics',
        duration: '2-3 Days',
        minProblems: '5-6',
        importance: 4,
        difficulty: 'Easy-Medium',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'heap-1', title: 'K Closest Points to Origin', link: 'https://leetcode.com/problems/k-closest-points-to-origin/', leetcode: 'LC #973', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'heap-2', title: 'Last Stone Weight', link: 'https://leetcode.com/problems/last-stone-weight/', leetcode: 'LC #1046', difficulty: 'Easy', solution: 'locked' },
          { id: 'heap-3', title: 'Relative Ranks', link: 'https://leetcode.com/problems/relative-ranks/', leetcode: 'LC #506', difficulty: 'Easy', solution: 'locked' },
          { id: 'heap-4', title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', leetcode: 'LC #347', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'heap-medium',
        name: 'Heap Patterns',
        duration: '3-4 Days',
        minProblems: '10-12',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'heap-5', title: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', leetcode: 'LC #215', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'heap-6', title: 'Kth Smallest Element in a Sorted Matrix', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', leetcode: 'LC #378', difficulty: 'Medium', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 'heap-7', title: 'Find Median from Data Stream', link: 'https://leetcode.com/problems/find-median-from-data-stream/', leetcode: 'LC #295', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'heap-8', title: 'Kth Largest Element in a Stream', link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', leetcode: 'LC #703', difficulty: 'Easy', solution: 'locked' },
          { id: 'heap-9', title: 'Task Scheduler', link: 'https://leetcode.com/problems/task-scheduler/', leetcode: 'LC #621', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'heap-10', title: 'Course Schedule III', link: 'https://leetcode.com/problems/course-schedule-iii/', leetcode: 'LC #630', difficulty: 'Hard', solution: 'locked' },
          { id: 'heap-11', title: 'Meeting Rooms II', link: 'https://leetcode.com/problems/meeting-rooms-ii/', leetcode: 'LC #253', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'heap-hard',
        name: 'Advanced Heap',
        duration: '2 Days',
        minProblems: '3-4',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'heap-12', title: 'The Skyline Problem', link: 'https://leetcode.com/problems/the-skyline-problem/', leetcode: 'LC #218', difficulty: 'Hard', companies: ['Microsoft', 'Google'], solution: 'locked' },
          { id: 'heap-13', title: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', leetcode: 'LC #239', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'heap-14', title: 'Network Delay Time', link: 'https://leetcode.com/problems/network-delay-time/', leetcode: 'LC #743', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== GREEDY ====================
  {
    id: 'greedy',
    name: 'Greedy Algorithms',
    icon: '🎯',
    color: 'from-lime-500 to-green-500',
    duration: '5-7 Days',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium',
    description: 'Master greedy approach for optimization problems.',
    phase: 2,
    tags: ['Advanced'],
    videoId: 'AT14lCXuMKI',
    whenToUse: ['Local optimal leads to global', 'Activity selection', 'Interval scheduling', 'Huffman coding'],
    template: `def greedy_activity_selection(activities):
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
        id: 'greedy-easy',
        name: 'Greedy Basics',
        duration: '2-3 Days',
        minProblems: '4-5',
        importance: 4,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'gr-1', title: 'Assign Cookies', link: 'https://leetcode.com/problems/assign-cookies/', leetcode: 'LC #455', difficulty: 'Easy', solution: 'locked' },
          { id: 'gr-2', title: 'Best Time to Buy and Sell Stock II', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', leetcode: 'LC #122', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'gr-3', title: 'Longest Palindrome', link: 'https://leetcode.com/problems/longest-palindrome/', leetcode: 'LC #409', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'greedy-medium',
        name: 'Greedy Patterns',
        duration: '3-4 Days',
        minProblems: '8-10',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 'gr-4', title: 'Jump Game', link: 'https://leetcode.com/problems/jump-game/', leetcode: 'LC #55', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'gr-5', title: 'Jump Game II', link: 'https://leetcode.com/problems/jump-game-ii/', leetcode: 'LC #45', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'gr-6', title: 'Gas Station', link: 'https://leetcode.com/problems/gas-station/', leetcode: 'LC #134', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 'gr-7', title: 'Non-overlapping Intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/', leetcode: 'LC #435', difficulty: 'Medium', companies: ['Facebook'], solution: 'locked' },
          { id: 'gr-8', title: 'Queue Reconstruction by Height', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', leetcode: 'LC #406', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
          { id: 'gr-9', title: 'Task Scheduler', link: 'https://leetcode.com/problems/task-scheduler/', leetcode: 'LC #621', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'gr-10', title: 'Partition Labels', link: 'https://leetcode.com/problems/partition-labels/', leetcode: 'LC #763', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
        ]
      },
      {
        id: 'greedy-hard',
        name: 'Advanced Greedy',
        duration: '2 Days',
        minProblems: '2-3',
        importance: 3,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'gr-11', title: 'Candy', link: 'https://leetcode.com/problems/candy/', leetcode: 'LC #135', difficulty: 'Hard', companies: ['Amazon'], solution: 'locked' },
          { id: 'gr-12', title: 'Max Chunks To Make Sorted II', link: 'https://leetcode.com/problems/max-chunks-to-make-sorted-ii/', leetcode: 'LC #768', difficulty: 'Hard', solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== BACKTRACKING ====================
  {
    id: 'backtracking',
    name: 'Backtracking',
    icon: '🔙',
    color: 'from-rose-500 to-red-500',
    duration: '1 Week',
    minProblems: '20-25',
    importance: 4,
    difficulty: 'Medium-Hard',
    description: 'Master backtracking for exhaustive search problems.',
    phase: 2,
    tags: ['Advanced'],
    videoId: 'AT14lCXuMKI',
    whenToUse: ['Generate all combinations', 'Constraint satisfaction', 'Puzzle solving', 'Path finding'],
    template: `def backtrack(candidates, path, result):
    if is_valid(path):
        result.append(path[:])
        return
    
    for candidate in candidates:
        path.append(candidate)
        backtrack(candidates, path, result)
        path.pop()  # backtrack`,
    patterns: [
      {
        id: 'bt-easy',
        name: 'Subsets & Permutations',
        duration: '2-3 Days',
        minProblems: '4-5',
        importance: 4,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'bt-1', title: 'Subsets', link: 'https://leetcode.com/problems/subsets/', leetcode: 'LC #78', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
          { id: 'bt-2', title: 'Permutations', link: 'https://leetcode.com/problems/permutations/', leetcode: 'LC #46', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'bt-medium',
        name: 'Combination Problems',
        duration: '3-4 Days',
        minProblems: '8-10',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'bt-3', title: 'Combination Sum', link: 'https://leetcode.com/problems/combination-sum/', leetcode: 'LC #39', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'bt-4', title: 'Combination Sum II', link: 'https://leetcode.com/problems/combination-sum-ii/', leetcode: 'LC #40', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'bt-5', title: 'Permutations II', link: 'https://leetcode.com/problems/permutations-ii/', leetcode: 'LC #47', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'bt-6', title: 'Combinations', link: 'https://leetcode.com/problems/combinations/', leetcode: 'LC #77', difficulty: 'Medium', solution: 'locked' },
          { id: 'bt-7', title: 'Subsets II', link: 'https://leetcode.com/problems/subsets-ii/', leetcode: 'LC #90', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'bt-8', title: 'Letter Combinations of a Phone Number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', leetcode: 'LC #17', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'bt-9', title: 'Generate Parentheses', link: 'https://leetcode.com/problems/generate-parentheses/', leetcode: 'LC #22', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'], solution: 'locked' },
          { id: 'bt-10', title: 'Palindrome Partitioning', link: 'https://leetcode.com/problems/palindrome-partitioning/', leetcode: 'LC #131', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
        ]
      },
      {
        id: 'bt-hard',
        name: 'Classic Backtracking',
        duration: '2-3 Days',
        minProblems: '2-3',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'bt-11', title: 'Sudoku Solver', link: 'https://leetcode.com/problems/sudoku-solver/', leetcode: 'LC #37', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'bt-12', title: 'N-Queens', link: 'https://leetcode.com/problems/n-queens/', leetcode: 'LC #51', difficulty: 'Hard', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== DYNAMIC PROGRAMMING ====================
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
    whenToUse: ['Overlapping subproblems', 'Optimal substructure', 'Counting problems', 'Optimization over sequences'],
    template: `# Bottom-up DP
def dp_solution(n):
    dp = [0] * (n + 1)
    dp[0] = base_case
    
    for i in range(1, n + 1):
        dp[i] = transition(dp[i-1], ...)
    
    return dp[n]`,
    patterns: [
      {
        id: 'dp-easy',
        name: 'DP Basics',
        duration: '3-4 Days',
        minProblems: '5-6',
        importance: 5,
        difficulty: 'Easy-Medium',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'dp-1', title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs/', leetcode: 'LC #70', difficulty: 'Easy', companies: ['Amazon', 'Apple', 'Microsoft'], solution: 'locked' },
          { id: 'dp-2', title: 'Min Cost Climbing Stairs', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', leetcode: 'LC #746', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
          { id: 'dp-3', title: 'Fibonacci Number', link: 'https://leetcode.com/problems/fibonacci-number/', leetcode: 'LC #509', difficulty: 'Easy', solution: 'locked' },
          { id: 'dp-4', title: 'N-th Tribonacci Number', link: 'https://leetcode.com/problems/n-th-tribonacci-number/', leetcode: 'LC #1137', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'dp-medium',
        name: 'Classic DP',
        duration: '2 Weeks',
        minProblems: '20-25',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'dp-5', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', leetcode: 'LC #53', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Apple'], solution: 'locked' },
          { id: 'dp-6', title: 'Maximum Product Subarray', link: 'https://leetcode.com/problems/maximum-product-subarray/', leetcode: 'LC #152', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'dp-7', title: 'House Robber', link: 'https://leetcode.com/problems/house-robber/', leetcode: 'LC #198', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'dp-8', title: 'House Robber II', link: 'https://leetcode.com/problems/house-robber-ii/', leetcode: 'LC #213', difficulty: 'Medium', solution: 'locked' },
          { id: 'dp-9', title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change/', leetcode: 'LC #322', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'dp-10', title: 'Longest Increasing Subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', leetcode: 'LC #300', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
          { id: 'dp-11', title: 'Longest Common Subsequence', link: 'https://leetcode.com/problems/longest-common-subsequence/', leetcode: 'LC #1143', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
          { id: 'dp-12', title: 'Partition Equal Subset Sum', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', leetcode: 'LC #416', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'dp-13', title: 'Word Break', link: 'https://leetcode.com/problems/word-break/', leetcode: 'LC #139', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'dp-14', title: 'Unique Paths', link: 'https://leetcode.com/problems/unique-paths/', leetcode: 'LC #62', difficulty: 'Medium', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 'dp-15', title: 'Minimum Path Sum', link: 'https://leetcode.com/problems/minimum-path-sum/', leetcode: 'LC #64', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
        ]
      },
      {
        id: 'dp-hard',
        name: 'Advanced DP',
        duration: '1 Week',
        minProblems: '5-8',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'dp-16', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', leetcode: 'LC #42', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'dp-17', title: 'Wildcard Matching', link: 'https://leetcode.com/problems/wildcard-matching/', leetcode: 'LC #44', difficulty: 'Hard', companies: ['Google', 'Facebook', 'Amazon'], solution: 'locked' },
          { id: 'dp-18', title: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance/', leetcode: 'LC #72', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'], solution: 'locked' },
          { id: 'dp-19', title: 'Longest Increasing Path in a Matrix', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', leetcode: 'LC #329', difficulty: 'Hard', companies: ['Google', 'Facebook'], solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== GRAPH BASICS ====================
  {
    id: 'graph-basics',
    name: 'Graph Basics (BFS/DFS)',
    icon: '🕸️',
    color: 'from-sky-500 to-blue-500',
    duration: '1 Week',
    minProblems: '25-30',
    importance: 5,
    difficulty: 'Medium',
    description: 'Master graph traversal, cycle detection, and basic algorithms.',
    phase: 2,
    tags: ['Core', 'Foundation'],
    videoId: 'AT14lCXuMKI',
    whenToUse: ['Network traversal', 'Connectivity problems', 'Shortest path (unweighted)', 'Cycle detection'],
    template: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    patterns: [
      {
        id: 'graph-easy',
        name: 'Graph Traversal',
        duration: '2-3 Days',
        minProblems: '6-8',
        importance: 5,
        difficulty: 'Easy-Medium',
        status: 'Not Started',
        tags: ['Core'],
        problems: [
          { id: 'g-1', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/', leetcode: 'LC #200', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
          { id: 'g-2', title: 'Rotting Oranges', link: 'https://leetcode.com/problems/rotting-oranges/', leetcode: 'LC #994', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'g-3', title: '01 Matrix', link: 'https://leetcode.com/problems/01-matrix/', leetcode: 'LC #542', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
          { id: 'g-4', title: 'Max Area of Island', link: 'https://leetcode.com/problems/max-area-of-island/', leetcode: 'LC #695', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'g-5', title: 'Flood Fill', link: 'https://leetcode.com/problems/flood-fill/', leetcode: 'LC #733', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'graph-medium',
        name: 'Graph Patterns',
        duration: '4-5 Days',
        minProblems: '12-15',
        importance: 5,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Core', 'Pattern'],
        problems: [
          { id: 'g-6', title: 'Surrounded Regions', link: 'https://leetcode.com/problems/surrounded-regions/', leetcode: 'LC #130', difficulty: 'Medium', companies: ['Google', 'Amazon'], solution: 'locked' },
          { id: 'g-7', title: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule/', leetcode: 'LC #207', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
          { id: 'g-8', title: 'Course Schedule II', link: 'https://leetcode.com/problems/course-schedule-ii/', leetcode: 'LC #210', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
          { id: 'g-9', title: 'All Paths From Source to Target', link: 'https://leetcode.com/problems/all-paths-from-source-to-target/', leetcode: 'LC #797', difficulty: 'Medium', solution: 'locked' },
          { id: 'g-10', title: 'Clone Graph', link: 'https://leetcode.com/problems/clone-graph/', leetcode: 'LC #133', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'g-11', title: 'Pacific Atlantic Water Flow', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', leetcode: 'LC #417', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
          { id: 'g-12', title: 'Satisfiability of Equality Equations', link: 'https://leetcode.com/problems/satisfiability-of-equality-equations/', leetcode: 'LC #990', difficulty: 'Medium', solution: 'locked' },
          { id: 'g-13', title: 'Path With Minimum Effort', link: 'https://leetcode.com/problems/path-with-minimum-effort/', leetcode: 'LC #1631', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
        ]
      },
      {
        id: 'graph-hard',
        name: 'Advanced Graphs',
        duration: '2-3 Days',
        minProblems: '3-5',
        importance: 4,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'g-14', title: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder/', leetcode: 'LC #127', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'g-15', title: 'Word Ladder II', link: 'https://leetcode.com/problems/word-ladder-ii/', leetcode: 'LC #126', difficulty: 'Hard', companies: ['Amazon'], solution: 'locked' },
        ]
      }
    ]
  }
];

// ============================================================================
// PHASE 3: PROBLEM SOLVING (Advanced Practice)
// ============================================================================
const phase3Topics: DSATopic[] = [
  // ==================== BIT MANIPULATION ====================
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
    whenToUse: ['Toggle and check bits', 'Power of 2 checks', 'XOR tricks', 'Bit counting'],
    template: `# Common bit operations
n & 1       # Check if odd
n >> 1      # Divide by 2
n << 1      # Multiply by 2
n & (n-1)   # Remove lowest set bit
n ^ n = 0   # XOR same number = 0`,
    patterns: [
      {
        id: 'bit-easy',
        name: 'Bit Basics',
        duration: '1-2 Days',
        minProblems: '6-8',
        importance: 3,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Optional'],
        problems: [
          { id: 'bit-1', title: 'Single Number', link: 'https://leetcode.com/problems/single-number/', leetcode: 'LC #136', difficulty: 'Easy', companies: ['Amazon', 'Google'], solution: 'locked' },
          { id: 'bit-2', title: 'Number of 1 Bits', link: 'https://leetcode.com/problems/number-of-1-bits/', leetcode: 'LC #191', difficulty: 'Easy', solution: 'locked' },
          { id: 'bit-3', title: 'Power of Two', link: 'https://leetcode.com/problems/power-of-two/', leetcode: 'LC #231', difficulty: 'Easy', solution: 'locked' },
          { id: 'bit-4', title: 'Missing Number', link: 'https://leetcode.com/problems/missing-number/', leetcode: 'LC #268', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
          { id: 'bit-5', title: 'Number Complement', link: 'https://leetcode.com/problems/number-complement/', leetcode: 'LC #476', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'bit-medium',
        name: 'Bit Patterns',
        duration: '2-3 Days',
        minProblems: '5-7',
        importance: 3,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 'bit-6', title: 'Single Number II', link: 'https://leetcode.com/problems/single-number-ii/', leetcode: 'LC #137', difficulty: 'Medium', solution: 'locked' },
          { id: 'bit-7', title: 'Single Number III', link: 'https://leetcode.com/problems/single-number-iii/', leetcode: 'LC #260', difficulty: 'Medium', solution: 'locked' },
          { id: 'bit-8', title: 'Reverse Bits', link: 'https://leetcode.com/problems/reverse-bits/', leetcode: 'LC #190', difficulty: 'Easy', solution: 'locked' },
        ]
      },
      {
        id: 'bit-hard',
        name: 'Advanced Bit',
        duration: '1 Day',
        minProblems: '1-2',
        importance: 2,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'bit-9', title: 'Maximum XOR of Two Numbers in an Array', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', leetcode: 'LC #421', difficulty: 'Medium', solution: 'locked' },
        ]
      }
    ]
  },

  // ==================== MATH & NUMBER THEORY ====================
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
    whenToUse: ['GCD/LCM problems', 'Prime numbers', 'Modular arithmetic', 'Combinatorics'],
    template: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a * b // gcd(a, b)`,
    patterns: [
      {
        id: 'math-easy',
        name: 'Math Basics',
        duration: '1-2 Days',
        minProblems: '5-6',
        importance: 2,
        difficulty: 'Easy',
        status: 'Not Started',
        tags: ['Optional'],
        problems: [
          { id: 'math-1', title: 'Happy Number', link: 'https://leetcode.com/problems/happy-number/', leetcode: 'LC #202', difficulty: 'Easy', solution: 'locked' },
          { id: 'math-2', title: 'Add Digits', link: 'https://leetcode.com/problems/add-digits/', leetcode: 'LC #258', difficulty: 'Easy', solution: 'locked' },
          { id: 'math-3', title: 'Ugly Number', link: 'https://leetcode.com/problems/ugly-number/', leetcode: 'LC #263', difficulty: 'Easy', solution: 'locked' },
          { id: 'math-4', title: 'Bulb Switcher', link: 'https://leetcode.com/problems/bulb-switcher/', leetcode: 'LC #319', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'math-medium',
        name: 'Math Patterns',
        duration: '2 Days',
        minProblems: '5-6',
        importance: 2,
        difficulty: 'Medium',
        status: 'Not Started',
        tags: ['Pattern'],
        problems: [
          { id: 'math-5', title: 'Pow(x, n)', link: 'https://leetcode.com/problems/powx-n/', leetcode: 'LC #50', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
          { id: 'math-6', title: 'Divide Two Integers', link: 'https://leetcode.com/problems/divide-two-integers/', leetcode: 'LC #29', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
          { id: 'math-7', title: 'Unique Paths', link: 'https://leetcode.com/problems/unique-paths/', leetcode: 'LC #62', difficulty: 'Medium', companies: ['Google', 'Facebook'], solution: 'locked' },
          { id: 'math-8', title: 'Rectangle Area', link: 'https://leetcode.com/problems/rectangle-area/', leetcode: 'LC #223', difficulty: 'Medium', solution: 'locked' },
        ]
      },
      {
        id: 'math-hard',
        name: 'Advanced Math',
        duration: '1 Day',
        minProblems: '2-3',
        importance: 2,
        difficulty: 'Hard',
        status: 'Not Started',
        tags: ['Advanced'],
        problems: [
          { id: 'math-9', title: 'Max Points on a Line', link: 'https://leetcode.com/problems/max-points-on-a-line/', leetcode: 'LC #149', difficulty: 'Hard', companies: ['Google', 'LinkedIn'], solution: 'locked' },
          { id: 'math-10', title: 'Number of Digit One', link: 'https://leetcode.com/problems/number-of-digit-one/', leetcode: 'LC #233', difficulty: 'Hard', solution: 'locked' },
        ]
      }
    ]
  }
];

// ============================================================================
// EXPORT PHASES AND HELPERS
// ============================================================================
export const dsaPhases: DSAPhase[] = [
  {
    id: 1,
    name: 'phase-1',
    title: 'Foundation Level',
    description: 'Build strong programming fundamentals and logical thinking. Master one language and basic problem-solving.',
    duration: '2-4 Weeks',
    color: 'from-slate-500 to-gray-600',
    icon: '🌱',
    topics: phase1Topics
  },
  {
    id: 2,
    name: 'phase-2',
    title: 'DSA Preparation',
    description: 'Learn all core data structures and algorithms. Focus on understanding concepts and patterns, not memorization.',
    duration: '3-4 Months',
    color: 'from-blue-500 to-purple-500',
    icon: '📚',
    topics: phase2Topics
  },
  {
    id: 3,
    name: 'phase-3',
    title: 'Problem Solving',
    description: 'Apply your knowledge through daily practice, contests, and random problems. Build interview-ready confidence.',
    duration: '4-6 Months',
    color: 'from-orange-500 to-red-500',
    icon: '🔥',
    topics: phase3Topics
  }
];

export const getAllTopics = (): DSATopic[] => {
  return [...phase1Topics, ...phase2Topics, ...phase3Topics];
};

export const getTopicById = (id: string): DSATopic | undefined => {
  return getAllTopics().find(topic => topic.id === id);
};

export const getTotalProblems = (): number => {
  return getAllTopics().reduce((total, topic) => {
    return total + topic.patterns.reduce((patternTotal, pattern) => {
      return patternTotal + pattern.problems.length;
    }, 0);
  }, 0);
};

export const getTotalPatterns = (): number => {
  return getAllTopics().reduce((total, topic) => total + topic.patterns.length, 0);
};

// For backward compatibility with old structure
export const allPatternData: Record<string, {
  name: string;
  icon: string;
  color: string;
  difficulty: string;
  estimatedTime: string;
  videoId: string;
  description: string;
  whenToUse: string[];
  template: string;
  problems: {
    easy: any[];
    medium: any[];
    hard: any[];
  };
  commonMistakes: any[];
}> = {};

// Convert new structure to old format for PatternDetail page compatibility
getAllTopics().forEach(topic => {
  const easy: any[] = [];
  const medium: any[] = [];
  const hard: any[] = [];
  
  topic.patterns.forEach(pattern => {
    pattern.problems.forEach(problem => {
      const formattedProblem = {
        id: problem.id,
        title: problem.title,
        leetcode: problem.leetcode ? parseInt(problem.leetcode.replace('LC #', '')) : undefined,
        link: problem.link,
        solved: false,
        attempted: false,
        companies: problem.companies,
        tags: problem.prerequisites,
        prerequisites: problem.prerequisites
      };
      
      if (problem.difficulty === 'Easy') {
        easy.push(formattedProblem);
      } else if (problem.difficulty === 'Medium') {
        medium.push(formattedProblem);
      } else {
        hard.push(formattedProblem);
      }
    });
  });
  
  allPatternData[topic.id] = {
    name: topic.name,
    icon: topic.icon,
    color: topic.color,
    difficulty: topic.difficulty,
    estimatedTime: topic.duration,
    videoId: topic.videoId || 'AT14lCXuMKI',
    description: topic.description,
    whenToUse: topic.whenToUse || [],
    template: topic.template || '',
    problems: { easy, medium, hard },
    commonMistakes: []
  };
});
