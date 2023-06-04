import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';

import App, { defaultProps } from "./App";
import * as stories from './App.stories'

const { Defaults, WithTitle } = composeStories(stories)

describe('App', () => {
  describe('when rendered', () => {
    it('the title is visible', () => {
      const { getByRole } = render(<App />);
      const element = getByRole('heading', { level: 1 })
      expect(element).toBeInTheDocument()
      expect(element.textContent).toEqual(defaultProps.title)
    })
    it('the title is configurable', () => {
      const { getByRole } = render(<App title={WithTitle.args.title} />);
      const element = getByRole('heading', { level: 1 })
      expect(element).toBeInTheDocument()
      expect(element.textContent).toEqual(WithTitle.args.title)
    })

    it('should increment count on click', async () => {
      const { getByRole, findByText } = render(<App />);
      waitFor(() => {
        userEvent.click(getByRole('button'))
      })
      expect(await findByText(/count is 1/i)).toBeInTheDocument()
    })
  });
  describe('when rendered with storybook', () => {
    it('the title is visible', () => {
      const { getByRole } = render(<Defaults />);
      const element = getByRole('heading', { level: 1 })
      expect(element).toBeInTheDocument()
      expect(element.textContent).toEqual(defaultProps.title)
    })
    it('the title is configurable', () => {
      const { getByRole } = render(<WithTitle />);
      const element = getByRole('heading', { level: 1 })
      expect(element).toBeInTheDocument()
      expect(element.textContent).toEqual(WithTitle.args.title)
    })

    it('should increment count on click', async () => {
      const { getByRole, findByText } = render(<Defaults />);
      waitFor(() => {
        userEvent.click(getByRole('button'))
      })
      expect(await findByText(/count is 1/i)).toBeInTheDocument()
    })})

})