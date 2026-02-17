

## Cleanup: Remove Unused Files

### Files to Delete

| File | Reason |
|---|---|
| `.lovable/plan.md` | Auto-generated plan artifact from last session. Not required by Lovable -- safe to delete. |
| `docs/google-sheets-setup.md` | Old setup doc for a Google Sheets integration. Not referenced anywhere in code. |
| `src/components/sections/BlogSection.tsx` | No longer needed since Articles links to external blog. |
| `src/components/quiz/questions/TextInputQuestion.tsx` | Never imported or used outside its barrel export. Dead code. |
| `src/assets/placeholders/quiz-placeholders.ts` | Check if still used (it is -- by GlobalQuiz). **Keep this file.** |

### Files to Update

| File | Change |
|---|---|
| `src/pages/Index.tsx` | Remove the `BlogSection` lazy import and its `<Suspense>` block from the homepage. |
| `src/components/sections/index.ts` | Remove the `BlogSection` export if present. |
| `src/components/quiz/index.ts` | Remove the `TextInputQuestion` export line. |
| `src/types/index.ts` | Remove the `BlogPost` interface (only used by BlogSection). |

### What stays

- **DesignGuide** and **QuizPreview** pages -- keeping per your preference
- **sheetLogger.ts** and **log-submission** edge function -- actively used for form submissions
- **quiz-placeholders.ts** -- actively used by GlobalQuiz

### Summary

- **4 files deleted** (plan.md, google-sheets-setup.md, BlogSection.tsx, TextInputQuestion.tsx)
- **4 files updated** (Index.tsx, sections/index.ts, quiz/index.ts, types/index.ts)
- No functionality changes -- just removing dead code
