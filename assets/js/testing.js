//animate scroll to anchor //target .slides container not body due to parallax feature
function scrollNav(){
	$(".nav").click(function(){	
	$(".slides").stop().animate({
		scrollTop:$($(this).attr("href")).offset().top-100},500),!1}),$(".nav").scrollTop()
}
scrollNav();

//slider controls for form
function outputUpdate2(bath) {
	document.querySelector('.no_baths').value = bath;
}

function outputUpdate(room) {
	document.querySelector('.no_rooms').value = room;
}

//facebook sdk



//hide header on scroll
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header').outerHeight();

$('.slides').scroll(function(event){
    didScroll = true;
	
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 0);/*distance to hidden / visible*/


function hasScrolled() {
    var st = $('.slides').scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight - 100){
        //if  Scroll Down 
		$('.header').addClass('header_hidden');
    } else {
        $('.header').removeClass('header_hidden');
        
    }
    
    lastScrollTop = st;
}