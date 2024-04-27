document.addEventListener ("DOMContentLoaded", function(event) {
    	// Your code to run since DOM is loaded and ready
	Apply_event_listeners();
});

// Capacitor assembly type R7
const R7_type1 = "3AUA0000049811";
const R7_type2 = "3AUA0000049834";
const R7_type3 = "3AUA0000050248";

// Capacitor assembly type R8
const R8_type1_2 = "3AUA0000049823_3AUA0000049829";
const R8_type3_4 = "3AUA0000050269_3AUA0000050271";

// Capacitor bank type used for R7
const bank_type1 = "64410504";
const bank_type2 = "64410521";
const bank_type3 = "64650581";

// Capacitor bank type used for R8
const bank_type4 = "64410512";
const bank_type5 = "64410539";

// State for alert window, true = alert window open
let state = false;
// Filter input
function Check_radio_input () {
	state = true;
	let radio_input_value;

	// R7
	if(document.getElementById('R7-49811').checked) {
  		radio_input_value = R7_type1;
	} else if(document.getElementById('R7-49834').checked) {
  		radio_input_value = R7_type2;
	} else if(document.getElementById('R7-50248').checked) {
  		radio_input_value = R7_type3;
	}

	// R8
	else if(document.getElementById('R8-49823_49829').checked) {
  		radio_input_value = R8_type1_2;
	} else if(document.getElementById('R8-50269_50271').checked) {
  		radio_input_value = R8_type3_4;
	}

	let input_value = document.getElementById("input").value;
	input_value = input_value.replace(/\s/g, "")
	if (input_value == null || input_value == "") {
		Alert_window_open("NO INPUT!", false);
	}
	else {
		Check_material_code_of_capacitor_bank(input_value, radio_input_value);
		Reset_input();
	}
}

// Check filtered input for correct material code
function Check_material_code_of_capacitor_bank (i_value, r_i_value) {
	// Greeck unicode micro sign
	const u = "\u03BC";

	let truncated_value = i_value.substring(0, 8);

	switch (truncated_value) {
		// R7
		case bank_type1:
			if (r_i_value == "3AUA0000049811") {
				Alert_window_open(`4PC - ${bank_type1} 5700${u}F 400V - OK!`, true);
			} else {
				Alert_mismatch();
			}
		break;
		case bank_type2:
			if (r_i_value == "3AUA0000049834") {
				Alert_window_open(`3PC - ${bank_type2} 8600${u}F 385V - OK!`, true);
			} else if (r_i_value == "3AUA0000050248") {
				Alert_window_open(`3PC - ${bank_type2} 8600${u}F 385V + 1PC - ${bank_type3} 430${u}F 1000V! - OK!`, true);
			} else {
				Alert_mismatch();
			}
		break;

		// R8
		case bank_type4:
			if (r_i_value == "3AUA0000049823_3AUA0000049829") {
				Alert_window_open(`10 - 14PC - ${bank_type4} 4100${u}F 400V - OK!`, true);
			} else {
				Alert_mismatch();
			}
		break;
		case bank_type5:
			if (r_i_value == "3AUA0000050269_3AUA0000050271") {
				Alert_window_open(`12 - 15PC - ${bank_type5}  4600${u}F 385V - OK!`, true);
			} else {
				Alert_mismatch();
			}
		break;
		default:
			Alert_window_open("INCORRECT INPUT!", false);
	}
}

// Reset input in case of accidental wrong input by user
function Reset_input () {
	document.getElementById("input").value = "";
}

function Focus_on_input () {
	document.getElementById("input").focus();
}

// Alert for mismatch
function Alert_mismatch () {
	Alert_window_open("Required material code or material mismatch!", false);
}

// Event applier
function Apply_event_listeners () {
	// Detect Enter button or cariage return from bar scanner after scanning capacitor barcode
	const text_input = document.getElementById('input');
	text_input.addEventListener("keydown", Check_if_enter);
	function Check_if_enter (e) {
		if (e.code == "Enter" && state != true) {
			Check_radio_input();
		} else {
			state = false;
			Alert_window_close();
		}
	}

	// Focus back to input if any keyboard button is pressed except Tabular key
	const html = document.getElementById('html');
	html.addEventListener('keydown', Check_if_clicked_anywhere);
	function Check_if_clicked_anywhere(e) {
		if (e.code != "Tab" && state != true) {
			Focus_on_input();
		}
	}
}

function Alert_window_open (text, ok_nok) {
	const alert_window = document.getElementById("alert_window_container");
	alert_window.style.display = "block";
	document.getElementById("alert_window_text").innerText = text;

	const alert_window_content = document.getElementById("alert_window_content");
	if(ok_nok) {
		alert_window_content.style.backgroundColor = "rgb(138, 248, 118)";
	} else {
		alert_window_content.style.backgroundColor = "rgb(252, 170, 170)";
	}
}
function Alert_window_close () {
	const alert_window = document.getElementById("alert_window_container");
	alert_window.style.display = "none";
}

function Close_alert_window_button () {
	state = false;
	Alert_window_close();
	Focus_on_input();
}
