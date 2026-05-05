export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  inputBackground: string;
  placeholder: string;
  modalBackground: string;
  modalBackdrop: string;
  accent: string;
  accentLight: string;
  danger: string;
  dangerLight: string;
  winner: string;
  arrow: string;
  shadow: string;
}

export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textMuted: '#999999',
  border: '#E0E0E0',
  borderLight: '#EEEEEE',
  inputBackground: '#FFFFFF',
  placeholder: '#AAAAAA',
  modalBackground: '#FFFFFF',
  modalBackdrop: 'rgba(0, 0, 0, 0.5)',
  accent: '#007AFF',
  accentLight: '#E6F2FF',
  danger: '#FF3B30',
  dangerLight: '#FFE6E5',
  winner: '#007AFF',
  arrow: '#E74C3C',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',
  text: '#F5F5F5',
  textSecondary: '#AAAAAA',
  textMuted: '#777777',
  border: '#333333',
  borderLight: '#2A2A2A',
  inputBackground: '#1E1E1E',
  placeholder: '#666666',
  modalBackground: '#2C2C2C',
  modalBackdrop: 'rgba(0, 0, 0, 0.7)',
  accent: '#0A84FF',
  accentLight: '#1E3A5F',
  danger: '#FF453A',
  dangerLight: '#5C1E1A',
  winner: '#0A84FF',
  arrow: '#E74C3C',
  shadow: 'rgba(0, 0, 0, 0.3)',
};
