import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { cleanup as svelteCleanup } from '@testing-library/svelte'
import matchers from '@testing-library/jest-dom/matchers';
import React from 'react';
import ReactDOM from 'react-dom';
window.React = React

expect.extend(matchers);

afterEach(() => {
  cleanup();
  svelteCleanup();
});