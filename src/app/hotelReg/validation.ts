import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


interface FormState {
    destinationId: string;
    name: string;
    image: string;
    email: string;
    address: string;
    numberRooms: number;
    phone: string;
    checkIn: string;
    checkOut: string;
    overview: string;
}
interface Errors {
    destinationId?: string;
    name?: string;
    image?: string;
    email?: string;
    address?: string;
    numberRooms?: string;
    phone?: string;
    checkIn?: string;
    checkOut?: string;
    overview?: string;


}
const validation = (form: FormState): Errors => {
    const errors: Errors = {}

    //!Country
    
        if (!form.destinationId) {
            errors.destinationId = "Please select a city";
        }
        else {
            errors.destinationId = "";
        }

//!Name



    if (!form.name) {
        errors.name = "Empty field"
    } else {
        errors.name = "";
    }



// //!Image

//     if (!form.image) {
//         errors.image = "Please introduce a Postal Code";
//     }
//     if (!/^[a-zA-Z0-9]*$/.test(form.image)) {
//         errors.image = 'Only letters and numbers are allowed'
//     }
//     else {
//         errors.image = "";
//     }
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

//!Address

    if (!form.address.length) {
        errors.address = "Empty field";
    }
    else {
        errors.address = "";
    }

//!Phone


    if (!form.phone) {
        errors.phone = "Please introduce a phone number";
    }
    if (!/^[0-9\-]{5,}$/.test(form.phone)) {
        errors.phone = 'Invalid phone number'
    }
    else {
        errors.phone = "";
    }

//!NumberRooms


    if (!form.numberRooms) {
        errors.numberRooms = "Please introduce a Rooms number";
    }
    else {
        errors.numberRooms = "";
    }

//!Check in


    if (!form.checkIn) {
        errors.checkIn = "Please introduce a check in hour";
    }
    else {
        errors.checkIn = "";
    }

//!Check out


    if (!form.checkOut) {
        errors.checkOut = "Please introduce a check out hour";
    }
    else {
        errors.checkOut = "";
    }

//!Overview


    if (!form.overview) {
        errors.overview = "Please introduce a overview of your hotel";
    }
    else {
        errors.overview = "";
    }



    return errors;
}
export default validation
export type { Errors };