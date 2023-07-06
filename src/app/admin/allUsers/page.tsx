'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchingUsersReal,
	getallUsersReal,
} from '../../../redux/Features/UsersReal/usersRealSlice';
import ActiveUsers from '../../../components/AdminContainers/UsersAdminContainer/ActiveUsers';
import UsersDeleted from '../../../components/AdminContainers/UsersAdminContainer/UsersDeleted';
import FiltersUsers from '../../../components/SearchBarUsers/SearchBarUsers';
import { FiUserX, FiUserCheck } from 'react-icons/fi';
import { ThunkDispatch } from '@reduxjs/toolkit'; 
import { RootState } from '@/redux/store'; 
import {  AnyAction } from "@reduxjs/toolkit"

const AllUsersAdmin = () => {

	const { usersFilter, usersReal, usersRealCopy, usersDeletedCopy, usersDeleted, filterBy, orderAlpha, allUsers } =
		useSelector((state: any) => state.usersReal);


		const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
	const [isActive, setIsActive] = useState(usersFilter[0]?.deletedAt);
	

	useEffect(() => {
	
		if(!allUsers) {
			dispatch(fetchingUsersReal());
			dispatch(getallUsersReal());
		}
		setIsActive(usersFilter[0]?.deletedAt);

	}, [
		usersFilter.length,
		usersReal.length,
		usersDeleted.length,
		orderAlpha,
		allUsers,
		usersRealCopy.length,
		usersDeletedCopy.length,
		filterBy
	]);

	if (allUsers) {
		return (
			<div className='p-5 pb-24'>


				<FiltersUsers
					optionDefault={filterBy}
					optionOrderDefault={orderAlpha}
				/>

				

				<div>
					<div className=''>
						<div className='relative border-b-2 pb-3 text-center border-b-iconsPurple'>
							<FiUserCheck className='inline-block absolute top-0 left-3 text-3xl text-green-500 ' />
							<h5 className='font-medium text-xl '>Active Users</h5>
						</div>

						{usersRealCopy.map((user: any) => (
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

					<div className='mt-10 relative'>
						<div className=' border-b-2 text-center pb-3 border-b-iconsPurple'>
							<FiUserX className='inline-block absolute top-0 left-2 text-3xl text-red-500 ' />
							<h5 className='font-medium text-xl '>Disabled Users</h5>
						</div>

						{usersDeletedCopy.map((user: any) => (
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
			</div>
		);
	} else {
		return (
			<div className='p-5 pb-24'>
				<FiltersUsers
					optionDefault={filterBy}
					optionOrderDefault={orderAlpha}
				/>

				{usersFilter.length ? (
					<div>
						{!usersFilter[0].deletedAt ? (
							<div className=''>
								<div className='relative border-b-2 pb-3 text-center border-b-iconsPurple'>
									<FiUserCheck className='inline-block absolute top-0 left-3 text-3xl text-green-500 ' />
									<h5 className='font-medium text-xl '>Active Users</h5>
								</div>
								{usersFilter.map((user: any) => (
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
						) : (
							<div className=''>
								<div className='relative border-b-2 text-center pb-3 border-b-iconsPurple'>
									<FiUserX className='inline-block absolute top-0 left-2 text-3xl text-red-500 ' />
									<h5 className='font-medium text-xl '>Disabled Users</h5>
								</div>
								{usersFilter.map((user: any) => (
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
						)}
					</div>
				) : (
					<h5>No se encontraron resultados</h5>
				)}
			</div>
		);
	}
};

export default AllUsersAdmin;
