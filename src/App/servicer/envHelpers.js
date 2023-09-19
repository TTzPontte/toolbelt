export const getEnvironment = () =>
    window.location.hostname === "localhost" ? "dev" : "prod";
