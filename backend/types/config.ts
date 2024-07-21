import { Dialect } from 'sequelize';

export interface Config {
  [key: string]: {
    username: string;
    password: string | null;
    database: string;
    host: string;
    dialect: Dialect;
    use_env_variable?: string;
  };
}
