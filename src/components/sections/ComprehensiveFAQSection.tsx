import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { 
  Caravan, 
  Building2, 
  Receipt, 
  ClipboardCheck, 
  UserCheck, 
  PiggyBank, 
  HelpCircle,
  Search,
  type LucideIcon
} from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface FAQ {
  question: string;
  answer: string;
}

const categories: Category[] = [
  { id: "nomad", label: "Digital Nomad & RV Life", icon: Caravan },
  { id: "business", label: "Business Structure", icon: Building2 },
  { id: "deductions", label: "Deductions & Expenses", icon: Receipt },
  { id: "compliance", label: "Tax Compliance", icon: ClipboardCheck },
  { id: "heather", label: "Working with Heather", icon: UserCheck },
  { id: "personal", label: "Personal Finances", icon: PiggyBank },
  { id: "other", label: "Other", icon: HelpCircle },
];

const faqsByCategory: Record<string, FAQ[]> = {
  nomad: [
    {
      question: "How does changing my lifestyle affect my state residency?",
      answer: "A digital nomad lifestyle allows you to choose to \"move\" to a tax-free state like TX or FL. If you move to another country with a legal visa or residency permit, you would have to learn that country's taxation laws but you still might want to pick a tax-free state to remove that filing and tax obligation from your US taxes before leaving the US.",
    },
    {
      question: "What's the difference between domicile vs where I spend time? Where do I pay state taxes?",
      answer: "Domicile is your home state or resident state. If you're traveling this is most likely not where you're spending most of your time. You pay state taxes if you're physically working in that state, have rental property and income or any other source of income from a particular state. You usually will submit taxes based on your domicile but if you work in multiple states, you'll have to file in those states as a nonresident.",
    },
    {
      question: "As a digital nomad, where do I pay taxes?",
      answer: "If you're a US citizen, you always FILE with the US. You could possibly pay to the country you're living in if you're an expat or to a state if you're working or spending too much time in one spot. This varies according to country and/or state.",
    },
    {
      question: "When do I owe state taxes if I'm traveling through many states?",
      answer: "It depends on income and if you're physically working on location in that state. This is unique to each situation and each state.",
    },
    {
      question: "Can my RV or digital-nomad setup qualify as a home office when traveling?",
      answer: "No. This is very rare. If you have a toyhauler or bunkhouse RV model with a 100% dedicated home office space, then it's possible.",
    },
    {
      question: "How do we deduct our RV if we work from it and use it for business? Can we use Section 179?",
      answer: "You don't deduct an RV. It is too small of a space to have 100% dedicated office space. No one gets to deduct their full home for a business.",
    },
    {
      question: "Why can't gate guards deduct the cost of their RV? We can't do the job without the RV.",
      answer: "Because the RV is your HOME. No one can deduct the full cost of their home.",
    },
    {
      question: "Should my business own my RV?",
      answer: "No. If you're living in your RV full time, it isn't a business expense—it's your home. While it might sound like a good idea, having a business own an RV can create complications like requiring commercial insurance and added DOT stops on the highway.",
    },
    {
      question: "Can I save on taxes with a Montana LLC?",
      answer: "No. While the Montana LLC is a legal thing in Montana, most other states see it as tax evasion. You also would need commercial insurance and be subject to DOT inspections since you'd be a commercial vehicle.",
    },
    {
      question: "I'm a W-2 employee — which state is best to avoid state taxes?",
      answer: "I recommend either TX or FL for a W-2 employee.",
    },
    {
      question: "We own property in another state — will we still owe state taxes if we move our domicile to TX, FL, or SD?",
      answer: "Possibly if you are renting that property and making money on it.",
    },
    {
      question: "How should I file if I earned income in multiple states?",
      answer: "If you physically work and earn money in different states, you'll probably owe income tax to those states. This means you'll file multiple state returns. If you work remotely as a W-2 employee or run your business remotely while traveling, there's usually no need to worry about filing in multiple states.",
    },
  ],
  business: [
    {
      question: "I'm starting a new business — how do I set up an LLC and make sure I start off right?",
      answer: "An LLC is a legal entity and is always formed with the state. It's not required to run a business.",
    },
    {
      question: "Should I be an S-Corp or an LLC?",
      answer: "LLC is a legal entity, not a taxable one. S Corp is an election for taxation.",
    },
    {
      question: "Should I be an LLC or an S corp? What's the difference?",
      answer: "An LLC is not a taxable business entity, so as far as the IRS is concerned, it's essentially the same thing as a sole proprietorship or a DBA. Yes, you read that right—an LLC alone offers no tangible tax benefits. An S corp can provide tax savings, assuming your business meets the qualifications.",
    },
    {
      question: "Can my business own my RV or vehicle?",
      answer: "I almost never recommend your business owning your RV because you will be subject to DOT stops and inspections, commercial insurance, etc. and there's no benefit when you use your RV for personal use.",
    },
    {
      question: "If I'm an LLC, who pays the taxes — me or the business?",
      answer: "The LLC is a legal entity. The shareholder or owners of the business are responsible for the taxes. That means you are responsible for your share of the taxes.",
    },
    {
      question: "What is the LLC filing deadline? Why is it earlier for partnerships or S-Corps?",
      answer: "A single member LLC is a sole proprietor for tax purposes and files a Schedule C with your regular personal return 1040. Therefore, you have the same filing deadline as the 1040, April 15. A multi-member LLC is a partnership by default and the filing deadline is March 15. The S Corp filing deadline is March 15.",
    },
    {
      question: "Where should I register my business/LLC?",
      answer: "Short answer it should be the same as your domicile or resident state. There are always exceptions to this though.",
    },
    {
      question: "As a 1099 contractor, how can I use my LLC to save money on taxes?",
      answer: "LLC is a legal entity. Contrary to popular belief it offers no tax benefits.",
    },
    {
      question: "I have an LLC with a partner — do we both need to take a salary? What about distributions?",
      answer: "LLC is a legal entity. If you're a partnership, then no partner ever gets a salary. If the LLC is taxed as an S Corp, then yes. Owners of an S Corp who work in the business are required to have a salary. Distributions are just that. They should always be tracked.",
    },
    {
      question: "Do S-Corp distributions have to be the same for all shareholders?",
      answer: "S Corp distributions are always based on the % of ownership. If there is 50/50, then the distribution would be even. If it's 90/10, then the distribution would be split 90/10.",
    },
    {
      question: "We're a married couple with an LLC partnership. Do we file this with our personal taxes or separately?",
      answer: "A partnership is a separate legal and taxable entity. It files its own return, a 1065.",
    },
  ],
  deductions: [
    {
      question: "What expenses can I deduct as a business owner?",
      answer: "Anything necessary to run that business - office expenses, computer, business insurance, software, website costs, legal fees, etc.",
    },
    {
      question: "Can I deduct health insurance?",
      answer: "Possibly. There is a provision for self-employed health insurance but you must meet income criteria and have a qualifying health insurance plan. S Corp have a whole other complexity to handling health insurance which you must follow up in order to deduct.",
    },
    {
      question: "I'm a content creator — can I deduct my RV if I use it in my videos? If I'm a digital nomad, can I deduct all my travel if I document each place I stay?",
      answer: "No. Because the RV is your HOME. No one can deduct the full cost of their home. Digital nomad is a lifestyle and those are personal expenses. The only way to deduct travel is to go to a specific event or conference related to work.",
    },
    {
      question: "We have a YouTube channel — can we deduct all of our travel mileage since the journey is our \"product\"?",
      answer: "No. That's a lifestyle choice. High mileage is a huge red flag. It's possible to deduct some of the mileage. I work with my clients on an individual basis to help them determine what works for their unique situation.",
    },
    {
      question: "I'm a content creator with videos, YouTube channel, etc. Can I deduct all my mileage and travel expenses?",
      answer: "Be very careful when deducting your mileage—it's a red flag for the IRS. It's important to understand travel expenses for nomads and why they aren't 100% deductible.",
    },
    {
      question: "I'm renting out my RV — what expenses can I deduct? Can I deduct the loan payment?",
      answer: "Loan payments are never deductible. The loan interest is the item that's deductible. Otherwise, you would deduct any item necessary to run that business.",
    },
    {
      question: "Can a credit-card statement serve as proof of an expense?",
      answer: "No. You need the actual receipt - paper or electronic (pdf is fine).",
    },
    {
      question: "How do I track mileage, receipts, expenses, income, etc.?",
      answer: "Mileage use an app like MileIQ. For all income and expenses, you can use either a spreadsheet or software.",
    },
    {
      question: "What's the best way to track my money — software or spreadsheets?",
      answer: "Whatever way you're going to keep up with consistently.",
    },
    {
      question: "How should I keep track of my business expenses and income?",
      answer: "I highly recommend tracking your expenses with accounting software, which allows you to track income and expenses in the same place to understand the financial health of your company. Quickbooks, Wave, and Xero are all great options.",
    },
  ],
  compliance: [
    {
      question: "How do I stay off the IRS radar?",
      answer: "Keep up with filing compliance.",
    },
    {
      question: "How do I stay on top of tax obligations? How do I know if I need to pay quarterly taxes?",
      answer: "To avoid an IRS underpayment penalty, you must pay the lesser of 90% of your current year's tax liability or 100% of your previous year's tax liability. This is done through estimated quarterly payments.",
    },
    {
      question: "I'm an independent contractor and will receive a 1099. Should I become an LLC? Do I file quarterly? Can I deduct my RV as a business expense?",
      answer: "LLC is a legal entity. You are a business owner though so you can deduct regular business expenses to complete that work. Quarterly filing is to keep up with your tax obligation as a self-employed individual. The USA is a pay as you earn system so that's why you would pay in quarterly for your estimated tax payments. The RV is almost never a business expense. It is your home.",
    },
    {
      question: "I paid a contractor last year — what do I need to do now?",
      answer: "Before paying any contractor for your business, you need to collect a W9 from them. In January you will create and submit a 1099NEC for that contractor if you paid them cash, check or direct deposit.",
    },
    {
      question: "What happens if I mix business and personal money? I used a personal card for business expenses — what now?",
      answer: "First things first, always keep business and personal finances separate. If you accidentally use the wrong card, reimburse yourself with a paper trail.",
    },
    {
      question: "Can you help me understand self-employment taxes? Do I owe quarterly taxes?",
      answer: "Self-employment taxes are social security and medicare (total of 15.3%) on the net profit of your sole proprietor or partnership income. Quarterly taxes are estimated tax payments due 4 times throughout the year: April 15, June 15, September 15, and January 15 of the following year.",
    },
    {
      question: "Can you help with FEIE or FBAR filing requirements?",
      answer: "Yes. I am familiar with all the extra complexities when living overseas or traveling as a digital nomad.",
    },
    {
      question: "I'm a dual citizen and taxed in both countries. What am I doing wrong?",
      answer: "Not working with a pro who gets it and can help minimize your tax liability. Many countries have tax treaties with the USA to specifically avoid double taxation.",
    },
  ],
  heather: [
    {
      question: "How are you different from other tax pros? Why should I hire you instead of someone else?",
      answer: "I am responsive, with a quick turnaround time and generally use everyday terms so that my clients understand complicated tax matters.",
    },
    {
      question: "How much does it cost to work with you?",
      answer: "Pricing depends on your desired service and business type, but it's always a flat fee—never a percentage. See my Services page for more details.",
    },
    {
      question: "What are your professional credentials?",
      answer: "I'm an enrolled agent (EA), which means I'm licensed by the IRS to practice as a tax professional in all 50 states. An enrolled agent is strictly focused on all things tax-related: tax planning, tax prep, and tax representation. I'm also a certified tax coach by the American Institute for Certified Tax Planners.",
    },
    {
      question: "What is your tax preparation process like?",
      answer: "First, we'll make sure my services suit your needs. Then I'll give you access to a secure client portal where you can upload documents, sign an engagement letter, and get all of the electronic paperwork completed. Once I've got everything I need, I'll get started on your return!",
    },
    {
      question: "Are you familiar with my state's tax laws?",
      answer: "I've filed tax returns for clients in 37 states and counting. If I'm not familiar with your state, I have access to the tools necessary to research state-specific tax laws.",
    },
    {
      question: "How do you keep up with the latest tax laws from the road?",
      answer: "I regularly attend continuing education seminars, both online and in-person. My license requires continuing education every year—plus, I enjoy it!",
    },
    {
      question: "Can you represent me in front of the IRS?",
      answer: "Yes. As an enrolled agent, I can represent taxpayers in any state, so I can provide tax resolution and representation for any tax matter you need help with.",
    },
    {
      question: "I'm transitioning from W-2 to 1099 and feel lost. Can you help?",
      answer: "Yes. This is fairly common for those moving to a digital nomad lifestyle. I'd answer all your questions as it relates to becoming a business owner. Yes, getting paid as a contractor or 1099 means you now own a business.",
    },
  ],
  personal: [
    {
      question: "Will my Social Security be taxed if I work? What if my spouse works?",
      answer: "This depends on your age and when you start drawing from SS. If it's early, then you are limited on income to about $20k. Spouse income makes no difference.",
    },
    {
      question: "Can I contribute to an IRA this year? If yes, how much?",
      answer: "Possibly. It depends on many circumstances. The maximum contribution changes annually. For 2025, it is $7000, if over 50 it is $8000.",
    },
    {
      question: "I'm worried about a big tax bill — how do I avoid surprises?",
      answer: "Work with a tax pro all year long to understand and keep up with your taxes throughout the year. Don't wait until tax time to know your numbers.",
    },
    {
      question: "I'm selling my home — how much should I set aside for taxes?",
      answer: "A personal residence is given a tax exemption of up to $250k single and $500k for married filing joint on any gain from the sale. There are strict requirements to get this exclusion - such as living in the home as your primary residence for at least 2 years.",
    },
    {
      question: "I'm inheriting a home — what do I need to know for taxes?",
      answer: "The home will get a step up in basis (your cost is either the FMV at the time of death or within 6 months of death). Use a realtor to formally get this in writing. This usually gives you a big increase from the original cost of the home from your family member and can help reduce capital gains taxes.",
    },
  ],
  other: [
    {
      question: "How do I save on taxes and avoid paying more than necessary?",
      answer: "Take all your deductions, credits and expenses for a business. You can also choose to work with a tax strategist or tax coach for the best guidance on tax strategy and tax planning.",
    },
    {
      question: "I'm afraid of doing something wrong — how do I avoid mistakes?",
      answer: "There's no way to 100% guarantee you won't make a mistake. That's ok. It's almost always fixable. If you're looking for more guidance, then work with a tax pro who can advise you better so you won't miss items or take deductions that you don't qualify for.",
    },
    {
      question: "I'm afraid of what I don't know. What if I'm missing something important?",
      answer: "There's no way to 100% guarantee you won't make a mistake. That's ok. It's almost always fixable. If you're looking for more guidance, then work with a tax pro who can advise you better.",
    },
    {
      question: "My last accountant never communicated — months without responses, filed extensions I didn't want, and ignored my questions. How do I avoid this happening again?",
      answer: "Make sure to ask these questions when you hire a new tax pro and communicate with them about what you want or need from them. Ask your friends or family for recommendations for someone they work with and have had good experiences with.",
    },
    {
      question: "What questions or tax issues am I missing?",
      answer: "This is way too variable and unique to each situation. It's best to work with a tax pro if you have questions or think you're missing something.",
    },
    {
      question: "What are the biggest tax and bookkeeping pitfalls for new business owners?",
      answer: "The top mistakes include: misunderstanding the LLC and how it affects taxes, confusion about self-employment taxes, mixing business and personal finances, not tracking all business income and expenses throughout the year, and trying to take deductions that don't count for digital nomads.",
    },
  ],
};

const ComprehensiveFAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("nomad");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Helper function to normalize text for fuzzy matching
  const normalizeForSearch = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[\s\-_]/g, '') // Remove spaces, hyphens, underscores
      .replace(/['']/g, '')    // Remove apostrophes
      .trim();
  };

  // Filter FAQs based on search query - searches ALL categories when query exists
  const filteredFaqs = useMemo(() => {
    // If no search query, show only selected category
    if (!searchQuery.trim()) {
      return faqsByCategory[selectedCategory] || [];
    }

    const query = searchQuery.toLowerCase().trim();
    const normalizedQuery = normalizeForSearch(query);
    
    // When searching, search ALL categories
    const allFaqs = Object.values(faqsByCategory).flat();
    
    return allFaqs.filter((faq) => {
      const questionLower = faq.question.toLowerCase();
      const answerLower = faq.answer.toLowerCase();
      const questionNormalized = normalizeForSearch(faq.question);
      const answerNormalized = normalizeForSearch(faq.answer);
      
      // Check both regular and normalized matches
      return (
        questionLower.includes(query) ||
        answerLower.includes(query) ||
        questionNormalized.includes(normalizedQuery) ||
        answerNormalized.includes(normalizedQuery)
      );
    });
  }, [selectedCategory, searchQuery]);

  const isExpanded = expandedCategories.has(selectedCategory);
  const displayedFaqs = isExpanded ? filteredFaqs : filteredFaqs.slice(0, 5);
  const remainingCount = filteredFaqs.length - 5;

  const toggleExpanded = () => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(selectedCategory)) {
        newSet.delete(selectedCategory);
      } else {
        newSet.add(selectedCategory);
      }
      return newSet;
    });
  };

  return (
    <section id="full-faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight uppercase mb-4">
            Got more questions?
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse by topic to find your answer
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories - Desktop only (mobile categories are inline with questions) */}
          <div className="hidden lg:block lg:w-1/4 flex-shrink-0 order-2 lg:order-1">
            {/* Desktop: vertical list */}
            <div className="hidden lg:block lg:sticky lg:top-24 space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSearchQuery("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-300",
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions - order-1 on mobile (appears first) */}
          <div className="lg:w-3/4 order-1 lg:order-2">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base bg-muted/30 border-border/50"
                maxLength={100}
              />
            </div>

            {/* Mobile Categories - directly below search bar */}
            <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4 mb-4">
              <div className="flex gap-2 w-max">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSearchQuery("");
                      }}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="space-y-3">
              {displayedFaqs.map((faq, index) => (
                <AccordionItem
                  key={`${selectedCategory}-${index}`}
                  value={`item-${index}`}
                  className="bg-muted/30 rounded-lg px-6 border border-border/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* See More / Show Less Button */}
            {filteredFaqs.length > 5 && !searchQuery && (
              <button
                onClick={toggleExpanded}
                className="mt-6 text-primary font-medium hover:underline transition-colors"
              >
                {isExpanded ? "Show fewer FAQ questions" : `View ${remainingCount} more FAQ questions`}
              </button>
            )}

            {/* No Results */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No questions found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:underline mt-2"
                >
                  Reset FAQ search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveFAQSection;
