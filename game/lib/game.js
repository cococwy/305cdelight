/*
	Timer
*/

/*
	Game
*/
var Game = function(timerCanvas,scoreCanvas){
	var animation_delay = 400;
	var gControl = this;
	var timerCanvasID = timerCanvas;
	var scoreCanvasID = scoreCanvas;
	var totalScore = 0;
	var correctScore = 20;
	var countDown;
	var MSG =
	{
	  //Game Form
	  "TIMEUP":'Time’s Up! Play Agian!',
	  "FINISH":'Congregation! You complete the game.'
	};

	var clock = {
		start: 0,
		end: 20,
		current: 0,
		seconds: 0,

		draw: function(clr) {
			if(clock.seconds > clock.end) {
				clearInterval(countDown);
				timesUp();
				return;
			}

			var canvas = document.getElementById(timerCanvasID);
			var cv = canvas.getContext("2d");
			if(clr) {
				canvas.width = canvas.width;
				cv.clearRect(0, 0, canvas.width, canvas.height);
			}
			cv.font = 'bold 28px Arial';
			cv.textAlign = 'center';
			cv.textBaseline = 'middle';
			cv.fillStyle = '#fff';
			cv.fillText(Math.round((clock.end - clock.current) - clock.seconds),canvas.width/2,canvas.height/2);

			clock.seconds++;
		}
	};


	var scoreControler = {
		draw: function(clr) {

			var canvas = document.getElementById(scoreCanvasID);
			var cv = canvas.getContext("2d");
			if(clr) {
				canvas.width = canvas.width;
				cv.clearRect(0, 0, canvas.width, canvas.height);
			}
			cv.font = 'bold 28px Arial';
			cv.textAlign = 'center';
			cv.textBaseline = 'middle';
			cv.fillStyle = '#fff';
			cv.fillText(totalScore,canvas.width/2,canvas.height/2);

		}
	};

	gControl.deck = [
		'card_pill1', 'card_pill1',
		'card_pill2', 'card_pill2',
		'card_pill3', 'card_pill3',
		'card_pill4', 'card_pill4',
		'card_pill5', 'card_pill5',
		'card_pill6', 'card_pill6',
	];

	gControl.deck.sort(function(){
		return 0.5 - Math.random();
	});



	gControl.start = function(){
		//加card
		for(var i=0; i<12; i++){
			$("<div/>", {
				"class":"card"
			}).html("<div class=\"face front\"></div><div class=\"face back\"></div>").appendTo('#cards');
		}

		$("#markpanel").animate({ top: "-=20px",  opacity: 1 }, 900);
		$('#cards').children().each(function(index){

			var pattern = gControl.deck.pop();

			//依次添加花色,也就是通过添加类
			$(this).find('.back').addClass(pattern);
			$(this).attr('data-pattern', pattern);

			$(this).click(clickCard);
		});
		$("#startnowbut").remove();
		$("#gametxt").remove();
		$("#drugcards").remove();

		$(".card").animate({ top: "-=30px" }, 900);
		scoreControler.draw(true);
		clock.draw(true);
		$("#score").fadeIn(900);
	    $("#remaintime").fadeIn(900);
		countDown = setInterval(
		  function() { clock.draw(true); },
		  1000
		);

	}

	function clickCard(){
		//如果已被翻2张牌,不做操作
		if($('.flipped').length>1){
			return;
		}

		//翻牌
		$(this).addClass('flipped');

		//如果翻第二张牌,进行匹配检查
		if($('.flipped').length==2){
			setTimeout(checkPattern, 500);
		}
	}





	function checkPattern(){
		// Flipped pairs matched !!!
		if(isMatch()){
			//从flipped删除，添加到removed中
			$('.flipped').removeClass('flipped').addClass('matched');


			$('.matched').unbind( "click" );

			totalScore = totalScore + correctScore;
			scoreControler.draw(true);

			if ($('.matched').length > 11) {
				clearInterval(countDown);
				finishAll();
			}
			//console.log($('.matched').length);

		}
		else{
			$('.flipped').removeClass('flipped');
		}
	}

	function isMatch(){
		var flippedCards = $('.flipped');
		var pattern0 = $(flippedCards[0]).data('pattern');
		var pattern1 = $(flippedCards[1]).data('pattern');
		//console.log("$(flippedCards[0]).data('pattern') "+$(flippedCards[0]).data('pattern'));
		//console.log("$(flippedCards[1]).data('pattern') "+$(flippedCards[1]).data('pattern'));
		return (pattern0 == pattern1);
	}

	function removeMatched(){
		$('.removed').remove();
	}







	//Times Up function
	function timesUp(){
		$('.card').unbind( "click" );
		if(!alert(MSG.TIMEUP)){window.location.reload();}
		// alert(MSG.TIMEUP);
	}


	//Finish all
	function finishAll(){
		if(!alert(MSG.FINISH)){window.location.reload();}
		// alert(MSG.FINISH);
	}


};
