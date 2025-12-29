
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, Grape, Scale, Droplet } from 'lucide-react-native';
import { theme } from '../styles/theme';
import { AppButton } from '../components/common/AppButton';
import { AppCard } from '../components/common/AppCard';
import { BatchType } from '../types/Batch';
import { estimateYield, brixToSG, calculatePotentialABV } from '../utils/winemakingMath';
import { addBatch } from '../services/batchService';

export default function NewBatchWizard({ navigation }: any) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        weight: '', // Raw weight in kg
        type: 'RED' as BatchType,
        brix: '', // Start Brix
        ph: '',
    });

    const totalSteps = 3;

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Save to Firebase
            try {
                setLoading(true);
                const weightVal = parseFloat(formData.weight) || 0;
                const brixVal = parseFloat(formData.brix) || 0;

                // Calculate derived values
                const currentVolume = estimateYield(weightVal, formData.type);
                const startSG = brixToSG(brixVal);
                const targetAbv = calculatePotentialABV(startSG, 1.000);

                await addBatch({
                    name: formData.name || 'Untitled Batch',
                    type: formData.type,
                    status: 'MACERATION',
                    rawWeight: weightVal,
                    currentVolume,
                    targetAbv
                });

                navigation.goBack();
            } catch (error: any) {
                console.error("Error creating batch: ", error);
                alert(`Error saving batch: ${error.message || 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigation.goBack();
        }
    };

    // Calculations for Preview
    const weightVal = parseFloat(formData.weight) || 0;
    const brixVal = parseFloat(formData.brix) || 0;

    const estimatedVol = estimateYield(weightVal, formData.type);
    const startSG = brixToSG(brixVal);
    const potentialABV = calculatePotentialABV(startSG, 1.000); // Assuming dry finish

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ArrowLeft color={theme.colors.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Batch</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(step / totalSteps) * 100}%` }]} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Step 1: Basics & Weight */}
                {step === 1 && (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Let's start with the basics</Text>

                        <AppCard style={styles.inputCard}>
                            <Text style={styles.label}>Batch Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Merlot 2025 from Garden"
                                value={formData.name}
                                onChangeText={(t) => setFormData({ ...formData, name: t })}
                            />
                        </AppCard>

                        <AppCard style={styles.inputCard}>
                            <Text style={styles.label}>Raw Material Weight (kg)</Text>
                            <View style={styles.inputRow}>
                                <Scale color={theme.colors.textSecondary} size={20} />
                                <TextInput
                                    style={[styles.input, { flex: 1, marginLeft: 10 }]}
                                    placeholder="0.0"
                                    keyboardType="numeric"
                                    value={formData.weight}
                                    onChangeText={(t) => setFormData({ ...formData, weight: t })}
                                />
                            </View>
                        </AppCard>
                    </View>
                )}

                {/* Step 2: Type Selection */}
                {step === 2 && (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>What kind of wine?</Text>

                        {(['RED', 'WHITE', 'FRUIT'] as BatchType[]).map((type) => (
                            <TouchableOpacity
                                key={type}
                                activeOpacity={0.9}
                                onPress={() => setFormData({ ...formData, type })}
                            >
                                <AppCard
                                    style={{
                                        ...styles.typeCard,
                                        ...(formData.type === type ? styles.selectedTypeCard : {}),
                                    }}
                                >
                                    <View style={styles.typeIcon}>
                                        <Grape
                                            color={formData.type === type ? '#fff' : theme.colors.primary}
                                            size={24}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.typeText,
                                            formData.type === type && styles.selectedTypeText,
                                        ]}
                                    >
                                        {type} WINE
                                    </Text>
                                    {formData.type === type && (
                                        <View style={styles.checkIcon}>
                                            <Check color="#fff" size={16} />
                                        </View>
                                    )}
                                </AppCard>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Step 3: Initial measurements */}
                {step === 3 && (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Measurements</Text>

                        <AppCard style={styles.inputCard}>
                            <Text style={styles.label}>Initial Brix (%)</Text>
                            <View style={styles.inputRow}>
                                <Droplet color={theme.colors.textSecondary} size={20} />
                                <TextInput
                                    style={[styles.input, { flex: 1, marginLeft: 10 }]}
                                    placeholder="22.0"
                                    keyboardType="numeric"
                                    value={formData.brix}
                                    onChangeText={(t) => setFormData({ ...formData, brix: t })}
                                />
                            </View>
                        </AppCard>

                        <View style={styles.previewContainer}>
                            <Text style={styles.previewTitle}>Expected Output</Text>
                            <View style={styles.previewRow}>
                                <Text style={styles.previewLabel}>Volume:</Text>
                                <Text style={styles.previewValue}>{estimatedVol.toFixed(1)} L</Text>
                            </View>
                            <View style={styles.previewRow}>
                                <Text style={styles.previewLabel}>Potential ABV:</Text>
                                <Text style={styles.previewValue}>{potentialABV.toFixed(1)} %</Text>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <AppButton
                    title={loading ? 'Saving...' : (step === totalSteps ? 'Create Batch' : 'Next')}
                    onPress={handleNext}
                    style={styles.nextButton}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
    },
    progressContainer: {
        height: 4,
        backgroundColor: '#E0E0E0',
        width: '100%',
    },
    progressBar: {
        height: '100%',
        backgroundColor: theme.colors.primary,
    },
    content: {
        padding: theme.spacing.l,
        paddingBottom: 100,
    },
    stepContainer: {
        gap: theme.spacing.m,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    inputCard: {
        marginBottom: theme.spacing.m,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        fontSize: 18,
        color: theme.colors.text,
        padding: 0,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.l,
        marginBottom: theme.spacing.m,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedTypeCard: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    typeIcon: {
        marginRight: theme.spacing.m,
    },
    typeText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        flex: 1,
    },
    selectedTypeText: {
        color: '#fff',
    },
    checkIcon: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 4,
    },
    previewContainer: {
        marginTop: theme.spacing.l,
        padding: theme.spacing.m,
        backgroundColor: 'rgba(255, 215, 0, 0.1)', // Gold tint
        borderRadius: theme.borderRadius.m,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
    },
    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    previewLabel: {
        color: theme.colors.textSecondary,
    },
    previewValue: {
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.l,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    nextButton: {
        width: '100%',
    },
});
