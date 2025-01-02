
export const validateInputs = (type: string, text: string) => {
    const regExpEmail = new RegExp(/^[a-zA-ZåäöÅÄÖ0-9._%+-]+@[a-zA-ZåäöÅÄÖ0-9.-]+\.[a-zA-ZåäöÅÄÖ]{2,}$/);
    const regExpPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
    const regExpName = new RegExp(/^(?=.*[a-zA-ZåäöÅÄÖ].*[a-zA-ZåäöÅÄÖ]).*$/);
    switch(type) {
        case 'email':
            return regExpEmail.test(text);
        case 'password':
            return regExpPassword.test(text);
        case 'firstName':
        case 'lastName':
        case 'userName':
            return regExpName.test(text);
            default:
                return false;  // Om inget matchar, returnera false
        }
    }
