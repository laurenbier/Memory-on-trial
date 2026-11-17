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
