export interface Config {
  [key: string]: {
    username: string;
    password: string | null;
    database: string;
    host: string;
    use_env_variable?: string;
  };
}
