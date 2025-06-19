import { User } from '../models/user.js'
import { Task } from '../models/task.js'
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';
import { encriptar } from "../common/byscript.js";

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'status', 'password'],
            order: [['id', 'DESC']],
            where: {
                status: Status.ACTIVE,
            }
        });
        return res.json(users);
    } catch (error) {
        // logger.error(error.message);
        // return res.status(500).json( { message: error.message})

    }
}

async function createUser(req, res) {
    const  { username, password } = req.body;
    try {
        const user = await User.create({
            username,
            password
        });
        return res.json(user)
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json( { message: error.message})
    }
    
}

async function getUser(req, res, next) {
    const { id } = req.params;
    try {
        // const user = await User.findByPk(id);
        const user = await User.findOne({
            attributes: ['username', 'status'],
            where: {
                id
            }
        });
        if (!user) res.status(400).json({ message: 'User not found'})
        res.json(user)
    } catch (error) {
        next(error)
    }
}

async function updateUser(req, res, next) {
    const { id } = req.params;
    const { username, password }  = req.body;
    try {
        if (!username && !password) {
            res.status(400).json({ message: 'Username or password is required'})
        }
        const passwordEncriptado = await encriptar(password);
        const user = await User.update({
            username,
            password: passwordEncriptado
        }, {
            where: {
                id
            }
        });

        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
        await User.destroy({
            where: {
                id,
            }
        })
        res.status(204).json({ message: 'User deleted'});
    } catch (error) {
        next(error)
    }
}

async function activateInactivate(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status) {
            res.status(400).json({ message: 'Status is required'});
        }
        const user = await User.findByPk(id);

        if (!user) res.status(404).json({ message: 'User not found'});

        if (user.status == status) {
            res.status(409).json({ message: 'Same status'});
        }

        user.status = status;
        await user.save();
        res.json(user)
    } catch (error) {
        next(error);
    }
}

async function getTasks(req, res, next) {
    const { id} = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            include: [{
                model: Task,
                attributes: ['name', 'done'],
                where: {
                    done: true
                }
            }],
            where: {
                id
            }
        })
        res.json(user)
    } catch (error) {
        next(error);
    }
}

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    activateInactivate,
    getTasks,
};