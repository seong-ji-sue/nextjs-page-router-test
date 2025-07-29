import {oStatusType} from '@nextpr/common/options';

const findAll = async () => {
	// return await Axios.get(reqApi.test, {
	// 	header: {},
	// });

	const userAccounts = [
		{
			id: 'user001',
			name: '김철수',
			description: '일반 사용자 계정',
			status: oStatusType.ACTIVE,
			createdAt: '2023-01-15T10:00:00Z',
			updatedAt: '2024-03-20T14:30:00Z',
		},
		{
			id: 'admin_lee',
			name: '이영희',
			description: '관리자 계정 - 시스템 총괄',
			status: oStatusType.ACTIVE,
			createdAt: '2022-07-01T09:00:00Z',
			updatedAt: '2024-06-25T11:00:00Z',
		},
		{
			id: 'guest_park',
			name: '박지영',
			description: '게스트 계정 (임시 접근용)',
			status: oStatusType.DISABLED,
			createdAt: '2024-05-10T11:30:00Z',
			updatedAt: '2024-05-10T11:30:00Z',
		},
		{
			id: 'manager_choi',
			name: '최민준',
			description: '팀 매니저 계정',
			status: oStatusType.ACTIVE,
			createdAt: '2023-11-20T16:00:00Z',
			updatedAt: '2024-01-05T09:15:00Z',
		},
		{
			id: 'disabled_kim',
			name: '김미영',
			description: '정지된 사용자 계정 (부정 행위)',
			status: oStatusType.DISABLED,
			createdAt: '2022-03-01T13:00:00Z',
			updatedAt: '2023-09-10T17:45:00Z',
		},
	];

	return {
		status: '200',
		data: userAccounts,
	};
};

export default {
	findAll,
};
