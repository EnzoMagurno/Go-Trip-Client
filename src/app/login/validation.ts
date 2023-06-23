export interface Errors {
    password?: string;
    email?: string
}

interface FormState {
    password: string;
    email: string;
}

const validation = (form: FormState): Errors => {
    const errors: Errors = {}
    if (!form.email.length) {
        errors.email = "Empty field";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email) || /^\s|\s$/.test(form.email)) {
        errors.email = "Invalid email address";
    }
    else {
        errors.email = "";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/u.test(form.password)) {
        if (!/^[a-zA-Z0-9äöüÄÖÜ]*$/.test(form.password)) {
            errors.password = 'No special characters';
        } else {
            errors.password = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
        }
    }
    else {
        errors.password = "";
    }
    return errors
}

export default validation