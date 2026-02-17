

## Fix Transparent Quiz Results Card

### Problem

When the quiz reaches the results screen (with the calendar), the content renders directly via `QuizResults` without the `QuestionWrapper` component that provides the background image. The modal card in `QuizModal` intentionally has no `bg-background` class (removed earlier so background images fill edge-to-edge). This means the results card has no solid background -- it appears transparent over the blurred website backdrop.

### Solution

Add a solid `bg-background` class to the `QuizResults` container so the results card has a proper white/dark background regardless of whether a background image is present.

### Technical Details

**File: `src/components/quiz/QuizResults.tsx`**

- Line 14: Change the qualified result container from:
  ```
  <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] p-6 text-center">
  ```
  to:
  ```
  <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] p-6 text-center bg-background rounded-2xl">
  ```

- Line 58: Same change for the non-qualified result container.

This gives both result screens a solid background and consistent rounded styling, matching the rest of the quiz card appearance.

