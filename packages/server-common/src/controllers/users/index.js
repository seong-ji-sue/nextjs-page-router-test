import apis from '../../apis';
import {resToListConvertor} from '../../utils/func';
import convertor from '../../utils/convertor';

const findAll = async (req, res) => {
	const data = await apis.users.findAll();

	res
		.status(data.status)
		.send(resToListConvertor({data, func: convertor.read.users.users}));
};

export default {findAll};
