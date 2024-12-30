export const setLocalStorage = <T>(stored:string, save: T) => {
    localStorage.setItem(`${stored}`, JSON.stringify(save))
}