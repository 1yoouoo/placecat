// Image size limits
export const MAX_WIDTH = 7680; // 8K limit
export const MAX_HEIGHT = 4320; // 8K limit
export const MIN_WIDTH = 10;
export const MIN_HEIGHT = 10;

// Supported image formats
export const SUPPORTED_FORMATS = ['png'];

// Validate numeric parameter
export function validateNumber(
  value: string,
  min: number = 1,
  max: number = Number.MAX_SAFE_INTEGER,
): {
  isValid: boolean;
  value?: number;
  message?: string;
} {
  const parsed = parseInt(value);

  if (isNaN(parsed)) {
    return {
      isValid: false,
      message: 'Invalid number format.',
    };
  }

  if (parsed < min) {
    return {
      isValid: false,
      message: `Value is less than the minimum (${min}).`,
    };
  }

  if (parsed > max) {
    return {
      isValid: false,
      message: `Value exceeds the maximum (${max}).`,
    };
  }

  return {
    isValid: true,
    value: parsed,
  };
}

// Validate image format
export function validateFormat(format: string): {
  isValid: boolean;
  value?: string;
  message?: string;
} {
  const normalizedFormat = format.toLowerCase();

  if (!SUPPORTED_FORMATS.includes(normalizedFormat)) {
    return {
      isValid: false,
      message: `Unsupported image format. Supported formats: ${SUPPORTED_FORMATS.join(', ')}`,
    };
  }

  return {
    isValid: true,
    value: normalizedFormat,
  };
}
