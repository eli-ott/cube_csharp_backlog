const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

export const DeleteImage = async (imageId: string) => {
	const response = await fetch(apiUrl + `/images/${imageId}`, {
		method: 'DELETE',
		headers,
	});

	return response;
};
