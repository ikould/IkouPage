(function(b) {
	console.log("FWebChromeClient initialization begin");
	var a = {
		queue: [],
		callback: function() {
			var d = Array.prototype.slice.call(arguments, 0);
			var c = d.shift();
			var e = d.shift();
			appJs.outTest(d);
			this.queue[c].apply(this, d);
			if (!e) {
				delete this.queue[c]
			}
		}
	};

	function hh() {
		var f = Array.prototype.slice.call(arguments, 0);
		if (f.length < 1) {
			throw "FWebChromeClient call error, message:miss method name"
		}
		var e = [];
		for (var h = 1; h < f.length; h++) {
			var c = f[h];
			var j = typeof c;
			e[e.length] = j;
			if (j == "function") {
				var d = a.queue.length;
				a.queue[d] = c;
				f[h] = d
			}
		}
		var g = JSON.parse(prompt(JSON.stringify({
			method: f.shift(),
			types: e,
			args: f
		})));
		if (g.code != 200) {
			throw "FWebChromeClient call error, code:" + g.code + ", message:" + g.result
		}
		return g.result
	};
	Object.getOwnPropertyNames(a).forEach(function(d) {
		var c = a[d];
		if (typeof c === "function" && d !== "callback") {
			a[d] = function() {
				return c.apply(a, [d].concat(Array.prototype.slice.call(arguments, 0)))
			}
		}
	});
	b.FWebChromeClient = a;
	console.log("FWebChromeClient initialization end")
})(window)