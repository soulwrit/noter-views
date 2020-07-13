import { createContext } from 'react';
import { DEFAULT } from './config';

export const ConfigContext = createContext(DEFAULT);
ConfigContext.displayName = 'globalContext';