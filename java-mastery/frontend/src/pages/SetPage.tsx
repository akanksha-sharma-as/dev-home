import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bookmark, Check, ChevronLeft, ChevronRight, Code, Dumbbell } from 'lucide-react';
import ComplexityTable from '../components/ComplexityTable';
import TraceThrough from '../components/TraceThrough';
import { allSets } from '../data/allSets';
import { useProgressStore } from '../store/progressStore';
import type { LearningSet } from '../types';

export const learningSets: LearningSet[] = [
  {
    id: 1,
    title: 'Java Fundamentals',
    subtitle: 'Core syntax, control flow, OOP foundations, and Java thinking patterns.',
    icon: '☕',
    accentColor: '#22d3ee',
    bgGradient: 'from-cyan-500 via-sky-500 to-blue-500',
    borderColor: 'border-cyan-500/60',
    estimatedTime: '20 min',
    topics: [
      {
        title: 'Variables & Types',
        content:
          'Variables let you store values and reuse them as the program executes. The right type makes code safer and easier to reason about.',
        template: `int count = 0;\nString name = "Ada";\nboolean isReady = true;`,
        code: `int count = 0;\nString name = "Ada";\nboolean isReady = true;`,
        keyPoints: ['Use meaningful names', 'Pick the smallest correct type', 'Keep state explicit'],
        traceSteps: [
          { label: 'Declare', explanation: 'Java reserves memory for the variable based on its type.', highlights: [0] },
          { label: 'Assign', explanation: 'A value is stored in that memory location.', highlights: [1] },
          { label: 'Read', explanation: 'Code later reads the value to make decisions and compute results.', highlights: [2] },
        ],
      },
      {
        title: 'Control Flow',
        content:
          'Branching and looping let a Java program react to data and repeat work. This is the basis of algorithmic logic.',
        template: `if (score >= 70) {\n  System.out.println("Pass");\n} else {\n  System.out.println("Retry");\n}`,
        code: `if (score >= 70) {\n  System.out.println("Pass");\n} else {\n  System.out.println("Retry");\n}`,
        keyPoints: ['Use conditions for decisions', 'Loops reduce repeated code', 'Branching drives business logic'],
        traceSteps: [
          { label: 'Check condition', explanation: 'The boolean expression is evaluated at runtime.', highlights: [0] },
          { label: 'Choose path', explanation: 'One branch is selected depending on the result.', highlights: [1] },
          { label: 'Repeat logic', explanation: 'Loops can execute the same code multiple times until the condition changes.', highlights: [2] },
        ],
      },
      {
        title: 'Methods & Recursion',
        content:
          'Methods encapsulate behavior. Good methods are reusable, readable, and focused on one task. Recursion is useful when a problem naturally decomposes into smaller versions of itself.',
        template: `public static int factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
        code: `public static int factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
        keyPoints: ['Keep methods single-purpose', 'Use recursion carefully', 'Base case prevents infinite loops'],
        traceSteps: [
          { label: 'Call method', explanation: 'The method is invoked with arguments from the caller.', highlights: [0] },
          { label: 'Process logic', explanation: 'The method executes its statements and may call itself again.', highlights: [1] },
          { label: 'Return result', explanation: 'The computed value is passed back to the caller.', highlights: [2] },
        ],
      },
      {
        title: 'Collections & Arrays',
        content:
          'Arrays and collections let you store groups of related data. Choosing the right collection affects both correctness and performance in real applications.',
        template: `List<Integer> scores = new ArrayList<>(List.of(90, 85, 72));\nSystem.out.println(scores.get(0));`,
        code: `List<Integer> scores = new ArrayList<>(List.of(90, 85, 72));\nSystem.out.println(scores.get(0));`,
        keyPoints: ['Use lists for ordered data', 'Use sets for uniqueness', 'Use maps for key-value lookup'],
        traceSteps: [
          { label: 'Create structure', explanation: 'A collection object is initialized with specific semantics.', highlights: [0] },
          { label: 'Insert values', explanation: 'The elements are added into the container.', highlights: [1] },
          { label: 'Read or query', explanation: 'The application retrieves values using APIs appropriate to the structure.', highlights: [2] },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: 'Which Java type is best for storing a true/false value?',
        options: ['int', 'double', 'boolean', 'String'],
        correctAnswer: 2,
        explanation: 'A boolean is the correct type for true/false logic.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'What is the purpose of a method in Java?',
        options: ['To store data', 'To model state', 'To encapsulate reusable behavior', 'To replace loops'],
        correctAnswer: 2,
        explanation: 'Methods group reusable logic and keep code maintainable.',
        difficulty: 'easy',
      },
      {
        id: 3,
        question: 'Which collection is best for unique values without duplicates?',
        options: ['ArrayList', 'HashSet', 'HashMap', 'Queue'],
        correctAnswer: 1,
        explanation: 'A HashSet stores unique elements and ignores duplicates automatically.',
        difficulty: 'medium',
      },
    ],
    practiceProblems: [
      {
        id: 1,
        title: 'Practice: find the maximum in an array',
        difficulty: 'easy',
        description: 'Write a method that returns the largest element from an integer array.',
        examples: [
          { input: '{4, 9, 2, 7}', output: '9', explanation: '9 is the maximum value.' },
        ],
        hints: ['Keep a max variable.', 'Compare each item against the current max.'],
        approach: 'Initialize max with the first element, then iterate and update it whenever a larger number is found.',
        code: `public static int max(int[] nums) {\n  int max = nums[0];\n  for (int i = 1; i < nums.length; i++) {\n    if (nums[i] > max) max = nums[i];\n  }\n  return max;\n}`,
      },
      {
        id: 2,
        title: 'Practice: count vowels in a string',
        difficulty: 'medium',
        description: 'Count how many vowels appear in a given text input.',
        examples: [
          { input: 'Java Mastery', output: '4', explanation: 'The vowels are a, a, e, a.' },
        ],
        hints: ['Check each character.', 'Use a set of vowels.'],
        approach: 'Loop through the string, normalize to lowercase, and increment the counter when the character is in the vowel set.',
        code: `public static int countVowels(String text) {\n  int count = 0;\n  for (char ch : text.toLowerCase().toCharArray()) {\n    if ("aeiou".indexOf(ch) >= 0) count++;\n  }\n  return count;\n}`,
      },
    ],
    complexities: [
      { operation: 'Array access', time: 'O(1)', space: 'O(1)' },
      { operation: 'Linear scan', time: 'O(n)', space: 'O(1)' },
      { operation: 'Binary search', time: 'O(log n)', space: 'O(1)' },
    ],
    patternQuestions: [
      {
        id: 1,
        question: 'Which pattern matches repeated checks across a collection?',
        options: ['Loop + condition', 'Inheritance', 'Threading', 'Switch'],
        correctAnswer: 0,
        explanation: 'Looping and condition checks are the standard way to inspect each element in a collection.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 2,
    title: 'Java OOP & Collections',
    subtitle: 'Classes, inheritance, encapsulation, and battle-tested data structures for production systems.',
    icon: '🧩',
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-500 via-cyan-500 to-blue-500',
    borderColor: 'border-sky-500/60',
    estimatedTime: '30 min',
    topics: [
      {
        title: 'OOP Principles',
        content:
          'Object-oriented design helps model real-world entities and maintainable system boundaries. Encapsulation, inheritance, and polymorphism reduce coupling and improve clarity.',
        template: `class Account {\n  private double balance;\n  public void deposit(double amount) { balance += amount; }\n}`,
        code: `class Account {\n  private double balance;\n  public void deposit(double amount) { balance += amount; }\n}`,
        keyPoints: ['Encapsulate state', 'Model real behavior', 'Favor interfaces over concrete types'],
        traceSteps: [
          { label: 'Create object', explanation: 'An instance of the class is created with its own state.', highlights: [0] },
          { label: 'Call behavior', explanation: 'Methods are invoked to change or read that state.', highlights: [1] },
          { label: 'Maintain invariants', explanation: 'The object protects internal state using validation and encapsulation.', highlights: [2] },
        ],
      },
      {
        title: 'Collections Framework',
        content:
          'Java collections are built for different access patterns. Selecting the right collection matters for correctness, speed, and memory usage.',
        template: `Map<String, Integer> counts = new HashMap<>();\ncounts.put("Java", 5);`,
        code: `Map<String, Integer> counts = new HashMap<>();\ncounts.put("Java", 5);`,
        keyPoints: ['List keeps order', 'Set keeps uniqueness', 'Map keeps key-value access'],
        traceSteps: [
          { label: 'Choose structure', explanation: 'The data access pattern determines the best collection type.', highlights: [0] },
          { label: 'Insert data', explanation: 'Objects are stored according to the structure rules.', highlights: [1] },
          { label: 'Access efficiently', explanation: 'Lookups and traversal behave according to the collection implementation.', highlights: [2] },
        ],
      },
      {
        title: 'Generics & Type Safety',
        content:
          'Generics let you write reusable code without losing type information. That protects against unsafe casts and makes systems easier to maintain.',
        template: `List<String> names = new ArrayList<>();\nString first = names.get(0);`,
        code: `List<String> names = new ArrayList<>();\nString first = names.get(0);`,
        keyPoints: ['Strong typing', 'Safer APIs', 'Cleaner generic abstractions'],
        traceSteps: [
          { label: 'Declare generic type', explanation: 'The container type is parameterized at compile time.', highlights: [0] },
          { label: 'Insert typed values', explanation: 'Only values compatible with the generic type are allowed.', highlights: [1] },
          { label: 'Read safely', explanation: 'The compiler preserves the type contract at usage sites.', highlights: [2] },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: 'Which OOP principle hides internal state from outside code?',
        options: ['Polymorphism', 'Inheritance', 'Encapsulation', 'Abstraction'],
        correctAnswer: 2,
        explanation: 'Encapsulation protects object state and exposes only needed behavior.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'Which collection is ideal for fast key-based lookup?',
        options: ['ArrayList', 'HashMap', 'Stack', 'Queue'],
        correctAnswer: 1,
        explanation: 'HashMap provides efficient key-value lookup using hashing.',
        difficulty: 'medium',
      },
    ],
    practiceProblems: [
      {
        id: 1,
        title: 'Practice: build a frequency map',
        difficulty: 'medium',
        description: 'Use a map to count how many times each word appears in a list of strings.',
        examples: [
          { input: '[Java, Java, Spring, Boot]', output: '{Java=2, Spring=1, Boot=1}', explanation: 'The map stores every distinct value with its count.' },
        ],
        hints: ['Use a HashMap.', 'Increment the count for each seen word.'],
        approach: 'Iterate through the list, check if the key exists, and update the counter or insert a new entry.',
        code: `Map<String, Integer> counts = new HashMap<>();\nfor (String word : words) {\n  counts.put(word, counts.getOrDefault(word, 0) + 1);\n}`,
      },
    ],
    complexities: [
      { operation: 'HashMap get/put', time: 'O(1)', space: 'O(1)' },
      { operation: 'ArrayList access', time: 'O(1)', space: 'O(n)' },
      { operation: 'TreeMap traversal', time: 'O(log n)', space: 'O(n)' },
    ],
    patternQuestions: [
      { id: 1, question: 'Which design choice makes code easier to test and maintain?', options: ['Tight coupling', 'Clear interfaces', 'Global state', 'Hardcoded values'], correctAnswer: 1, explanation: 'Well-defined interfaces and encapsulation help maintainability and testing.', difficulty: 'easy' },
    ],
  },
  {
    id: 3,
    title: 'Java 8+ & Streams',
    subtitle: 'Functional style, streams, lambdas, and cleaner data processing patterns.',
    icon: '⚡',
    accentColor: '#60a5fa',
    bgGradient: 'from-indigo-500 via-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/60',
    estimatedTime: '25 min',
    topics: [
      {
        title: 'Lambda Expressions',
        content:
          'Lambdas allow you to pass behavior as a value. They make collections and asynchronous workflows cleaner and more expressive.',
        template: `List<String> names = List.of("A", "B");\nnames.forEach(name -> System.out.println(name));`,
        code: `List<String> names = List.of("A", "B");\nnames.forEach(name -> System.out.println(name));`,
        keyPoints: ['Short functions', 'Pass behavior', 'Cleaner iteration'],
        traceSteps: [
          { label: 'Define lambda', explanation: 'A compact function body is created inline.', highlights: [0] },
          { label: 'Pass to API', explanation: 'The lambda is supplied as a callback to a higher-order method.', highlights: [1] },
          { label: 'Execute callback', explanation: 'The framework invokes the behavior for each element or event.', highlights: [2] },
        ],
      },
      {
        title: 'Streams API',
        content:
          'Streams enable declarative processing of collections. They make filtering, mapping, and reducing code more expressive without mutating the original source.',
        template: `List<Integer> nums = List.of(1, 2, 3, 4);\nint sum = nums.stream().mapToInt(Integer::intValue).sum();`,
        code: `List<Integer> nums = List.of(1, 2, 3, 4);\nint sum = nums.stream().mapToInt(Integer::intValue).sum();`,
        keyPoints: ['Declarative processing', 'Chain operations', 'Avoid unnecessary mutation'],
        traceSteps: [
          { label: 'Create stream', explanation: 'A stream is created from a data source such as a list.', highlights: [0] },
          { label: 'Transform data', explanation: 'Intermediate operations filter or map the stream.', highlights: [1] },
          { label: 'Collect result', explanation: 'A terminal operation produces the final value or collection.', highlights: [2] },
        ],
      },
      {
        title: 'Optional & Safe Access',
        content:
          'Optional helps represent the absence of a value explicitly. This reduces null-related errors and makes APIs more intention-revealing.',
        template: `Optional<String> name = Optional.ofNullable(userName);\nString safeName = name.orElse("guest");`,
        code: `Optional<String> name = Optional.ofNullable(userName);\nString safeName = name.orElse("guest");`,
        keyPoints: ['Avoid null pitfalls', 'Encapsulate absence', 'Improves API clarity'],
        traceSteps: [
          { label: 'Wrap value', explanation: 'Optional captures a potentially missing value.', highlights: [0] },
          { label: 'Check presence', explanation: 'The app decides whether the value exists.', highlights: [1] },
          { label: 'Provide fallback', explanation: 'A default value is returned if the optional is empty.', highlights: [2] },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: 'What does a lambda expression represent?',
        options: ['A class definition', 'An anonymous function', 'A static variable', 'An interface literal'],
        correctAnswer: 1,
        explanation: 'A lambda is a concise way to pass behavior as a function object.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'Why is Optional useful in Java?',
        options: ['It speeds up loops', 'It reduces null handling issues', 'It replaces classes', 'It avoids compilation'],
        correctAnswer: 1,
        explanation: 'Optional makes missing values explicit and safer to handle.',
        difficulty: 'medium',
      },
    ],
    practiceProblems: [
      {
        id: 1,
        title: 'Practice: filter and sum even numbers',
        difficulty: 'medium',
        description: 'Use streams to filter even numbers and sum them.',
        examples: [
          { input: '[1, 2, 3, 4, 5, 6]', output: '12', explanation: 'Even numbers are 2, 4, and 6; their sum is 12.' },
        ],
        hints: ['Use filter and mapToInt', 'Sum the stream result.'],
        approach: 'Create a stream from the list, filter values divisible by 2, then sum them.',
        code: `int sum = numbers.stream()\n  .filter(n -> n % 2 == 0)\n  .mapToInt(Integer::intValue)\n  .sum();`,
      },
    ],
    complexities: [
      { operation: 'Stream filter', time: 'O(n)', space: 'O(n)' },
      { operation: 'Map and reduce', time: 'O(n)', space: 'O(1)' },
      { operation: 'Optional lookup', time: 'O(1)', space: 'O(1)' },
    ],
    patternQuestions: [
      { id: 1, question: 'When should streams be preferred over imperative loops?', options: ['When logic is highly declarative', 'Never', 'Only for UI code', 'Only in static methods'], correctAnswer: 0, explanation: 'Streams are powerful when the transformation logic is clear and declarative.', difficulty: 'easy' },
    ],
  },
  {
    id: 4,
    title: 'Spring Boot Fundamentals',
    subtitle: 'Dependency injection, bean lifecycle, configuration, and building modular backend services.',
    icon: '🛠️',
    accentColor: '#34d399',
    bgGradient: 'from-emerald-500 via-green-500 to-teal-500',
    borderColor: 'border-emerald-500/60',
    estimatedTime: '30 min',
    topics: [
      {
        title: 'Beans & Dependency Injection',
        content:
          'Spring manages objects as beans and injects them where needed. This reduces manual wiring and keeps components loosely coupled.',
        template: `@Service\npublic class UserService {\n  private final UserRepository repo;\n  public UserService(UserRepository repo) { this.repo = repo; }\n}`,
        code: `@Service\npublic class UserService {\n  private final UserRepository repo;\n  public UserService(UserRepository repo) { this.repo = repo; }\n}`,
        keyPoints: ['Loose coupling', 'Better testability', 'Centralized object lifecycle'],
        traceSteps: [
          { label: 'Define bean', explanation: 'A Spring-managed component is declared with a stereotype annotation.', highlights: [0] },
          { label: 'Resolve dependencies', explanation: 'Spring identifies required collaborators and injects them at runtime.', highlights: [1] },
          { label: 'Use service', explanation: 'Consumers use the managed bean without constructing it manually.', highlights: [2] },
        ],
      },
      {
        title: 'Configuration & Profiles',
        content:
          'Environment-aware configuration allows the same application to run across development, staging, and production with different settings.',
        template: `spring:\n  profiles:\n    active: dev\nserver:\n  port: 8080`,
        code: `spring:\n  profiles:\n    active: dev\nserver:\n  port: 8080`,
        keyPoints: ['Externalize config', 'Separate environments', 'Safer deployments'],
        traceSteps: [
          { label: 'Read property', explanation: 'Spring binds values from configuration files into Java objects.', highlights: [0] },
          { label: 'Select profile', explanation: 'A profile chooses the matching environment-specific configuration.', highlights: [1] },
          { label: 'Run in target environment', explanation: 'The service is deployed with correct environment settings.', highlights: [2] },
        ],
      },
      {
        title: 'REST API Design',
        content:
          'REST APIs model resources and actions over HTTP. Good API design uses clear nouns, consistent status codes, and meaningful error responses.',
        template: `@GetMapping("/users/{id}")\npublic UserDto getUser(@PathVariable Long id) { ... }`,
        code: `@GetMapping("/users/{id}")\npublic UserDto getUser(@PathVariable Long id) { ... }`,
        keyPoints: ['Use clear endpoints', 'Return consistent status codes', 'Separate DTOs from entities'],
        traceSteps: [
          { label: 'Map request', explanation: 'HTTP request data is bound to method parameters using annotations.', highlights: [0] },
          { label: 'Process business logic', explanation: 'The service handles the request and produces a domain result.', highlights: [1] },
          { label: 'Return response', explanation: 'A response payload and status code are returned to the client.', highlights: [2] },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: 'What is the main purpose of dependency injection?',
        options: ['To make classes global', 'To reduce tight coupling', 'To replace Lombok', 'To disable configuration'],
        correctAnswer: 1,
        explanation: 'Dependency injection helps classes depend on abstractions instead of hardcoded implementations.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'Why are profiles useful in Spring Boot?',
        options: ['They create classes', 'They separate environment configuration', 'They disable packages', 'They replace beans'],
        correctAnswer: 1,
        explanation: 'Profiles allow apps to use different configuration for dev, test, and production.',
        difficulty: 'medium',
      },
    ],
    practiceProblems: [
      {
        id: 1,
        title: 'Practice: create a user profile endpoint',
        difficulty: 'medium',
        description: 'Design a GET endpoint that returns a user profile by id with a safe response object.',
        examples: [
          { input: 'GET /users/42', output: '200 OK with user payload', explanation: 'The response should expose only necessary fields.' },
        ],
        hints: ['Use controller + service + DTO pattern.', 'Avoid returning your entire entity directly.'],
        approach: 'Model a DTO, map from domain entity, and return a clean JSON response with a proper status code.',
        code: `@GetMapping("/users/{id}")\npublic ResponseEntity<UserDto> getUser(@PathVariable Long id) {\n  User user = service.findById(id);\n  return ResponseEntity.ok(mapper.toDto(user));\n}`,
      },
    ],
    complexities: [
      { operation: 'Dependency resolution', time: 'O(n)', space: 'O(n)' },
      { operation: 'Simple API routing', time: 'O(1)', space: 'O(1)' },
      { operation: 'Context startup', time: 'O(n)', space: 'O(n)' },
    ],
    patternQuestions: [
      { id: 1, question: 'Which practice improves API maintainability the most?', options: ['Hardcoding values', 'Returning full entities directly', 'Using DTOs and explicit contracts', 'Hiding all validation'], correctAnswer: 2, explanation: 'DTOs keep APIs stable and clearer than exposing full internal models.', difficulty: 'easy' },
    ],
  },
  {
    id: 5,
    title: 'Arrays, Strings & Pattern Thinking',
    subtitle: 'Master the interview patterns that reappear in coding rounds: two pointers, sliding window, prefix sums, hashing, and binary search.',
    icon: '🔍',
    accentColor: '#a78bfa',
    bgGradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    borderColor: 'border-violet-500/60',
    estimatedTime: '30 min',
    topics: [
      {
        title: 'Two Pointers',
        content:
          'Two-pointer patterns are used when you need to search in a linear structure without nested loops. The most common variants are opposite-direction pointers and same-direction pointers for fast/slow traversal. This pattern appears in palindrome checks, merge problems, and cycle detection.',
        template: `int left = 0;\nint right = nums.length - 1;\nwhile (left < right) {\n  if (nums[left] == nums[right]) { left++; right--; }\n}`,
        code: `int left = 0;\nint right = nums.length - 1;\nwhile (left < right) {\n  if (nums[left] == nums[right]) {\n    left++;\n    right--;\n  } else {\n    break;\n  }\n}`,
        keyPoints: ['Opposite ends pattern', 'Same direction / slow-fast pattern', 'Avoid nested loops and reduce complexity'],
        traceSteps: [
          { label: 'Initialize pointers', explanation: 'Set the scan boundaries or the fast/slow positions.', highlights: [0] },
          { label: 'Move by condition', explanation: 'Move one or both pointers according to the problem rule.', highlights: [1] },
          { label: 'Converge on answer', explanation: 'The pointers shrink or advance until the target is found or the condition fails.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Valid Palindrome',
            difficulty: 'easy',
            description: 'Check whether a string is a palindrome ignoring non-alphanumeric characters.',
            examples: [{ input: 'A man, a plan, a canal: Panama', output: 'true' }],
            hints: ['Use two pointers.', 'Ignore case and punctuation.'],
            approach: 'Compare characters from both ends, skipping non-alphanumeric characters until the pointers meet.',
            code: `boolean isPalindrome(String s) {\n  int left = 0, right = s.length() - 1;\n  while (left < right) {\n    while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n    while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n    if (Character.toLowerCase(s.charAt(left++)) != Character.toLowerCase(s.charAt(right--))) return false;\n  }\n  return true;\n}`,
          },
          {
            id: 2,
            title: 'Container With Most Water',
            difficulty: 'medium',
            description: 'Find the maximum area formed by two lines and the x-axis.',
            examples: [{ input: '[1,8,6,2,5,4,8,3,7]', output: '49' }],
            hints: ['Move the shorter line inward.', 'Area depends on the smaller height and distance.'],
            approach: 'Maintain left and right pointers; move the lower boundary inward because it is the limiting factor for the area.',
            code: `int maxArea(int[] height) {\n  int left = 0, right = height.length - 1, best = 0;\n  while (left < right) {\n    best = Math.max(best, Math.min(height[left], height[right]) * (right - left));\n    if (height[left] <= height[right]) left++;\n    else right--;\n  }\n  return best;\n}`,
          },
        ],
      },
      {
        title: 'Sliding Window',
        content:
          'Sliding window is the standard way to solve problems over contiguous ranges. The key variants are fixed-size windows, variable-size windows, and exact-count or frequency-based windows. These patterns are used heavily in longest substring, minimum subarray, and anagram problems.',
        template: `int left = 0;\nfor (int right = 0; right < n; right++) {\n  add(nums[right]);\n  while (windowInvalid()) { remove(nums[left++]); }\n  updateBest();\n}`,
        code: `int left = 0;\nfor (int right = 0; right < n; right++) {\n  add(nums[right]);\n  while (windowInvalid()) {\n    remove(nums[left]);\n    left++;\n  }\n  updateBest();\n}`,
        keyPoints: ['Fixed-size window', 'Variable-size window', 'Exact count trick with frequency maps'],
        traceSteps: [
          { label: 'Expand right', explanation: 'Add the next element to the current window state.', highlights: [0] },
          { label: 'Shrink while invalid', explanation: 'Remove from the left until the window satisfies the constraint again.', highlights: [1] },
          { label: 'Evaluate best window', explanation: 'Record the best valid window using the current counts or length.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'hard',
            description: 'Return the length of the longest substring without duplicate characters.',
            examples: [{ input: 'abcabcbb', output: '3' }],
            hints: ['Use a frequency map.', 'Shrink the left side when a duplicate appears.'],
            approach: 'Expand the right pointer, add the character to the frequency map, and shrink from the left until the window is valid again.',
            code: `int lengthOfLongestSubstring(String s) {\n  Map<Character, Integer> freq = new HashMap<>();\n  int left = 0, best = 0;\n  for (int right = 0; right < s.length(); right++) {\n    char c = s.charAt(right);\n    freq.put(c, freq.getOrDefault(c, 0) + 1);\n    while (freq.get(c) > 1) {\n      char leftChar = s.charAt(left++);\n      freq.put(leftChar, freq.get(leftChar) - 1);\n    }\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}`,
          },
          {
            id: 2,
            title: 'Minimum Size Subarray Sum',
            difficulty: 'medium',
            description: 'Find the minimal length of a contiguous subarray whose sum is at least target.',
            examples: [{ input: '[2,3,1,2,4,3], target=7', output: '2' }],
            hints: ['Use a running sum.', 'Shrink while the sum is too large.'],
            approach: 'Expand the right side and maintain a prefix-sum window, shrinking from the left while the sum exceeds the target.',
            code: `int minSubArrayLen(int target, int[] nums) {\n  int left = 0, sum = 0, best = Integer.MAX_VALUE;\n  for (int right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return best == Integer.MAX_VALUE ? 0 : best;\n}`,
          },
        ],
      },
      {
        title: 'Prefix Sums & Hashing',
        content:
          'Prefix sums let you answer range queries in O(1) after O(n) preprocessing. Hash maps and frequency tables are used to track counts, identify duplicates, and verify equality patterns like anagrams and subset checks.',
        template: `int[] prefix = new int[n + 1];\nfor (int i = 0; i < n; i++) {\n  prefix[i + 1] = prefix[i] + nums[i];\n}`,
        code: `Map<Character, Integer> counts = new HashMap<>();\nfor (char ch : s.toCharArray()) {\n  counts.put(ch, counts.getOrDefault(ch, 0) + 1);\n}`,
        keyPoints: ['Prefix sum for range queries', 'HashMap for frequency counting', 'Anagram checks via counts'],
        traceSteps: [
          { label: 'Precompute state', explanation: 'Build prefix sums or frequency tables from the input.', highlights: [0] },
          { label: 'Query subrange', explanation: 'Use the precomputed state to answer the current question efficiently.', highlights: [1] },
          { label: 'Compare or decide', explanation: 'The result is derived without re-scanning the full input every time.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Subarray Sum Equals K',
            difficulty: 'medium',
            description: 'Count the number of subarrays whose sum equals a given target.',
            examples: [{ input: '[1,1,1], k=2', output: '2' }],
            hints: ['Use prefix sums.', 'Track how many times a prefix sum has appeared before.'],
            approach: 'Maintain a running prefix sum and a frequency map to count how many prior prefix sums match the needed difference.',
            code: `int subarraySum(int[] nums, int k) {\n  Map<Integer, Integer> freq = new HashMap<>();\n  int prefix = 0, count = 0;\n  freq.put(0, 1);\n  for (int x : nums) {\n    prefix += x;\n    count += freq.getOrDefault(prefix - k, 0);\n    freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);\n  }\n  return count;\n}`,
          },
          {
            id: 2,
            title: 'Group Anagrams',
            difficulty: 'medium',
            description: 'Group strings that are permutations of each other.',
            examples: [{ input: "['eat','tea','tan','ate','nat','bat']", output: "[['eat','tea','ate'], ['tan','nat'], ['bat']]" }],
            hints: ['Count characters per word.', 'Use a canonical signature.'],
            approach: 'Convert each string to a sorted or frequency-based key and group entries under that signature.',
            code: `List<List<String>> groupAnagrams(String[] strs) {\n  Map<String, List<String>> map = new HashMap<>();\n  for (String s : strs) {\n    char[] chars = s.toCharArray();\n    Arrays.sort(chars);\n    String key = new String(chars);\n    map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n  }\n  return new ArrayList<>(map.values());\n}`,
          },
        ],
      },
      {
        title: 'Binary Search & Monotonicity',
        content:
          'Binary search is not only for sorted arrays; it is also used on answer spaces when the function is monotonic. Typical patterns include lower bound, upper bound, search in rotated arrays, and “find the smallest valid answer” problems.',
        template: `int low = 0, high = n - 1;\nwhile (low <= high) {\n  int mid = low + (high - low) / 2;\n  if (nums[mid] < target) low = mid + 1;\n  else high = mid - 1;\n}`,
        code: `int low = 0, high = n - 1;\nwhile (low <= high) {\n  int mid = low + (high - low) / 2;\n  if (nums[mid] < target) {\n    low = mid + 1;\n  } else {\n    high = mid - 1;\n  }\n}`,
        keyPoints: ['Sorted domain assumption', 'Monotonic check', 'Lower bound / upper bound patterns'],
        traceSteps: [
          { label: 'Set search bounds', explanation: 'Define the valid search range based on the sorted or monotonic condition.', highlights: [0] },
          { label: 'Move midpoint', explanation: 'Check the midpoint and decide which half keeps the answer.', highlights: [1] },
          { label: 'Narrow until solved', explanation: 'The window shrinks logarithmically to the target answer.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Search in Rotated Sorted Array',
            difficulty: 'medium',
            description: 'Locate a value in a rotated sorted array using binary search logic.',
            examples: [{ input: '[4,5,6,7,0,1,2], target=0', output: '4' }],
            hints: ['Identify which half is sorted.', 'Narrow to the side containing the target.'],
            approach: 'Determine which half is sorted and recurse into the half that can contain the target, keeping the binary search invariant.',
            code: `int search(int[] nums, int target) {\n  int left = 0, right = nums.length - 1;\n  while (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[left] <= nums[mid]) {\n      if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n      else left = mid + 1;\n    } else {\n      if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n      else right = mid - 1;\n    }\n  }\n  return -1;\n}`,
          },
          {
            id: 2,
            title: 'Find First and Last Position of Element in Sorted Array',
            difficulty: 'medium',
            description: 'Find the starting and ending index of a target value in a sorted array.',
            examples: [{ input: '[5,7,7,8,8,10], target=8', output: '[3,4]' }],
            hints: ['Use lower bound and upper bound.', 'Search with adjusted bounds.'],
            approach: 'Run one binary search for the first valid index and another for the first index after the target, then subtract the bounds.',
            code: `int[] searchRange(int[] nums, int target) {\n  int left = lowerBound(nums, target);\n  int right = lowerBound(nums, target + 1) - 1;\n  return left <= right ? new int[]{left, right} : new int[]{-1, -1};\n}`,
          },
        ],
      },
      {
        title: 'Binary Search Trees & Tree Search',
        content:
          'Binary search trees allow fast lookup, insertion, and deletion by ordering keys. Key patterns include BST validation, searching for a node, and understanding invariants such as left < node < right. This is a core tree concept in interviews and production systems.',
        template: `TreeNode search(TreeNode root, int target) {\n  if (root == null || root.val == target) return root;\n  return target < root.val ? search(root.left, target) : search(root.right, target);\n}`,
        code: `TreeNode search(TreeNode root, int target) {\n  if (root == null || root.val == target) return root;\n  return target < root.val ? search(root.left, target) : search(root.right, target);\n}`,
        keyPoints: ['BST invariant', 'Search is O(h)', 'In-order traversal yields sorted order'],
        traceSteps: [
          { label: 'Compare target', explanation: 'Check the current node against the target value.', highlights: [0] },
          { label: 'Traverse side', explanation: 'Go left for smaller values and right for larger values.', highlights: [1] },
          { label: 'Stop at match', explanation: 'Return the node when the target is found or the search reaches null.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Validate BST',
            difficulty: 'medium',
            description: 'Check whether a binary tree satisfies the BST ordering property.',
            examples: [{ input: '[2,1,3]', output: 'true' }],
            hints: ['Use min/max bounds.', 'Track valid ranges for each node.'],
            approach: 'Perform DFS while carrying the lower and upper bounds allowed for each subtree.',
            code: `boolean isValidBST(TreeNode root) {\n  return isValidBST(root, null, null);\n}\nboolean isValidBST(TreeNode node, Integer low, Integer high) {\n  if (node == null) return true;\n  if (low != null && node.val <= low) return false;\n  if (high != null && node.val >= high) return false;\n  return isValidBST(node.left, low, node.val) && isValidBST(node.right, node.val, high);\n}`,
          },
          {
            id: 2,
            title: 'Lowest Common Ancestor of a Binary Search Tree',
            difficulty: 'medium',
            description: 'Find the lowest common ancestor of two nodes in a BST.',
            examples: [{ input: 'root=[6,2,8,0,4,7,9], p=2, q=8', output: '6' }],
            hints: ['Use BST ordering.', 'If both nodes are on the same side, recurse there.'],
            approach: 'Compare the target values with the current node and recurse to the side containing both nodes until the split point is found.',
            code: `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n  if (root == null) return null;\n  if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);\n  if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);\n  return root;\n}`,
          },
        ],
      },
      {
        title: 'Lowest Common Ancestor & DAG Traversal',
        content:
          'Lowest common ancestor is one of the most important tree interview questions. The same logic extends to DAG and graph traversal problems where you need to identify shared ancestors or the first common dependency. Topological sort is critical when the graph has ordering constraints and dependencies.',
        template: `TreeNode lca(TreeNode root, TreeNode p, TreeNode q) {\n  if (root == null || root == p || root == q) return root;\n  TreeNode left = lca(root.left, p, q);\n  TreeNode right = lca(root.right, p, q);\n  return left == null ? right : right == null ? left : root;\n}`,
        code: `TreeNode lca(TreeNode root, TreeNode p, TreeNode q) {\n  if (root == null || root == p || root == q) return root;\n  TreeNode left = lca(root.left, p, q);\n  TreeNode right = lca(root.right, p, q);\n  return left == null ? right : right == null ? left : root;\n}`,
        keyPoints: ['LCA is the split point', 'Recurse on left/right children', 'Topological sort works on DAGs with in-degree tracking'],
        traceSteps: [
          { label: 'Recurse left', explanation: 'Check whether the target nodes exist in the left subtree.', highlights: [0] },
          { label: 'Recurse right', explanation: 'Check the right subtree if the left subtree does not contain both nodes.', highlights: [1] },
          { label: 'Return split node', explanation: 'The first node that sees both targets on different sides is the LCA.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Lowest Common Ancestor of a Binary Tree',
            difficulty: 'medium',
            description: 'Find the lowest common ancestor of two nodes in a binary tree.',
            examples: [{ input: 'root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=1', output: '3' }],
            hints: ['DFS the tree.', 'Return the split node when both nodes are found.'],
            approach: 'Recursively search both sides; if one side yields a match and the other yields another, return the current node as the LCA.',
            code: `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n  if (root == null || root == p || root == q) return root;\n  TreeNode left = lowestCommonAncestor(root.left, p, q);\n  TreeNode right = lowestCommonAncestor(root.right, p, q);\n  if (left != null && right != null) return root;\n  return left != null ? left : right;\n}`,
          },
          {
            id: 2,
            title: 'Course Schedule',
            difficulty: 'hard',
            description: 'Determine whether you can finish all courses given prerequisite dependencies.',
            examples: [{ input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true' }],
            hints: ['Use Kahn’s algorithm.', 'Track in-degree counts.'],
            approach: 'Build a graph with in-degrees and process zero-in-degree nodes, reducing indegrees until all nodes are processed or a cycle remains.',
            code: `boolean canFinish(int numCourses, int[][] prerequisites) {\n  int[] indeg = new int[numCourses];\n  List<List<Integer>> graph = new ArrayList<>();\n  for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n  for (int[] p : prerequisites) {\n    graph.get(p[1]).add(p[0]);\n    indeg[p[0]]++;\n  }\n  Queue<Integer> q = new ArrayDeque<>();\n  for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.offer(i);\n  int processed = 0;\n  while (!q.isEmpty()) {\n    int node = q.poll();\n    processed++;\n    for (int next : graph.get(node)) {\n      if (--indeg[next] == 0) q.offer(next);\n    }\n  }\n  return processed == numCourses;\n}`,
          },
        ],
      },
      {
        title: 'Topological Sort & Graph Paths',
        content:
          'Topological sort gives an ordering for directed acyclic graphs where every edge points from prerequisite to dependent. Graph path problems usually combine BFS/DFS with visited sets and state tracking to answer reachability, shortest path, and dependency questions.',
        template: `Queue<Integer> queue = new ArrayDeque<>();\nfor (int i = 0; i < n; i++) if (indegree[i] == 0) queue.offer(i);\nwhile (!queue.isEmpty()) { ... }`,
        code: `Queue<Integer> queue = new ArrayDeque<>();\nfor (int i = 0; i < n; i++) if (indegree[i] == 0) queue.offer(i);\nwhile (!queue.isEmpty()) {\n  int node = queue.poll();\n  for (int next : graph.get(node)) {\n    if (--indegree[next] == 0) queue.offer(next);\n  }\n}`,
        keyPoints: ['In-degree counts', 'Queue-driven ordering', 'Cycle detection via remaining nodes'],
        traceSteps: [
          { label: 'Initialize indegrees', explanation: 'Count how many incoming edges each node has.', highlights: [0] },
          { label: 'Process zero-indegree nodes', explanation: 'Enqueue all nodes ready to be scheduled.', highlights: [1] },
          { label: 'Reduce and continue', explanation: 'Removing a node decreases indegree values for its neighbors until all nodes are ordered.', highlights: [2] },
        ],
        practiceProblems: [
          {
            id: 1,
            title: 'Topological Sort',
            difficulty: 'medium',
            description: 'Return any valid topological order for a directed acyclic graph.',
            examples: [{ input: 'numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]' }],
            hints: ['Use Kahn’s algorithm.', 'Store initial zero-indegree nodes.'],
            approach: 'Track in-degree counts and pop nodes with no remaining dependencies, reducing the indegree of their neighbors.',
            code: `int[] topoSort(int n, int[][] edges) {\n  List<List<Integer>> graph = new ArrayList<>();\n  int[] indeg = new int[n];\n  for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n  for (int[] e : edges) { graph.get(e[0]).add(e[1]); indeg[e[1]]++; }\n  Queue<Integer> q = new ArrayDeque<>();\n  for (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);\n  int[] order = new int[n]; int idx = 0;\n  while (!q.isEmpty()) {int u = q.poll(); order[idx++] = u; for (int v : graph.get(u)) { if (--indeg[v] == 0) q.offer(v); }}\n  return order;\n}`,
          },
          {
            id: 2,
            title: 'Number of Islands',
            difficulty: 'medium',
            description: 'Count connected components in a grid using DFS or BFS.',
            examples: [{ input: "[['1','1','0','0'], ['1','1','0','0'], ['0','0','1','1']]", output: '3' }],
            hints: ['Use a visited matrix.', 'Traverse adjacent land cells.'],
            approach: 'Visit each cell, perform BFS/DFS over land cells, and count the number of disconnected components.',
            code: `int numIslands(char[][] grid) {\n  int rows = grid.length, cols = grid[0].length, count = 0;\n  boolean[][] visited = new boolean[rows][cols];\n  for (int r = 0; r < rows; r++) {\n    for (int c = 0; c < cols; c++) {\n      if (grid[r][c] == '1' && !visited[r][c]) {\n        dfs(grid, r, c, visited);\n        count++;\n      }\n    }\n  }\n  return count;\n}`,
          },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: 'Which two-pointer pattern is used when pointers move from opposite ends?',
        options: ['Slow-fast pointer', 'Opposite ends pattern', 'Prefix sum pattern', 'Monotonic queue'],
        correctAnswer: 1,
        explanation: 'Opposite-end pointers are used for problems like pair sums and palindrome checks.',
        difficulty: 'medium',
      },
      {
        id: 2,
        question: 'What is the classic sliding window variation for counting exact frequencies?',
        options: ['Fixed-size window', 'Variable-size window', 'Exact count trick', 'Prefix sum'],
        correctAnswer: 2,
        explanation: 'The exact count trick tracks frequencies and shrinks the window until it matches the required counts.',
        difficulty: 'hard',
      },
      {
        id: 3,
        question: 'When should you reach for binary search?',
        options: ['When the input is sorted and the check is monotonic', 'When there are only strings', 'When you need to sort a list', 'When the array is small'],
        correctAnswer: 0,
        explanation: 'Binary search works when the answer space is sorted or the predicate is monotonic.',
        difficulty: 'easy',
      },
    ],
    practiceProblems: [
      {
        id: 1,
        title: 'Practice: longest substring without repeating characters',
        difficulty: 'hard',
        description: 'Use sliding window and a frequency map to find the longest substring with unique characters.',
        examples: [
          { input: 'abcabcbb', output: '3', explanation: 'The longest unique substring is abc.' },
        ],
        hints: ['Use a window with a map of counts.', 'Expand right and shrink left when duplicates appear.'],
        approach: 'Maintain a window of unique characters and use a hash map to detect duplicates, shrinking left when needed.',
        code: `Map<Character, Integer> freq = new HashMap<>();\nint left = 0, best = 0;\nfor (int right = 0; right < s.length(); right++) {\n  char ch = s.charAt(right);\n  freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n  while (freq.get(ch) > 1) {\n    char leftChar = s.charAt(left++);\n    freq.put(leftChar, freq.get(leftChar) - 1);\n  }\n  best = Math.max(best, right - left + 1);\n}`,
      },
      {
        id: 2,
        title: 'Practice: search in rotated sorted array',
        difficulty: 'medium',
        description: 'Use binary search patterns to locate a value in a rotated sorted array.',
        examples: [
          { input: '[4,5,6,7,0,1,2], target=0', output: '4', explanation: '0 appears at index 4.' },
        ],
        hints: ['Check which half is sorted.', 'Narrow toward the side that contains the target.'],
        approach: 'Determine whether the left half or right half is sorted, then continue the search in the relevant half.',
        code: `int low = 0, high = nums.length - 1;\nwhile (low <= high) {\n  int mid = low + (high - low) / 2;\n  if (nums[mid] == target) return mid;\n  if (nums[low] <= nums[mid]) {\n    if (target >= nums[low] && target < nums[mid]) high = mid - 1;\n    else low = mid + 1;\n  } else {\n    if (target > nums[mid] && target <= nums[high]) low = mid + 1;\n    else high = mid - 1;\n  }\n}`,
      },
    ],
    complexities: [
      { operation: 'Two pointers', time: 'O(n)', space: 'O(1)' },
      { operation: 'Sliding window', time: 'O(n)', space: 'O(k)' },
      { operation: 'Prefix sums / hashing', time: 'O(n)', space: 'O(n)' },
      { operation: 'Binary search', time: 'O(log n)', space: 'O(1)' },
    ],
    patternQuestions: [
      { id: 1, question: 'Which pattern is used when you need to find the longest valid substring?', options: ['Two pointers', 'Sliding window', 'Hash map', 'Greedy'], correctAnswer: 1, explanation: 'Sliding window is the classic choice when the problem is about contiguous segments and can be validated incrementally.', difficulty: 'easy' },
      { id: 2, question: 'What is the key idea behind the exact count trick?', options: ['Use a frequency map and shrink until all counts match', 'Use only one pointer', 'Sort the array', 'Use recursion'], correctAnswer: 0, explanation: 'The exact count trick centralizes frequency tracking and shrinks the window until the required counts are satisfied.', difficulty: 'medium' },
    ],
  },
];

export default function SetPage() {
  const { id } = useParams();
  const { progress, markSetComplete, markTopicSeen } = useProgressStore();
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);

  const routeId = String(id ?? '');
  const baseSet = (() => {
    if (routeId.startsWith('java-')) return learningSets[0];
    if (routeId.startsWith('springboot-')) return learningSets[3];
    if (routeId.startsWith('dsa-')) return learningSets[4];
    return learningSets.find((item) => String(item.id) === routeId) ?? learningSets[0];
  })();

  const routeMeta = allSets.find((set) => set.id.toLowerCase() === routeId.toLowerCase());
  const set = {
    ...baseSet,
    id: baseSet.id,
    title: routeMeta?.title ?? baseSet.title,
    subtitle: routeMeta?.title ? `${routeMeta.title} covers the core patterns you need to reason through real interview and system-design questions.` : baseSet.subtitle,
  } as LearningSet;

  const activeTopic = set.topics[activeTopicIdx] ?? set.topics[0];

  useEffect(() => {
    markTopicSeen(set.id, activeTopicIdx);
  }, [activeTopicIdx, markTopicSeen, set.id]);

  const canGoPrev = activeTopicIdx > 0;
  const canGoNext = activeTopicIdx < set.topics.length - 1;
  const isCompleted = progress.completedSets.includes(set.id);

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6 sm:gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] transition hover:border-cyan-500/60 hover:text-cyan-200 sm:px-3.5"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to home
        </Link>

        <button
          type="button"
          onClick={() => markSetComplete(set.id, 100)}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20 sm:px-4"
        >
          <Check className="h-4 w-4" />
          {isCompleted ? 'Completed' : 'Mark complete'}
        </button>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] p-3 shadow-[0_22px_70px_rgba(15,23,42,0.18)] sm:rounded-[28px] sm:p-6">
        <div className="mb-6 grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3">
            <div className="mb-4 flex items-center justify-between px-2 pt-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--text-muted)]">Topics</p>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[10px] text-[var(--text-secondary)]">{set.topics.length}</span>
            </div>

            <div className="space-y-2">
              {set.topics.map((topic, index) => (
                <button
                  key={topic.title}
                  type="button"
                  onClick={() => setActiveTopicIdx(index)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    activeTopicIdx === index
                      ? 'border-[var(--accent-outline)] bg-[var(--accent-soft)] text-[var(--accent-stronger)] shadow-inner shadow-[rgba(29,77,99,0.12)]'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--surface)] text-[11px] font-semibold text-[var(--text-primary)]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{topic.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="min-w-0 space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${set.bgGradient} text-xl shadow-lg shadow-cyan-500/10 sm:h-14 sm:w-14 sm:text-2xl`}>
                    {set.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">Set {set.id}</p>
                    <h1 className="mt-1 break-words text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{set.title}</h1>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-secondary)]">
                  <Dumbbell className="h-4 w-4 text-cyan-300" />
                  <span>{set.estimatedTime}</span>
                </div>
              </div>

              <p className="mb-6 text-base leading-7 text-[var(--text-secondary)]">{set.subtitle}</p>

              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--text-muted)]">Current topic</p>
                  <h2 className="mt-2 text-2xl font-semibold text-cyan-300">{activeTopic.title}</h2>
                </div>
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  {activeTopicIdx + 1}/{set.topics.length}
                </span>
              </div>

              <p className="mb-5 text-[var(--text-secondary)]">{activeTopic.content}</p>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="mb-3 flex items-center gap-2 text-cyan-300">
                    <Code className="h-4 w-4" />
                    <span className="text-[10px] uppercase tracking-[0.2em]">Template</span>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-[var(--text-primary)]">
                    {activeTopic.template}
                  </pre>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="mb-3 flex items-center gap-2 text-cyan-300">
                    <Bookmark className="h-4 w-4" />
                    <span className="text-[10px] uppercase tracking-[0.2em]">Key points</span>
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--text-primary)]">
                    {activeTopic.keyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-cyan-300">Trace through</h3>
              </div>

              <TraceThrough steps={activeTopic.traceSteps} />
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-cyan-300">Code example</h3>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--text-primary)]">
                {activeTopic.code}
              </pre>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
                <h3 className="mb-4 text-xl font-semibold text-cyan-300">Key takeaways</h3>
                <ul className="space-y-3">
                  {activeTopic.keyPoints.map((point, index) => (
                    <li key={point} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                      <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-300">
                        {index + 1}
                      </span>
                      <span className="text-[var(--text-primary)]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
                <h3 className="mb-4 text-xl font-semibold text-cyan-300">Complexity</h3>
                <ComplexityTable rows={set.complexities ?? []} />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-cyan-300">Practice</h3>
                <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  {set.practiceProblems?.length ?? 0} challenge
                </div>
              </div>

              <div className="space-y-4">
                {set.practiceProblems?.map((problem) => (
                  <div key={problem.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h4 className="text-lg font-medium text-[var(--text-primary)]">{problem.title}</h4>
                      <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="mb-3 text-[var(--text-secondary)]">{problem.description}</p>
                    <div className="mb-4 space-y-2">
                      {problem.hints.map((hint) => (
                        <p key={hint} className="text-sm text-[var(--text-secondary)]">• {hint}</p>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/set/${set.id}/practice`}
                        className="rounded-xl border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
                      >
                        Practice
                      </Link>
                      <Link
                        to={`/set/${set.id}/quiz`}
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--border)] hover:text-[var(--text-primary)]"
                      >
                        Take Quiz
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

