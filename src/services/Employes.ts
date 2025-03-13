import { isCookie } from 'react-router-dom';
import { ApiReturn } from '../assets/models/Api';
import { Employee } from '../assets/models/Employes';
import { NewEmployeeFormData } from '../assets/models/NewEmployeeForm';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const DeleteEmploye = async (employeeId: number) => {
	try {
		const deleteEmployeRes = await fetch(apiUrl + `/employees/${employeeId}`, {
			method: 'DELETE',
			headers,
		});

		if (!deleteEmployeRes.ok) throw new Error('Une erreur est survenue');
	} catch (e) {
		console.error(e);
	}
};

export const GetEmployes = async (page: number, searchParams: any = null): Promise<ApiReturn | null> => {
	try {
		let searchString = '';

		if (searchParams) {
			Object.keys(searchParams).forEach((param) => {
				searchString += `&${param}=${searchParams[param]}`;
			});
		}

		const employesRes = await fetch(apiUrl + `/employees?page=${page}${searchString}`, {
			method: 'GET',
			headers,
		});

		if (!employesRes.ok) throw new Error('Une erreur est survenu');

		const data = await employesRes.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const GetEmployeById = async (id: number): Promise<Employee | null> => {
	try {
		const employesRes = await fetch(apiUrl + `/employees/${id}`, {
			method: 'GET',
			headers,
		});
		if (!employesRes.ok) throw new Error('Une erreur est survenu');

		const data = await employesRes.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const SaveEmploye = async (employee: Employee, id: number): Promise<boolean> => {
	try {
		const response = await fetch(apiUrl + `/employees/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', ...headers },
			body: JSON.stringify({
				firstName: employee?.firstName,
				lastName: employee?.lastName,
				email: employee?.email,
				phone: employee?.phone,
				role: employee?.role,
			}),
		});

		if (!response.ok) throw new Error('Failed to update employee');

		return response.ok;
	} catch (err) {
		return false;
	}
};

export const CreateEmployee = async (formData: NewEmployeeFormData): Promise<Response> => {
	return await fetch(apiUrl + '/employees', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify({
			...formData,
			roleId: Number(formData.roleId),
		}),
	});
};
