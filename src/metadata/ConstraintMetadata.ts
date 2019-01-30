import { SanitizerInterface } from '../SanitizerInterface';

/**
 * This metadata interface contains information for custom sanitizers.
 */
export interface ConstraintMetadata {
    /**
     * Instance of the object which performs sanitization.
     */
    instance?: SanitizerInterface;
    /**
     * Object class which performs sanitization.
     */
    object: object;
}
