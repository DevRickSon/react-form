import {createAction, handleActions} from 'redux-actions';

const CHANGE = 'frm/CHANGE';

const GET_MANUFACT = 'frm/GET_MANUFACT';
const GET_MODEL = 'frm/GET_MODEL';
const GET_YEAR = 'frm/GET_YEAR';
const GET_GRADE = 'frm/GET_GRADE';

const SET_MANUFACT = 'frm/SET_MANUFACT';
const SET_MODEL = 'frm/SET_MODEL';

const INIT_MODEL = 'frm/INIT_MODEL';
const INIT_YEAR = 'frm/INIT_YEAR';
const INIT_GRADE = 'frm/INIT_GRADE';

const INIT = 'frm/INIT';

export const change = createAction(CHANGE);

export const getManufact = createAction(GET_MANUFACT);
export const getModel = createAction(GET_MODEL);
export const getYear = createAction(GET_YEAR);
export const getGrade = createAction(GET_GRADE);

export const setManufact = createAction(SET_MANUFACT);
export const setModel = createAction(SET_MODEL);

export const initModel = createAction(INIT_MODEL);
export const initYear = createAction(INIT_YEAR);
export const initGrade = createAction(INIT_GRADE);

export const init = createAction(INIT);

const initialState = {
	isInit: false,
	manufact: '',
	model: '',
	year: '',
	grade: '',
	opt1: false,
	opt2: false,
	opt3: false,
	acc: '',
	manufactItems: [],
	modelItems: [],
	yearItems: [],
	gradeItems: []
};

export default handleActions({
	[CHANGE]: (state, action) => {
		const {name, value} = action.payload;

		return {
			...state,
			[name]: value
		}
	},

	[GET_MANUFACT]: (state, action) => {
		const items = [
			{
				name:'현대',
				code:'m001'
			},
			{
				name:'기아',
				code:'m002'
			},
			{
				name:'쉐보레',
				code:'m003'
			},
			{
				name:'벤츠',
				code:'m004'
			}
		];

		return {
			...state,
			manufactItems: items
		}
	},

	[GET_MODEL]: (state, action) => {
		const items = [
			{
				name:'911',
				code:'d001'
			},
			{
				name:'c60',
				code:'d002'
			},
			{
				name:'아반테',
				code:'d003'
			},
			{
				name:'k5',
				code:'d004'
			}
		];

		return {
			...state,
			modelItems: items
		}
	},

	[GET_YEAR]: (state, action) => {
		const items = [
			{
				name:'2016',
				code:'2016'
			},
			{
				name:'2017',
				code:'2017'
			},
			{
				name:'2018',
				code:'2018'
			},
			{
				name:'2019',
				code:'2019'
			}
		];

		return {
			...state,
			yearItems: items
		}
	},

	[GET_GRADE]: (state, action) => {
		const items = [
			{
				name:'스타일',
				code:'g001'
			},
			{
				name:'모던',
				code:'g002'
			},
			{
				name:'프리미엄',
				code:'g003'
			},
			{
				name:'럭셔리',
				code:'g004'
			}
		];

		return {
			...state,
			gradeItems: items
		}
	},

	[SET_MANUFACT]: (state, action) => {
		const {manufact, model, year, grade} = action.payload;

		return {
			...state,
			manufact: manufact,
			model: model,
			year: year,
			grade: grade
		}
	},

	[SET_MODEL]: (state, action) => {
		const {payload: model} = action;

		return {
			...state,
			model: model
		}
	},

	[INIT_MODEL]: state => ({
		...state,
		model: '',
		modelItems: []
	}),

	[INIT_YEAR]: state => ({
		...state,
		year: '',
		yearItems: []
	}),

	[INIT_GRADE]: state => ({
		...state,
		grade: '',
		gradeItems: []
	}),

	[INIT]: state => ({
		...state,
		isInit: true
	})
}, initialState);