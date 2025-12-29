import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Wine, Thermometer, Droplets } from 'lucide-react-native';
import { theme } from '../styles/theme';
import { AppCard } from '../components/common/AppCard';
import { Batch } from '../types/Batch';
import { subscribeToBatches } from '../services/batchService';

export default function DashboardScreen({ navigation }: any) {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToBatches((data) => {
            setBatches(data);
        });
        return () => unsubscribe();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Real-time listener updates automatically, so we just simulate a delay for UX
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good morning,</Text>
                        <Text style={styles.title}>Winemaker</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Wine color={theme.colors.primary} size={24} />
                    </View>
                </View>

                {/* Active Batches */}
                <Text style={styles.sectionTitle}>Active Batches</Text>
                <View style={styles.batchList}>
                    {batches.length === 0 ? (
                        <Text style={styles.emptyText}>No active batches. Start one!</Text>
                    ) : (
                        batches.map((batch) => (
                            <AppCard key={batch.id} style={styles.batchCard}>
                                <View style={styles.batchHeader}>
                                    <View style={styles.batchIcon}>
                                        <Wine
                                            color={batch.type === 'RED' ? '#722F37' : '#F1C40F'}
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.batchInfo}>
                                        <Text style={styles.batchName}>{batch.name}</Text>
                                        <Text style={styles.batchStatus}>{batch.status.replace('_', ' ')}</Text>
                                    </View>
                                </View>

                                <View style={styles.meassurements}>
                                    <View style={styles.metric}>
                                        <Droplets size={16} color={theme.colors.textSecondary} />
                                        <Text style={styles.metricText}>1.085 SG</Text>
                                    </View>
                                    <View style={styles.metric}>
                                        <Thermometer size={16} color={theme.colors.textSecondary} />
                                        <Text style={styles.metricText}>22°C</Text>
                                    </View>
                                </View>
                            </AppCard>
                        ))
                    )}
                </View>
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('NewBatchWizard')}
            >
                <Plus color="#FFFFFF" size={32} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        padding: theme.spacing.l,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    greeting: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    title: {
        ...theme.typography.header,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.card,
    },
    sectionTitle: {
        ...theme.typography.title,
        marginBottom: theme.spacing.m,
    },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.l,
        fontStyle: 'italic',
    },
    batchList: {
        gap: theme.spacing.m,
    },
    batchCard: {
        marginBottom: theme.spacing.s,
    },
    batchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    batchIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    batchInfo: {
        flex: 1,
    },
    batchName: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
    },
    batchStatus: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
    },
    meassurements: {
        flexDirection: 'row',
        gap: theme.spacing.l,
        marginTop: theme.spacing.s,
    },
    metric: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metricText: {
        fontWeight: '500',
        color: theme.colors.text,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.xl,
        right: theme.spacing.l,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});
