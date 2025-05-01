import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step {currentStep}/6</Text>
        <Text style={[styles.stepText, styles.totalText]}>{currentStep} of {totalSteps}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index < currentStep ? colors.primary.main : colors.neutral.grey200,
                  width: index < currentStep ? 24 : 20,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.grey200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  totalText: {
    color: colors.primary.main,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    height: 4,
    borderRadius: 2,
  },
});

export default StepIndicator; 