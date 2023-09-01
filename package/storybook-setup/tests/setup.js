import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'
global.expect = expect;

afterEach(() => {
  cleanup();
});