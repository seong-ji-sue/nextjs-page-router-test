const users = (data) => {
	if (!data) return {};
	return {
		id: data.id,
		name: data.name,
		description: data.description,
		status: data.status,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
};

export default {users};
