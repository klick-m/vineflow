
// Theme configuration for VineFlow
// Design: Clean Light Mode with Rounded aesthetics

export const theme = {
    colors: {
        primary: '#722F37', // Merlot / Deep Wine
        secondary: '#FFD700', // Gold
        background: '#F5F5F7', // Off-white / Light Grey
        surface: '#FFFFFF', // Pure White for cards
        text: '#333333', // Charcoal for main text
        textSecondary: '#666666', // Grey for subtitles
        success: '#4CAF50',
        error: '#E53935',
        border: '#E0E0E0',
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    borderRadius: {
        s: 8,
        m: 16,
        l: 24, // Card radius
        xl: 32, // Button radius
    },
    typography: {
        header: {
            fontSize: 28,
            fontWeight: 'bold' as const,
            color: '#333333',
        },
        title: {
            fontSize: 20,
            fontWeight: '600' as const,
            color: '#333333',
        },
        body: {
            fontSize: 16,
            color: '#333333',
        },
        caption: {
            fontSize: 14,
            color: '#666666',
        },
    },
    shadows: {
        card: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5, // Android
        },
    },
};
