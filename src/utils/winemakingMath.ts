
/**
 * WinemakingMath Utils
 * Энологические расчеты для приложения VineFlow.
 */

// Конвертация Brix в Specific Gravity (SG)
// Formula: SG = 1 + (Brix / (258.6 - ((Brix / 258.2) * 227.1)))
export const brixToSG = (brix: number): number => {
  if (brix < 0) return 1.0;
  return 1 + (brix / (258.6 - ((brix / 258.2) * 227.1)));
};

// Расчет потенциального алкоголя (ABV)
// Formula: ABV = (SG_start - SG_end) / 0.0075
export const calculatePotentialABV = (startSG: number, endSG: number): number => {
  if (endSG >= startSG) return 0.0;
  return (startSG - endSG) / 0.0075;
};

// Расчет шаптализации (добавления сахара)
// Returns Sugar in grams
// Formula: Sugar (g) = (TargetABV - PotentialABV) * 17 * Volume
export const calculateChaptalization = (
  targetABV: number,
  currentABV: number,
  volumeLiters: number
): number => {
  if (currentABV >= targetABV) return 0.0;
  return (targetABV - currentABV) * 17 * volumeLiters;
};

// Расчет сульфитации (KMS)
// Returns KMS in grams
// Formula: KMS (g) = (TargetFreeSO2 * Volume) / 570
export const calculateSulphitation = (
  targetFreeSO2: number, // ppm (mg/L)
  volumeLiters: number
): number => {
  return (targetFreeSO2 * volumeLiters) / 570;
};

// Оценка выхода вина из сырья
export const estimateYield = (weightKg: number, type: 'RED' | 'WHITE' | 'FRUIT'): number => {
  let factor = 0.65;
  if (type === 'RED') {
    factor = 0.72;
  } else if (type === 'WHITE') {
    factor = 0.65;
  }
  return weightKg * factor;
};
