import { getEnv } from '../config/env';

export type LoginUser = {
  label: string;
  username: string;
  password: string;
  canLogin: boolean;
  expectedError?: string;
};

const password = getEnv('PASSWORD');

export const loginUsers: LoginUser[] = [
  {
    label: 'standard_user',
    username: getEnv('STANDARD_USERNAME'),
    password,
    canLogin: true,
  },
  {
    label: 'locked_out_user',
    username: getEnv('LOCKED_OUT_USERNAME'),
    password,
    canLogin: false,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    label: 'problem_user',
    username: getEnv('PROBLEM_USERNAME'),
    password,
    canLogin: true,
  },
  {
    label: 'performance_glitch_user',
    username: getEnv('PERFORMANCE_GLITCH_USERNAME'),
    password,
    canLogin: true,
  },
  {
    label: 'error_user',
    username: getEnv('ERROR_USERNAME'),
    password,
    canLogin: true,
  },
  {
    label: 'visual_user',
    username: getEnv('VISUAL_USERNAME'),
    password,
    canLogin: true,
  },
];
