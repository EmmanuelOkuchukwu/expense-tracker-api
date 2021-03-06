const IncomeModel = require('../model/income.model');
const expressAsyncHandler = require('express-async-handler');

const createIncome = expressAsyncHandler(async (req, res) => {
    const { title, amount, description } = req?.body;
    try {
        const income = await IncomeModel.create({
            title, amount,
            description,
            user: req?.user?._id
        });
        res?.json(income);
    } catch(e) {
        res?.json(e);
    }
})

const fetchIncomes = expressAsyncHandler(async (req, res) => {
    const { page } = req?.query;
    try {
        const income = await IncomeModel.paginate({ user: req.user._id }, { limit: 6, page: Number(page), populate: "user" });
        res?.json(income);
    } catch(e) {
        res?.json(e);
    }
})

const fetchSingleIncome = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const income = await IncomeModel.findById(id);
        res?.json(income);
    } catch(e) {
        res?.json(e);
    }
})

const updateIncome = expressAsyncHandler(async (req, res) => {
    const { title, amount, description } = req?.body;
    const { id } = req?.params;
    try {
        const income = await IncomeModel.findByIdAndUpdate(id, {
            title, amount,
            description
        }, {
            new: true
        });
        res?.json(income);
    } catch(e) {
        res?.json(e);
    }
})

const deleteIncome = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const income = await IncomeModel.findByIdAndDelete(id);
        res?.json(income);
    } catch(e) {
        res?.json(e);
    }
})

module.exports = { createIncome, fetchIncomes, fetchSingleIncome, updateIncome, deleteIncome };
