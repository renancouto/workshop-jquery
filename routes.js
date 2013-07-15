module.exports = function(app) {
	// Home
	app.get('/', function(req, res) {
		res.render('index', { nav: nav });
	});
};

var nav = [
	{ "label": "sobre" },
	{ "label": "seletores" },
	{ "label": "eventos" },
	{ "label": "manipulação", "link": "manipulacao" },
	{ "label": "ajax" },
	{ "label": "callbacks" },
	{ "label": "fun" }
];