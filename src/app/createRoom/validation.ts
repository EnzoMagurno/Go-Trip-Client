import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


interface FormState {
    room: string;
    price: number;
    status: boolean;
    numRooms: number;
    availableRooms: number;
    description: string
    services: [];
}
interface Errors {
    room?: string;
    price?: string;
    status?: string;
    numRooms?: string;
    availableRooms?: string;
    description?: string
    services?: string;

}
const validation = (form: FormState): Errors => {
    const errors: Errors = {}

    //!Rooms
    
        if (!form.room) {
            errors.room = "Please introduce a name for you room";
        }
        else {
            errors.room = "";
        }

//!Price


if (!form.price) {
    errors.price = "Please introduce a price for your room";
}
else {
    errors.price = "";
}

//!Overview


    if (!form.description) {
        errors.description = "Please introduce a description for your room";
    }
    else {
        errors.description = "";
    }



    return errors;
}
export default validation
export type { Errors };