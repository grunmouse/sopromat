let FlatBar = require('./flat-bar.js'); //Полоса или прямоугольная балка
let AngleBar = require('./angle-bar.js'); //Уголок
let TeeBar = require('./tee-bar.js'); //Тавр
let EqualFlangeChannelBar = require('./equal-flange-chanell-bar.js'); //Равнополочный швеллер
let EqualFlangeDoubleTeeBar = require('./equal-flange-double-tee-bar.js'); //Равнополочный двутавр
let EqualFlangeWeeBar = require('./equal-flange-wee-bar.js'); //Ш-образный проифль
let CircleTube = require('./circle-tube.js'); //Круглая труба
let RectangleTube = require('./rectangle-tube.js'); //Прямоугольная труба
let SquareTube = require('./square-tube.js'); //Прямоугольная труба
let Circle = require('./circle.js'); //Круглый пруток
let Square = require('./square.js'); //Квадратный пруток

let createFactory = require('./profile-factory.js');
let list = [
		FlatBar,
		AngleBar,
		TeeBar,
		EqualFlangeChannelBar,
		EqualFlangeDoubleTeeBar,
		CircleTube,
		RectangleTube,
		SquareTube,
		Circle,
		Square,
		EqualFlangeWeeBar
	];
	
let factory = createFactory(list);


module.exports = {
	FlatBar,
	AngleBar,
	TeeBar,
	EqualFlangeChannelBar,
	EqualFlangeDoubleTeeBar,
	EqualFlangeWeeBar,
	
	CircleTube,
	RectangleTube,

	Circle,
	Square,
	
	
	list,
	factory
};