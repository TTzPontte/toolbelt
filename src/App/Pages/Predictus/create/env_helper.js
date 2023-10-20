function determineEnvironment() {
    const hostname = window.location.hostname;

    if (hostname.includes("ferramentas") && !hostname.includes("playground")) {
        return "prod";
    }
    return "staging"; // Default to staging for all other cases
}

// To use
const env = determineEnvironment();

// Production & Staging URLs (for future usage if needed)
const ProductionURL = "https://ferramentas.pontte.com.br/predictus";
const StagingURLs = [
    "https://playground-ferramentas.pontte.com.br",
    "http://localhost:3000/"
];

console.log(env); // This will print "staging" or "prod" based on the current URL
