document.addEventListener ("DOMContentLoaded", function(event) {
    	// Your code to run since DOM is loaded and ready
	Add_events();
});

// Filter input
function Check_radio_input () {
	let radio_input_value;

	// R7
	if(document.getElementById('R7-49811').checked) {
  		radio_input_value = "3AUA0000049811";
	} else if(document.getElementById('R7-49834').checked) {
  		radio_input_value = "3AUA0000049834";
	} else if(document.getElementById('R7-50248').checked) {
  		radio_input_value = "3AUA0000050248";
	}

	// R8
	else if(document.getElementById('R8-49823').checked) {
  		radio_input_value = "3AUA0000049823";
	} else if(document.getElementById('R8-49829').checked) {
  		radio_input_value = "3AUA0000049829";
	} else if(document.getElementById('R8-50269').checked) {
  		radio_input_value = "3AUA0000050269";
	} else if(document.getElementById('R8-50271').checked) {
  		radio_input_value = "3AUA0000050271";
	}

	let input_value = document.getElementById("input").value;
	input_value = input_value.replace(/\s/g, "")
	if (input_value == null || input_value == "") {
		alert("NO INPUT!");
	}
	else {
		Check_material_code_of_capacitor_bank(input_value, radio_input_value);
		Reset_input();
	}
}

// Check filtered input for correct material code
function Check_material_code_of_capacitor_bank (i_value, r_i_value) {
	// hardcoded material codes - R7
	const a = "64410504";
	const b = "64410521";
	const c = "64650581";

	// hardcoded material codes - R8
	const d = "64410512";
	const e = "64410539";

	// Greeck unicode micro sign
	const u = "\u03BC";

	let truncated_value = i_value.substring(0, 8);
	switch (truncated_value) {	
		// R7
		case a:
			if (r_i_value == "3AUA0000049811") {
				alert(`4PC ${a} 5700${u}F 400V - OK!`);
			} else {
				Alert_mismatch();
			}
		break;
		case b:
			if (r_i_value == "3AUA0000049834") {
				alert(`3PC ${b} 8600${u}F 385V - OK!`);
			} else if (r_i_value == "3AUA0000050248") {
				alert(`3PC ${b} 8600${u}F 385V + 1PC ${c} 430${u}F 1000V! - OK!`);
			} else {
				Alert_mismatch();
			}
		break;

		// R8
		case d:
			if (r_i_value == "3AUA0000049823") {
				alert(`10PC ${d} 4100${u}F 400V - OK!`);
			} else if (r_i_value == "3AUA0000049829") {
				alert(`14PC ${d} 4100${u}F 400V - OK!`);
			} else {
				Alert_mismatch();
			}
		break;
		case e:
			if (r_i_value == "3AUA0000050269") {
				alert(`12PC ${e}  4600${u}F 385V - OK!`);
			} else if (r_i_value == "3AUA0000050271") {
				alert(`15PC ${e}  4600${u}F 385V - OK!`);
			} else {
				Alert_mismatch();
			}
		break;
		default:
			alert("<h1>Incorrect input!<h1>");
	}
	Focus_on_input();
}

// Reset inpu in case of accidental wrong input by user
function Reset_input () {
	document.getElementById("input").value = "";
}

function Focus_on_input () {
	document.getElementById("input").focus();
}

// Alert for mismatch
function Alert_mismatch () {
	alert("Required material code or material mismatch!");
}

// Event applier
function Add_events () {
	// Detect Enter button or cariage return from bar scanner after scanning capacitor barcode
	const text_input = document.getElementById('input');
	text_input.addEventListener("keydown", Check_if_enter);
	function Check_if_enter (e) {
		if (e.code == "Enter") {
			Check_radio_input();
		}
	}

	// Focus back to input if any keyboard button is pressed except Tabular key
	const html = document.getElementById('html');
	html.addEventListener('keydown', Check_if_clicked_anywhere);
	function Check_if_clicked_anywhere(e) {
		if (e.code != "Tab") {
			Focus_on_input();
		}
	}
}