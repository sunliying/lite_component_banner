/**
 * banner
 * @authors Your Name (you@example.org)
 * @date    2015-09-16 10:31:52
 * @version $Id$
 */
define(["bower_components/litejs/lite"],function(l){
	var init, scroll, current, animating, images,next,
	    p_btn,n_btn,dots;
	var change;
		images = document.querySelectorAll(".image");
		p_btn = document.querySelector(".prev");
		n_btn = document.querySelector(".next");
		dots = document.querySelectorAll(".dots li");
	var	current = 0;
	var next= 1;
	var	animating = false;
	var flag;
	var classArray=[
	["image_current","image_current_next","image_current_pre", "image_next","image_pre"],
	["color"]
	];
	// the current state
	l.addClass(images[current],classArray[0][0]);
        //  when the animation is running, make animating ture
		for (var i = 0; i < images.length; i++) {
		// 	images[i].addEventListener("webkitAnimationStart",function(){
		// 		animating =true;
		// })			
			images[i].addEventListener("webkitAnimationEnd",function(){
				animating = false;
		})			
		};
		//the current dot's color
    l.addClass(dots[current],"color");				
    //接入接口
    init = function(){			
		p_btn.addEventListener("click", function(){
			if (animating){
				return;
			}
			window.clearInterval(change);
			flag = -1;
			if (current == 0){
				next=images.length-1;
			}else{
				next=current-1;
			}
			scroll(next,flag);
			change=window.setInterval(auto,5000);
		})
		n_btn.addEventListener("click", function(){
			if (animating){
				return;
			}
			window.clearInterval(change);
			flag = 1;
			if (current == images.length-1){
				next=0;
			}else{
				next=current+1;
			}
			scroll(next,flag);
			change=window.setInterval(auto,5000);
		})
		for (var i = 0; i < dots.length; i++) {

			(function(j){
				dots[j].addEventListener("click", function(){
					if (animating){
						return;
					}
					window.clearInterval(change);
					flag = 2;
					next = j;
					scroll(next,flag);
					change=window.setInterval(auto,5000);
				})
			})(i)
			
		};
		function auto(){
				if(animating){
					return;
				}
				flag = 1;
				if(current==images.length-1){
					next = 0;
				}else{
					next= current+1;
				}
				scroll(next, flag);
			}
		change =window.setInterval(auto,5000);	
}
	    scroll = function(next, flag){
	    	animating=true;
		for (var i = 0; i < images.length; i++) {
			l.removeClass(images[i],classArray[0][0]);
			l.removeClass(images[i],classArray[0][1]);
			l.removeClass(images[i],classArray[0][2]);
			l.removeClass(images[i],classArray[0][3]);
			l.removeClass(images[i],classArray[0][4]);
			l.removeClass(dots[i],classArray[1][0]);
		};	
		l.addClass(images[current],classArray[0][0]);
		l.addClass(images[next],classArray[0][0]);
		l.addClass(dots[next],classArray[1][0]);
		if (flag==1||(flag==2&&current<next)){
			l.addClass(images[current],classArray[0][1]);
			l.addClass(images[next],classArray[0][3]);			
		}else if(flag==-1||(flag==2&&current>next)){
			l.addClass(images[current],classArray[0][2]);
			l.addClass(images[next],classArray[0][4]);			
		}
			current = next;
	}
	return {
		init: init
	}
});


