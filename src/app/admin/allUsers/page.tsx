"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingUsersReal, selectAllUsersReal } from "../../../redux/Features/UsersReal/usersRealSlice";
import UsersAdminContainer from "../../../components/AdminContainers/UsersAdminContainer";


const AllUsersAdmin = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsersReal)




    useEffect(() => {
        dispatch(fetchingUsersReal())
    }, [allUsers.length]) 


    return (
        <div className="pb-24 p-5">
            <h1>Aqui se encontraran todos los Usuarios</h1>
            {
            allUsers.map(user => <UsersAdminContainer 
                key={user.id}
                id={user.id}
            name={user.name}
            photoUser={user.photoUser}
            postalCode={user.postalCode}
            birthday={user.birthday}
            country={user.country}
            phone={user.phone}
            phoneCode={user.phoneCode}
            gender={user.gender}
            email={user.email}
            address={user.address}
            dniPasaport={user.dniPasaport}
            status={user.status}
            rol={user.rol}
            dniPassport={user.dniPasaport}
            thirdPartyCreated={user.thirdPartyCreated}
            />)
            }
        </div>
    )
};

export default AllUsersAdmin;