const toggleButton = document.getElementsByClassName('menu-icon')[0]
const navbarlinks = document.getElementsByClassName('navbar')[0]

toggleButton.addEventListener('click', () => {
  navbarlinks.classList.toggle('active')
});


var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
				/*for each option in the original select element,
				create a new DIV that will act as an option item:*/
				c = document.createElement("DIV");
				c.innerHTML = selElmnt.options[j].innerHTML;
				c.addEventListener("click", function(e) {
					/*when an item is clicked, update the original select box,
					and the selected item:*/
					var y, i, k, s, h;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					h = this.parentNode.previousSibling;
					for (i = 0; i < s.length; i++) {
						if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
							for (k = 0; k < y.length; k++) {
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							break;
						}
					}
					h.click();
        });
        b.appendChild(c);
       }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
         });
  }

function closeAllSelect(elmnt) {
	/*a function that will close all select boxes in the document,
	except the current select box:*/
	var x, y, i, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	for (i = 0; i < y.length; i++) {
		if (elmnt == y[i]) {
		  arrNo.push(i)
	  } 
     else {
	  		y[i].classList.remove("select-arrow-active");
      }
	}
	for (i = 0; i < x.length; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

$(function(){
	$('#txtbirthdate').datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true
	});
});

function submitBday() {
	var Bdate = document.getElementById('txtbirthdate').value;
	var Bday = +new Date(Bdate);
	var Q4A = ~~ ((Date.now() - Bday) / (31557600000));
	document.getElementById('txtage').value=Q4A;
}

function check(){
	var Bdate = document.getElementById('txtbirthdate').value;
	var Bday = +new Date(Bdate);
	var Q4A = ~~ ((Date.now() - Bday) / (31557600000));
	var nbr = Number(document.getElementById("txtage").value=Q4A);

	if(document.getElementById('firstname').value=="") {
		alert('please enter your first name');
	}
	else if(document.getElementById('lastname').value=="") {
		alert('please enter your last name');
	}
	else if(document.getElementById('txtbirthdate').value=="") {
		alert('please enter your birthday');
	}
	else if(document.getElementById('sex').value=="0") {
		alert('please enter your sex');
	}
	else if(document.getElementById('phonenumber').value=="") {
		alert('please enter your phone number');
	}
	else if(document.getElementById('barangay').value=="") {
		alert('please enter your barangay');
	}
	else if(document.getElementById('municipality').value=="") {
		alert('please enter your municipality');
	}
	else if(document.getElementById('province').value=="") {
		alert('please enter your province');
	}
	else if(document.getElementById('visit').value=="0") {
		alert('please answer question 1');
	}
	else if(document.getElementById('test').value=="0") {
		alert('please answer question 2');
	}
	else if(document.getElementById('result').value=="0") {
		alert('please answer question 3');
	}
	else if(nbr < 18)
	{
		 alert("You are still underage, please let your parents do the task.");
		 location.reload();
	}
}


// Function to HTML encode the text
// This creates a new hidden element,
// inserts the given text into it	
// and outputs it out as HTML
function htmlEncode(value){
  return $('<div/>').text(value).html();
}

$(function (){
// Specify an onclick function
// for the generate button
$('#generate').click(function (){
  // Generate the link that would be
  // used to generate the QR Code
  // with the given data
  let finalURL =
    'https://chart.googleapis.com/chart?cht=qr&chl=' +
    htmlEncode($('#firstname').val()) + "," + htmlEncode($('#lastname').val()) + "," + htmlEncode($('#txtbirthdate').val()) + "," + htmlEncode($('#txtage').val()) + "," +
    htmlEncode($('#sex').val()) + "," + htmlEncode($('#phonenumber').val()) + "," + htmlEncode($('#barangay').val()) + htmlEncode($('#municipality').val()) + htmlEncode($('#province').val()) + "," +
    htmlEncode($('#visit').val()) + "," + htmlEncode($('#test').val()) + "," +htmlEncode($('#result').val()) +
    '&chs=160x160&chld=L|0'

    // Replace the src of the image with
    // the QR code images
    $('.qr-code').attr('src', finalURL);
  });
});


