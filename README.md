# Memory on Trial — photographic eyewitness-memory pilot

Static HTML/CSS/JavaScript browser experiment for PSYC 402. Open `index.html` or deploy the contents of this folder to GitHub Pages (`main` / root).

## Design
Participants view eight staged campus-incident images (5 seconds each), complete a 30-second backward-counting distractor, receive a randomly assigned accurate, misleading, or misleading-plus-corrected witness report, choose from a six-person lineup (or “suspect not present”), rate identification confidence, answer eight event-memory questions with confidence, and download session and item-level CSVs.

**Important limitations:** The imagery is AI-generated and cropped from illustrative concept boards; some scene and lineup facial features are not perfectly consistent. The lineup's nominal target is `face-1.jpg`, but it is **not validated** as a match to the staged event. Do not interpret lineup accuracy as a scientifically valid measure until you replace imagery with internally consistent, standardized images and pilot-test the lineup. The application is a working **pilot prototype**, not an approved participant-research platform. The condition assignment is random, not balanced across sessions. Corrections explicitly reveal some answers, which is intentional for the correction manipulation but needs instructor review. A correction may influence responses without demonstrating genuine memory restoration. No data is transmitted: CSVs download locally. Integrate instructor-approved DataPipe (or another approved collection method) before formal data collection. Do not upload participant data to a public repository. Do not collect names/emails in the behavioral dataset.

## Files
- `index.html` website structure
- `styles.css` responsive layout
- `script.js` task logic, randomization, scoring, CSV
- `images/scene-1.jpg` … `scene-8.jpg` staged event images
- `images/face-1.jpg` … `face-6.jpg` lineup portraits

## GitHub update
Upload all three code files, README, and `images/` contents to the existing public repository, preserving the folder structure. Commit, wait for GitHub Pages to deploy, and test the entire experience and both CSV downloads. Do not delete prior commit history.

## Research planning
Primary exploratory outcome: endorsement of misinformation lures (4 questions). Secondary: event accuracy and lineup selection/confidence. Check image consistency, source-monitoring confounds, lineup fairness, question wording, sampling and sample size with the instructor before data collection. Cite verified scientific sources in the final documentation and presentation.

## Version 2 notes (2026-11-18)
Replace index.html, styles.css and script.js in repository root. Keep existing scene-1.jpg through scene-8.jpg and face-1.jpg through face-6.jpg in repository root. Do not create an images/ folder. No other assets needed.

Three randomized conditions: accurate report (control), misleading report, misleading report plus generic correction. Timed photographs (8 × 15s), 90s backward-7 task, 60s report, 45s interference task, lineup, 12 event questions (10s minimum each), 6 source questions (10s minimum each). Typical completion ~9–11 minutes, depending on lineup and reading time. Timing must be pilot-tested.

Important: The 8 original event questions retain the original project's assumed answer key; validate each against the actual photographs. The 4 new difficult items test whether participants reject details not established by photographs; do not claim they measure fine-grained visual recall. The six source items have condition-specific expected answers, but source attribution is an exploratory measure. Face-1 is treated as the target only if that portrait actually matches the perpetrator; validate the lineup and avoid research claims without validation.

Responses are only downloadable CSVs. No DataPipe, server, analytics, or automatic collection is integrated. Instructor approval is required for research and any data-collection workflow. Do not commit CSV participant data to public GitHub.
