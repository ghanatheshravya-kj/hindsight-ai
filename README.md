# Hindsight AI

Build a professional SaaS web application called "MemorySupport" — an AI customer-support platform that remembers each customer's previous issues, environment, attempted solutions, successful solutions, and preferences using persistent AI memory.

IMPORTANT:
This is a real product prototype for an AI customer-support platform. The main differentiator is persistent customer memory.

TECH STACK:

* React
* TypeScript
* Tailwind CSS
* Modern responsive SaaS UI
* Use reusable components
* Use mock data initially
* Do NOT build the backend yet
* Do NOT use Supabase yet
* Keep API integration easy to add later

LAYOUT:

Create a dashboard with a left sidebar containing:

1. Overview
2. Customers
3. Support Chat
4. Hindsight Memory
5. Learning Timeline
6. Analytics

MAIN DASHBOARD:

Show these statistics:

* Total Customers
* Active Conversations
* Memories Stored
* Issues Resolved

CUSTOMER SUPPORT PAGE:

Create a 3-column layout.

LEFT:
Customer list.

Example customers:

* Sarah Wilson
* Alex Johnson
* Michael Chen
* Priya Sharma

CENTER:
Customer support chat.

Show a realistic conversation between the support agent and customer.

Include:

* Message bubbles
* Timestamp
* Typing indicator
* Text input
* Send button
* Attachment button

RIGHT:
"Hindsight Memory" panel.

Show:

Customer Profile

* Customer name
* Customer ID
* Plan
* Environment
* Browser
* Device

Relevant Memories

* Previous issues
* Previous attempted solutions
* Successful solutions
* Failed solutions
* Preferences
* Recurring issues

Example:

Customer:
Sarah Wilson

Environment:
Windows 11
Chrome

Plan:
Enterprise

Preferences:
Prefers step-by-step instructions

Previous Issue:
Dashboard crashes during CSV upload

Attempted Solution:
Clear browser cache

Result:
Successful

MEMORY ACTIVITY:

Create a timeline showing:

Conversation started
↓
Issue identified
↓
Memory recalled
↓
Previous solution identified
↓
Personalized response generated
↓
New interaction stored

LEARNING TIMELINE:

Create a visual timeline showing how the AI becomes more personalized over multiple interactions.

Example:

Interaction 1
Customer reports CSV upload crash

Interaction 2
Customer mentions Windows 11 + Chrome

Interaction 3
Clearing cache successfully fixes issue

Interaction 7
Customer returns with similar issue

Hindsight recalls previous solution

Interaction 12
AI automatically adapts to customer's preference for step-by-step instructions

IMPORTANT DEMO SECTION:

Create a "Without Memory vs With Memory" comparison.

WITHOUT MEMORY:
"Please tell me your operating system and what you have already tried."

WITH HINDSIGHT:
"Welcome back, Sarah. I remember you previously experienced a CSV upload crash on Windows 11 using Chrome, and clearing your browser cache resolved it. Let's try that first."

ANALYTICS PAGE:

Show:

* Memories created
* Memories recalled
* Repeat issues
* Successful solutions
* Average resolution time
* Personalization events

DESIGN:

Make the application look like a modern AI SaaS product.

Use:

* Clean professional dashboard
* Rounded cards
* Subtle shadows
* Good spacing
* Responsive design
* Professional typography
* Clear visual hierarchy
* Memory-related icons
* Chat interface similar to modern AI products

The product should look polished enough for a hackathon demo.

Do not overcomplicate the UI.

Most importantly, make Hindsight Memory visually obvious because persistent memory is the core product feature.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b3e6f1ad-2242-44a9-82aa-a35f8b4cf4d7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
