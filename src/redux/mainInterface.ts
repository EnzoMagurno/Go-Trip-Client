import { InitialStateUser } from "./Features/Users/usersSlice"
import { InitialStateCity } from "./Features/Citys/CitySlice"
import { InitialStateService } from "./Features/Services/servicesSlice"
export interface MainGlobal {
    users: InitialStateUser
    city: InitialStateCity
    services : InitialStateService
 }