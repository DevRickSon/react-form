import {createAction, handleActions} from 'redux-actions';

const CHANGE = 'frm/CHANGE';

const GET_MANUFACT = 'frm/GET_MANUFACT';
const GET_MODEL = 'frm/GET_MODEL';
const GET_YEAR = 'frm/GET_YEAR';
const GET_GRADE = 'frm/GET_GRADE';

export const change = createAction(CHANGE);

export const getManufact = createAction(GET_MANUFACT);
export const getModel = createAction(GET_MODEL);
export const getYear = createAction(GET_YEAR);
export const getGrade = createAction(GET_GRADE);

const initialState = {
	manufact: '',
	model: '',
	year: '',
	grade: '',
	manufactItems: [],
	modelItems: [],
	yearItems: [],
	gradeItems: [],
	opt1: false,
	opt2: false,
	opt3: false,
	acc: ''
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
	}
}, initialState);