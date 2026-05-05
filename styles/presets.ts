import type { TextStyle, ViewStyle } from 'react-native';
import type { ThemeColors } from './colors';

export const presets = {
  input: (colors: ThemeColors): TextStyle => ({
    backgroundColor: colors.inputBackground,
    borderColor: colors.border,
    color: colors.text,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  }),

  card: (colors: ThemeColors): ViewStyle => ({
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
  }),

  container: (colors: ThemeColors): ViewStyle => ({
    flex: 1,
    backgroundColor: colors.background,
  }),

  modal: {
    backdrop: (colors: ThemeColors): ViewStyle => ({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.modalBackdrop,
    }),
    container: (colors: ThemeColors): ViewStyle => ({
      backgroundColor: colors.modalBackground,
      borderRadius: 16,
      padding: 28,
      width: '85%',
      maxWidth: 400,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    }),
  },

  text: {
    title: (colors: ThemeColors): TextStyle => ({
      color: colors.text,
      fontSize: 22,
      fontWeight: '700',
    }),
    titleLarge: (colors: ThemeColors): TextStyle => ({
      color: colors.text,
      fontSize: 36,
      fontWeight: '800',
    }),
    body: (colors: ThemeColors): TextStyle => ({
      color: colors.text,
      fontSize: 15,
    }),
    bodyBold: (colors: ThemeColors): TextStyle => ({
      color: colors.text,
      fontSize: 15,
      fontWeight: '700',
    }),
    muted: (colors: ThemeColors): TextStyle => ({
      color: colors.textMuted,
      fontSize: 13,
    }),
    mutedItalic: (colors: ThemeColors): TextStyle => ({
      color: colors.textMuted,
      fontSize: 13,
      fontStyle: 'italic',
    }),
    secondary: (colors: ThemeColors): TextStyle => ({
      color: colors.textSecondary,
      fontSize: 13,
    }),
    winner: (colors: ThemeColors): TextStyle => ({
      color: colors.winner,
      fontSize: 36,
      fontWeight: '800',
    }),
  },

  button: {
    base: (): ViewStyle => ({
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      minWidth: 110,
      alignItems: 'center',
    }),
    primary: (colors: ThemeColors): ViewStyle => ({
      backgroundColor: colors.accent,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    }),
    primaryText: (): TextStyle => ({
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16,
    }),
    danger: (colors: ThemeColors): ViewStyle => ({
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.danger,
    }),
    dangerText: (colors: ThemeColors): TextStyle => ({
      color: colors.danger,
      fontWeight: '700',
      fontSize: 16,
    }),
  },
};
