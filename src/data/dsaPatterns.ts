// Comprehensive DSA Pattern Data with all problems, solutions, companies, and prerequisites

export const allPatternData: Record<string, any> = {
  arrays: {
    name: 'Arrays',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner',
    estimatedTime: '8-10 hours',
    progress: 0,
    tags: ['Sorting', 'Hashing', 'Two Pointers'],
    videoId: 'AT14lCXuMKI',
    description: 'Master fundamental array operations, sorting, and optimization techniques. Arrays form the foundation for more complex algorithms.',
    whenToUse: [
      'Finding patterns in sequential data',
      'Searching and sorting problems',
      'Two-pointer technique for optimization',
      'Hash-based lookups for O(1) access',
      'Matrix manipulation and traversal'
    ],
    template: `def array_pattern(arr):
    # Two Pointer Approach
    left, right = 0, len(arr) - 1
    
    while left < right:
        if condition:
            left += 1
        else:
            right -= 1
    return result`,
    problems: {
      easy: [
        { id: 1, title: 'Majority Element', leetcode: 'LC #169', link: 'https://leetcode.com/problems/majority-element/', companies: ['Amazon', 'Google'], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Repeat & Missing Number', leetcode: 'Problem', link: 'https://www.interviewbit.com/problems/repeat-and-missing-number-array/', companies: ['Amazon'], solution: 'locked', prerequisites: ['Hashing'] },
        { id: 3, title: 'Merge 2 Sorted Arrays Without Extra Space', leetcode: 'LC #88', link: 'https://leetcode.com/problems/merge-sorted-array/', companies: ['Adobe', 'Goldman Sachs', 'Microsoft', 'LinkedIn'], solution: 'locked', prerequisites: ['Sorting'] },
        { id: 4, title: 'Single Number', leetcode: 'LC #136', link: 'https://leetcode.com/problems/single-number/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 5, title: 'Stock Buy & Sell', leetcode: 'LC #121', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Flipkart'], solution: 'locked', prerequisites: [] }
      ],
      medium: [
        { id: 6, title: "Kadane's Algorithm", leetcode: 'LC #53', link: 'https://leetcode.com/problems/maximum-subarray/', companies: ['Microsoft', 'Facebook'], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'Pow xn', leetcode: 'LC #50', link: 'https://leetcode.com/problems/powx-n/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 8, title: 'Container with Most Water', leetcode: 'LC #11', link: 'https://leetcode.com/problems/container-with-most-water/', companies: ['Flipkart', 'Dunzo'], solution: 'locked', prerequisites: [] },
        { id: 9, title: 'Sort Array of 0s, 1s & 2s', leetcode: 'LC #75', link: 'https://leetcode.com/problems/sort-colors/', companies: ['Microsoft', 'Amazon', 'MakeMyTrip'], solution: 'locked', prerequisites: ['Sorting'] },
        { id: 10, title: '3Sum', leetcode: 'LC #15', link: 'https://leetcode.com/problems/3sum/', companies: ['Adobe', 'Amazon', 'Microsoft', 'Morgan Stanley', 'Samsung'], solution: 'locked', prerequisites: ['Hashing'] },
        { id: 11, title: '4Sum', leetcode: 'LC #18', link: 'https://leetcode.com/problems/4sum/', companies: [], solution: 'locked', prerequisites: ['Hashing'] },
        { id: 12, title: 'Search a 2D Matrix', leetcode: 'LC #74', link: 'https://leetcode.com/problems/search-a-2d-matrix/', companies: [], solution: 'locked', prerequisites: ['2D Array'] },
        { id: 13, title: 'Next Permutation', leetcode: 'LC #31', link: 'https://leetcode.com/problems/next-permutation/', companies: ['Adobe', 'Goldman Sachs', 'Uber'], solution: 'locked', prerequisites: ['Sorting'] },
        { id: 14, title: 'Merge Overlapping Intervals', leetcode: 'LC #56', link: 'https://leetcode.com/problems/merge-intervals/', companies: ['Google'], solution: 'locked', prerequisites: ['Sorting'] },
        { id: 15, title: 'Longest Substring Without Repeating', leetcode: 'LC #3', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', companies: ['Morgan Stanley', 'Amazon'], solution: 'locked', prerequisites: ['String'] },
        { id: 16, title: 'Set Matrix Zeroes', leetcode: 'LC #73', link: 'https://leetcode.com/problems/set-matrix-zeroes/', companies: ['Microsoft', 'Amazon'], solution: 'locked', prerequisites: ['Sets'] },
        { id: 17, title: 'Word Search', leetcode: 'LC #79', link: 'https://leetcode.com/problems/word-search/', companies: ['Ola', 'Goldman Sachs', 'Google'], solution: 'locked', prerequisites: ['Recursion'] },
        { id: 18, title: 'Product of Array Except Itself', leetcode: 'LC #238', link: 'https://leetcode.com/problems/product-of-array-except-self/', companies: ['Amazon', 'DE Shaw', 'Intuit', 'Morgan Stanley', 'Flipkart'], solution: 'locked', prerequisites: [] },
        { id: 19, title: 'Subarray Sum Equals K', leetcode: 'LC #560', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', companies: [], solution: 'locked', prerequisites: ['Hashing'] },
        { id: 20, title: 'Find Duplicate', leetcode: 'LC #287', link: 'https://leetcode.com/problems/find-the-duplicate-number/', companies: ['Amazon', 'D-E-Shaw', 'Flipkart', 'Paytm', 'Qualcomm', 'Zoho'], solution: 'locked', prerequisites: ['LL Cycles'] }
      ],
      hard: [
        { id: 21, title: 'Count Inversions', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/counting-inversions/', companies: ['Adobe', 'Amazon', 'BankBazaar', 'Flipkart', 'Microsoft', 'Myntra'], solution: 'locked', prerequisites: ['Merge Sort'] },
        { id: 22, title: 'Trapping Rainwater', leetcode: 'LC #42', link: 'https://leetcode.com/problems/trapping-rain-water/', companies: ['Samsung'], solution: 'locked', prerequisites: [] },
        { id: 23, title: 'Sliding Window Maximum', leetcode: 'LC #239', link: 'https://leetcode.com/problems/sliding-window-maximum/', companies: ['Amazon', 'Directi', 'Flipkart', 'Microsoft', 'Google'], solution: 'locked', prerequisites: ['Hashing'] },
        { id: 24, title: 'Reverse Pairs', leetcode: 'LC #493', link: 'https://leetcode.com/problems/reverse-pairs/', companies: [], solution: 'locked', prerequisites: ['Merge Sort'] },
        { id: 25, title: 'Largest Rectangle in a Histogram', leetcode: 'LC #84', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', companies: [], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: [
      {
        title: 'Not handling edge cases',
        explanation: 'Always check for empty arrays, single element arrays, and boundary conditions',
        wrongCode: `def find_max(arr):\n    return max(arr)  # Fails on empty array`,
        correctCode: `def find_max(arr):\n    if not arr:\n        return None\n    return max(arr)`
      }
    ]
  },
  
  'binary-search': {
    name: 'Binary Search',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    progress: 0,
    tags: ['Search', 'Optimization', 'Divide & Conquer'],
    videoId: 'AT14lCXuMKI',
    description: 'Master binary search variations and optimization problems',
    whenToUse: [
      'Searching in sorted arrays',
      'Finding boundaries and ranges',
      'Optimization problems with monotonic functions',
      'Problems requiring O(log n) complexity'
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
    problems: {
      easy: [],
      medium: [
        { id: 1, title: 'Search in Rotated Sorted', leetcode: 'LC #33', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', companies: ['Microsoft', 'Google', 'Adobe', 'Amazon', 'D-E-Shaw', 'Flipkart'], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Peak Index in Mountain Array', leetcode: 'LC #852', link: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Single Element in Sorted Array', leetcode: 'LC #540', link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 4, title: 'Allocate Minimum Pages (Book Allocation)', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/allocate-minimum-number-pages/', companies: ['Google', 'Infosys', 'Codenation', 'Amazon', 'Microsoft'], solution: 'locked', prerequisites: [] },
        { id: 5, title: "Painter's Partition", leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/painters-partition-problem/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 6, title: 'Aggressive Cows', leetcode: 'Problem', link: 'https://www.spoj.com/problems/AGGRCOW/', companies: ['Adobe'], solution: 'locked', prerequisites: [] }
      ],
      hard: [
        { id: 7, title: 'Median of 2 Sorted Arrays', leetcode: 'LC #4', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', companies: ['Amazon', 'Samsung', 'Microsoft', 'Google'], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: []
  },

  strings: {
    name: 'Strings',
    icon: '📝',
    color: 'from-green-500 to-teal-500',
    difficulty: 'Beginner',
    estimatedTime: '5-6 hours',
    progress: 0,
    tags: ['Palindrome', 'Anagram', 'Pattern Matching'],
    videoId: 'AT14lCXuMKI',
    description: 'Master string manipulation, pattern matching, and algorithms',
    whenToUse: [
      'Text processing and manipulation',
      'Pattern matching problems',
      'Palindrome checks',
      'Anagram detection'
    ],
    template: `def string_pattern(s):
    # Two pointer for palindrome
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
    problems: {
      easy: [
        { id: 1, title: 'Valid Palindrome', leetcode: 'LC #125', link: 'https://leetcode.com/problems/valid-palindrome/', companies: ['Amazon', 'Cisco', 'DE Shaw', 'Facebook', 'FactSet', 'Morgan Stanley', 'Paytm', 'Zoho'], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Longest Common Prefix', leetcode: 'LC #14', link: 'https://leetcode.com/problems/longest-common-prefix/', companies: ['Adobe', 'Blinkit', 'Dunzo'], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Valid Anagram', leetcode: 'LC #242', link: 'https://leetcode.com/problems/valid-anagram/', companies: ['Google', 'Adobe', 'Flipkart', 'Nagarro', 'Media.net', 'Directi'], solution: 'locked', prerequisites: [] }
      ],
      medium: [
        { id: 4, title: 'Reverse Words in String', leetcode: 'LC #151', link: 'https://leetcode.com/problems/reverse-words-in-a-string/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 5, title: 'Remove All Occurrences of String', leetcode: 'LC #1910', link: 'https://leetcode.com/problems/remove-all-occurrences-of-a-substring/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 6, title: 'Permutation in String', leetcode: 'LC #567', link: 'https://leetcode.com/problems/permutation-in-string/', companies: ['Adobe', 'Goldman Sachs', 'Uber'], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'String Compression', leetcode: 'LC #443', link: 'https://leetcode.com/problems/string-compression/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 8, title: 'Group Anagrams', leetcode: 'LC #49', link: 'https://leetcode.com/problems/group-anagrams/', companies: ['Samsung', 'Adobe', 'Amazon'], solution: 'locked', prerequisites: [] }
      ],
      hard: [
        { id: 9, title: 'Minimum Window Substring', leetcode: 'LC #76', link: 'https://leetcode.com/problems/minimum-window-substring/', companies: ['Amazon', 'Google', 'MakeMyTrip', 'Microsoft', 'Media.net', 'Atlassian', 'Flipkart'], solution: 'locked', prerequisites: [] },
        { id: 10, title: 'KMP Algorithm', leetcode: 'LC #28', link: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 11, title: 'Robin Karp (Concept)', leetcode: 'Concept', link: 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/', companies: [], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: []
  },

  'recursion-backtracking': {
    name: 'Recursion & Backtracking',
    icon: '🔄',
    color: 'from-orange-500 to-red-500',
    difficulty: 'Advanced',
    estimatedTime: '10-12 hours',
    progress: 0,
    tags: ['Recursion', 'Backtracking', 'DFS'],
    videoId: 'AT14lCXuMKI',
    description: 'Master recursive thinking and backtracking techniques',
    whenToUse: [
      'Generating all combinations/permutations',
      'Constraint satisfaction problems',
      'Tree and graph traversal',
      'Divide and conquer problems'
    ],
    template: `def backtrack(path, choices):
    if is_solution(path):
        result.append(path.copy())
        return
    
    for choice in choices:
        if is_valid(choice):
            path.append(choice)
            backtrack(path, remaining_choices)
            path.pop()  # backtrack`,
    problems: {
      easy: [],
      medium: [
        { id: 1, title: 'Combination Sum I', leetcode: 'LC #39', link: 'https://leetcode.com/problems/combination-sum/', companies: ['Adobe', 'Amazon', 'Microsoft', 'Oracle', 'DE Shaw', 'Salesforce'], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Combination Sum II', leetcode: 'LC #40', link: 'https://leetcode.com/problems/combination-sum-ii/', companies: ['Adobe', 'Amazon', 'Microsoft', 'Goldman Sachs', 'Oracle'], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Palindrome Partitioning', leetcode: 'LC #131', link: 'https://leetcode.com/problems/palindrome-partitioning/', companies: ['Meta', 'Adobe', 'Infosys', 'Walmart Labs', 'Amazon', 'Microsoft'], solution: 'locked', prerequisites: [] },
        { id: 4, title: 'Knights Tour', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/the-knights-tour-problem/', companies: ['Google', 'Amazon', 'Microsoft', 'Oracle', 'Meta', 'TCS', 'Apple', 'Salesforce', 'Citadel'], solution: 'locked', prerequisites: [] },
        { id: 5, title: 'M Coloring', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/m-coloring-problem/', companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Intuit', 'Citadel', 'Goldman Sachs', 'Oracle'], solution: 'locked', prerequisites: [] },
        { id: 6, title: 'Rat in a Maze', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/rat-in-a-maze/', companies: ['Amazon'], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'Subsets II', leetcode: 'LC #90', link: 'https://leetcode.com/problems/subsets-ii/', companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'Apple', 'TCS', 'Flipkart', 'Uber', 'Swiggy'], solution: 'locked', prerequisites: [] },
        { id: 8, title: 'Merge Sort', leetcode: 'Concept', link: 'https://leetcode.com/problems/sort-an-array/', companies: ['Google', 'Amazon', 'Meta', 'Microsoft'], solution: 'locked', prerequisites: [] }
      ],
      hard: [
        { id: 9, title: 'N Queens', leetcode: 'LC #51', link: 'https://leetcode.com/problems/n-queens/', companies: ['Microsoft', 'Amazon'], solution: 'locked', prerequisites: [] },
        { id: 10, title: 'Sudoku Solver', leetcode: 'LC #37', link: 'https://leetcode.com/problems/sudoku-solver/', companies: ['Amazon', 'TCS', 'Apple', 'Meta', 'Infosys', 'Oracle', 'Adobe', 'Hive'], solution: 'locked', prerequisites: [] },
        { id: 11, title: 'Count Inversions', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/counting-inversions/', companies: ['Google', 'Amazon', 'Salesforce'], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: []
  },

  'linked-list': {
    name: 'Linked List',
    icon: '🔗',
    color: 'from-indigo-500 to-purple-500',
    difficulty: 'Intermediate',
    estimatedTime: '6-8 hours',
    progress: 0,
    tags: ['Pointers', 'Cycles', 'Reversal'],
    videoId: 'AT14lCXuMKI',
    description: 'Master linked list operations, reversal, and cycle detection',
    whenToUse: [
      'Dynamic data structure manipulation',
      'In-place reversal problems',
      'Cycle detection',
      'Merging and sorting lists'
    ],
    template: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
    problems: {
      easy: [
        { id: 1, title: 'Reverse a LL', leetcode: 'LC #206', link: 'https://leetcode.com/problems/reverse-linked-list/', companies: ['Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Oracle', 'Adobe', 'TCS', 'Qualcomm', 'PayPal', 'JP Morgan'], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Middle of LL', leetcode: 'LC #876', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', companies: ['Amazon', 'Meta', 'Google', 'Goldman Sachs', 'Qualcomm', 'Intuit', 'Walmart Labs'], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Merge 2 Sorted LL', leetcode: 'LC #21', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', companies: ['Amazon', 'Flipkart', 'Microsoft', 'Oracle', 'Samsung'], solution: 'locked', prerequisites: [] },
        { id: 4, title: 'Check if LL Is Palindrome or Not', leetcode: 'LC #234', link: 'https://leetcode.com/problems/palindrome-linked-list/', companies: ['Amazon', 'Meta', 'Google', 'Goldman Sachs', 'Cisco', 'Samsung', 'Walmart Labs', 'Wipro'], solution: 'locked', prerequisites: [] },
        { id: 5, title: 'Detect Cycle in LL', leetcode: 'LC #141', link: 'https://leetcode.com/problems/linked-list-cycle/', companies: ['Google', 'Meta', 'Microsoft', 'Amazon', 'Oracle', 'Paytm', 'Apple', 'Nvidia'], solution: 'locked', prerequisites: [] }
      ],
      medium: [
        { id: 6, title: 'Remove Cycle in LL', leetcode: 'LC #142', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', companies: ['Amazon', 'Meta', 'Apple'], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'Flatten LL', leetcode: 'LC #430', link: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/', companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Qualcomm', 'Oracle', 'Adobe', 'Uber'], solution: 'locked', prerequisites: [] },
        { id: 8, title: 'Clone LL with Random Pointers', leetcode: 'LC #138', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', companies: ['Meta', 'Amazon', 'Microsoft', 'Google', 'Intel', 'Walmart Labs', 'Nvidia', 'Flipkart', 'Uber', 'Oracle'], solution: 'locked', prerequisites: [] },
        { id: 9, title: 'Add 2 Numbers', leetcode: 'LC #2', link: 'https://leetcode.com/problems/add-two-numbers/', companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Oracle', 'TCS', 'Accenture'], solution: 'locked', prerequisites: [] },
        { id: 10, title: 'Reverse Linked List 2', leetcode: 'LC #92', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Adobe', 'Uber'], solution: 'locked', prerequisites: [] },
        { id: 11, title: 'LRU Cache', leetcode: 'LC #146', link: 'https://leetcode.com/problems/lru-cache/', companies: ['Nvidia', 'Google', 'Meta', 'Amazon', 'Microsoft', 'Oracle', 'Adobe', 'Infosys', 'Siemens', 'Morgan Stanley'], solution: 'locked', prerequisites: [] },
        { id: 12, title: 'Rotate a LL', leetcode: 'LC #61', link: 'https://leetcode.com/problems/rotate-list/', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Salesforce', 'Infosys', 'Uber', 'Apple'], solution: 'locked', prerequisites: [] }
      ],
      hard: [
        { id: 13, title: 'Reverse Nodes in K Groups', leetcode: 'LC #25', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber', 'Adobe', 'TCS', 'DE Shaw', 'Zepto'], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: []
  },

  'stack-queue': {
    name: 'Stack & Queue',
    icon: '📚',
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Intermediate',
    estimatedTime: '7-9 hours',
    progress: 0,
    tags: ['LIFO', 'FIFO', 'Monotonic'],
    videoId: 'AT14lCXuMKI',
    description: 'Master stack and queue operations with real-world applications',
    whenToUse: [
      'Problems requiring LIFO or FIFO behavior',
      'Parsing and expression evaluation',
      'Next greater/smaller element problems',
      'Level order traversal'
    ],
    template: `# Stack example
stack = []
stack.append(1)  # push
stack.pop()      # pop

# Queue example
from collections import deque
queue = deque()
queue.append(1)  # enqueue
queue.popleft()  # dequeue`,
    problems: {
      easy: [
        { id: 1, title: 'Implement Stack using Queue', leetcode: 'LC #225', link: 'https://leetcode.com/problems/implement-stack-using-queues/', companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Adobe', 'Oracle', 'Optum'], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Implement Queue using Stack', leetcode: 'LC #232', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'Oracle', 'Netflix', 'Meta', 'Uber'], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Next Greater Element I', leetcode: 'LC #496', link: 'https://leetcode.com/problems/next-greater-element-i/', companies: ['Amazon', 'Meta', 'Swiggy', 'Microsoft', 'Google', 'Apple', 'Morgan Stanley', 'Oracle'], solution: 'locked', prerequisites: [] },
        { id: 4, title: 'Valid Parenthesis', leetcode: 'LC #20', link: 'https://leetcode.com/problems/valid-parentheses/', companies: ['Google', 'Meta', 'Amazon', 'LinkedIn', 'Intuit', 'Visa', 'IBM', 'TCS', 'JP Morgan'], solution: 'locked', prerequisites: [] },
        { id: 5, title: '1st Non Repeating in Stream', leetcode: 'LC #387', link: 'https://leetcode.com/problems/first-unique-character-in-a-string/', companies: ['Amazon', 'Goldman Sachs', 'Google', 'Apple', 'Meta', 'Microsoft', 'Walmart Labs', 'Adobe', 'TCS'], solution: 'locked', prerequisites: [] },
        { id: 6, title: 'Reverse 1st K Elements of Queue', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/reversing-first-k-elements-queue/', companies: ['Microsoft', 'Amdocs', 'Amazon'], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'Time Needed to Buy Tickets', leetcode: 'LC #2073', link: 'https://leetcode.com/problems/time-needed-to-buy-tickets/', companies: ['Uber', 'Amazon', 'Microsoft', 'Google', 'Meta'], solution: 'locked', prerequisites: [] }
      ],
      medium: [
        { id: 8, title: 'Next Greater Element II', leetcode: 'LC #503', link: 'https://leetcode.com/problems/next-greater-element-ii/', companies: ['Amazon', 'Uber'], solution: 'locked', prerequisites: [] },
        { id: 9, title: 'Previous Smaller Element', leetcode: 'Problem', link: 'https://www.interviewbit.com/problems/nearest-smaller-element/', companies: ['Amazon', 'Meta', 'Microsoft', 'Apple', 'Visa', 'Oracle', 'Intuit', 'Citadel', 'Samsung', 'PayPal', 'eBay'], solution: 'locked', prerequisites: [] },
        { id: 10, title: 'Celebrity Problem', leetcode: 'LC #277', link: 'https://leetcode.com/problems/find-the-celebrity/', companies: ['LinkedIn', 'Meta', 'Microsoft', 'Amazon', 'Uber', 'Salesforce', 'PhonePe'], solution: 'locked', prerequisites: [] },
        { id: 11, title: 'Get Min Element from Stack', leetcode: 'LC #155', link: 'https://leetcode.com/problems/min-stack/', companies: ['Google', 'Meta', 'Amazon', 'Salesforce', 'Intuit', 'PayPal', 'Adobe', 'Nike'], solution: 'locked', prerequisites: [] },
        { id: 12, title: 'Circular Tour / Gas Station', leetcode: 'LC #134', link: 'https://leetcode.com/problems/gas-station/', companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Intuit', 'IBM'], solution: 'locked', prerequisites: [] },
        { id: 13, title: 'Rotten Oranges', leetcode: 'LC #994', link: 'https://leetcode.com/problems/rotting-oranges/', companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Oracle', 'Adobe', 'Cisco', 'Infosys', 'Salesforce'], solution: 'locked', prerequisites: [] },
        { id: 14, title: 'Stock Span', leetcode: 'LC #901', link: 'https://leetcode.com/problems/online-stock-span/', companies: ['Amazon', 'Google', 'Microsoft', 'Oracle', 'Samsung', 'Meta', 'Intuit', 'PhonePe', 'Zepto', 'Flipkart'], solution: 'locked', prerequisites: [] }
      ],
      hard: [
        { id: 15, title: 'Max Area in Histogram', leetcode: 'LC #84', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', companies: ['Adobe', 'Apple', 'Meta', 'Amazon', 'Google', 'Microsoft'], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: []
  },

  trees: {
    name: 'Trees',
    icon: '🌲',
    color: 'from-emerald-500 to-green-500',
    difficulty: 'Advanced',
    estimatedTime: '8-10 hours',
    progress: 0,
    tags: ['Traversal', 'BST', 'DFS/BFS'],
    videoId: 'AT14lCXuMKI',
    description: 'Master tree traversals, BST operations, and tree properties',
    whenToUse: [
      'Hierarchical data representation',
      'Tree traversal problems',
      'BST operations',
      'Tree properties and validation'
    ],
    template: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root:
        return
    inorder(root.left)
    process(root.val)
    inorder(root.right)`,
    problems: {
      easy: [
        { id: 1, title: 'Inorder', leetcode: 'LC #94', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'Preorder', leetcode: 'LC #144', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Postorder', leetcode: 'LC #145', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 4, title: 'Symmetric Tree', leetcode: 'LC #101', link: 'https://leetcode.com/problems/symmetric-tree/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 5, title: 'Minimum Distance between Nodes', leetcode: 'LC #783', link: 'https://leetcode.com/problems/minimum-distance-between-bst-nodes/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 6, title: 'Are 2 Trees Identical or Not', leetcode: 'LC #100', link: 'https://leetcode.com/problems/same-tree/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'Morris Inorder Traversal', leetcode: 'LC #94', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 8, title: 'Diameter', leetcode: 'LC #543', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 9, title: 'Check if Tree is Height Balanced', leetcode: 'LC #110', link: 'https://leetcode.com/problems/balanced-binary-tree/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 10, title: 'Subtree of Another Tree', leetcode: 'LC #572', link: 'https://leetcode.com/problems/subtree-of-another-tree/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 11, title: 'Check if BT Mirror of itself or not', leetcode: 'LC #101', link: 'https://leetcode.com/problems/symmetric-tree/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 12, title: 'Top View of a Tree', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/', companies: ['Amazon'], solution: 'locked', prerequisites: [] }
      ],
      medium: [],
      hard: []
    },
    commonMistakes: []
  },

  graph: {
    name: 'Graph',
    icon: '🕸️',
    color: 'from-rose-500 to-pink-500',
    difficulty: 'Advanced',
    estimatedTime: '12-15 hours',
    progress: 0,
    tags: ['BFS', 'DFS', 'Shortest Path'],
    videoId: 'AT14lCXuMKI',
    description: 'Master graph algorithms, shortest paths, and topological sorting',
    whenToUse: [
      'Network and connectivity problems',
      'Shortest path problems',
      'Cycle detection',
      'Topological sorting'
    ],
    template: `# BFS Template
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    problems: {
      easy: [],
      medium: [
        { id: 1, title: 'BFS (Breadth-First Search)', leetcode: 'LC #102', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 2, title: 'DFS (Depth-First Search)', leetcode: 'LC #200', link: 'https://leetcode.com/problems/number-of-islands/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 3, title: 'Detect Cycle in Undirected Graph (BFS)', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 4, title: 'Detect Cycle in Undirected Graph (DFS)', leetcode: 'Problem', link: 'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 5, title: 'Detect Cycle in Directed Graph (DFS)', leetcode: 'LC #207', link: 'https://leetcode.com/problems/course-schedule/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 6, title: "Detect Cycle in Directed Graph (BFS) - Kahn's Algorithm", leetcode: 'LC #207', link: 'https://leetcode.com/problems/course-schedule/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 7, title: 'Topological Sort (DFS)', leetcode: 'LC #210', link: 'https://leetcode.com/problems/course-schedule-ii/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 8, title: 'Topological Sort (BFS)', leetcode: 'LC #210', link: 'https://leetcode.com/problems/course-schedule-ii/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 9, title: 'Bipartite Graph (BFS)', leetcode: 'LC #785', link: 'https://leetcode.com/problems/is-graph-bipartite/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 10, title: 'Bipartite Graph (DFS)', leetcode: 'LC #785', link: 'https://leetcode.com/problems/is-graph-bipartite/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 11, title: 'Bipartite Graph (BFS)', leetcode: 'LC #785', link: 'https://leetcode.com/problems/is-graph-bipartite/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 12, title: 'Shortest Path UG', leetcode: 'LC #1091', link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 13, title: 'Check bi-partite Graph', leetcode: 'LC #785', link: 'https://leetcode.com/problems/is-graph-bipartite/', companies: [], solution: 'locked', prerequisites: [] },
        { id: 14, title: 'Number of Islands', leetcode: 'LC #200', link: 'https://leetcode.com/problems/number-of-islands/', companies: ['Amazon'], solution: 'locked', prerequisites: [] },
        { id: 15, title: 'Rotten Oranges', leetcode: 'LC #994', link: 'https://leetcode.com/problems/rotting-oranges/', companies: ['Sharechar'], solution: 'locked', prerequisites: [] },
        { id: 16, title: '01 Matrix', leetcode: 'LC #542', link: 'https://leetcode.com/problems/01-matrix/', companies: ['Google'], solution: 'locked', prerequisites: [] },
        { id: 17, title: 'Course Schedule I & II', leetcode: 'LC #207', link: 'https://leetcode.com/problems/course-schedule/', companies: ['Amazon'], solution: 'locked', prerequisites: [] },
        { id: 18, title: 'Alien Dictionary', leetcode: 'LC #269', link: 'https://leetcode.com/problems/alien-dictionary/', companies: ['Google'], solution: 'locked', prerequisites: [] },
        { id: 19, title: 'Cheapest Flights within K Stops', leetcode: 'LC #787', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', companies: ['Google'], solution: 'locked', prerequisites: [] },
        { id: 20, title: 'Clone a Graph', leetcode: 'LC #133', link: 'https://leetcode.com/problems/clone-graph/', companies: ['Amazon'], solution: 'locked', prerequisites: [] },
        { id: 21, title: 'Most Stones Removed', leetcode: 'LC #947', link: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', companies: ['Microsoft'], solution: 'locked', prerequisites: [] },
        { id: 22, title: 'Number of Provinces', leetcode: 'LC #547', link: 'https://leetcode.com/problems/number-of-provinces/', companies: ['Paytm'], solution: 'locked', prerequisites: [] },
        { id: 23, title: 'Number of Ways to Arrive at Destination', leetcode: 'LC #1976', link: 'https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/', companies: ['PhonePe'], solution: 'locked', prerequisites: [] }
      ],
      hard: [
        { id: 24, title: 'Topological Sorting (BFS)', leetcode: 'LC #210', link: 'https://leetcode.com/problems/course-schedule-ii/', companies: ['Sprinklr'], solution: 'locked', prerequisites: [] },
        { id: 25, title: "Dijkstra's Algorithm", leetcode: 'LC #743', link: 'https://leetcode.com/problems/network-delay-time/', companies: ['Google'], solution: 'locked', prerequisites: [] },
        { id: 26, title: "Kruskal's Algorithm (MST)", leetcode: 'LC #1584', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', companies: ['Airbnb'], solution: 'locked', prerequisites: [] }
      ]
    },
    commonMistakes: []
  }
};
