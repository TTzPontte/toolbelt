
class Config {
  env = 'development';

  constants = {
    ENVIROMENT: process.env.REACT_APP_STAGE,

  }; //add env vars here

  constructor(NODE_ENV) {
      this.env = NODE_ENV;
  }

  run = () => {
      return this.constants[this.env]
  }
}
console.log("ENV", process.env.REACT_APP_STAGE)
export const CONFIG = new Config(process.env.REACT_APP_STAGE || 'prod' ).run()
