# NavLabs Multi-User Chat Demo
### Playwright Browser Context Demo App — Naveen AutomationLabs

A lightweight Node.js chat app built specifically for teaching Playwright multi-user scenarios using `browser.newContext()`.

---

## Quick Start

### 1. Start the server
```bash
node server.js
# Server runs at http://localhost:3000
```

### 2. Open multiple tabs manually (manual demo)
Open `http://localhost:3000` in multiple browser tabs.  
Each tab = a different user. Join with different usernames and chat.

### 3. Run Playwright tests
```bash
npm install
npx playwright install chromium
npx playwright test
```

---

## What this teaches

| Concept | How it's shown |
|---|---|
| `browser.newContext()` | Each user gets their own isolated context |
| Context isolation | Separate sessions, no shared state between users |
| Parallel contexts | 3 users active simultaneously in one test |
| Real-time sync | All contexts see each other's messages via polling |
| Server state shared | Username conflict test shows server is the single source of truth |

---

## REST API

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/join` | `{ username }` | Join the chat, get assigned a color |
| POST | `/api/send` | `{ username, text }` | Send a message |
| GET | `/api/messages?since=<ts>` | — | Poll new messages + online users |
| POST | `/api/leave` | `{ username }` | Leave the chat |
| POST | `/api/reset` | — | Clear all users and messages |

---

## Test IDs (data-testid)

| Element | Selector |
|---|---|
| Username input | `[data-testid="username-input"]` |
| Join button | `[data-testid="join-btn"]` |
| Your name badge | `[data-testid="you-badge"]` |
| Message input | `[data-testid="message-input"]` |
| Send button | `[data-testid="send-btn"]` |
| Leave button | `[data-testid="leave-btn"]` |
| Messages area | `[data-testid="messages-area"]` |
| Individual message | `[data-testid="chat-message"][data-user="alice"]` |
| Message text | `[data-testid="message-text"]` |
| Online user item | `[data-testid="online-user"][data-username="alice"]` |
| System message | `[data-testid="system-message"]` |

---

## Test Scenarios Covered

1. **Two users join and chat** — basic cross-context messaging
2. **Three users online** — multi-user simultaneous connection  
3. **Duplicate username rejected** — server-side validation
4. **User leaves, disappears from list** — real-time user list sync

---

*Built for Naveen AutomationLabs 2026 Playwright Batch (G1)*  
*Driven by Code, Defined by Quality*
