interface FormState {
    name: string;
    country: string;
    postalCode: string;
    phone: string;
    email: string;
    password: string;
}
interface Errors {
    name?: string;
    country?: string;
    postalCode?: string;
    phone?: string;
    email?: string;
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
    if (form.country === 'Select a country') {
        errors.country = 'Please select a country'
    }
    else {
        errors.country = "";
    }



    if (!/^[A-Za-z0-9\s-]+$/.test(form.postalCode)) {
        errors.postalCode = "Invalid postal code";
    }
    else {
        errors.postalCode = "";
    }



    if (!form.phone) {
        errors.phone = "Empty field";
    }
    if (!/^[0-9\-]+$/.test(form.phone)) {
        errors.phone = "Invalid phone number";
    }
    else {
        errors.phone = "";
    }

    if (!form.email.length) {
        errors.email = "Empty field";
    }
    if (!/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(form.email)) {
        errors.email = "Invalid email address";
    }
    else {
        errors.email = "";
    }


    return errors;
}
export default validation
export type { Errors };