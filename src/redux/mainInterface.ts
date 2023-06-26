import { InitialStateUser } from "./Features/Users/usersSlice"
import { InitialStateCity } from "./Features/Citys/CitySlice"
import { InitialStateRealUser } from "./Features/UsersReal/usersRealSlice"
export interface MainGlobal {
    users: InitialStateUser
    city: InitialStateCity
    usersReal:InitialStateRealUser
 }