const heading = "VOICE RECOGNITION";
let i = 0;

const typing = () => {
	while(true){
		if (0 < heading.length) {
			document.querySelector(".heading").innerHTML += heading.charAt(i);
			i++;
	
			setTimeout(typing , 150);
		}
	}
}

