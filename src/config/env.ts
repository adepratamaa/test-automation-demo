// allowed environment variable names used by the test config
type EnvKey =
  | 'BASE_URL'
  | 'PASSWORD'
  | 'STANDARD_USERNAME'
  | 'LOCKED_OUT_USERNAME'
  | 'PROBLEM_USERNAME'
  | 'PERFORMANCE_GLITCH_USERNAME'
  | 'ERROR_USERNAME'
  | 'VISUAL_USERNAME';

// read a required environment variable
export function getEnv(key: EnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}
