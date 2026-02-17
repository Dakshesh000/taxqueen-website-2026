## 8-Point Website Update Plan

### 1. Tablet Portrait Navbar - Use Hamburger Menu at Larger Breakpoint

**Problem:** At tablet portrait widths (768px-1024px), the desktop nav with 6 links + CTA button gets cramped.

**Fix:** Change the breakpoint for showing the desktop nav from `md` (768px) to `lg` (1024px). This means tablet portrait users will get the mobile hamburger menu instead.

**Files:** `src/components/layout/Navbar.tsx`

**Changes:**

- Replace all `md:` prefixes for nav visibility with `lg:` (lines 43, 59, 70, 80)
- `hidden md:flex` becomes `hidden lg:flex`
- `hidden md:block` becomes `hidden lg:block`
- `md:hidden` becomes `lg:hidden`

---

### 2. Quiz Mobile - Fix "Which of These Apply to You?" Title Overlap

**Problem:** On mobile, the progress bar (absolutely positioned with gradient overlay at the top) overlaps the question heading on step 4 (the 6-option multi-select).

**Fix:** Add top padding to the content area in `QuestionWrapper.tsx` to account for the progress bar height when it's visible, without changing the design.

**Files:** `src/components/quiz/QuestionWrapper.tsx`

**Changes:**

- Accept a new prop or detect that the progress bar is shown (steps > 0)
- Add `pt-16 md:pt-20` to the content container when progress bar is visible, giving room for the overlaid progress bar
- Since `QuestionWrapper` doesn't know about the step, the simplest approach is to add a `showProgressBar` prop passed from `GlobalQuiz.tsx`
- In `GlobalQuiz.tsx`, pass `showProgressBar={currentStep > 0}` to each `QuestionWrapper`
- In `QuestionWrapper.tsx`, when `showProgressBar` is true, add extra top padding (`pt-20`) to the scrollable content area

---

### 3. Quiz Contact Form - Stricter Email + Phone Validation

**Problem:** Current regex is too permissive. Need real email validation and phone locked to +1 followed by exactly 10 digits.

**Files:** `src/components/quiz/GlobalQuiz.tsx`, `src/components/quiz/questions/ContactForm.tsx`

**Changes in GlobalQuiz.tsx:**

- Update `EMAIL_REGEX` to require at least 2-char TLD and disallow consecutive dots
- Replace `PHONE_REGEX` with a strict US phone regex: `/^\+1\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/`
- Update `validatePhone` error message to: "Please enter a valid US phone number (+1 followed by 10 digits)"
- Note that users should be able to edit the extension if need be by typing...it can take upto 3 caracters
- Update `validateEmail` to also check for common disposable email domains (optional) or at minimum enforce stricter format...make sure a real entry never gets barred

**Changes in ContactForm.tsx:**

- Auto-prepend "+1 " on phone field (already done)
- Add `maxLength` attribute to phone input to prevent excess digits
- The phone field should enforce format: after "+1 " only allow 10 more digits

---

### 4. About Page - Parallax Image List

The About page parallax divider currently uses `heatherMission` (imported as `mission.webp` from `src/assets/heather/`).

I'll update `src/pages/About.tsx` line 286. with the image named: `woman-working-views.jpg`

---

### 5. Newsletter "Stay Updated" Form - Already Working

The footer newsletter form is **already functional**. It submits to Formspree endpoint `https://formspree.io/f/xkorjqrg` (line 11 of Footer.tsx). It includes:

- Email validation
- Loading states
- Success/error toast notifications

Formspree automatically sends email notifications to the account owner when a submission is received. No code changes needed -- just verify the Formspree form `xkorjqrg` is configured in your Formspree dashboard to send notification emails to your inbox.

---

### 6. Service Cards - Add Pricing

**Files:** `src/components/sections/ServicesCards.tsx`

**Changes:**

- Add a `price` field to each service object
- Tax Preparation: "Starts at $425"
- Mini Tax Plan: "Starts at $675"
- Tax Strategy: "Starts at $175 for 1040" (will become "Tax Maintenance Plan" per item 8)
- Add `price` prop to `ServiceCardProps` interface
- Render the price between the value proposition and the CTA button, styled as a prominent text element

---

### 7. Testimonials Section - Reduce Height by 50%

**Files:** `src/components/sections/TestimonialsSection.tsx`

**Changes:**

- Change `max-h-[700px]` to `max-h-[350px]`
- Change `xl:max-h-[800px]` to `xl:max-h-[400px]`
- Change `2xl:max-h-[850px]` to `2xl:max-h-[425px]`
- Reduce vertical padding from `py-20` to `py-10`
- Reduce header margin from `mb-12` to `mb-6`

---

### 8. Rename "Tax Strategy" to "Tax Maintenance Plan"

**All locations found that need updating:**


| File                                        | Line | Current Text                                         | New Text                                                        |
| ------------------------------------------- | ---- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `src/components/sections/ServicesCards.tsx` | 130  | `title: "Tax Strategy"`                              | `title: "Tax Maintenance Plan"`                                 |
| `src/pages/Services.tsx`                    | 6    | Comment: `Tax Strategy/Planning`                     | `Tax Maintenance Plan`                                          |
| `src/pages/Contact.tsx`                     | 187  | `<option value="tax-strategy">Tax Strategy</option>` | `<option value="tax-maintenance">Tax Maintenance Plan</option>` |


Note: References to "tax strategy" in FAQ answers, Tools page CTA, and general descriptions are about the concept of tax strategy (not the service name), so those remain unchanged.

---

### Files to Modify Summary


| File                                              | Changes                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| `src/components/layout/Navbar.tsx`                | Change nav breakpoint from `md` to `lg`                             |
| `src/components/quiz/QuestionWrapper.tsx`         | Add `showProgressBar` prop, add top padding when true               |
| `src/components/quiz/GlobalQuiz.tsx`              | Pass `showProgressBar` prop, update phone regex to strict US format |
| `src/components/quiz/questions/ContactForm.tsx`   | Add maxLength to phone input                                        |
| `src/components/sections/ServicesCards.tsx`       | Add pricing, rename "Tax Strategy" to "Tax Maintenance Plan"        |
| `src/components/sections/TestimonialsSection.tsx` | Reduce max heights by 50%, reduce padding                           |
| `src/pages/Services.tsx`                          | Update comment reference                                            |
| `src/pages/Contact.tsx`                           | Rename dropdown option                                              |
