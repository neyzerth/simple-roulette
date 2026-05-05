import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ThemeColors } from '@/styles/colors';

export type { ThemeColors };

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
