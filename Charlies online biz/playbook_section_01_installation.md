# Section 1: What is OpenClaw & How to Install It

## OpenClaw in Plain English

OpenClaw is like having a team of interns who never sleep, never complain, and work for pennies. It's software that runs AI agents — autonomous programs that can research, write, code, analyze data, and make decisions on your behalf.

Think of it this way: ChatGPT is a calculator. OpenClaw is a factory full of calculators that can run themselves.

### What OpenClaw Actually Does

Without getting technical, here's what OpenClaw lets you do:

**Automate repetitive tasks:** Instead of spending 2 hours every morning answering the same customer emails, you teach an agent your responses once, and it handles them forever.

**Research at scale:** Need to check what 50 competitors are doing? An agent can visit all their websites, extract the key info, and give you a summary in minutes instead of days.

**Generate content:** Draft social media posts, blog articles, email newsletters — all on a schedule you set, without you touching a keyboard.

**Monitor and alert:** Watch for specific things (price drops, news mentions, competitor moves) and ping you when something important happens.

**Build systems:** Connect different tools together so data flows automatically. New lead comes in → agent researches them → drafts personalized email → adds to CRM → schedules follow-up.

### Why Businesses Need This Now

Labor costs are up. Attention spans are down. Customers expect instant responses. Competitors are moving faster.

AI agents aren't the future — they're the present. Businesses using them are saving 10-20 hours per week on repetitive work. That's 500-1000 hours per year. At $50/hour value, that's $25,000-$50,000 in reclaimed time.

The businesses that figure this out now get a 2-3 year head start. The ones that wait will be playing catch-up.

### What OpenClaw Is NOT

Let's clear up confusion:

**NOT a chatbot:** Chatbots respond to users. Agents proactively do work.

**NOT just ChatGPT:** It can use multiple AI models and connects to real tools and data.

**NOT magic:** You still need to teach it what to do. Garbage in, garbage out.

**NOT sentient:** It's a tool. A powerful one, but still a tool you control.

**NOT expensive:** Compared to hiring humans, it's ridiculously cheap.

## Installation Guide

### Requirements

Before you start, you need:

- A computer (Windows, Mac, or Linux)
- Internet connection
- About 30 minutes
- Zero coding knowledge (seriously)

### Step 1: Install Node.js

OpenClaw runs on Node.js. Here's how to get it:

**Windows:**
1. Go to nodejs.org
2. Click the big green "LTS" button
3. Download and run the installer
4. Click "Next" through everything
5. Restart your computer

**Mac:**
1. Open Terminal (Cmd+Space, type "Terminal")
2. Type: `brew install node`
3. If you don't have Homebrew, install it first from brew.sh

**Verify it worked:**
Open your terminal/command prompt and type:
```
node --version
```
You should see a version number like "v20.10.0". If you do, you're good.

### Step 2: Install OpenClaw

Open your terminal/command prompt and type:

```
npm install -g openclaw
```

This downloads and installs OpenClaw globally on your computer. It'll take a minute or two.

**Verify it worked:**
Type:
```
openclaw --version
```

You should see a version number. If you get an error, try closing and reopening your terminal.

### Step 3: Create Your Workspace

Your workspace is where all your agents and projects live. Create a folder anywhere on your computer. For example:

**Windows:**
```
C:\Users\YourName\openclaw-workspace
```

**Mac/Linux:**
```
/Users/YourName/openclaw-workspace
```

Open your terminal, navigate to that folder:
```
cd path/to/your/workspace
```

Then initialize OpenClaw:
```
openclaw init
```

This creates the basic structure and configuration files.

### Step 4: Configure API Keys

OpenClaw needs API keys to use AI models. Here's what you need:

**OpenAI API Key (Required):**
1. Go to platform.openai.com
2. Create an account (if you don't have one)
3. Go to "API Keys" in the sidebar
4. Click "Create new secret key"
5. Copy the key (you won't see it again)

**Set the key in OpenClaw:**
Create a file called `.env` in your workspace folder:

```
OPENAI_API_KEY=your-key-here
```

Replace "your-key-here" with the actual key you copied.

**Optional but Recommended:**

**Tavily API Key (for web research):**
1. Go to tavily.com
2. Sign up for free
3. Get your API key
4. Add to `.env`: `TAVILY_API_KEY=your-key`

**Google API Key (for search):**
1. Go to console.cloud.google.com
2. Create a project
3. Enable Custom Search API
4. Get your API key
5. Add to `.env`: `GOOGLE_API_KEY=your-key`

### Step 5: Test Your Setup

Create a simple test file. In your workspace, create `test.md`:

```markdown
# Test Task

Research 3 ways small businesses can use AI to save time.
Write a 2-sentence summary of each.
```

Run it:
```
openclaw run test.md
```

If everything is set up right, you'll see the AI thinking and then outputting results. If you get errors, check:

- Is your API key correct?
- Do you have credits on your OpenAI account?
- Is your `.env` file in the right folder?

### Understanding Costs

Running agents costs money, but it's cheap:

**OpenAI GPT-4o-mini:** About $0.15 per 1,000 pages of text processed  
**Typical agent run:** $0.01-$0.10 per task  
**Monthly budget for heavy use:** $10-50  
**Compare to:** $25-100/hour for a human

You control costs by:
- Using cheaper models for simple tasks
- Setting token limits in your agent configs
- Being specific in your instructions (reduces back-and-forth)

### Your First Real Agent

Let's create something useful. Create `daily_summary.md`:

```markdown
# Daily Business Summary Agent

## Task
Every morning, search for news about [your industry]. 
Find 3 interesting articles.
Summarize each in 2 sentences.
Save to `daily_news.md` with today's date.

## Schedule
Run at 8:00 AM every weekday

## Output Format
```
# News Summary - [Date]

## Article 1: [Title]
[Summary]
[Link]

## Article 2: [Title]
[Summary]
[Link]

## Article 3: [Title]
[Summary]
[Link]
```
```

Run it manually first:
```
openclaw run daily_summary.md
```

Then set it to run automatically:
```
openclaw cron add daily_summary.md --schedule "0 8 * * 1-5"
```

Now you get a news briefing every weekday morning without touching a computer.

### Common First-Time Issues

**"command not found" error:**
- On Mac/Linux: You may need to add npm global packages to your PATH
- Try: `export PATH="$PATH:$(npm bin -g)`
- Add that line to your `.bashrc` or `.zshrc` file

**"API key invalid" error:**
- Double-check you copied the full key
- Make sure there's no extra spaces
- Verify the `.env` file is in your workspace root

**"out of credits" error:**
- Add a payment method to your OpenAI account
- Even $5 gets you hundreds of agent runs
- Set up billing alerts so you don't get surprised

**Agent runs but produces garbage:**
- Be more specific in your instructions
- Give examples of the output format you want
- Break complex tasks into smaller steps

### Security Best Practices

Your API keys are like passwords. Protect them:

- Never commit `.env` files to public GitHub repos
- Don't share your keys in screenshots or videos
- Rotate keys periodically (generate new ones, delete old)
- Use different keys for different projects if possible
- Enable 2FA on your OpenAI account

### Next Steps

You now have OpenClaw installed and working. In the next sections, we'll cover:

- Section 2: Specific use cases for your type of business
- Section 3: Ready-to-use agent recipes you can deploy immediately
- Section 4: How to integrate agents with your existing tools
- Section 5: Measuring the time and money you're saving

But first, verify your installation worked. Run that test agent. Make sure you see output. Once you confirm it works, you're ready to build real automations.

## Quick Reference

**Start OpenClaw:** `openclaw init`  
**Run a task:** `openclaw run filename.md`  
**Check version:** `openclaw --version`  
**View help:** `openclaw --help`  
**List cron jobs:** `openclaw cron list`  
**Add scheduled task:** `openclaw cron add filename.md --schedule "0 9 * * *"`  

**Schedule Format (Cron):**
```
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, 0=Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)

Examples:
0 9 * * * = Every day at 9:00 AM
0 */2 * * * = Every 2 hours
0 9 * * 1 = Every Monday at 9:00 AM
```

---

*Next: Section 2 — Use Cases for Your Existing Business*
