export const getLocalStorage = async <T>(stored: string): Promise<T> => {
    const storedObject = await JSON.parse(localStorage.getItem(`${stored}`) || '[]');
    return storedObject
}