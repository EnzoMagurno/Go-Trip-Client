import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


interface FormState {
    name: string;
    country: string;
    phoneCode: string;
    postalCode: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    rol: string;
    gender: string;
    address: string;
    dniPasaport: string;
    thirdPartyCreated: boolean;
}
interface Errors {
    name?: string;
    country?: string;
    postalCode?: string;
    phoneCode?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    birthday?: string;
    rol?: string;
    gender?: string ;
    address?: string;
    dniPasaport?: string;
    thirdPartyCreated?: boolean;


}
const validation = (form: FormState): Errors => {
    const errors: Errors = {}


//!Name



    if (!form.name) {
        errors.name = "Empty field"
    }

    if (!form.name.includes(" ")) {
        errors.name = "Please fill your full name";
      }

    if (!/^[a-zA-ZÀ-ÿ']+([a-zA-ZÀ-ÿ\s']*?[a-zA-ZÀ-ÿ]+)*$/u.test(form.name)) {
        errors.name = "Only letters and spaces are allowed";
    }


//!Country

    if (!form.country) {
        errors.country = "Please select a country";
    }
    else {
        errors.country = "";
    }

//!Postal

    if (!form.postalCode) {
        errors.postalCode = "Please introduce a Postal Code";
    }
    if (!/^[a-zA-Z0-9]*$/.test(form.postalCode)) {
        errors.postalCode = 'Only letters and numbers are allowed'
    }
    else {
        errors.postalCode = "";
    }

//!Phone

    if (Number(form.phone) < 0) {
    errors.phoneCode = "Please select a valid number";
    }


    if (form.phoneCode==='') {
    errors.phoneCode = "Please select a valid code";
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



//!Email

    if (!form.email.length) {
        errors.email = "Empty field";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email) || /^\s|\s$/.test(form.email)) {
        errors.email = "Invalid email address";
    }

    else {
        errors.email = "";
    }


//!Password


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


//!CONFIRM-Password

    if(!form.confirmPassword){

         errors.confirmPassword = "Those passwords didn’t match. Try again."
    }

    if(form.confirmPassword !== form.password){
        errors.confirmPassword = "Those passwords didn’t match. Try again."
    }


//!BirthDay

    if (!form.birthday){
                errors.birthday="Select a valid date"
           }

    if (form.birthday){
                
        const dateString = form.birthday;
        const inputDate = dayjs(dateString, 'DD-MM-YYYY');
        const currentDate = dayjs();
        
        const age = currentDate.diff(inputDate, 'year');

        if (age <= 18) {
            errors.birthday='You must be older than 18';
        } 
        
        if (age >= 150) {
            errors.birthday='Please enter a valid date';
        }
        
        
        //!DNI PASSPORT

        if(isNaN(Number(form.dniPasaport))){
            errors.dniPasaport='Should be a numeric value.';

        }




 }

    return errors;
}
export default validation
export type { Errors };