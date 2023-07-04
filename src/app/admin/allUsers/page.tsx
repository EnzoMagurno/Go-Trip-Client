'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchingUsersReal,
	getallUsersReal,
} from '../../../redux/Features/UsersReal/usersRealSlice';
import ActiveUsers from '../../../components/AdminContainers/UsersAdminContainer/ActiveUsers';
import UsersDeleted from '../../../components/AdminContainers/UsersAdminContainer/UsersDeleted';

const AllUsersAdmin = () => {
	const dispatch = useDispatch();
	const { usersReal, usersDeleted } = useSelector((state) => state.usersReal);

	

	useEffect(() => {
		dispatch(fetchingUsersReal());
		
        
	}, [usersReal.length]);

    useEffect(() => {

		dispatch(getallUsersReal());
        
	}, [usersDeleted.length]);
	return (
		<div> 

            {
                usersReal.length || usersDeleted.length

                ? (
                    <div>
                    <div className='pb-24 p-5'>
                    <h1>Aqui se encontraran todos los Usuarios</h1>
                    {usersReal.map((user) => (
                        <ActiveUsers
                            deletedAt={user?.deletedAt}
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
                            confirmPassword={user.confirmPassword}
                            password={user.password}
                            dniPassport={user.dniPasaport}
                            thirdPartyCreated={user.thirdPartyCreated}
                        />
                    ))}
                </div>
                <div className='pb-24 p-5'>
                    <h1>Aqui se encuentran los usuarios inactivos</h1>
                    {usersDeleted.map((user) => (
                        <UsersDeleted
                            deletedAt={user?.deletedAt}
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
                            confirmPassword={user.confirmPassword}
                            password={user.password}
                            dniPassport={user.dniPasaport}
                            thirdPartyCreated={user.thirdPartyCreated}
                        />
                    ))}
                </div>
                </div>
                ) : (
                    <h5>No se encontraron resultados</h5>
                )
            }
		
		</div>
	);
};

export default AllUsersAdmin;
