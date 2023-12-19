
const loadConfig = async () => {
    const configModule = await import(
      `./config.${process.env.REACT_APP_STAGE}.json`
    );
    return configModule.default;
  };
  
  export const getEnvConfig = async () => {
    return await loadConfig();
  };