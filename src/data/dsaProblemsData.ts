// Complete DSA Problems from NamasteDev - 145 problems across 13 topics
// Each problem has LeetCode slug for direct linking

export interface DSAProblemItem {
  id: string;
  title: string;
  slug: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies?: string[];
  solution: 'locked' | 'unlocked';
}

export interface DSATopicData {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  problems: DSAProblemItem[];
}

// 1. Foundation (11 problems)
const foundationProblems: DSAProblemItem[] = [
  { id: 'foundation-1', title: 'Two Sum', slug: 'two-sum', link: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], solution: 'unlocked' },
  { id: 'foundation-2', title: 'Square Number', slug: 'perfect-squares', link: 'https://leetcode.com/problems/perfect-squares/', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
  { id: 'foundation-3', title: 'Second Largest', slug: 'second-largest-digit-in-a-string', link: 'https://leetcode.com/problems/second-largest-digit-in-a-string/', difficulty: 'Easy', solution: 'locked' },
  { id: 'foundation-4', title: 'Palindrome Number', slug: 'palindrome-number', link: 'https://leetcode.com/problems/palindrome-number/', difficulty: 'Easy', companies: ['Amazon'], solution: 'unlocked' },
  { id: 'foundation-5', title: 'Reverse Integer', slug: 'reverse-integer', link: 'https://leetcode.com/problems/reverse-integer/', difficulty: 'Medium', companies: ['Amazon', 'Apple'], solution: 'locked' },
  { id: 'foundation-6', title: 'Count Negative Numbers in an Array', slug: 'count-negative-numbers-in-a-sorted-matrix', link: 'https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/', difficulty: 'Easy', solution: 'locked' },
  { id: 'foundation-7', title: 'Find Smallest Number in an Array', slug: 'minimum-value-to-get-positive-step-by-step-sum', link: 'https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/', difficulty: 'Easy', solution: 'locked' },
  { id: 'foundation-8', title: 'Find Largest Number in an Array', slug: 'maximum-subarray', link: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'foundation-9', title: 'Binary Search', slug: 'binary-search', link: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', companies: ['Amazon'], solution: 'unlocked' },
  { id: 'foundation-10', title: 'Merge Sort', slug: 'sort-an-array', link: 'https://leetcode.com/problems/sort-an-array/', difficulty: 'Medium', companies: ['Google', 'Microsoft'], solution: 'locked' },
  { id: 'foundation-11', title: 'Power of Two', slug: 'power-of-two', link: 'https://leetcode.com/problems/power-of-two/', difficulty: 'Easy', solution: 'locked' },
];

// 2. Arrays (9 problems)
const arrayProblems: DSAProblemItem[] = [
  { id: 'arrays-1', title: 'Remove Duplicates', slug: 'remove-duplicates-from-sorted-array', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy', companies: ['Facebook', 'Microsoft'], solution: 'unlocked' },
  { id: 'arrays-2', title: 'Remove Element', slug: 'remove-element', link: 'https://leetcode.com/problems/remove-element/', difficulty: 'Easy', solution: 'locked' },
  { id: 'arrays-3', title: 'Reverse String', slug: 'reverse-string', link: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', solution: 'unlocked' },
  { id: 'arrays-4', title: 'Best Time to Buy and Sell Stocks', slug: 'best-time-to-buy-and-sell-stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Goldman Sachs'], solution: 'unlocked' },
  { id: 'arrays-5', title: 'Merge Sorted Arrays', slug: 'merge-sorted-array', link: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'Easy', companies: ['Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'arrays-6', title: 'Move Zeros', slug: 'move-zeroes', link: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
  { id: 'arrays-7', title: 'Max Consecutive Ones', slug: 'max-consecutive-ones', link: 'https://leetcode.com/problems/max-consecutive-ones/', difficulty: 'Easy', solution: 'locked' },
  { id: 'arrays-8', title: 'Missing Number', slug: 'missing-number', link: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'arrays-9', title: 'Single Number', slug: 'single-number', link: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
];

// 3. Linked List (14 problems)
const linkedListProblems: DSAProblemItem[] = [
  { id: 'linkedlist-1', title: 'Design Linked List', slug: 'design-linked-list', link: 'https://leetcode.com/problems/design-linked-list/', difficulty: 'Medium', solution: 'locked' },
  { id: 'linkedlist-2', title: 'Middle of Linked List', slug: 'middle-of-the-linked-list', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'unlocked' },
  { id: 'linkedlist-3', title: 'Reverse Linked List', slug: 'reverse-linked-list', link: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'unlocked' },
  { id: 'linkedlist-4', title: 'Linked List Cycle', slug: 'linked-list-cycle', link: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'unlocked' },
  { id: 'linkedlist-5', title: 'Palindrome Linked List', slug: 'palindrome-linked-list', link: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'linkedlist-6', title: 'Intersection of two Linked Lists', slug: 'intersection-of-two-linked-lists', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'linkedlist-7', title: 'Remove Linked List Elements', slug: 'remove-linked-list-elements', link: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'Easy', solution: 'locked' },
  { id: 'linkedlist-8', title: 'Remove nth node from end of List', slug: 'remove-nth-node-from-end-of-list', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
  { id: 'linkedlist-9', title: 'Remove Duplicates from Sorted List', slug: 'remove-duplicates-from-sorted-list', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', difficulty: 'Easy', solution: 'locked' },
  { id: 'linkedlist-10', title: 'Odd Even Linked List', slug: 'odd-even-linked-list', link: 'https://leetcode.com/problems/odd-even-linked-list/', difficulty: 'Medium', solution: 'locked' },
  { id: 'linkedlist-11', title: 'Add Two Numbers', slug: 'add-two-numbers', link: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'locked' },
  { id: 'linkedlist-12', title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'unlocked' },
  { id: 'linkedlist-13', title: 'Rotate List', slug: 'rotate-list', link: 'https://leetcode.com/problems/rotate-list/', difficulty: 'Medium', solution: 'locked' },
  { id: 'linkedlist-14', title: 'Swap Nodes in Pairs', slug: 'swap-nodes-in-pairs', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
];

// 4. Strings (12 problems)
const stringProblems: DSAProblemItem[] = [
  { id: 'strings-1', title: 'Length of Last Word', slug: 'length-of-last-word', link: 'https://leetcode.com/problems/length-of-last-word/', difficulty: 'Easy', solution: 'unlocked' },
  { id: 'strings-2', title: 'Find Words Containing Character', slug: 'find-words-containing-character', link: 'https://leetcode.com/problems/find-words-containing-character/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-3', title: 'Jewels and Stones', slug: 'jewels-and-stones', link: 'https://leetcode.com/problems/jewels-and-stones/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-4', title: 'Find Most Frequent Vowel and Consonant', slug: 'find-most-frequent-vowel-and-consonant', link: 'https://leetcode.com/problems/find-most-frequent-vowel-and-consonant/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-5', title: 'Split a String in Balanced Strings', slug: 'split-a-string-in-balanced-strings', link: 'https://leetcode.com/problems/split-a-string-in-balanced-strings/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-6', title: 'Reverse String II', slug: 'reverse-string-ii', link: 'https://leetcode.com/problems/reverse-string-ii/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-7', title: 'Valid Palindrome', slug: 'valid-palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'unlocked' },
  { id: 'strings-8', title: 'Largest Odd Number in a String', slug: 'largest-odd-number-in-string', link: 'https://leetcode.com/problems/largest-odd-number-in-string/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-9', title: 'Longest Common Prefix', slug: 'longest-common-prefix', link: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'Easy', companies: ['Google', 'Amazon'], solution: 'locked' },
  { id: 'strings-10', title: 'Valid Anagram', slug: 'valid-anagram', link: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'strings-11', title: 'Isomorphic Strings', slug: 'isomorphic-strings', link: 'https://leetcode.com/problems/isomorphic-strings/', difficulty: 'Easy', solution: 'locked' },
  { id: 'strings-12', title: 'Group Anagrams', slug: 'group-anagrams', link: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
];

// 5. Stack and Queues (10 problems)
const stackQueueProblems: DSAProblemItem[] = [
  { id: 'stack-1', title: 'Implement Stack', slug: 'implement-stack-using-queues', link: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy', solution: 'unlocked' },
  { id: 'stack-2', title: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'unlocked' },
  { id: 'stack-3', title: 'Valid Parentheses', slug: 'valid-parentheses', link: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'], solution: 'unlocked' },
  { id: 'stack-4', title: 'Min Stack', slug: 'min-stack', link: 'https://leetcode.com/problems/min-stack/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'stack-5', title: 'Remove Outermost Parentheses', slug: 'remove-outermost-parentheses', link: 'https://leetcode.com/problems/remove-outermost-parentheses/', difficulty: 'Easy', solution: 'locked' },
  { id: 'stack-6', title: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
  { id: 'stack-7', title: 'Next Greater Element', slug: 'next-greater-element-i', link: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy', solution: 'locked' },
  { id: 'stack-8', title: 'Daily Temperatures', slug: 'daily-temperatures', link: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'stack-9', title: 'Next Greater Element - II', slug: 'next-greater-element-ii', link: 'https://leetcode.com/problems/next-greater-element-ii/', difficulty: 'Medium', solution: 'locked' },
  { id: 'stack-10', title: 'Rotting Oranges', slug: 'rotting-oranges', link: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
];

// 6. Binary Search Algorithm (10 problems)
const binarySearchProblems: DSAProblemItem[] = [
  { id: 'binarysearch-1', title: 'Square Root of X', slug: 'sqrtx', link: 'https://leetcode.com/problems/sqrtx/', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'unlocked' },
  { id: 'binarysearch-2', title: 'Guess Higher or Lower', slug: 'guess-number-higher-or-lower', link: 'https://leetcode.com/problems/guess-number-higher-or-lower/', difficulty: 'Easy', solution: 'locked' },
  { id: 'binarysearch-3', title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], solution: 'locked' },
  { id: 'binarysearch-4', title: 'First Bad Version', slug: 'first-bad-version', link: 'https://leetcode.com/problems/first-bad-version/', difficulty: 'Easy', companies: ['Facebook', 'Google'], solution: 'locked' },
  { id: 'binarysearch-5', title: 'Find Peak Element', slug: 'find-peak-element', link: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'Medium', companies: ['Facebook', 'Google'], solution: 'locked' },
  { id: 'binarysearch-6', title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
  { id: 'binarysearch-7', title: 'Find First & Last Position in Sorted Array', slug: 'find-first-and-last-position-of-element-in-sorted-array', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'], solution: 'locked' },
  { id: 'binarysearch-8', title: 'Find Peak in a Mountain Array', slug: 'peak-index-in-a-mountain-array', link: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/', difficulty: 'Easy', solution: 'locked' },
  { id: 'binarysearch-9', title: 'Single Element in a Sorted Array', slug: 'single-element-in-a-sorted-array', link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
  { id: 'binarysearch-10', title: 'Find k Closest Elements', slug: 'find-k-closest-elements', link: 'https://leetcode.com/problems/find-k-closest-elements/', difficulty: 'Medium', companies: ['Facebook', 'Google'], solution: 'locked' },
];

// 7. Two Pointers & Sliding Window (12 problems)
const twoPointersProblems: DSAProblemItem[] = [
  { id: 'twopointers-1', title: 'Two Sum', slug: 'two-sum', link: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], solution: 'unlocked' },
  { id: 'twopointers-2', title: 'Two Sum II', slug: 'two-sum-ii-input-array-is-sorted', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
  { id: 'twopointers-3', title: 'Is Subsequence', slug: 'is-subsequence', link: 'https://leetcode.com/problems/is-subsequence/', difficulty: 'Easy', solution: 'locked' },
  { id: 'twopointers-4', title: 'Find Index of First Occurrence in String', slug: 'find-the-index-of-the-first-occurrence-in-a-string', link: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', difficulty: 'Easy', solution: 'locked' },
  { id: 'twopointers-5', title: 'Intersection of Two Linked Lists', slug: 'intersection-of-two-linked-lists', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'twopointers-6', title: 'Container with Most Water', slug: 'container-with-most-water', link: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Facebook'], solution: 'locked' },
  { id: 'twopointers-7', title: 'Three Sum', slug: '3sum', link: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'twopointers-8', title: 'Trapping Rain Water', slug: 'trapping-rain-water', link: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs'], solution: 'locked' },
  { id: 'twopointers-9', title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'], solution: 'locked' },
  { id: 'twopointers-10', title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
  { id: 'twopointers-11', title: 'Permutation in String', slug: 'permutation-in-string', link: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], solution: 'locked' },
  { id: 'twopointers-12', title: 'Sliding Window Maximum', slug: 'sliding-window-maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], solution: 'locked' },
];

// 8. Binary Tree (18 problems)
const binaryTreeProblems: DSAProblemItem[] = [
  { id: 'binarytree-1', title: 'Preorder Traversal', slug: 'binary-tree-preorder-traversal', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', difficulty: 'Easy', solution: 'unlocked' },
  { id: 'binarytree-2', title: 'Inorder Traversal', slug: 'binary-tree-inorder-traversal', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'unlocked' },
  { id: 'binarytree-3', title: 'Postorder Traversal', slug: 'binary-tree-postorder-traversal', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', difficulty: 'Easy', solution: 'locked' },
  { id: 'binarytree-4', title: 'Level Order Traversal', slug: 'binary-tree-level-order-traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'binarytree-5', title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'unlocked' },
  { id: 'binarytree-6', title: 'Path Sum', slug: 'path-sum', link: 'https://leetcode.com/problems/path-sum/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'binarytree-7', title: 'Symmetric Tree', slug: 'symmetric-tree', link: 'https://leetcode.com/problems/symmetric-tree/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'binarytree-8', title: 'Invert a Binary Tree', slug: 'invert-binary-tree', link: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', companies: ['Google'], solution: 'unlocked' },
  { id: 'binarytree-9', title: 'Same Tree', slug: 'same-tree', link: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', solution: 'locked' },
  { id: 'binarytree-10', title: 'Balanced Binary Tree', slug: 'balanced-binary-tree', link: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
  { id: 'binarytree-11', title: 'Diameter of a Binary Tree', slug: 'diameter-of-binary-tree', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', companies: ['Facebook', 'Amazon'], solution: 'locked' },
  { id: 'binarytree-12', title: 'Zigzag Level Order Traversal', slug: 'binary-tree-zigzag-level-order-traversal', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'binarytree-13', title: 'Subtree of another Tree', slug: 'subtree-of-another-tree', link: 'https://leetcode.com/problems/subtree-of-another-tree/', difficulty: 'Easy', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'binarytree-14', title: 'Lowest Common Ancestor', slug: 'lowest-common-ancestor-of-a-binary-tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], solution: 'locked' },
  { id: 'binarytree-15', title: 'Binary Tree Right Side View', slug: 'binary-tree-right-side-view', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'binarytree-16', title: 'Count Good Nodes in Binary Tree', slug: 'count-good-nodes-in-binary-tree', link: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', difficulty: 'Medium', companies: ['Microsoft'], solution: 'locked' },
  { id: 'binarytree-17', title: 'Populating Next Right Pointers in Each Node', slug: 'populating-next-right-pointers-in-each-node', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'binarytree-18', title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], solution: 'locked' },
];

// 9. Binary Search Tree (5 problems)
const bstProblems: DSAProblemItem[] = [
  { id: 'bst-1', title: 'Valid Binary Search Tree', slug: 'validate-binary-search-tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'unlocked' },
  { id: 'bst-2', title: 'Search in a BST', slug: 'search-in-a-binary-search-tree', link: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', difficulty: 'Easy', solution: 'unlocked' },
  { id: 'bst-3', title: 'Insert into a BST', slug: 'insert-into-a-binary-search-tree', link: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', difficulty: 'Medium', solution: 'locked' },
  { id: 'bst-4', title: 'Kth Smallest Element', slug: 'kth-smallest-element-in-a-bst', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'bst-5', title: 'Lowest Common Ancestor of a BST', slug: 'lowest-common-ancestor-of-a-binary-search-tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
];

// 10. Heap (5 problems)
const heapProblems: DSAProblemItem[] = [
  { id: 'heap-1', title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'unlocked' },
  { id: 'heap-2', title: 'Kth Largest Element in a Stream', slug: 'kth-largest-element-in-a-stream', link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
  { id: 'heap-3', title: 'Last Stone Weight', slug: 'last-stone-weight', link: 'https://leetcode.com/problems/last-stone-weight/', difficulty: 'Easy', solution: 'locked' },
  { id: 'heap-4', title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
  { id: 'heap-5', title: 'Kth Smallest Element in a Sorted Matrix', slug: 'kth-smallest-element-in-a-sorted-matrix', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
];

// 11. Backtracking (12 problems)
const backtrackingProblems: DSAProblemItem[] = [
  { id: 'backtracking-1', title: 'Subsets - The Power Set', slug: 'subsets', link: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'unlocked' },
  { id: 'backtracking-2', title: 'Combinations', slug: 'combinations', link: 'https://leetcode.com/problems/combinations/', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
  { id: 'backtracking-3', title: 'Permutations', slug: 'permutations', link: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], solution: 'unlocked' },
  { id: 'backtracking-4', title: 'Subset - II', slug: 'subsets-ii', link: 'https://leetcode.com/problems/subsets-ii/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'backtracking-5', title: 'Combination Sum', slug: 'combination-sum', link: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'backtracking-6', title: 'Combination Sum - II', slug: 'combination-sum-ii', link: 'https://leetcode.com/problems/combination-sum-ii/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'backtracking-7', title: 'Combination Sum - III', slug: 'combination-sum-iii', link: 'https://leetcode.com/problems/combination-sum-iii/', difficulty: 'Medium', solution: 'locked' },
  { id: 'backtracking-8', title: 'Letter Combinations of a Phone Number', slug: 'letter-combinations-of-a-phone-number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
  { id: 'backtracking-9', title: 'Permutations - II', slug: 'permutations-ii', link: 'https://leetcode.com/problems/permutations-ii/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'backtracking-10', title: 'Palindrome Partitioning', slug: 'palindrome-partitioning', link: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'backtracking-11', title: 'Word Search', slug: 'word-search', link: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], solution: 'locked' },
  { id: 'backtracking-12', title: 'N Queens', slug: 'n-queens', link: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
];

// 12. Greedy Algorithm (12 problems)
const greedyProblems: DSAProblemItem[] = [
  { id: 'greedy-1', title: 'Two City Scheduling', slug: 'two-city-scheduling', link: 'https://leetcode.com/problems/two-city-scheduling/', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
  { id: 'greedy-2', title: 'Assign Cookies', slug: 'assign-cookies', link: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'Easy', solution: 'unlocked' },
  { id: 'greedy-3', title: 'Lemonade Change', slug: 'lemonade-change', link: 'https://leetcode.com/problems/lemonade-change/', difficulty: 'Easy', solution: 'locked' },
  { id: 'greedy-4', title: 'Best Time to Buy and Sell Stock - II', slug: 'best-time-to-buy-and-sell-stock-ii', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'greedy-5', title: 'Insert Interval', slug: 'insert-interval', link: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium', companies: ['Google', 'Facebook'], solution: 'locked' },
  { id: 'greedy-6', title: 'Merge Intervals', slug: 'merge-intervals', link: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'greedy-7', title: 'Partition Labels', slug: 'partition-labels', link: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
  { id: 'greedy-8', title: 'Non Overlapping Intervals', slug: 'non-overlapping-intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', companies: ['Facebook', 'Google'], solution: 'locked' },
  { id: 'greedy-9', title: 'Task Scheduler', slug: 'task-scheduler', link: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
  { id: 'greedy-10', title: 'Gas Station', slug: 'gas-station', link: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', companies: ['Amazon', 'Google'], solution: 'locked' },
  { id: 'greedy-11', title: 'Car Pooling', slug: 'car-pooling', link: 'https://leetcode.com/problems/car-pooling/', difficulty: 'Medium', companies: ['Google'], solution: 'locked' },
  { id: 'greedy-12', title: 'Candy', slug: 'candy', link: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', companies: ['Amazon', 'Google'], solution: 'locked' },
];

// 13. Dynamic Programming (15 problems)
const dpProblems: DSAProblemItem[] = [
  { id: 'dp-1', title: 'Climbing Stairs', slug: 'climbing-stairs', link: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'], solution: 'unlocked' },
  { id: 'dp-2', title: 'Minimum Cost Climbing Stairs', slug: 'min-cost-climbing-stairs', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy', companies: ['Amazon'], solution: 'locked' },
  { id: 'dp-3', title: 'House Robber', slug: 'house-robber', link: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'unlocked' },
  { id: 'dp-4', title: 'House Robber II', slug: 'house-robber-ii', link: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
  { id: 'dp-5', title: 'Coin Change', slug: 'coin-change', link: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], solution: 'locked' },
  { id: 'dp-6', title: 'Palindromic Substrings', slug: 'palindromic-substrings', link: 'https://leetcode.com/problems/palindromic-substrings/', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], solution: 'locked' },
  { id: 'dp-7', title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', link: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], solution: 'locked' },
  { id: 'dp-8', title: 'Decode Ways', slug: 'decode-ways', link: 'https://leetcode.com/problems/decode-ways/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], solution: 'locked' },
  { id: 'dp-9', title: 'Maximum Subarray', slug: 'maximum-subarray', link: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'], solution: 'unlocked' },
  { id: 'dp-10', title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', link: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], solution: 'locked' },
  { id: 'dp-11', title: 'Word Break', slug: 'word-break', link: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], solution: 'locked' },
  { id: 'dp-12', title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], solution: 'locked' },
  { id: 'dp-13', title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], solution: 'locked' },
  { id: 'dp-14', title: 'Coin Change II', slug: 'coin-change-2', link: 'https://leetcode.com/problems/coin-change-2/', difficulty: 'Medium', companies: ['Amazon'], solution: 'locked' },
  { id: 'dp-15', title: 'Unique Paths', slug: 'unique-paths', link: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], solution: 'locked' },
];

// All topics with their problems
export const dsaTopicsWithProblems: DSATopicData[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    icon: '🏗️',
    color: 'from-slate-500 to-gray-600',
    description: 'Build your programming foundation with basic problem-solving skills.',
    problems: foundationProblems,
  },
  {
    id: 'arrays',
    name: 'Arrays',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    description: 'Master array manipulation, traversal, and optimization techniques.',
    problems: arrayProblems,
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: '🔗',
    color: 'from-indigo-500 to-purple-500',
    description: 'Learn pointer manipulation, reversal, and cycle detection.',
    problems: linkedListProblems,
  },
  {
    id: 'strings',
    name: 'Strings',
    icon: '📝',
    color: 'from-green-500 to-teal-500',
    description: 'Master string manipulation and pattern matching algorithms.',
    problems: stringProblems,
  },
  {
    id: 'stack-queues',
    name: 'Stack and Queues',
    icon: '📚',
    color: 'from-orange-500 to-amber-500',
    description: 'Understand LIFO and FIFO data structures and their applications.',
    problems: stackQueueProblems,
  },
  {
    id: 'binary-search',
    name: 'Binary Search Algorithm',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    description: 'Master divide and conquer search techniques for optimal solutions.',
    problems: binarySearchProblems,
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers & Sliding Window',
    icon: '🪟',
    color: 'from-cyan-500 to-blue-500',
    description: 'Learn efficient array and string traversal patterns.',
    problems: twoPointersProblems,
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    icon: '🌳',
    color: 'from-emerald-500 to-green-600',
    description: 'Master tree traversals, recursion, and tree manipulation.',
    problems: binaryTreeProblems,
  },
  {
    id: 'bst',
    name: 'Binary Search Tree',
    icon: '🌲',
    color: 'from-lime-500 to-emerald-500',
    description: 'Learn BST properties, operations, and balanced tree concepts.',
    problems: bstProblems,
  },
  {
    id: 'heap',
    name: 'Heap',
    icon: '⛰️',
    color: 'from-rose-500 to-red-500',
    description: 'Understand priority queues and heap-based algorithms.',
    problems: heapProblems,
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    icon: '🔄',
    color: 'from-violet-500 to-purple-600',
    description: 'Master recursive exploration and constraint satisfaction.',
    problems: backtrackingProblems,
  },
  {
    id: 'greedy',
    name: 'Greedy Algorithm',
    icon: '🎯',
    color: 'from-amber-500 to-orange-500',
    description: 'Learn to make locally optimal choices for global solutions.',
    problems: greedyProblems,
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    icon: '🧩',
    color: 'from-red-500 to-rose-600',
    description: 'Master memoization and tabulation for optimal substructure problems.',
    problems: dpProblems,
  },
];

// Get all problems as a flat array
export const getAllProblems = (): DSAProblemItem[] => {
  return dsaTopicsWithProblems.flatMap(topic => topic.problems);
};

// Get topic by ID
export const getTopicById = (id: string): DSATopicData | undefined => {
  return dsaTopicsWithProblems.find(topic => topic.id === id);
};

// Get problem by ID
export const getProblemById = (id: string): DSAProblemItem | undefined => {
  return getAllProblems().find(problem => problem.id === id);
};

// Get stats
export const getDSAStats = () => {
  const allProblems = getAllProblems();
  const easy = allProblems.filter(p => p.difficulty === 'Easy').length;
  const medium = allProblems.filter(p => p.difficulty === 'Medium').length;
  const hard = allProblems.filter(p => p.difficulty === 'Hard').length;
  
  return {
    totalProblems: allProblems.length,
    totalTopics: dsaTopicsWithProblems.length,
    easy,
    medium,
    hard,
  };
};
