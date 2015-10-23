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
		dots = document.querySelector(".dots");
	var	current = 0;
	var next= 1;
	var	animating = false;
	var flag;
	l.addClass(images[current],'image_current');


		for (var i = 0; i < images.length; i++) {
			images[i].addEventListener("webkitAnimationStart",function(){
				animating =true;
		})
			
			images[i].addEventListener("webkitAnimationEnd",function(){
				animating = false;
		})
			
		};
		

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

		for (var i = 0; i < dots.childNodes.length; i++) {

			(function(j){
				dots.childNodes[j].addEventListener("click", function(){
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

		for (var i = 0; i < images.length; i++) {

			l.removeClass(images[i],"image_current");
			l.removeClass(images[i],"image_current_next");
			l.removeClass(images[i],"image_current_pre");
			l.removeClass(images[i],"image_next");
			l.removeClass(images[i],"image_pre");

		};
	
		l.addClass(images[current],"image_current");
		l.addClass(images[next],'image_current');

		if (flag==1||(flag==2&&current<next)){

			l.addClass(images[current],'image_current_next');
			l.addClass(images[next],'image_next');
			
		}else if(flag==-1||(flag==2&&current>next)){

			l.addClass(images[current],'image_current_pre');
			l.addClass(images[next],'image_pre');
			
		}

			current = next;

	}

	return {
		init: init
	}
});


