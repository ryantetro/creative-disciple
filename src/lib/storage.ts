// LocalStorage wrapper with type safety

export const load = <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;

    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

export const save = <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};
