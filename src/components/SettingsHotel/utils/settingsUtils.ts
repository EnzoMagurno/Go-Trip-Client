import { ChangeEvent } from "react";

export interface HiddenInputs {
    email: string
    phone: string
    check: string
}

export const editDataHandler = (event: ChangeEvent<HTMLInputElement>, editData, setEditData) => {
    const property = event.target.name;
    const value = event.target.value;
    setEditData({ ...editData, [property]: value })

};

export const activateEdit = (editIsDisabled: string, setEditIsDisabled) => {
    if (editIsDisabled) {
        setEditIsDisabled("")
    } else {
        setEditIsDisabled("hidden")
    }
};


