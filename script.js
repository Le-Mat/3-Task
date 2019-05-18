let cards = document.querySelectorAll('.card'),
	button = document.getElementById('start'),
	сlock = document.getElementById('сlock'),
	counterOpenCart = 0,
	colors = ['Green', 'Yellow', 'Red', 'Blue', 'Black', 'Purple', 'Gray', 'Orange',
						'Green', 'Yellow', 'Red', 'Blue', 'Black', 'Purple', 'Gray', 'Orange'],
	colorsCards = [],
	secondStep = false,
	lastCard,
	lastColor,
	mSec = 0,
	sec = 0,
	min = 0,
	timerInterval;

//Случайное добаление цветов клеткам
for(let i = 0 ; i < 16; i++){
	let SelectedColor =  Math.floor(Math.random() * (16 - i ));

	colorsCards[i] = colors[ SelectedColor ];
	colors.splice( SelectedColor , 1 );

	cards[i].onclick = () => { step(i); };
}

button.addEventListener ("click", startGame);

function step(num){
	cards[num].style.backgroundColor = colorsCards[ num ];
	if (secondStep && lastCard !== cards[num] ){
		secondStep = false
		if ( lastColor === colorsCards[ num ] ){
			cards[ lastCard ].style.pointerEvents='none';
			cards[num].style.pointerEvents='none';
			counterOpenCart += 2;
			return 0;
		}
		cards[ lastCard ].style.backgroundColor = "White";
		setTimeout(() => {cards[num].style.backgroundColor = "White";}, 250);
		return 0;
	}
	secondStep = true;
	lastCard = num;
	lastColor = colorsCards[ num ];
}

function startGame() {
	for(let i = 0; i < 16;i++){
		cards[i].style.pointerEvents='auto';
	}
	 timerInterval = setInterval ( timer , 1);
}




function timer() {
	let stringTimer = "";
	mSec++;
	if(mSec === 1000) {
		sec++
		mSec = 0;
	}
	if(sec === 60) {
		min++;
		sec = 0;
	}
	stringTimer = min + ":" + sec + "." + mSec;
	clock.innerHTML = stringTimer;
	if (counterOpenCart === 16 ){
		clearTimeout(timerInterval);
		alert("Вы выиграли!" + "\r\nЗатраченное время: " + stringTimer );
	}
}
