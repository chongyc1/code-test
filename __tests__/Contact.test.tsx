import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import ContactPage from '@/pages/contact';
import { useRouter } from 'next/router';

// import jest from 'jest';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

test('contact page test', () => {
  const { getByText } = render(<ContactPage />);
  expect(getByText("go")).toBeInTheDocument();
})