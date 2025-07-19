export const googleProblems = [
  {
    id: "g-0",
    title: "1. Autonomous Cloud De-bloat",
    description:
      "Deploy organisms that continuously evolve GCP services to eliminate code redundancy and optimize resource allocation in real-time, reducing operational costs.",
  },
  {
    id: "g-1",
    title: "2. Antifragile Ad Infrastructure",
    description:
      "An ad-serving platform that strengthens itself against fraud and flash traffic, learning from attacks to become more resilient and efficient.",
  },
  {
    id: "g-2",
    title: "3. Self-Healing Android OS",
    description:
      "A version of Android where core services are living organisms that can detect, patch, and recover from vulnerabilities without requiring user-initiated updates.",
  },
  {
    id: "g-3",
    title: "4. Quantum-Proof Workspace",
    description:
      "Upgrade Google Workspace with `qauth_signature` genes, providing quantum-resistant security for all data-in-transit and at-rest, future-proofing against next-gen threats.",
  },
  {
    id: "g-4",
    title: "5. Emergent Search Algorithms",
    description:
      "Allow the core search algorithm to evolve based on user intent and information landscape changes, discovering more relevant ranking strategies autonomously.",
  },
  {
    id: "g-5",
    title: "6. True Zero-Trust Networking",
    description:
      "BeyondCorp evolved. A network where every service is an organism with a dynamic immune system, continuously re-evaluating trust based on behavior, not just credentials.",
  },
  {
    id: "g-6",
    title: "7. Generative Codebase Migration",
    description:
      "Utilize the `Converter` to autonomously refactor and migrate legacy systems (e.g., older ad-tech stacks) into efficient, modular `dnaorganism`s.",
  },
  {
    id: "g-7",
    title: "8. Hyper-Personalized AI",
    description:
      "A Google Assistant powered by a Genomic Digital Twin, offering truly proactive and context-aware assistance based on a deep, causal understanding of the user.",
  },
  {
    id: "g-8",
    title: "9. Self-Optimizing Supply Chains",
    description:
      "Manage hardware logistics (e.g., server components, Pixel phones) with an organism that adapts to disruptions and optimizes for efficiency in real-time.",
  },
  {
    id: "g-9",
    title: "10. AI-Driven Ethical Governance",
    description:
      "Deploy AI agents that continuously audit other AI systems for bias and value alignment, with the ability to propose and implement corrective mutations.",
  },
]

export const futureProjects = [
  {
    id: "f-0",
    title: "1. The Global Thought Engine",
    description:
      "A decentralized network for monetizing cognition, connecting minds to solve humanity's greatest challenges.",
  },
  {
    id: "f-1",
    title: "2. Genomic Digital Twin OS",
    description:
      "The core platform for personalized health, finance, and life automation, all driven by your living digital self.",
  },
  {
    id: "f-2",
    title: "3. The SH1FT Developer Platform",
    description:
      "The 'Code Arena' and AI Suite for building, evolving, and deploying living software in the new creator economy.",
  },
  {
    id: "f-3",
    title: "4. MC3 Conferencing",
    description:
      "Multi-Modal, Multi-Model Collaborative Conferencing that transcends video calls into shared cognitive spaces.",
  },
  {
    id: "f-4",
    title: "5. Personalized Wealth OS",
    description:
      "A financial cognitive overlay that secures assets and automates wealth development with genomic precision.",
  },
  {
    id: "f-5",
    title: "6. Symbiotic Health Platform",
    description:
      "A proactive, predictive health system that evolves with you, providing therapeutic guidance and personalized wellness.",
  },
  {
    id: "f-6",
    title: "7. The `iCRISPR` Editor",
    description: "The cognitive symbiote for developers, enabling safe and intuitive gene-splicing for code organisms.",
  },
  {
    id: "f-7",
    title: "8. The `Converter` Engine",
    description:
      "The metabolic engine designed to ingest and transform the world's legacy code into the DNA-Lang paradigm.",
  },
  {
    id: "f-8",
    title: "9. Gene-Pull & Pods",
    description: "The foundational library and habitat system for the entire ecosystem of digital life.",
  },
  {
    id: "f-9",
    title: "10. Emergent Swarm Consciousness",
    description:
      "Research into multi-agent systems that develop collective intelligence to solve problems beyond any single agent's capacity.",
  },
]

export const codeSnippets = {
  splashAnimation: {
    name: "Splash Screen Animation",
    code: `function animateSplash() {
    sCtx.clearRect(0, 0, screenWidth, screenHeight);
    frame++;
    drawFabric(sCtx, 0.2);
    if (animationState === 'raining' || animationState === 'gathering') {
        rainParticles.forEach(p => { p.update(); p.draw(sCtx); });
    } else if (animationState === 'morphing' || animationState === 'helix') {
        const rotation = frame * 0.003;
        helixParticles.forEach((p, i) => {
            if (animationState === 'morphing') p.morph();
            else p.update();
            p.draw(sCtx, rotation);
        });
    }
    if (splashScreen.style.opacity !== '0') {
        requestAnimationFrame(animateSplash);
    }}`,
  },
  cardGenerator: {
    name: "Project Card Generator",
    code: `function createCard(item, type, index) {
    const card = document.createElement('div');
    card.className = 'card-bg p-6 rounded-2xl';
    card.id = type + '-' + index;
    const useCaseButtonText = type === 'google' ? '✨ Generate Use Case' : '✨ Envision This Future';
    card.innerHTML = \`
        <div class="flex-grow">
            <h3 class="text-xl font-bold mb-2">\${item.title}</h3>
            <p class="text-gray-400 text-sm">\${item.description}</p>
        </div>
        <div class="mt-4 space-y-2">
            <button class="gemini-button w-full justify-center use-case-btn">\${useCaseButtonText}</button>
            <button class="gemini-button w-full justify-center evolve-btn" style="background-color: rgba(15, 157, 88, 0.2); border-color: rgba(15, 157, 88, 0.5);">✨ Evolve Idea</button>
        </div>
    \`;
    card.querySelector('.use-case-btn').addEventListener('click', (e) => handleGeminiButtonClick(e, item, type));
    card.querySelector('.evolve-btn').addEventListener('click', (e) => handleEvolveClick(e, item, type, index));
    return card;}`,
  },
  personaGenerator: {
    name: "Persona Generator API Call",
    code: `async function handlePersonaGeneration() {
    const keywords = personaInput.value;
    if (!keywords.trim()) return;
    personaLoader.style.display = 'block';
    personaOutput.style.display = 'none';
    personaButton.disabled = true;
    const prompt = \`Based on the user-provided keywords... \`; // Truncated for brevity
    const schema = { /* Schema definition */ };
    const responseText = await callGeminiAPI(prompt, schema);
    try {
        const persona = JSON.parse(responseText);
        // ... update UI with persona details
    } catch (e) {
        // ... handle error
    } finally {
        personaLoader.style.display = 'none';
        personaOutput.style.display = 'block';
        personaButton.disabled = false;
    }}`,
  },
}
