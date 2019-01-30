import { ConstraintMetadata } from './ConstraintMetadata';
import { SanitizationMetadata } from './SanitizationMetadata';

/**
 * Storage all metadata of this library.
 */
export class MetadataStorage {
    private _constraintMetadata: ConstraintMetadata[] = [];

    /**
     * Gets all constraint metadata saved in this storage.
     */
    get constraintMetadata(): ConstraintMetadata[] {
        return this._constraintMetadata;
    }

    private _sanitizationMetadata: SanitizationMetadata[] = [];

    /**
     * Gets all sanitization metadata saved in this storage.
     */
    get sanitizationMetadata(): SanitizationMetadata[] {
        return this._sanitizationMetadata;
    }

    // -------------------------------------------------------------------------
    // Adder Methods
    // -------------------------------------------------------------------------

    /**
     * Adds a new constraint metadata.
     */
    addConstraintMetadata(metadata: ConstraintMetadata) {
        this.constraintMetadata.push(metadata);
    }

    /**
     * Adds a new sanitization metadata.
     */
    addSanitizationMetadata(metadata: SanitizationMetadata) {
        this.sanitizationMetadata.push(metadata);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Gets all saniztizer constraints for the given object.
     */
    getSanitizeConstraintsForObject(object: object): ConstraintMetadata[] {
        return this.constraintMetadata.filter(
            metadata => metadata.object === object,
        );
    }

    /**
     * Gets all sanitization metadata for the given targetConstructor with the given groups.
     */
    getSanitizeMetadataForObject(
        targetConstructor: any,
    ): SanitizationMetadata[] {
        return this.sanitizationMetadata.filter(metadata => {
            if (typeof metadata.object.constructor === 'function') {
                return (
                    metadata.object.constructor === targetConstructor ||
                    targetConstructor.prototype instanceof metadata.object.constructor
                );
            }

            return false;
        });
    }
}

/**
 * Default metadata storage used as singleton and can be used to storage all metadata in the system.
 */
export let defaultMetadataStorage = new MetadataStorage();
