'use client';

import { Props } from '@/app/layout';
import { Provider } from 'react-redux';
import { store } from './store';

export default function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
