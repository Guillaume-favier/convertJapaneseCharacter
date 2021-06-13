function loadJSON(callback) {   
	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
	xobj.open('GET', 'dico.json', true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);  
}
let dico = {}
loadJSON((e)=>{
	dico = charge(e)
})
const replaceForJapanese = (list, text) => {
	let res = text
	list.forEach(element => {
		res = res.replaceAll(element["base"],element["to"])
	});
	return res
}
const replaceForRomanji = (list, text) => {
	let res = text
	list.forEach(element => {
		res = res.replaceAll(element["to"],element["base"])
	});
	return res
}
const convert = (text,dico,sence) => {
	let res = text
	let convfunc = ()=>{}
	if (sence) convfunc = replaceForRomanji
	else convfunc = replaceForJapanese
	const convlist = [
		dico["hiragana"]["chisaitsu"]["yoon"],
		dico["katakana"]["chisaitsu"]["yoon"],
		dico["hiragana"]["chisaitsu"]["dakuontohandakuon"],
		dico["katakana"]["chisaitsu"]["dakuontohandakuon"],
		dico["hiragana"]["chisaitsu"]["gojuon"],
		dico["katakana"]["chisaitsu"]["gojuon"],
		dico["hiragana"]["yoon"],
		dico["katakana"]["yoon"],
		dico["hiragana"]["dakuontohandakuon"],
		dico["katakana"]["dakuontohandakuon"],
		dico["hiragana"]["gojuon"],
		dico["katakana"]["gojuon"]
	]
	for (let i = 0; i < convlist.length; i++) {
		res = convfunc(convlist[i],res)
	}
	
	console.log("from \""+text+"\" to \""+res+"\"")
	return res
}
document.getElementById("checkbox").onchange = (e)=>{
	if (e.target.checked) document.getElementById("inputText").placeholder = "romanji / ローマ字"
	else document.getElementById("inputText").placeholder = "japanese / 日本語"
}
document.getElementById("form").onsubmit = (e) => {
	e.preventDefault()
	document.getElementById("output").innerHTML = convert(e.target[0].value, dico,e.target[1].checked)
}