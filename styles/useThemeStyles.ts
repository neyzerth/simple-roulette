import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { presets } from './presets';

export const useThemeStyles = () => {
  const { colors, isDark } = useTheme();

  const themedPresets = useMemo(() => ({
    input: presets.input(colors),
    card: presets.card(colors),
    container: presets.container(colors),
    modal: {
      backdrop: presets.modal.backdrop(colors),
      container: presets.modal.container(colors),
    },
    text: {
      title: presets.text.title(colors),
      titleLarge: presets.text.titleLarge(colors),
      body: presets.text.body(colors),
      bodyBold: presets.text.bodyBold(colors),
      muted: presets.text.muted(colors),
      mutedItalic: presets.text.mutedItalic(colors),
      secondary: presets.text.secondary(colors),
      winner: presets.text.winner(colors),
    },
    button: {
      base: presets.button.base(),
      primary: presets.button.primary(colors),
      primaryText: presets.button.primaryText(),
      danger: presets.button.danger(colors),
      dangerText: presets.button.dangerText(colors),
    },
  }), [colors]);

  return {
    colors,
    isDark,
    presets: themedPresets,
  };
};
