# Project Specification: Ultimate667 Platform/Game

**Version:** 2.1
**Date:** April 3, 2025
**Status:** Draft

## 0. Project Overview

* **Project Name:** Ultimate667
* **Development Team:** Turfu
* **Co-Founders:** Olivier Mbombo (Full-Stack Developer), Allan Clemenceau (Full-Stack Developer, UX/UI)
* **Team Mission:** To awake brand equity; create value by developing culture.

## 1. Introduction & Vision

* **Vision Statement:** To offer users on PC and Mobile platforms a unique way to experience and interact with current events ("actuality") through the lens of underground culture, music (specifically related to Freeze Corleone/667), and gamification.
* **Narrative Approach:** The platform will employ a subversive and satirical narrative style, directly referencing and commenting on specific cultural elements, current events, and figures relevant to the target context (e.g., French politics, Gilets Jaunes, Banlieues, as shown in mockups). Tone is edgy and aimed at engaging the target audience authentically.
* **Core Concept:** An interactive platform/game evolving from the initial 2020 web prototype. It blends elements of RPGs (character creation/progression), turn-based fighting games (using music as attacks), User Generated Content (UGC), AI-driven narrative elements, and real-world context (locations, cultural references).
* **Ambition/Scale:** Aim to achieve significant user scale (targeting 25 million to 100 million users long-term) and become a culturally relevant interactive experience.

## 2. Project History & Milestones

* **Initial Launch & Traction:** The first iteration, a web game/prototype, launched in November 2020. It demonstrated significant organic interest, achieving 40,000 users in the first week, supported by key artist promotions (Freeze Corleone, Zuukou Mayzie, SHONEGFG) and press coverage (Booska-P).
* **Accumulated User Base:** This original website iteration accumulated 51,000 unique users/visitors as of October 2023, validating the core concept's appeal.
* **Funding:** The project secured investment totaling 3.2 million (2M in 2021, 1.2M in 2023) to fund further development based on the initial success.
* **Evolution to Current Concept:** The project has evolved significantly from the prototype, expanding the scope to include robust UGC features, AI scenario generation, multiplayer, and a more polished experience targeting PC and Mobile platforms. *Note: Previous references to separate "Rapsodie," "Yadeck," or "Oktogone" launches have been clarified as inaccurate; focus is on the evolution from the single initial Ultimate667 launch.*

## 3. Goals

* **Platform Development:** Deliver a high-quality, robust, and scalable application for PC and Mobile platforms using React (Frontend) and Deno (Backend).
* **Gameplay Engagement:** Create engaging core gameplay loops combining exploration, choice-driven narrative, character interaction/creation, and turn-based combat.
* **Cultural Integration:** Authentically integrate underground culture, music (especially rap/hip-hop), and relevant current events into the narrative and game mechanics.
* **User Generated Content (UGC):** Implement features allowing users to create, share, and use custom rapper characters.
* **AI Scenario Generation:** Utilize AI to partially generate narrative content, enhancing replayability and content diversity between key story points.
* **Artist Collaboration:** Foster relationships with artists for content and promotion (Note: Automated retribution system removed from scope).
* **Marketing & Launch:** Execute a targeted marketing campaign leveraging artist endorsements and the existing fanbase for a successful launch.
* **User Scale Target:** Design the architecture and systems to support scaling towards tens or hundreds of millions of users.
* **Post-Launch Support:** Provide ongoing support and maintain user engagement through regular content updates (minimum monthly).
* **Multiplayer Implementation:** Integrate co-operative multiplayer features, including chat and emojis.

## 4. Target Audience

* **Primary Groups:**
    * Fans of Freeze Corleone, the 667 collective, and associated underground/alternative rap artists.
    * Players of RPGs, turn-based strategy/fighting games, and narrative-driven games.
    * Mobile and PC gamers interested in unique concepts.
* **Secondary Groups:**
    * Enthusiasts of underground culture, hip-hop, and alternative media.
    * Creators and consumers of User Generated Content.
    * Individuals interested in satirical social/political commentary through interactive media.

## 5. Core Features

### 5.1. Core Gameplay Loop

1.  **Select Rapper:** User chooses an official rapper or a community-created one (UGC).
2.  **Select Stage/Mission:** User selects a location/stage from the world map interface.
3.  **Mission Briefing:** User is presented with a scenario introduction screen setting the context, tone (images, text, keywords), and objective. User clicks a button (e.g., "Save Paris!") to begin.
4.  **Gameplay (Narrative & Combat):** User progresses through the mission by making narrative choices and engaging in turn-based combat encounters.
5.  **Completion/Unlocking:** Based on choices and combat outcomes, the user completes the mission and potentially unlocks new content (locations, characters, items, story progression).

### 5.2. User Account & Profile System

* **Requirements:**
    * User registration (Email/Password, potentially social logins TBD).
    * Secure login/authentication.
    * User profile storing progress (completed missions, unlocked content), stats, created characters (UGC), inventory (TBD).

### 5.3. Character System

* **Official Rappers:** A roster of curated characters representing real artists or archetypes will be provided.
* **User-Generated Content (UGC):**
    * **Creation Interface:** A multi-step UI allows users to create custom rapper characters.
        * *Step 1 (Ref Mockup ID: ...630a1790):* Input Name, select Location (map), upload Photos (front/back), write Backstory, add Social Media Links.
        * *Step 2 (Ref Mockup ID: ...ad750a5e):* Define Characteristics/Stats (assign numerical values, potentially add/name custom stats, preview on radar chart) and define Attacks (set Name, Type [e.g., Stun], Cooldown [Tours], link specific audio clip from YouTube/SoundCloud with start/end times, associate visual GIF animation). A limit applies to the number of attacks per character (e.g., 5).
    * **Stat Definition:** Characters have displayed stats (e.g., Lean, Ego, Palindrome) that influence underlying hidden stats (e.g., Strength, Speed, Luck, Intelligence). *The specific mapping mechanism between displayed and hidden stats needs to be designed.*
    * *Note: UGC Rapper Validation System is removed from scope.* Created characters are presumably usable immediately, subject to potential future reporting mechanisms if issues arise.
* **Selection Screen UI:** Visual grid display for choosing official or UGC rappers, including search functionality (Ref Mockup ID: ...303fb0d6).
* **Profile Screen UI:** Detailed view for selected rappers showing stats (radar chart), attacks list, localisation map, history/bio (Ref Mockup ID: ...58602ca9).
* **Progression:** System for character advancement (e.g., leveling up, gaining new skills/attacks) - *Details TBD*.

### 5.4. Narrative & AI Scenario Generation

* **Mission Structure:** Gameplay organized into discrete missions or scenarios accessed via the world map.
* **Mission Briefing Screen:** Introduction screen using text and relevant/provocative imagery to set the context, tone, and objective before gameplay starts (Ref Mockup ID: ...347af942).
* **AI Role:** Utilize AI techniques (Specific models/methods TBD) to partially generate narrative text or scenario variations between predefined key story beats, enhancing variety. *Requires definition of constraints and integration method.*
* **Choice System:** Missions include points where the user makes choices that affect the narrative progression, relationships, or outcomes.

### 5.5. Exploration/Map System

* **Interface:** Pixelated world map displaying selectable mission locations/stages (Ref Mockup ID: ...87a575d0).
* **Interaction:** Clicking a location reveals an info panel with name, image, description.
* **Mission Initiation:** A "More..." button (or similar) on the info panel transitions the user to the Mission Briefing screen for that stage.
* **Controls:** Standard map navigation controls (zoom, pan).

### 5.6. Combat System

* **Mechanic:** Turn-based combat encounters.
* **Attacks:**
    * Based on specific audio clips from rapper soundtracks (linked via YouTube/SoundCloud during UGC creation).
    * Have defined functional types (e.g., "Stun").
    * Have a cooldown period defined in "Tours".
    * Have associated visual GIF animations.
* **Stats Integration:** Character stats (both displayed and hidden) influence combat performance (damage, speed, defense, accuracy, resistance, luck, etc.). *Exact formulas TBD.*
* **Balancing Philosophy:** Emphasis is on creating a fun, engaging experience that delivers information/commentary, rather than strict competitive balance.
* **Modes:** Includes Player-vs-Environment (PvE) encounters within missions and Co-operative Multiplayer missions.

### 5.7. Content Integration

* **Music:** Integral to the experience, used for attacks, background music (BGM), and thematic reinforcement. Requires system for managing and playing audio clips (including potentially streaming from external sources like YouTube/SoundCloud for UGC attacks - *legal/technical implications TBD*).
* **Video:** Potential for integrating video content within narrative segments or briefings.

### 5.8. Inventory/Collection System

* **Purpose:** A system for users to track potentially collected items, characters unlocked, skills learned, etc. *Specifics TBD based on progression design.*

### 5.9. Multiplayer

* **Mode:** Co-operative (Co-op) missions allowing multiple players to tackle a scenario together.
* **Communication:** Real-time in-game text chat system with support for emojis.
* *Requires definition of session management, synchronization, mission design for co-op.*

### 5.10. Multilingual Support

* The application architecture should be designed to facilitate future localization into multiple languages. Text content should be externalized. *(Status: To Be Drafted / Post-MVP?)*

## 6. Architecture Overview

### 6.1. Frontend (React)

* **Target Platforms:**
    * **PC:** Web application accessed via browser (potentially packaged with Electron/Tauri later TBD).
    * **Mobile:** Progressive Web App (PWA) or separate React Native build. *Decision required.*
* **Core Library:** React.
* **Key Libraries/Considerations:**
    * State Management (e.g., Redux Toolkit, Zustand, Jotai - TBD).
    * Routing (e.g., React Router).
    * UI Component Library / Styling (e.g., Tailwind CSS, Material UI, custom components - TBD, must match mockup aesthetic).
    * Animation Libraries (e.g., Framer Motion).
    * Map Library (e.g., Leaflet, Mapbox GL JS - adapted for pixel style).
    * Audio/Video Playback.
    * WebSocket client for real-time features (Chat, Multiplayer).

### 6.2. Backend (Deno)

* **Runtime:** Deno.
* **API Design:** RESTful API or GraphQL (TBD) for communication between frontend and backend.
* **Real-time Communication:** WebSocket server for handling multiplayer state synchronization and chat.
* **Responsibilities:**
    * User Authentication & Authorization.
    * Database Interaction (CRUD operations for users, UGC, game state).
    * Game Logic Execution (Combat calculations, choice processing, progression).
    * Serving data to the frontend.
    * Interfacing with AI Scenario Generation component/service.
* **Key Frameworks/Libraries:**
    * Web Framework (e.g., Oak, Opine, Deno std/http).
    * Database Client / ORM (e.g., Deno Postgres, DenoDB - TBD based on DB choice).
    * WebSocket library (native Deno or library TBD).

### 6.3. Database

* **Choice TBD:** Options include PostgreSQL (relational), MongoDB (NoSQL). Choice depends on data structure complexity and query patterns.
* **Schema Design:** Needs to accommodate user accounts, profiles, UGC (rappers, attacks, stats, backstory, images, links), game state, mission progress, potentially inventory.

### 6.4. AI Component

* **Interface:** Likely an external service or internal module with a defined API accessed by the Deno backend.
* **Technology:** Specific models/services TBD based on requirements for partial narrative generation.

### 6.5. Deployment & Infrastructure

* **Cloud Provider TBD:** AWS, Google Cloud, Azure, Vercel, etc.
* **Containerization:** Docker likely used for packaging backend services.
* **Deployment Strategy:** CI/CD pipeline (e.g., GitHub Actions, GitLab CI) for automated testing and deployment.
* **Infrastructure Needs:** Compute instances/serverless functions for backend, managed database, potential hosting for frontend assets (CDN), WebSocket handling infrastructure.

## 7. Marketing & Go-To-Market Strategy

* **Key Levers:** Leverage relationships with collaborating artists and the existing fanbase generated by the prototype.
* **Campaign Phases:** Build anticipation pre-launch (trailers, social media via artists), followed by launch events and promotions.
* **Messaging Focus:** Highlight the unique blend of gaming, underground culture, music, satire, UGC, and multiplayer co-op.

## 8. Project Phases & High-Level Timeline

* **Phases:** Concept (Done) -> Pre-production (Done ~Oct 2023) -> Production (Current?) -> Pre-launch -> Launch -> Support.
* **Timeline:** *Requires validation based on current project status and resource allocation.*

## 9. Target Platforms

* **PC:** Windows required. macOS / Linux support TBD. (Web browser access initially).
* **Mobile:** iOS & Android. Specific minimum OS versions TBD. (PWA or React Native approach TBD).

## 10. Non-Functional Requirements

* **Performance:** Responsive UI, fast load times, smooth animations, efficient combat calculations.
* **Scalability:** Architecture must support growth towards millions of concurrent users (database, backend services, WebSockets).
* **Security:** Secure authentication, protection against common web vulnerabilities (XSS, CSRF, SQLi), API rate limiting/security, secure handling of user data, protection against game exploits/cheating. Smart contract audits *not required* as Web3 removed.
* **Maintainability:** Clean, well-documented code (React & Deno), modular architecture.
* **Reliability:** High uptime for backend services and database. Graceful handling of errors.
* **UX/UI Consistency:** Adherence to the visual style and interaction patterns shown in mockups across all platforms.
* **Accessibility:** Consideration for WCAG guidelines TBD to ensure usability for people with disabilities.
* **UGC Risks:** *Note: Scope explicitly excludes moderation tools. This presents significant risks regarding potentially offensive or illegal user-generated names, images, backstories, and linked content. A mechanism for users to report content should be considered for post-launch iteration.*

## 11. Monetization

* **Status:** Free-to-Play.
* *Note: All monetization features (subscriptions, cosmetics, ads, etc.) have been explicitly removed from the current scope.* Future monetization strategies TBD post-launch.

## 12. Open Questions / Areas for Final Definition

* **Stat System Design:** Finalize the list of displayed and hidden stats and design the mapping/influence mechanism between them.
* **Combat Mechanics:** Define specific effects of attack types (Stun, etc.). Confirm detailed turn flow. Define formulas for stat influence on combat.
* **AI Scenario Generation:** Choose specific AI models/techniques. Define API/integration. Define content constraints.
* **Multiplayer Details:** Design co-op mission structure, lobby/matchmaking system, state synchronization method, chat filtering (basic).
* **Timeline Validation:** Confirm current project phase and establish realistic target dates for milestones/launch.
* **Platform Specifics:** Finalize PC OS support, Mobile OS versions, specific browser support list. Decide between PWA / React Native for mobile.
* **Content Update Plan:** Detail the nature and cadence of post-launch monthly content updates.
* **UGC Risk Mitigation:** Re-evaluate if minimal reporting/flagging features are needed for launch despite removal of moderation tools.
* **Audio Clip Handling:** Clarify technical and legal aspects of using YouTube/SoundCloud clips for UGC attacks. Determine fallback if external linking is problematic.
* **Progression System:** Design the specifics of character leveling, skill/attack acquisition.
* **Inventory System:** Define specific items/collectibles to be tracked.