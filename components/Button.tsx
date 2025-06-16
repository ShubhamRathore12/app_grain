import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ 
  title, 
  variant = 'primary', 
  size = 'medium',
  isLoading = false,
  style, 
  textStyle,
  ...props 
}: ButtonProps) {
  
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    textStyle
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Colors.brand.primary : 'white'} 
          size="small" 
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.brand.primary,
  },
  secondary: {
    backgroundColor: Colors.brand.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.brand.primary,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: Colors.brand.primary,
  },
});