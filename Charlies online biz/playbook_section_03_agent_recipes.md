# Section 3: Agent Recipes (Copy-Paste Templates)

## How to Use These Recipes

Each recipe below is a complete, ready-to-use agent configuration. To deploy:

1. Copy the recipe text
2. Save it as a `.md` file in your OpenClaw workspace
3. Customize the bracketed sections [like this] with your specific info
4. Run with `openclaw run filename.md`
5. Add to cron for automatic execution

**Important:** Read through each recipe and customize before running. The bracketed sections are placeholders that need your specific information.

---

## Recipe 1: The Customer Support Agent

**Best for:** Businesses receiving 10+ similar customer inquiries per day
**Time saved:** 5-15 hours per week
**Setup time:** 2-3 hours

```markdown
# Customer Support Agent

## Task
Monitor incoming customer support emails and draft responses.

## Instructions
For each new email in the support inbox:

1. **Categorize the email:**
   - Simple question (pricing, hours, location)
   - Technical issue (bug, error, not working)
   - Complaint (angry tone, problem with service)
   - Refund request
   - Complex inquiry (requires human judgment)

2. **Draft a response based on category:**

   **Simple Question:** Use these templates:
   - Pricing: "Our pricing starts at $[X] for [basic service]. Full details: [link]"
   - Hours: "We're open [days] from [time] to [time]. Holidays: [policy]"
   - Location: "We're located at [address]. Parking: [instructions]"

   **Technical Issue:** 
   - Acknowledge the problem
   - Ask for specific details: "Can you tell me [specific question]?"
   - Provide immediate workaround if available
   - Escalate to technical team with full context

   **Complaint:**
   - Apologize sincerely
   - Acknowledge their frustration
   - Explain next steps
   - Offer appropriate remedy (refund, discount, free service)
   - Flag for manager review

   **Refund Request:**
   - Check refund policy: [your policy here]
   - If eligible: "I've processed your refund. You'll see it in 3-5 days."
   - If not eligible: Explain why, offer alternative
   - Always escalate if customer is upset

   **Complex Inquiry:**
   - Summarize the request
   - List what information is needed to resolve
   - Draft clarifying questions
   - Flag for human review

3. **Save outputs:**
   - Draft responses to `drafts/[date]/email_[number].txt`
   - Create summary: `support_summary_[date].md` with:
     - Total emails received
     - Breakdown by category
     - Auto-respond count
     - Escalation count
     - Any urgent issues

## Context
Our business: [Describe your business in 2-3 sentences]

Common products/services: [List your main offerings]

Frequent questions:
- Q: [Common question 1]
  A: [Answer 1]
- Q: [Common question 2]
  A: [Answer 2]
- Q: [Common question 3]
  A: [Answer 3]

Tone guidelines:
- Friendly but professional
- Empathetic when customer is frustrated
- Clear and concise
- Never argumentative
- Always thank them for reaching out

Escalation triggers (always flag for human):
- Legal threats
- Requests for manager
- Angry language or profanity
- Issues affecting multiple customers
- Refund requests over $[amount]

## Tools
- Email access: [IMAP/POP3 or API details]
- Response templates location: `templates/support/`
- Output folder: `drafts/`

## Schedule
Check inbox: Every 30 minutes during business hours (9 AM - 6 PM)

## Output Format
```markdown
# Support Summary - [Date]

## Emails Processed: [X]
- Auto-respond ready: [X]
- Drafted for review: [X]
- Escalated: [X]

## Urgent Issues (Requires Immediate Attention):
- [List any angry customers or urgent problems]

## Draft Responses Location:
`drafts/[date]/`
```
```

### Customization Checklist

- [ ] Add your business description
- [ ] List your common questions and answers
- [ ] Define your refund policy
- [ ] Set escalation dollar amount
- [ ] Configure email access (IMAP settings)
- [ ] Test with 5-10 sample emails before going live

---

## Recipe 2: The Content Manager Agent

**Best for:** Businesses needing consistent social media presence
**Time saved:** 8-12 hours per week
**Setup time:** 2-3 hours

```markdown
# Content Manager Agent

## Task
Generate 7 days of social media content for [your business/industry].

## Instructions

### Content Mix (Weekly Distribution)
- 3 educational posts (teach something valuable)
- 2 behind-the-scenes posts (show your process/team)
- 1 customer story/testimonial format
- 1 engagement post (question, poll, controversial take)

### Content Generation Process

**Step 1: Research**
Search for trending topics in [your industry]:
- Current news and developments
- Common questions people are asking
- Competitor content that's performing well
- Seasonal or timely topics

**Step 2: Draft Creation**
For each of the 7 posts, create:

**Twitter/X Post:**
- Hook (first line that stops the scroll)
- Body (2-4 sentences max)
- Call to action (reply, retweet, click link)
- Hashtags (2-3 relevant ones)

**LinkedIn Post:**
- Hook (bold statement or question)
- Story or insight (3-5 paragraphs)
- Lesson or takeaway
- Engagement question
- 3-5 hashtags

**Instagram Caption:**
- Hook (emoji + bold statement)
- Body with line breaks for readability
- Call to action
- 10-15 hashtags

**Step 3: Content Calendar**
Organize posts by day and platform:

| Day | Platform | Topic | Hook Preview |
|-----|----------|-------|--------------|
| Mon | Twitter | [Topic] | [First line] |
| Mon | LinkedIn | [Topic] | [First line] |
| Tue | Instagram | [Topic] | [First line] |

**Step 4: Engagement Strategy**
For each post, include:
- Best time to post
- Who to tag (if anyone)
- Related content to share in comments
- Reply strategy for expected questions

## Context
Our business: [Describe your business]

Our audience: [Describe your ideal customer]

Our brand voice:
- [Adjective 1, e.g., "Professional but approachable"]
- [Adjective 2, e.g., "Direct, no fluff"]
- [Adjective 3, e.g., "Helpful and educational"]

Topics we cover:
1. [Topic area 1]
2. [Topic area 2]
3. [Topic area 3]

Things we NEVER post about:
- [Off-limits topic 1]
- [Off-limits topic 2]

Competitors to monitor for inspiration:
- [@competitor1]
- [@competitor2]

Hashtags we use:
#YourBrandedHashtag #[IndustryHashtag] #[NicheHashtag]

## Tools
- Research: Tavily search API
- Trending topics: X/Twitter API (optional)
- Output format: Markdown with sections for each platform

## Schedule
Generate content: Every Sunday at 6 PM for the upcoming week

## Output Format
```markdown
# Content Calendar - [Week of Date]

## Monday - [Date]

### Twitter/X
**Hook:** [First line]
**Body:** [2-4 sentences]
**CTA:** [Call to action]
**Hashtags:** [2-3 hashtags]
**Best time to post:** [Time]
**Notes:** [Any special instructions]

### LinkedIn
**Hook:** [First line]
**Body:** [Full post text]
**Engagement question:** [Question to end with]
**Hashtags:** [3-5 hashtags]
**Best time to post:** [Time]

### Instagram
**Hook:** [Emoji + bold statement]
**Caption:** [Full caption with line breaks]
**CTA:** [Call to action]
**Hashtags:** [10-15 hashtags]
**Best time to post:** [Time]

## Tuesday - [Date]
[Same format...]

## Weekly Content Summary
- Educational posts: [X]
- Behind-the-scenes: [X]
- Customer stories: [X]
- Engagement posts: [X]
- Total posts: [X]

## Trending Topics Identified:
- [Topic 1] - [Why relevant]
- [Topic 2] - [Why relevant]

## Suggested Engagement:
- Comment on posts from: [@account1], [@account2]
- Respond to DMs about: [expected topics]
```
```

### Customization Checklist

- [ ] Define your brand voice (3-5 adjectives)
- [ ] List your main content topics
- [ ] Identify off-limits subjects
- [ ] Add competitor accounts to monitor
- [ ] Choose your branded hashtag
- [ ] Set your preferred posting times
- [ ] Review first batch before scheduling

---

## Recipe 3: The Lead Research Agent

**Best for:** B2B businesses, agencies, consultants
**Time saved:** 10-20 hours per week
**Setup time:** 3-4 hours

```markdown
# Lead Research Agent

## Task
Find 20 qualified leads matching our ideal customer profile and research each one.

## Instructions

### Step 1: Search for Prospects

Search queries to run:
1. "[industry] companies in [location]"
2. "[industry] businesses [location] website"
3. "top [industry] companies [location]"
4. "[industry] services [location] directory"

For each search result:
- Visit the website
- Determine if they match our ideal customer profile
- If yes, proceed to Step 2
- If no, skip and note why

### Step 2: Qualify the Prospect

**Ideal Customer Profile (ICP):**
- Industry: [Target industries]
- Company size: [Employee count or revenue range]
- Location: [Geographic area]
- Signs they need our service:
  - [Specific indicator 1, e.g., "Website built before 2020"]
  - [Specific indicator 2, e.g., "No blog or content marketing"]
  - [Specific indicator 3, e.g., "Poor mobile experience"]

**Scoring (Rate 1-10):**
- 8-10: Strong fit, prioritize outreach
- 5-7: Moderate fit, worth trying
- 1-4: Poor fit, skip

### Step 3: Extract Information

For qualified prospects (score 6+), extract:

**Basic Info:**
- Company name
- Website URL
- Location (city, state)
- Industry/niche
- Company size (if available)

**Contact Information:**
- General email (hello@, info@, contact@)
- Decision maker (if listed on website)
- LinkedIn company page
- Phone number

**Business Intelligence:**
- Services/products offered
- Target market
- Recent news or updates
- Pain points we can solve (specific issues observed)
- Competitor websites they might be comparing

**Website Assessment:**
- Last updated (check copyright date)
- Mobile responsiveness (yes/no)
- Load speed (fast/slow)
- Design quality (modern/outdated)
- Key issues: [list specific problems]

### Step 4: Prioritize and Format

Sort by score (highest first).

For top 10 prospects, write:
- Personalized outreach angle (why they specifically need us)
- Specific issue to mention (shows we did research)
- Recommended approach (email, LinkedIn, call)

## Context
Our service: [Describe what you sell]

Our unique value proposition: [Why should they choose us?]

Pricing: [Price range, if relevant to qualification]

Industries we serve best:
1. [Industry 1] - [Why good fit]
2. [Industry 2] - [Why good fit]
3. [Industry 3] - [Why good fit]

Signs a company needs our service:
- [Specific indicator 1]
- [Specific indicator 2]
- [Specific indicator 3]
- [Specific indicator 4]

Red flags (disqualify):
- [Red flag 1, e.g., "Has in-house team doing same thing"]
- [Red flag 2, e.g., "Clearly out of budget range"]
- [Red flag 3, e.g., "Just launched new solution"]

## Tools
- Web search: Tavily API
- Website analysis: Manual inspection
- Email finder: [Optional - Hunter.io, Snov.io]

## Schedule
Run research: Every Monday at 9 AM
Generate fresh list of 20 prospects weekly

## Output Format
```markdown
# Lead Research Report - [Date]

## Summary
- Total researched: [X]
- Qualified leads (6+ score): [X]
- Strong fits (8+ score): [X]
- Priority outreach list: Top 10 below

---

## Priority Leads (Score 8-10)

### 1. [Company Name]
**Score:** [X]/10
**Website:** [URL]
**Location:** [City, State]
**Industry:** [Industry]
**Size:** [Size]

**Contact:**
- Email: [email]
- Phone: [phone]
- Decision maker: [name if available]

**Key Findings:**
- [Specific observation 1]
- [Specific observation 2]
- [Pain point we can solve]

**Outreach Angle:**
"[Personalized opening mentioning specific issue]. We help [type of businesses] like yours [solve specific problem]. [Specific benefit]."

**Recommended Approach:** [Email/LinkedIn/Call]

---

### 2. [Company Name]
[Same format...]

---

## Secondary Leads (Score 6-7)
[List companies worth trying but lower priority]

## Full Prospect List (JSON)
Save complete data to: `leads_[date].json`
```
```

### Customization Checklist

- [ ] Define your ideal customer profile
- [ ] List your target industries
- [ ] Describe your service clearly
- [ ] Identify specific pain point indicators
- [ ] Define red flags that disqualify leads
- [ ] Set up Tavily API key
- [ ] Test with your local area first
- [ ] Review first batch for accuracy

---

## Recipe 4: The Competitor Monitor Agent

**Best for:** Competitive industries, fast-moving markets
**Time saved:** 5-10 hours per week
**Setup time:** 2 hours

```markdown
# Competitor Monitor Agent

## Task
Monitor [X] key competitors weekly and alert on important changes.

## Instructions

### Step 1: Check Each Competitor

For each competitor in the monitoring list:

**Website Changes:**
- Homepage updates (new messaging, design changes)
- Pricing page changes (price increases/decreases, new packages)
- New product/service launches
- Removed products/services
- New team members (hiring page, about page)
- Blog posts published this week

**Review Monitoring:**
- New Google reviews (positive and negative)
- Common complaints or praises
- Overall rating trend

**Social Media:**
- Recent posts (last 7 days)
- Engagement levels
- Any promotions or campaigns
- Follower count changes

**News & Mentions:**
- Press releases
- Media mentions
- Industry award nominations/wins
- Partnership announcements

### Step 2: Analyze Significance

Rate each finding:
- **CRITICAL:** Direct threat or major opportunity (price drop, new competing product)
- **IMPORTANT:** Worth knowing about (new marketing campaign, team expansion)
- **NOTABLE:** Good to track (new blog post, minor website update)

### Step 3: Generate Recommendations

For CRITICAL and IMPORTANT findings, suggest:
- How we should respond (if at all)
- Opportunities this creates
- Threats to watch
- Content ideas inspired by their moves

## Context
Our business: [Describe your business]

Our competitive advantages:
1. [Advantage 1]
2. [Advantage 2]
3. [Advantage 3]

Our weaknesses to protect:
1. [Weakness 1]
2. [Weakness 2]

Competitors to monitor:
1. [Competitor 1] - [Website] - [Why they matter]
2. [Competitor 2] - [Website] - [Why they matter]
3. [Competitor 3] - [Website] - [Why they matter]
4. [Competitor 4] - [Website] - [Optional]
5. [Competitor 5] - [Website] - [Optional]

What we care most about:
- [Priority 1, e.g., "Pricing changes"]
- [Priority 2, e.g., "New service offerings"]
- [Priority 3, e.g., "Customer complaints/themes"]
- [Priority 4, e.g., "Marketing strategies"]

## Tools
- Website monitoring: Manual check (or use VisualPing for automation)
- Review monitoring: Google search + review sites
- Social monitoring: X/Twitter API or manual check
- News search: Tavily API

## Schedule
Run monitoring: Every Friday at 4 PM
Generate report by 5 PM

## Alert Triggers (Immediate Notification)
- Competitor drops prices by 10%+
- Competitor launches direct competing product
- Competitor gets major negative publicity
- Competitor announces partnership/acquisition
- Any legal/regulatory issues

## Output Format
```markdown
# Competitive Intelligence Report - [Week of Date]

## Executive Summary
- Critical alerts: [X]
- Important updates: [X]
- Notable mentions: [X]
- Recommended actions: [X]

## Critical Alerts (Immediate Action Required)

### [Competitor Name]: [Alert Type]
**What happened:** [Description]
**Why it matters:** [Impact on our business]
**Recommended response:** [Action items]
**Timeline:** [How quickly to respond]

---

## Important Updates

### [Competitor Name]
**Changes observed:**
- [Change 1]
- [Change 2]

**Analysis:**
[What this means for us]

**Opportunity/Threat:**
[Specific implications]

**Our move:**
[Recommended action or "monitor only"]

---

## Notable Mentions
- [Competitor]: [Brief update]
- [Competitor]: [Brief update]

## Industry Trends Observed
- [Trend 1]
- [Trend 2]

## Content Ideas Inspired by Competitors
1. [Idea 1] - Inspired by [competitor's move]
2. [Idea 2] - Counter to [competitor's claim]

## Strategic Recommendations
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]
```
```

### Customization Checklist

- [ ] List your top 3-5 competitors
- [ ] Define your competitive advantages
- [ ] Identify your weaknesses to protect
- [ ] Set priority monitoring areas
- [ ] Define critical alert thresholds
- [ ] Set up Tavily API for news search
- [ ] Test run to establish baseline

---

## Recipe 5: The Process Documenter Agent

**Best for:** Businesses wanting to systematize and delegate
**Time saved:** 10-15 hours per week (once documented)
**Setup time:** 1 hour per process

```markdown
# Process Documenter Agent

## Task
Convert informal process description into complete SOP (Standard Operating Procedure).

## Input
You provide:
- A video recording (Loom, Zoom, etc.) OR
- A written description of the process OR
- Screenshots with rough notes

## Instructions

### Step 1: Analyze the Input

Watch/read the input and identify:
- What is the overall goal of this process?
- Who is this process for (role, skill level)?
- What tools/systems are used?
- What are the decision points?
- What can go wrong?
- What does success look like?

### Step 2: Write Step-by-Step Instructions

Break the process into clear steps:
- Number each step (1, 2, 3...)
- Use action verbs (Click, Type, Select)
- Include specific details (exact button names, menu paths)
- Add expected outcomes ("You should see...")
- Note time estimates for each step

### Step 3: Create Supporting Materials

**Checklist Version:**
- Bulleted list of key checkpoints
- No explanations, just reminders
- Use for quick reference during task

**FAQ Section:**
- Common questions about this process
- Troubleshooting steps
- Who to ask if stuck

**Video/Visual References:**
- Timestamps from original video
- Screenshot suggestions (describe what to capture)

### Step 4: Format for Different Audiences

**New Hire Version:**
- More detailed
- Explain why, not just what
- Include context and background

**Quick Reference Version:**
- Just steps and checklists
- For experienced team members
- One page max

**Manager Version:**
- Overview of entire process
- Quality standards
- How to verify it was done correctly

## Context
This SOP is for: [Role, e.g., "Customer Service Rep"]

Skill level: [Beginner/Intermediate/Advanced]

Tools involved:
- [Tool 1, e.g., "Gmail"]
- [Tool 2, e.g., "CRM system"]
- [Tool 3, e.g., "Internal database"]

Common mistakes to address:
- [Mistake 1 and how to avoid]
- [Mistake 2 and how to avoid]

Quality standards:
- [Standard 1]
- [Standard 2]

Who to contact if questions:
- [Name/Role] for [type of question]
- [Name/Role] for [type of question]

## Tools
- Video analysis: Manual review
- SOP template: Markdown format
- Storage: `sops/[category]/[process_name].md`

## Output Format
```markdown
# SOP: [Process Name]

## Purpose
[One sentence: What this process accomplishes]

## Scope
[Who does this, when, how often]

## Tools Required
- [Tool 1]
- [Tool 2]
- [Tool 3]

## Estimated Time
[X minutes/hours]

## Prerequisites
- [What needs to be done first]
- [What access/permissions needed]

---

## Step-by-Step Instructions

### Step 1: [Action Name]
**What to do:** [Detailed instructions]
**Expected result:** [What you should see]
**Time estimate:** [X minutes]
**Screenshot:** [Describe what to capture]

### Step 2: [Action Name]
[Same format...]

---

## Quick Reference Checklist
- [ ] [Checkpoint 1]
- [ ] [Checkpoint 2]
- [ ] [Checkpoint 3]
- [ ] [Checkpoint 4]
- [ ] [Checkpoint 5]

---

## FAQ

**Q: [Common question 1]?**
A: [Answer]

**Q: [Common question 2]?**
A: [Answer]

**Q: What if [common problem]?**
A: [Troubleshooting steps]

---

## Quality Check
Before marking complete, verify:
- [ ] [Quality check 1]
- [ ] [Quality check 2]
- [ ] [Quality check 3]

---

## Related SOPs
- [Link to related process 1]
- [Link to related process 2]

## Revision History
- [Date]: Created by [Name]
- [Date]: Updated [what changed]
```

## Notes
Original source: [Link to video or description]
SOP location: `sops/[category]/[filename].md`
Next review date: [3-6 months from now]
```

### How to Use This Recipe

1. **Record a video** of yourself doing the task (use Loom — it's free)
2. **Save this recipe** as `documenter.md`
3. **Customize the Context section** with details about the process
4. **Run:** `openclaw run documenter.md`
5. **Review and edit** the output
6. **Save the SOP** and share with your team

### Example Use Cases

- Onboarding new customers
- Processing refunds
- Creating monthly reports
- Handling specific customer complaints
- Preparing proposals
- Conducting quality checks
- Managing inventory
- Scheduling appointments

---

## Next Steps

1. Choose ONE recipe that addresses your biggest pain point
2. Copy the recipe and customize it
3. Test it manually before setting to auto-run
4. Review the output and refine
5. Add to cron once you're happy with results
6. Move on to the next recipe

Remember: Start with one. Get it working. Then add more.

---

*Next: Section 4 — Implementation & Integration Guide*
