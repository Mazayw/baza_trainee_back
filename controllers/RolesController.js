import RoleModel from '../models/Roles.js';

export const create = async (req, res) => {
	const { name } = req.body;
	try {
		const doc = new RoleModel({
			name,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create role`, error });
	}
};

export const getAll = async (req, res) => {
	try {
		const roles = await RoleModel.find();
		res.json(roles);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get roles`, error });
	}
};

export const getOneById = async (req, res) => {
	try {
		const roleId = req.params.id;
		const role = await RoleModel.findById(roleId);
		if (!role) {
			return res.status(404).json({ message: 'Role not found' });
		}
		res.json(role);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get role`, error });
	}
};

export const removeOneById = async (req, res) => {
	try {
		const roleId = req.params.id;
		const role = await RoleModel.findOneAndRemove(roleId);
		if (!role) {
			return res.status(404).json({ message: 'Role not found' });
		}
		res.json(role);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove role card`, error });
	}
};

export const updateOneById = async (req, res) => {
	try {
		const { name } = req.body;
		const roleId = req.params.id;
		const role = await RoleModel.findOneAndUpdate(
			{ _id: roleId },
			{
				name,
			},
			{ new: true }
		);
		if (!role) {
			return res.status(404).json({ message: 'Role not found' });
		}
		res.json(role);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update role`, error });
	}
};
