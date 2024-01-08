let Total_Num_Slides = 0;

let Current_Slide_Index = 0;

// wait until the document is fully loaded before doing anyhting else
document.addEventListener( "DOMContentLoaded", function() {
	// called when the page is loaded
	
	// first we need to bring the text from the 1lt attribute of the img tag to the caption div
	SetupCaptionText();
	
	// should then show the first image of the slideshow
	ChangeToSlide(Current_Slide_Index);
} );

function BeginTimer() {
	// Called by the timer button on the webpage

	// grab the timer amount from the user:
	let seconds = document.getElementById("seconds").value;
	// also grab a reference to the timer id'd element for ease later
	let timer = document.getElementById("timer");

	// exit early if one of the objects are not present
	if (!seconds || !timer) {
		return;
	}

	// this function is called recursively once every second, and will only stop calling itself when the seconds var is at -1
	function tick() {
		seconds--;
		timer.textContent = seconds;
		let time = setTimeout(tick, 1000);
		if (seconds == -1) {
			alert("Timer is done.");
			clearTimeout(time);
			timer.textContent = "";
		}
	}
	tick();
}

function SetupCaptionText() {
	// first, our js has no idea how many images are on the page
	// we need to figure this out somehow - using the class name assigned to each slide in the page

	// grab all caption text classes  
	Total_Num_Slides = document.getElementsByClassName("caption-text").length;

	// then we need to loop over each slide
	// from there we know that all slides are numbered from 1 - n, so we can use these ids to get the elements
	for (let i = 0; i < Total_Num_Slides; i++) {
		let t1 = "caption-text-" + parseInt(i+1);	// this is the div containing the caption text
		let t2 = "car" + parseInt(i+1);				// this is the actual img

		// set the div text to be the same as the alt text for the img
		document.getElementById(t1).innerHTML = document.getElementById(t2).alt;
	}
}

function NextSlide() {
	// should add one to the current slide index
	ChangeToSlide(Current_Slide_Index + 1);
}

function PrevSlide() {
	// should remove one from the current slide index
	ChangeToSlide(Current_Slide_Index - 1);
}

/**
 * @param {int} slideNum 
 */
function ChangeToSlide(slideNum) {
	// this function will actually make sure the slideNum that we pass in is a valid index from 0 -> Total_Num_Sides - 1
	Current_Slide_Index = (slideNum >= 0) ? (slideNum % Total_Num_Slides) : (Total_Num_Slides + (slideNum % Total_Num_Slides));

	// then we need to show the selected slide
	UpdateShownSlide();
}

function UpdateShownSlide() {
	// next, we need to decide which slide is currently visable
	// we do this by setting them all to no visibility first, then only updating the visible one

	// we need slides and dots here:
	// slides is a list of all the divs with class "my-slides"
	let slides = document.getElementsByClassName("my-slides");
	// dots is a list of all the spans with class "dot"
	let dots = document.getElementsByClassName("dot");

	// next loop over both arrays and set them to inactive / not display
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
		dots[i].className = "dot";
	}

	// finally we can set the current slide index to display properly
	slides[Current_Slide_Index].style.display = "block";
	dots[Current_Slide_Index].className += " active";
}