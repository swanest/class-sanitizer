import { defaultMetadataStorage } from './metadata/MetadataStorage';
import { SanitizeTypes } from './SanitizeTypes';

// tslint:disable function-name

/**
 * Options used to pass to sanitization decorators.
 */
export interface SanitizationOptions {
    /**
     * Specifies if sanity value is an array and each of its item must be sanitized.
     */
    each?: boolean;
}

/**
 * Decorator used to register custom sanitizer.
 */
export function SanitizerConstraint() {
    return (object: object) => {
        defaultMetadataStorage.addConstraintMetadata({
            object,
        });
    };
}

/**
 * Performs sanitization based on the given custom constraint.
 */
export function Sanitize(
    constraintClass: object,
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.CUSTOM_SANITIZATION,
            object,
            propertyName,
            value1: constraintClass,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Remove characters that appear in the blacklist. The characters are used in a RegExp and so you will need to
 * escape some chars, e.g @Blacklist('\\[\\]')
 */
export function Blacklist(
    chars: RegExp,
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.BLACKLIST,
            object,
            propertyName,
            value1: chars,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Replace <, >, &, ', " and / with HTML entities.
 */
export function Escape(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.ESCAPE,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Trim characters from the left-side of the input.
 */
export function Ltrim(
    chars?: string[],
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.LTRIM,
            object,
            propertyName,
            value1: chars,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Canonicalize an email address.
 */
export function NormalizeEmail(
    lowercase?: boolean,
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.NORMALIZE_EMAIL,
            object,
            propertyName,
            value1: lowercase,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Trim characters from the right-side of the input.
 */
export function Rtrim(
    chars?: string[],
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.RTRIM,
            object,
            propertyName,
            value1: chars,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Remove characters with a numerical value < 32 and 127, mostly control characters.
 * If keepNewLines is true, newline characters are preserved (\n and \r, hex 0xA and 0xD).
 * Unicode-safe in JavaScript.
 */
export function StripLow(
    keepNewLines?: boolean,
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.STRIP_LOW,
            object,
            propertyName,
            value1: keepNewLines,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Convert the input to a boolean.
 * Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.
 */
export function ToBoolean(
    isStrict?: boolean,
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_BOOLEAN,
            object,
            propertyName,
            value1: isStrict,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Convert the input to a date, or null if the input is not a date.
 */
export function ToDate(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_DATE,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Convert the input to a float.
 */
export function ToFloat(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_FLOAT,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Convert the input to an integer, or NaN if the input is not an integer.
 */
export function ToInt(radix?: number, annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_INT,
            object,
            propertyName,
            value1: radix,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Convert the input to a string.
 */
export function ToString(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_STRING,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Trim characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.
 */
export function Trim(
    chars?: string[],
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TRIM,
            object,
            propertyName,
            value1: chars,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Remove characters that do not appear in the whitelist.
 * The characters are used in a RegExp and so you will need to escape some chars, e.g. whitelist(input, '\\[\\]').
 */
export function Whitelist(
    chars: RegExp,
    annotationOptions?: SanitizationOptions,
) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.WHITELIST,
            object,
            propertyName,
            value1: chars,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

export function ToLowerCase(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_LOWER_CASE,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

export function ToUpperCase(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.TO_UPPER_CASE,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}

/**
 * Indicates if nested object should be sanitized as well.
 */
export function SanitizeNested(annotationOptions?: SanitizationOptions) {
    return (object: object, propertyName: string) => {
        defaultMetadataStorage.addSanitizationMetadata({
            type: SanitizeTypes.NESTED,
            object,
            propertyName,
            each:
                annotationOptions && annotationOptions.each
                    ? annotationOptions.each
                    : undefined,
        });
    };
}
