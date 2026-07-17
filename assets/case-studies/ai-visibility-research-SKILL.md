---
name: ai-visibility-research
description: Run an AI visibility (AEO/GEO) and SEO research workflow for any professional services firm's service line page. Trigger this whenever the user shares a service page URL (law, accounting, financial advisory, consulting, or similar) and asks for AI visibility research, AEO/GEO research, "how do we get cited by AI", or an SEO audit of a practice area. Also trigger on phrases like "run the AI visibility workflow on this page" or "audit this service page." The skill identifies the firm from the URL, audits the page and linked practitioner bios, generates a list of AI-assistant queries to run, conducts parallel live web research to identify competitors and citation patterns, synthesizes findings into a discussion with follow-up questions, and, after the user's approval, builds a formatted Word doc and an optional slide outline.
---

# AI Visibility & SEO Research Workflow

This skill audits how a professional services firm shows up (or doesn't) in AI-generated answers for a given service line, and produces a research report with prioritized recommendations. It is a multi-stage, conversational workflow. Do not skip ahead to building deliverables before the user has reviewed findings and confirmed direction.

**Intake:** a single service page URL. Everything else, the firm's identity, its competitors, its industry angle, is derived from that page and the research that follows. Nothing about the firm is hardcoded.

## Workflow Overview

1. **Identify the firm and audit the service page** (plus linked practitioner bios)
2. **Generate AI-assistant queries** for the user to run externally
3. **Run parallel live research** via web search/fetch in this chat
4. **Synthesize findings** and ask the user clarifying questions
5. **Iterate** on strategic paths based on user corrections
6. **On approval**, build the Word doc, then offer a slide outline

Do not collapse these stages. Each stage produces material the next stage depends on, and users often make corrections at the synthesis stage (a practitioner's specialty doesn't match what the AI says, a page is being renamed, a competitor was misidentified) that change the final recommendations.

---

## Stage 1: Identify the Firm and Audit the Service Page

Given a service page URL:

1. `web_fetch` the page.
2. From the page, identify: the firm's name, the type of firm (CPA, law, financial advisory, consulting, etc.), the specific service line, and its general market (industry vertical, geography, size of client served).
3. Identify all named practitioners on the page (Key Contacts section, body mentions, etc.).
4. `web_fetch` each linked practitioner bio page, always, even if the user didn't name specific people. Practitioner bios are where meta description problems tend to live.
5. For the service page and each bio, note:
   - **Meta title and meta description**, the primary AI indexing signal; flag generic, mismatched, or overly compliance-focused descriptions
   - **H1 and body copy alignment**, does the page's actual content match its meta description?
   - **FAQ presence**, is there an FAQ block, and does it appear to use FAQPage schema?
   - **Key Contacts / named practitioners**, are the right people listed for this page's specialty areas?
   - **Services section on each bio**, is the practitioner linked to the relevant service page(s), or "orphaned" under a generic category?
   - **Internal linking**, does the service page link to practitioner bios and vice versa?
   - **Freshness**, how recent is the "Latest Insights" or related content block?
   - **Typos or copy issues**, anything that would read as a quality signal to AI/search engines
   - **Differentiation section**, does the "why us" content match the audience for this specific service line, or is it generic/mismatched?

Present this audit conversationally in chat, not as a formatted report yet. Tone: direct, prioritized, "here's what's working, here's what's missing."

---

## Stage 2: Generate AI-Assistant Queries

Based on the audit and the firm's identified market, generate 10 to 15 queries the user can run on ChatGPT (or another AI assistant), organized into categories:

- **Referral partner / selection queries**, phrased for the firm's actual category, e.g. "Who handles [X] at a [firm type] in [region]?", "Best firm for [X]?"
- **Practitioner name queries**, one per named practitioner identified in Stage 1
- **Process/topic queries**, "How does [X] work?", definitional or how-to questions a referral partner or prospect might ask
- **Competitive/geographic angle queries**, if the service line has a distinguishing angle (multi-state, industry-specific, a licensing or regulatory niche), look for what makes this firm's positioning unusual relative to others in the same category

Present the list grouped by category, as plain numbered lists ready to copy-paste. Ask the user to run each on ChatGPT and paste the full responses back into the chat (not summaries, this preserves quotable language and citation patterns for the doc).

---

## Stage 3: Parallel Live Research

While waiting for the user's pastes, or after receiving them, run the same or closely equivalent queries using `web_search` and `web_fetch`. This stands in for what a fresh AI session would surface.

- Run searches for the category queries (best firm for X, who handles Y in this region/niche)
- Run searches for each practitioner by name
- Note which competitor firms or pages appear repeatedly, this is the competitive benchmark, and it is discovered here, not assumed in advance
- If a competitor page clearly dominates a category, fetch it and note structurally what it has that the user's page doesn't (dedicated URL, named experts, FAQ, schema, etc.), this becomes part of the "why they win" narrative

Keep this conversational. Don't build tables yet.

---

## Stage 4: Synthesize Findings and Ask Questions

Once both data sources (the user's pastes plus your own live research) are in, synthesize:

- Where the firm appears vs. doesn't, by query type and by platform
- Which practitioners have accurate AI profiles vs. which are invisible or misattributed
- Root causes, trace specific findings back to specific page elements from Stage 1
- Competitive pattern, who owns the category, and structurally why

Then ask the user clarifying questions before going further. Corrections at this stage tend to matter a lot:
- Practitioner specialty boundaries (who actually owns which sub-area)
- Platform attribution (which AI platform a pasted response came from)
- Page rename/restructuring plans that change what recommendations should target
- Whether a finding is a spelling/keyword issue vs. a genuine visibility gap

Do not assume, ask. Don't rush or skip this step even if findings seem clear.

---

## Stage 5: Iterate on Strategic Paths

Once findings are confirmed, discuss strategic paths conversationally before building anything. Typical shape: a quick-win meta description track, a "strengthen the existing service page" track, and a "build a standalone page for the highest-value sub-category" track (modeled on how the dominant competitor structured their page). Look for the equivalent of an under-leveraged, structurally winnable angle, often a geographic, industry, or regulatory niche competitors don't share.

Discuss CTA mechanics if relevant (direct contact vs. a contact form, direct contact tends to suit referral-partner audiences better).

Get explicit confirmation from the user that the direction is right before moving to Stage 6.

---

## Stage 6: Build Deliverables

**Default: build the Word doc only.** After delivering it, offer a slide outline as a next step, don't build both automatically.

### Word Doc

Read the relevant docx-building skill before building, if one is available.

- Cover section using the firm's own brand identity where discoverable from the page (logo colors, if identifiable), otherwise a clean neutral palette, with a small "Research methodology by Angelina Atilano" credit line
- Executive summary with a bottom-line callout box
- Research methodology section
- Query results table (Query | Platform | Firm Cited? | Who Is Cited Instead), color-code Yes/No
- Key findings as numbered sections, each with supporting callout boxes for root causes
- Meta description comparison table (current vs. recommended), only if meta description issues were found
- Strategic paths as sections with impact callouts
- Prioritized recommendations table (# | Action | Effort | Expected Impact)
- Appendix: "How AI Visibility Works", a generic explainer, reusable across any service line
- Footer note with the date, the firm's name, and "Methodology by Angelina Atilano"

Save with a filename pattern like `[Firm]_[ServiceLine]_AI_Visibility_Research.docx`, validate before finalizing, and present it to the user.

### Slide Outline (only if requested after the doc)

Plain-text outline formatted for paste/import into a slide tool:
- Title slide
- The core problem (with the query results table)
- Why the dominant competitor wins (structural breakdown)
- What's missing on the firm's page (numbered gaps)
- One slide per fix, each tied to a specific gap
- The standalone-page or highest-leverage opportunity, if identified
- Recommended path (now / next / ongoing)
- Takeaway slide

Keep slides short and punchy, bullet fragments, not paragraphs.

---

## Notes & Reminders

- Always paraphrase any AI-generated query responses pasted by the user when including them in the doc, don't reproduce them verbatim at length.
- Prefer chat-first iteration over jumping straight to a polished deliverable. The conversation is the research process.
- If the user pastes raw AI responses, treat them as primary research data, they may contain useful direct phrases to reference briefly and paraphrased in the "why competitor wins" narrative.
- This skill is deliberately firm-agnostic. Nothing about a specific company, brand color, or prior project should be hardcoded into it. Every firm-specific detail should come from Stage 1's audit of the actual URL provided.
