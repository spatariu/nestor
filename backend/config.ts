interface Config {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable?: string;
  };
}

const config: Config = {
  development: {
    username: "root",
    password: "nestor_july",
    database: "nestor",
    host: "db",
    dialect: "mysql",
  },
  // Add other environments as needed
};

export default config;
