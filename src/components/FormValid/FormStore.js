/*
   数据结构 model = {
       [name] -> {
           value     -> 表单值    (可以重新设定)
           rule      -> 验证规则  ( 可以重新设定)
           errorMsg  -> 错误信息
           status    -> 验证状态  resolve -> 成功状态 ｜reject -> 失败状态 ｜ pendding -> 待验证状态
       }
   }
*/

import { sortBy, merge, assign } from 'lodash';

class FormStore {
	static order = 0;
	constructor({ model, updateForm }) {
		this.model = model || {};
		this.updateForm = updateForm;
		this.updateQueue = [];
	}
	updateForm() {
		this.updateForm();
	}
	registerModel(name, obj) {
		// merge, 如果 obj 里面的值有 undefined, 则不会合并
		this.model[name] = merge(
			{
				order: FormStore.order++,
				value: '',
				rule: () => {},
				name,
				errorMsg: '',
				status: 'pending',
			},
			obj
		);
	}
	unRegisterModel(name) {
		delete this.model[name];
	}
	getValue(name, key) {
		return this.model[name][key];
	}
	setValue(name, obj, updateDirect = true) {
		assign(this.model[name], obj);
		if (updateDirect) {
			this.update(name);
		} else {
			this.updateQueue.push(() => {
				this.update(name);
			});
		}
	}
	update(name) {
		this.model[name].update();
	}
	resetOtherValid(name) {
		Object.keys(this.model).forEach((modelName) => {
			if (modelName === name) return;
			this.setValue(
				modelName,
				{
					status: 'pendding',
					errorMsg: '',
				},
				false
			);
		});
	}
	async onSubmit(callback) {
		if (typeof callback !== 'function') return;
		const modelValues = sortBy(Object.values(this.model), ['order']);
		for (let i = 0; i < modelValues.length; i++) {
			const item = modelValues[i];
			const { name } = item;
			const isValid = await this.triggerValid(name);
			if (!isValid) {
				callback(item.errorMsg, this.model);
				return;
			}
		}
		callback(null, this.model);
	}
	batchUpdate() {
		while (this.updateQueue.length > 0) {
			const updateFn = this.updateQueue.shift();
			updateFn(); /* 触发更新 */
		}
	}
	async triggerValid(name) {
		try {
			const { value, rule } = this.model[name];
			if (typeof rule !== 'function') return;
			// this.setValue(name, {
			// 	status: 'pendding',
			// 	errorMsg: '',
			// });
			const errorMsg = await rule(value);
			this.setValue(
				name,
				{
					status: errorMsg ? 'reject' : 'resolve',
					errorMsg,
				},
				false
			);
			if (errorMsg) {
				this.resetOtherValid(name);
				return false;
			}
			return true;
		} catch (e) {
			console.error(e);
			return false;
		} finally {
			this.batchUpdate();
		}
	}
}

export default FormStore;
