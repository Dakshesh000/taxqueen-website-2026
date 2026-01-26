

## Replace Contact Page Quiz Embed with Popup Trigger

### Problem

The embedded quiz on the Contact page has persistent layout/sizing issues (visible empty space, inconsistent card sizing) that are difficult to fix due to the way the quiz content is designed for the modal container.

### Solution

Replace the embedded quiz with a CTA section that opens the quiz in the same popup modal used on the homepage. This ensures consistent behavior across the site and eliminates the embed sizing issues.

---

### Changes

**File: `src/pages/Contact.tsx`**

1. **Add the `useQuiz` hook import**
   ```tsx
   import { useQuiz } from "@/contexts/QuizContext";
   ```

2. **Use the hook in the component**
   ```tsx
   const { openQuiz } = useQuiz();
   ```

3. **Replace the quiz embed section (lines 226-243)** with a styled CTA button:
   ```tsx
   {/* Not Sure Where To Get Started? Take The Quiz */}
   <section className="py-20 bg-muted/30">
     <div className="container mx-auto px-4">
       <div className="text-center max-w-2xl mx-auto space-y-6">
         <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
           Not Sure Where To Get Started?
         </h2>
         <p className="text-lg text-muted-foreground">
           Answer a few quick questions and we'll match you with the right service for your nomad lifestyle.
         </p>
         <Button
           size="lg"
           className="rounded-full px-8"
           onClick={() => openQuiz()}
         >
           Take The Quiz
           <ArrowRight className="w-5 h-5 ml-2" />
         </Button>
       </div>
     </div>
   </section>
   ```

4. **Remove the GlobalQuiz import** (no longer needed on this page since the global modal is already rendered in App.tsx)

5. **Add ArrowRight icon import**
   ```tsx
   import { ArrowRight } from "lucide-react";
   ```

---

### Result

| Before | After |
|--------|-------|
| Embedded quiz with layout issues | Clean CTA section with "Take The Quiz" button |
| Quiz renders directly in page | Quiz opens in popup modal (same as homepage) |
| Fixed height container struggles | Consistent modal experience across site |

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Contact.tsx` | (1) Import `useQuiz` hook, (2) Import `ArrowRight` icon, (3) Remove `GlobalQuiz` import, (4) Replace quiz embed section with CTA button that calls `openQuiz()` |

---

### Visual Result

The "Not Sure Where To Get Started?" section will display:
- Centered heading (uppercase)
- Descriptive paragraph
- Prominent "Take The Quiz" button with arrow icon
- Clicking the button opens the quiz popup modal (consistent with homepage behavior)

