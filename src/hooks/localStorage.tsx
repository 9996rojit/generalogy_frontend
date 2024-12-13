class LocalStorageUtil {
  // Add or update an item in localStorage
  static setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  }

  // Retrieve an item from localStorage
  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return null;
    }
  }

  // Remove an item from localStorage
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  }
}

export default LocalStorageUtil;
