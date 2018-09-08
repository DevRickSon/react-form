import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as frmActions from './store/modules/frm';

class FrmContainer extends Component {
	handleChange = e => {
		const {FrmActions} = this.props;
		const {target} = e;
		const {name, type} = target;
		const value = (type === 'checkbox') ? target.checked : target.value;

		FrmActions.change({name, value});
	}

	componentDidMount(){
		const {FrmActions, passManufact, passModel, passYear, passGrade} = this.props;
		FrmActions.getManufact();
		this.initStatus(passManufact, passModel, passYear, passGrade);
	}

	initStatus = async (manufact, model, year, grade) => {
		const {FrmActions} = this.props;
		await FrmActions.setManufact({manufact, model, year, grade});
		FrmActions.init();
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.manufact !== this.props.manufact){
			const {FrmActions} = this.props;

			if(this.props.isInit) FrmActions.initModel();

			if(this.props.manufact !== ''){
				FrmActions.getModel();
			}
		}

		if(prevProps.model !== this.props.model){
			const {FrmActions} = this.props;

			if(this.props.isInit) FrmActions.initYear();

			if(this.props.model !== ''){
				FrmActions.getYear();
			}
		}

		if(prevProps.year !== this.props.year){
			const {FrmActions} = this.props;

			if(this.props.isInit) FrmActions.initGrade();

			if(this.props.year !== ''){
				FrmActions.getGrade();
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
)(FrmContainer);
