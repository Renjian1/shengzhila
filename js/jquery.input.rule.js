/**
 * Created by Zed on 2016/1/28. 输入框内容检测插件
*/
jQuery.fn.inputCheck = function(properties){
	var defaults = {
		callback:function(){}
	}
	jQuery.extend(defaults,properties);
	var result = new Object(),realLength = 0, len = this.val().length, charCode = -1;
	var regexp = {
		china: /[\u4E00-\u9FA5]/, // 中文
		decimal: /^\d+(\.\d+)?$/, // 小数
		number: /^[0-9]*[1-9][0-9]*$/,
		phone: /^1[3,5,7,8]\d{9}$/, // 手机号码
		tel: /^0\d{2,3}-?\d{7,8}$/, // 电话号码
		specialPhone: /^(10086|10000|10010)$/, //特殊的电话号码
		businessPhone: /^(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/, //400的号码验证
		email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
		url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
		peopleId: /\d{17}[\d|x]|\d{15}/,
		username: /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4E00-\u9FA5]{5,15}$/,
		date: /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/,
		nbsp: /\s/ //判断空格
	}

	//计算输入框内容的长度，一个中文等于两个字符
	for (var i = 0; i < len; i++) {
		charCode = this.val().charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}

	result.china = regexp.china.test(this.val())  ? true : false;
	result.decimal = regexp.decimal.test(this.val())  ? true : false;
	result.number = regexp.number.test(this.val())  ? true : false;
	result.phone = regexp.phone.test(this.val()) || regexp.tel.test(this.val()) || regexp.specialPhone.test(this.val()) || regexp.businessPhone.test(this.val())  ? true : false;
	result.email = regexp.email.test(this.val())  ? true : false;
	result.url = regexp.url.test(this.val())  ? true : false;
	result.nbsp = regexp.nbsp.test(this.val())  ? true : false;
	result.peopleId = regexp.peopleId.test(this.val())  ? true : false;
	result.username = regexp.username.test(this.val())  ? true : false;
	result.date = regexp.date.test(this.val())  ? true : false;
	result.length = realLength/2;
	defaults.callback(result);
}


