const users = (data) => {
	if (!data) return {};
	return {
		name: data.name,
		description: data.description,
	};
};

export default {users};
