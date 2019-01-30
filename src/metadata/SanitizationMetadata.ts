/**
 * This metadata interface contains information for sanitization.
 */
export interface SanitizationMetadata {
    /**
     * Specifies if sanitized value is an array and each of its item must be sanitized.
     */
    each?: boolean;
    /**
     * Sanitization message to be shown in the case of error.
     */
    message?: string;
    /**
     * Object that is used to be sanitized.
     */
    object: object;
    /**
     * Property of the object to be sanitized.
     */
    propertyName: string;
    /**
     * Sanitization type.
     */
    type: number;
    /**
     * First extra sanitized metadata value.
     */
    value1?: any;
    /**
     * Second extra sanitized metadata value.
     */
    value2?: any;
}
