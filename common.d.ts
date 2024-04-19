declare type Nullable<T> = T | null;

/**
 * Class representing an optional value.
 * @template T - The type of the value.
 */
declare class OptionalValue<T> {

    /**
     * @private
     * @type {Nullable<T>}
     */
    private readonly value: Nullable<T>;

    /**
     * @private
     * @param value - The value.
     */
    private constructor(value: Nullable<T>) {
        this.value = value;
    }

    /**
     * Creates an OptionalValue instance with a non-null value.
     * @param {T} value - The value.
     * @throws {Error} If the value is null or undefined.
     * @returns {OptionalValue<T>} An OptionalValue instance.
     */
    public static of<T>(value: T): OptionalValue<T> {
        if (value === null || value === undefined) {
            throw new Error("Value cannot be null or undefined");
        }
        return new OptionalValue(value);
    }

    /**
     * Creates an OptionalValue instance with a possibly null value.
     * @param {T | null | undefined} value - The value.
     * @returns {OptionalValue<T>} An OptionalValue instance.
     */
    public static ofNullable<T>(value: T | null | undefined): OptionalValue<T> {
        return new OptionalValue(value);
    }

    /**
     * Creates an OptionalValue instance with a null value.
     * @returns {OptionalValue<T>} An OptionalValue instance.
     */
    public static empty<T>(): OptionalValue<T> {
        return new OptionalValue<T>(null);
    }

    /**
     * Returns the value if present, otherwise null.
     * @returns {T | null} The value.
     */
    public get(): T | null {
        return this.value;
    }

    /**
     * Checks if the value is present.
     * @returns {boolean} True if the value is present, otherwise false.
     */
    public isPresent(): boolean {
        return this.value !== null && this.value !== undefined;
    }

    /**
     * Executes a function if the value is present.
     * @param {(value: T) => void} consumer - The function to execute.
     */
    public ifPresent(consumer: (value: T) => void): void {
        if (this.isPresent()) {
            consumer(this.value as T);
        }
    }

    /**
     * Returns the value if present, otherwise returns the other value.
     * @param {T} other - The other value.
     * @returns {T} The value if present, otherwise the other value.
     */
    public orElse(other: T): T {
        return this.isPresent() ? this.value as T : other;
    }

    /**
     * Returns the value if present, otherwise returns the result of the supplier function.
     * @param {() => T} supplier - The supplier function.
     * @returns {T} The value if present, otherwise the result of the supplier function.
     */
    public orElseGet(supplier: () => T): T {
        return this.isPresent() ? this.value as T : supplier();
    }

    /**
     * Returns the value if present, otherwise throws the error returned by the error function.
     * @param {() => Error} error - The error function.
     * @throws {Error} The error returned by the error function if the value is not present.
     * @returns {T} The value.
     */
    public orElseThrow(error: () => Error): T {
        if (this.isPresent()) {
            return this.value as T;
        } else {
            throw error();
        }
    }
}