import { InitialStateCity } from "./Features/Citys/CitySlice"
import { InitialStateRealUser } from "./Features/UsersReal/usersRealSlice"
import { InitialStateService } from "./Features/Services/servicesSlice"
import { InitialStateGallery } from "./Features/Gallery/GallerySlice"
import { InitialStateComment } from "./Features/Commets/CommentsSlice"

export interface MainGlobal {
    city: InitialStateCity
    usersReal:InitialStateRealUser
    services : InitialStateService
    gallery: InitialStateGallery
    comment: InitialStateComment
}