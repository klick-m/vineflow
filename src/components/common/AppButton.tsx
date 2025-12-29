
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../styles/theme';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
}) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'secondary':
                return theme.colors.secondary;
            case 'outline':
                return 'transparent';
            default:
                return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'secondary':
                return theme.colors.text;
            case 'outline':
                return theme.colors.primary;
            default:
                return '#FFFFFF';
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && styles.outline,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.l,
        borderRadius: theme.borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        // Soft shadow for primary buttons
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    outline: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
        elevation: 0,
        shadowOpacity: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
