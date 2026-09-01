import type { PracticeProblem } from '../types';

export const practiceProblems: PracticeProblem[] = [
  {
    id: 1,
    title: 'Find the largest number',
    difficulty: 'easy',
    description: 'Write a method that returns the largest value in an integer array.',
    examples: [{ input: '{4, 9, 2, 7}', output: '9' }],
    hints: ['Compare each value to the current max.', 'Track the largest item seen so far.'],
    approach: 'Loop through the array and update max whenever a larger number is found.',
    code: `public static int max(int[] nums) {
  int max = nums[0];
  for (int i = 1; i < nums.length; i++) {
    if (nums[i] > max) max = nums[i];
  }
  return max;
}`,
  },
  {
    id: 2,
    title: 'Reverse a string',
    difficulty: 'medium',
    description: 'Create a function that returns the reverse of a string without using built-in reverse helpers.',
    examples: [{ input: 'Java', output: 'avaJ' }],
    hints: ['Use a loop or two pointers.', 'Build the result by appending characters in reverse order.'],
    approach: 'Iterate from the end of the string and append each character to a new string.',
    code: `public static String reverse(String text) {
  StringBuilder sb = new StringBuilder();
  for (int i = text.length() - 1; i >= 0; i--) {
    sb.append(text.charAt(i));
  }
  return sb.toString();
}`,
  },
];
