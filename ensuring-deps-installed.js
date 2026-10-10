import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

if (!existsSync('node_modules'))
    execSync('npm ci');