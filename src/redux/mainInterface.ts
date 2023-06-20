import { InitialStateUser } from "./Features/Users/usersSlice"
import { InitialStateCity } from "./Features/Citys/CitySlice"
export interface MainGlobal {
    users: InitialStateUser
    city: InitialStateCity
 }