interface FormState {
    name: string;
    country: string;
    phoneCode: string;
    postalCode: string;
    phone: string;
    email: string;
    password: string;
}
interface Errors {
    name?: string;
    country?: string;
    postalCode?: string;
    phoneCode?: string;
    phone?: string;
    email?: string;
    password?: string;
}
const validation = (form: FormState): Errors => {
    const errors: Errors = {}

    if (!form.name) {
        errors.name = "Empty field"
    }
    if (!/^[a-zA-ZÀ-ÿ']+([a-zA-ZÀ-ÿ\s']*?[a-zA-ZÀ-ÿ]+)*$/u.test(form.name)) {
        errors.name = "Only letters and spaces are allowed";
    }
    else {
        errors.name = "";
    }


    if (!form.country) {
        errors.country = "Please select a country";
    }
    else {
        errors.country = "";
    }


    if (!form.postalCode) {
        errors.postalCode = "Please introduce a Postal Code";
    }
    if (!/^[a-zA-Z0-9]*$/.test(form.postalCode)) {
        errors.postalCode = 'Only letters and numbers are allowed'
    }
    else {
        errors.postalCode = "";
    }


    if (!form.phone) {
        errors.phone = "Please introduce a phone number";
    }
    if (!/^[0-9\-]{5,}$/.test(form.phone)) {
        errors.phone = 'Invalid phone number'
    }
    else {
        errors.phone = "";
    }

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
    return errors;
}
export default validation
export type { Errors };