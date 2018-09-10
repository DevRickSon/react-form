import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as frmActions from './store/modules/frm';
import {withRouter} from 'react-router-dom';

class FrmContainer extends Component {
	static defaultProps = {
		passManufact: '',
		passModel: '',
		passYear: '',
		passGrade: ''
	};

	handleChange = e => {
		const {FrmActions} = this.props;
		const {target} = e;
		const {name, type} = target;
		const value = (type === 'checkbox') ? target.checked : target.value;

		FrmActions.change({name, value});

		if(name === 'manufact' || name === 'model' || name === 'year' || name === 'grade'){
			this.addRoute(name, value);
		}
	}

	addRoute = (name, value) => {
		const {history, manufact, model, year} = this.props;
		const param = value !== '' ? `/${value}` : '';

		let path = '';

		switch(name.toUpperCase()){
			case 'MANUFACT':
				path = `/${value}`;
				break;

			case 'MODEL':
				path = `/${manufact}${param}`;
				break;
			case 'YEAR':
				path = `/${manufact}/${model}${param}`;
				break;
			case 'GRADE':
				path = `/${manufact}/${model}/${year}${param}`;
				break;
			default:
		}

		history.push(path);
	}

	componentDidMount(){
		const {FrmActions} = this.props;
		FrmActions.getManufact();

		// const mock = {
		// 	manufact: 'm001',
		// 	model: 'd002',
		// 	year: '2019',
		// 	grade: 'g003'
		// };
		//
		// const setItem = async () => {
		// 	await this.initStatus('manufact', mock.manufact);
		// 	await this.initStatus('model', mock.model);
		// 	await this.initStatus('year', mock.year);
		// 	await this.initStatus('grade', mock.grade);
		// }
		//
		// setItem();
	}

	initStatus = (name, value) => {
		const {FrmActions} = this.props;
		FrmActions.change({name, value});
		this.addRoute(name, value);
	}

	componentDidUpdate(prevProps, prevState){
		const {passManufact, passModel, passYear, passGrade, yearItems, gradeItems} = this.props;

		if(prevProps.passManufact !== passManufact){
			const {FrmActions} = this.props;

			if(passManufact !== ''){
				FrmActions.change({name: 'manufact', value: passManufact});
				FrmActions.getModel();
			}else{
				FrmActions.change({name: 'manufact', value: ''});
				FrmActions.change({name: 'modelItems', value: []});
			}
			FrmActions.change({name: 'model', value: ''});

			if(yearItems.length){
				FrmActions.change({name: 'year', value: ''});
				FrmActions.change({name: 'yearItems', value: []});
			}

			if(gradeItems.length){
				FrmActions.change({name: 'grade', value: ''});
				FrmActions.change({name: 'gradeItems', value: []});
			}
		}

		if(prevProps.passModel !== passModel){
			const {FrmActions} = this.props;

			if(passModel !== ''){
				FrmActions.change({name: 'model', value: passModel});
				FrmActions.getYear();
			}else{
				FrmActions.change({name: 'model', value: ''});
				FrmActions.change({name: 'yearItems', value: []});
			}
			FrmActions.change({name: 'year', value: ''});

			if(gradeItems.length){
				FrmActions.change({name: 'grade', value: ''});
				FrmActions.change({name: 'gradeItems', value: []});
			}
		}

		if(prevProps.passYear !== passYear){
			const {FrmActions} = this.props;

			if(passYear !== ''){
				FrmActions.change({name: 'year', value: passYear});
				FrmActions.getGrade();
			}else{
				FrmActions.change({name: 'year', value: ''});
				FrmActions.change({name: 'gradeItems', value: []});
			}
			FrmActions.change({name: 'grade', value: ''});
		}

		if(prevProps.passGrade !== passGrade){
			const {FrmActions} = this.props;

			if(passGrade !== ''){
				FrmActions.change({name: 'grade', value: passGrade});
			}else{
				FrmActions.change({name: 'grade', value: ''});
			}
		}
	}

	render() {
		const {manufact, model, year, grade, opt1, opt2, opt3, acc, manufactItems, modelItems, yearItems, gradeItems} = this.props;
		const {handleChange} = this;

		return (
			<Fragment>
				<div>
					<select name="manufact" value={manufact} onChange={handleChange}>
						<option value="">제조사</option>
						{
							manufactItems.map(manufact => <option key={manufact.code} value={manufact.code}>{manufact.name}</option>)
						}
					</select>
				</div>
				<div>
					<select name="model" value={model} onChange={handleChange}>
						<option value="">모델</option>
						{
							modelItems.map(model => <option key={model.code} value={model.code}>{model.name}</option>)
						}
					</select>
				</div>
				<div>
					<select name="year" value={year} onChange={handleChange}>
						<option value="">연식</option>
						{
							yearItems.map(year => <option key={year.code} value={year.code}>{year.name}</option>)
						}
					</select>
				</div>
				<div>
					<select name="grade" value={grade} onChange={handleChange}>
						<option value="">등급</option>
						{
							gradeItems.map(grade => <option key={grade.code} value={grade.code}>{grade.name}</option>)
						}
					</select>
				</div>
				<div>
					<input type="checkbox" id="opt1" name="opt1" checked={opt1} onChange={handleChange}/>
					<label htmlFor="opt1">선루프</label>
					<input type="checkbox" id="opt2" name="opt2" checked={opt2} onChange={handleChange}/>
					<label htmlFor="opt2">네비게이션</label>
					<input type="checkbox" id="opt3" name="opt3" checked={opt3} onChange={handleChange}/>
					<label htmlFor="opt3">후방 카메라</label>
				</div>
				<div>
					<input type="radio" id="acc1" name="acc" value="none" checked={acc === 'none'} onChange={handleChange}/>
					<label htmlFor="acc1">무사고</label>
					<input type="radio" id="acc2" name="acc" value="sheet" checked={acc === 'sheet'} onChange={handleChange}/>
					<label htmlFor="acc2">외부패널교환</label>
					<input type="radio" id="acc3" name="acc" value="accident" checked={acc === 'accident'} onChange={handleChange}/>
					<label htmlFor="acc3">사고</label>
				</div>
			</Fragment>
		);
	}
}

export default connect(
	state => ({
		isInit: state.frm.isInit,
		manufact: state.frm.manufact,
		model: state.frm.model,
		year: state.frm.year,
		grade: state.frm.grade,
		opt1: state.frm.opt1,
		opt2: state.frm.opt2,
		opt3: state.frm.opt3,
		acc: state.frm.acc,
		manufactItems: state.frm.manufactItems,
		modelItems: state.frm.modelItems,
		yearItems: state.frm.yearItems,
		gradeItems: state.frm.gradeItems
	}),
	dispatch => ({
		FrmActions: bindActionCreators(frmActions, dispatch)
	})
)(withRouter(FrmContainer));
