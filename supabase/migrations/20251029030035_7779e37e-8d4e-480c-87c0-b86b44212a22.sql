-- Add the resources column that was missing
ALTER TABLE roadmap_topics 
ADD COLUMN IF NOT EXISTS resources jsonb DEFAULT '[]'::jsonb;

-- Now insert DSA Roadmap (30 modules)
INSERT INTO roadmap_topics (title, description, category, sequence_order, estimated_hours, resources) VALUES
('Pick a Programming Language', 'Choose between Python, Java, C++, or JavaScript', 'dsa', 1, 2, '[{"type":"article","url":"https://www.freecodecamp.org/news/programming-languages-for-data-structures-algorithms/","title":"Best Languages for DSA"}]'),
('Programming Fundamentals', 'Syntax, variables, loops, and conditionals', 'dsa', 2, 8, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12","title":"Programming Basics"}]'),
('What are Data Structures?', 'Understanding data organization', 'dsa', 3, 3, '[{"type":"video","url":"https://www.youtube.com/watch?v=bum_19loj9A","title":"Data Structures Intro"}]'),
('Arrays Deep Dive', 'Array operations and patterns', 'dsa', 4, 5, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0rENwdL0nEH0uGom9no0nyB","title":"Arrays Tutorial"}]'),
('Linked Lists', 'Singly, doubly, and circular lists', 'dsa', 5, 6, '[{"type":"video","url":"https://www.youtube.com/watch?v=R9PTBwOzceo","title":"Linked Lists"}]'),
('Stacks Implementation', 'Stack operations', 'dsa', 6, 4, '[{"type":"video","url":"https://www.youtube.com/watch?v=O1KeXo8lE8A","title":"Stack Tutorial"}]'),
('Queues and Deques', 'Queue variants', 'dsa', 7, 4, '[{"type":"video","url":"https://www.youtube.com/watch?v=zp6pBNbUB2U","title":"Queue Tutorial"}]'),
('Hash Tables', 'Hashing and collision resolution', 'dsa', 8, 6, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0qYbL4TLe-3jV5G6xvCfHkH","title":"Hashing"}]'),
('Time Complexity', 'Big O notation', 'dsa', 9, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=BgLTDT03QtU","title":"Big O"}]'),
('Space Complexity', 'Memory usage', 'dsa', 10, 3, '[{"type":"article","url":"https://www.geeksforgeeks.org/g-fact-86/","title":"Space Complexity"}]'),
('Recursion Fundamentals', 'Recursive thinking', 'dsa', 11, 6, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9","title":"Recursion"}]'),
('Backtracking', 'N-Queens and permutations', 'dsa', 12, 6, '[{"type":"video","url":"https://www.youtube.com/watch?v=DKCbsiDBN6c","title":"Backtracking"}]'),
('Sorting Algorithms', 'Merge, quick, bubble sort', 'dsa', 13, 8, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma","title":"Sorting"}]'),
('Searching Algorithms', 'Linear and binary search', 'dsa', 14, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=P3YID7liBug","title":"Binary Search"}]'),
('Tree Data Structure', 'Binary trees', 'dsa', 15, 6, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0q8Hkd7bK2Bpryj2xVJk8Vk","title":"Trees"}]'),
('Tree Traversals', 'Inorder, preorder, postorder', 'dsa', 16, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=WLvU5EQVZqY","title":"Traversals"}]'),
('Binary Search Trees', 'BST operations', 'dsa', 17, 6, '[{"type":"video","url":"https://www.youtube.com/watch?v=p7-9UvDQZ3w","title":"BST"}]'),
('Heap & Priority Queue', 'Heap operations', 'dsa', 18, 6, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9","title":"Heaps"}]'),
('Graph Fundamentals', 'Graph representation', 'dsa', 19, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=M3_pLsDdeuU","title":"Graphs"}]'),
('BFS Traversal', 'Breadth-first search', 'dsa', 20, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=oDqjPvD54Ss","title":"BFS"}]'),
('DFS Traversal', 'Depth-first search', 'dsa', 21, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=Urx87-NMm6c","title":"DFS"}]'),
('Shortest Path', 'Dijkstra algorithm', 'dsa', 22, 6, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn","title":"Shortest Path"}]'),
('Minimum Spanning Tree', 'Prim and Kruskal', 'dsa', 23, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=4ZlRH0eK-qQ","title":"MST"}]'),
('Dynamic Programming Intro', 'Memoization basics', 'dsa', 24, 8, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY","title":"DP"}]'),
('DP Patterns', 'Knapsack and LCS', 'dsa', 25, 8, '[{"type":"video","url":"https://www.youtube.com/watch?v=oBt53YbR9Kk","title":"DP Patterns"}]'),
('Greedy Algorithms', 'Activity selection', 'dsa', 26, 6, '[{"type":"playlist","url":"https://www.youtube.com/playlist?list=PLgUwDviBIf0rF1w2Koyh78zafB0cz7tea","title":"Greedy"}]'),
('Divide and Conquer', 'Problem decomposition', 'dsa', 27, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=JSceec-wEyw","title":"D&C"}]'),
('Sliding Window', 'Window technique', 'dsa', 28, 5, '[{"type":"video","url":"https://www.youtube.com/watch?v=jM2dhDPYMQM","title":"Sliding Window"}]'),
('Two Pointers', 'Pointer patterns', 'dsa', 29, 4, '[{"type":"video","url":"https://www.youtube.com/watch?v=-gjxg6Pln50","title":"Two Pointers"}]'),
('Problem Solving Practice', 'LeetCode strategies', 'dsa', 30, 10, '[{"type":"article","url":"https://leetcode.com/explore/","title":"LeetCode"}]');