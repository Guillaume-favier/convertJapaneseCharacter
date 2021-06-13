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

const setup = () => {
	document.getElementById("formrom").onsubmit = (e) => {
		e.preventDefault()
		document.getElementById("inpjap").value = convert(e.target[0].value, dico, true)
	}
	document.getElementById("formjap").onsubmit = (e) => {
		e.preventDefault()
		document.getElementById("inprom").value = convert(e.target[0].value, dico, false)
	}
}

const change = (e) => {
	
	const val = [document.getElementById("inprom").value,document.getElementById("inpjap").value]
	const tmp = document.getElementById("sub1").innerHTML
	document.getElementById("sub1").innerHTML = document.getElementById("sub2").innerHTML
	document.getElementById("sub2").innerHTML = tmp
	document.getElementById("inprom").value = val[0]
	document.getElementById("inpjap").value = val[1]
	setup()
}
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'Control') return;
  if (event.ctrlKey) {
    if (keyName == "b") {
		change()
	}
  }
}, false);

document.getElementById("change").onsubmit = (e) => {
	e.preventDefault()
	change()
}
setup()