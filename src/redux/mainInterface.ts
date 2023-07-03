import { InitialStateCity } from "./Features/Citys/CitySlice"
import { InitialStateRealUser } from "./Features/UsersReal/usersRealSlice"
import { InitialStateService } from "./Features/Services/servicesSlice"

export interface MainGlobal {
    city: InitialStateCity
    usersReal:InitialStateRealUser
    services : InitialStateService
}