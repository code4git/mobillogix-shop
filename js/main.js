	function DropDown(el) {
				this.dd = el;
				this.placeholder = this.dd.children('span');
				this.opts = this.dd.find('ul.dropdown > li');
				this.val = '';
				this.index = -1;
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dd.on('click', function(event){
						$(this).toggleClass('active');
						return false;
					});

					obj.opts.on('click',function(){
						var opt = $(this);
						obj.val = opt.text();
						obj.index = opt.index();
						location.href = opt.children('a').attr('href');
					});
				},
				getValue : function() {
					return this.val;
				},
				getIndex : function() {
					return this.index;
				}
			}

			$(function() {

				var dd = new DropDown( $('#prod-catalog-dd') );
				var dd1 = new DropDown( $('#sort-by-dd') );
				var dd3 = new DropDown( $('#view-dd') );

				$(document).click(function() {
					// all dropdowns
					$('.wrapper-dropdown').removeClass('active');
				});
				$('.wrapper-dropdown').mouseleave(function(){
					$('.wrapper-dropdown').removeClass('active');
				});

				$('.filter-group ul').each(function() {

        		var ullength = $(this).find('li').length;

       			if (ullength > 4) {    	
		            $('li', this).eq(3).nextAll().hide().addClass('toggleable');
		        	$(this).append('<li class="more-options close"><a><span class="icon minus-plus-icon"></span>View More Option</a></li>');
       			 }

   				 });$

				('.filter-group ul').on('click', '.more-options', function() {

					if ($(this).hasClass('close')) {
						$(this).html('<a><span class="icon minus-plus-icon"></span>View Less Option</a>');
						$(this).removeClass('close').addClass('open');
					} else {
						$(this).html('<a><span class="icon minus-plus-icon"></span>View More Option</a>');
						$(this).removeClass('open').addClass('close');

					}

        			$(this).siblings('li.toggleable').slideToggle();
        		});

        		$('.full-info-item').each(function() {
        			$(".full-info-content").hide();
   				 });$

				$('.full-info-header').on('click',  function() {
					$(this).parent().find(".full-info-content:first").stop().slideToggle();
					
					if ($(this).parent().hasClass('close')) {
						$(this).parent().removeClass('close').addClass('open');
					} else {
						$(this).parent().removeClass('open').addClass('close');
					}
				
				});
				$('[name=shipping-dif]').click(function () {
    				$(".table-shipping").toggle(this.checked);
				});

				var totalSize = $(".solution-step").size();
				

				$(".solution-step").each(function(i){
					
			  		if (i != 0) {
			      		prev = i;
		   		  		$(this).find(".step-nav").append("<a href='#' class='btn grey-btn prev-step mover' rel='" + prev + "'>"+$('#step-'+prev).attr('data-nav-title')+"</a>");
			  		}
			  		if (i != totalSize-1) {
			      		next = i + 2;
		   		  		$(this).find(".step-nav").append("<a href='#' class='btn next-step mover' rel='" + next + "'>"+$('#step-'+next).attr('data-nav-title')+"</a>");
			  		}
			  		var current_step = i + 1;
			  		var current_percent = current_step == totalSize ? '99' : Math.round((current_step/totalSize)*100);

			  		$(this).find('.step-num').html('Step '+current_step+' of '+totalSize);
			  		$(this).find('.percentbar').css('width', current_percent + '%');
			  		$(this).find('.step-percent').html(current_percent + '% completed');
				});
	
				$('.next-step, .prev-step').on('click', function(e)  {
		           $('#step-' + $(this).attr("rel")).show().siblings().hide();
		           $(this).parent('.solution-step').addClass('active').siblings().removeClass('active');
		           e.preventDefault();
		       	});
		       	trigCollapseAll();
				$('.solution-step').each(function() {
					if ($(this).find('.summary-step').hasClass('collapsed')) {
						$(this).find('.summary-step.collapsed').find('.sum-step-detail').hide();
					}
				});

				$('.solution-step').on( 'click', '.summary-expand', function( event ) {
					if($(this).hasClass('collapsed')) {
						$(this).removeClass('collapsed').text('Collapse all');
						$(this).parents('.solution-summary').find('.sum-step-detail').slideDown(200, function() {
						$(this).parents('.summary-step').removeClass('collapsed');
						});
					} else {
						$(this).addClass('collapsed').text('Expand all');
						$(this).parents('.solution-summary').find('.sum-step-detail').slideUp(200, function() {
						$(this).parents('.summary-step').addClass('collapsed');
						});
					}
				});

				$('.solution-step').on('click','.sum-step-title, .sum-collapse-icon', function() {
					if($(this).parents('.summary-step').hasClass('collapsed')) {					
						$(this).parents('.summary-step').find('.sum-step-detail').slideDown(200, function() {
							$(this).parents('.summary-step').removeClass('collapsed');
							trigCollapseAll();
						});
					} else {					
						$(this).parents('.summary-step').find('.sum-step-detail').slideUp(200, function() {
							$(this).parents('.summary-step').addClass('collapsed');
							trigCollapseAll();
						});
					
					}
					
				});
				function trigCollapseAll() {
						$('.solution-step').each(function() {
						if($(this).find('.summary-step').hasClass('collapsed')) {
							$(this).find('.summary-expand').addClass('collapsed').text('Expand all');
						} else {
							$(this).find('.summary-expand').removeClass('collapsed').text('Collapse all');
						}
					});
					}
				$('.order-summary').on('click','.terms-list div', function() {
					$('.terms-list div').removeClass('active');
					$(this).addClass('active');
					var termvalue = $(this).attr('data-term');
					$(this).parents('.summary-step').find('.term').html(termvalue+ ' months');
				});
				$('.order-summary').on('click','.qtn-plus-icon, .qtn-minus-icon', function(event) {
					var num = parseInt($.trim($(this).parents('.summary-step').find('.qtn').html()));
					
					var target = $(event.target);
					if (target.is('.qtn-plus-icon')) {
						$(this).parents('.summary-step').find('.qtn').html(++num);
					} else {
						if (num < 2) {return false;	}
						$(this).parents('.summary-step').find('.qtn').html(--num);
					}
				});
				$('.product-amount').on('click','.qtn-plus-icon, .qtn-minus-icon', function(event) {
					var prod_amount = parseInt($.trim($(this).parents('.product-amount').find('.product-qtn').html()));
					
					var target = $(event.target);
					if (target.is('.qtn-plus-icon')) {
						$(this).parents('.product-amount').find('.product-qtn').html(++prod_amount);
					} else {
						if (prod_amount < 2) {return false;	}
						$(this).parents('.product-amount').find('.product-qtn').html(--prod_amount);
					}
				});
				$('.tabs .tab-links a').on('click', function(e)  {
					var currentAttrValue = $(this).attr('href');
					$('.tabs ' + currentAttrValue).show().siblings().hide();
					$(this).parent('li').addClass('active').siblings().removeClass('active');
					e.preventDefault();
				});
				$('.review-form').on('click','.star-holder', function() {
					$('.star-holder').removeClass('active');
					var starvalue = $(this).attr('data-star');
					$(this).parents('.review-rating').find('#rating').val(starvalue);
					$(this).addClass('active');
				});
					
				$('select').each(function() {
					$(this).customSelect();
				});
						$('.add-to-cart').click(function (event) {
					 event.preventDefault();
					$(this).addClass("added");
					$(this).val("Item added");
					});

				$('body').append('<div id="blackout"></div>');
	
	 			 var mode = (window.opera) ? ((document.compatMode == "CSS1Compat") ? $('html') : $('body')) : $('html,body');
	 			 var scrollPos = 0;
				$('[class*=popup-link]').click(function(e) {
					e.preventDefault();
					e.stopPropagation();
		
					var option_offset = $(this).parents('.option-box').position();
					var header_height = $(this).parents('.solution-step').find('.step-header').height(); 
					var name = this.className.match(/\bpopup-link[^\s]+\b/);
					var namestring = name[0];
					var id = namestring.substr(11);
					scrollPos = $(window).scrollTop();
				  
					var winWidth = $(window).width();
				    var winHeight = $(window).height();
				    var docHeight = $(document).height();

					$('.popup').css({'left' : '0px', 'top' : option_offset.top+header_height+6+'px'});
					$('.popup>.arrow ').css({'left' : option_offset.left+95+'px'});
				    $('#blackout').css({'width' : winWidth+'px', 'height' : docHeight+'px'});
				    $('#popup-'+id).show();
					$('#blackout').show();
					var popup_top = $('.popup').position();
					mode.scrollTop(popup_top.top);
					
				});

			    $('[class*=popup-box]').click(function(e) { 
					e.stopPropagation(); 
				});
    
				$('.close').click(function() { 
					$('[id^=popup-]').hide(); 
					$('#blackout').hide(); 
					mode.scrollTop(scrollPos);
					mode.css('overflow','visible');
				
				});

				var mainnav = $('#global-nav')
				$('.link-nav').click(function() {
				
					if(!(mainnav.hasClass('open'))) {
						mainnav.find('ul').slideDown(300);
						$('#header').addClass('open');
						mainnav.addClass('open');
					} else {
						mainnav.find('ul').slideUp(300, function(){
							mainnav.removeClass('open');
							
						});
				}
		
		return false;
	});
	
	
    //carousel
    //rotation speed and timer
    var speed = 5000;
    var run = setInterval('rotate()', speed);

    //grab the width and calculate left value
    var item_width = $('#slides li').outerWidth();
    var left_value = item_width * (-1);

    //move the last item before first item, just in case user click prev button
    $('#slides li:first').before($('#slides li:last'));

    //set the default item to the correct position 
    $('#slides ul').css({'left': left_value});
    //if user clicked on prev button
    $('#prev').click(function() {
        //get the right position            
        var left_indent = parseInt($('#slides ul').css('left')) + item_width;
        //slide the item            
        $('#slides ul').animate({'left': left_indent}, 500, function() {
            //move the last item and put it as first item                
            $('#slides li:first').before($('#slides li:last'));
            //set the default item to correct position
            $('#slides ul').css({'left': left_value});

        });
        //cancel the link behavior            
        return false;

    });
    //if user clicked on next button
    $('#next').click(function() {

        //get the right position
        var left_indent = parseInt($('#slides ul').css('left')) - item_width;

        //slide the item
        $('#slides ul').animate({'left': left_indent}, 500, function() {

            //move the first item and put it as last item
            $('#slides li:last').after($('#slides li:first'));

            //set the default item to correct position
            $('#slides ul').css({'left': left_value});

        });

        //cancel the link behavior
        return false;

    });

    //if mouse hover, pause the auto rotation, otherwise rotate it
    $('#slides').hover(
            function() {
                clearInterval(run);
            },
            function() {
                run = setInterval('rotate()', speed);
            }
    );

});
function rotate() {
    $('#next').click();
}
/*!jquery.customSelect*/
(function(a){a.fn.extend({customSelect:function(c){if(typeof document.body.style.maxHeight==="undefined"){return this}var e={customClass:"customSelect",mapClass:true,mapStyle:true},c=a.extend(e,c),d=c.customClass,f=function(h,k){var g=h.find(":selected"),j=k.children(":first"),i=g.html()||"&nbsp;";j.html(i);if(g.attr("disabled")){k.addClass(b("DisabledOption"))}else{k.removeClass(b("DisabledOption"))}setTimeout(function(){k.removeClass(b("Open"));a(document).off("mouseup.customSelect")},60)},b=function(g){return d+g};return this.each(function(){var g=a(this),i=a("<span />").addClass(b("Inner")),h=a("<span />");g.after(h.append(i));h.addClass(d);if(c.mapClass){h.addClass(g.attr("class"))}if(c.mapStyle){h.attr("style",g.attr("style"))}g.addClass("hasCustomSelect").on("render.customSelect",function(){f(g,h);g.css("width","");var k=parseInt(g.outerWidth(),10)-(parseInt(h.outerWidth(),10)-parseInt(h.width(),10));h.css({display:"inline-block"});var j=h.outerHeight();if(g.attr("disabled")){h.addClass(b("Disabled"))}else{h.removeClass(b("Disabled"))}i.css({width:k,display:"inline-block"});g.css({"-webkit-appearance":"menulist-button",width:h.outerWidth(),position:"absolute",opacity:0,height:j,fontSize:h.css("font-size")})}).on("change.customSelect",function(){h.addClass(b("Changed"));f(g,h)}).on("keyup.customSelect",function(j){if(!h.hasClass(b("Open"))){g.trigger("blur.customSelect");g.trigger("focus.customSelect")}else{if(j.which==13||j.which==27){f(g,h)}}}).on("mousedown.customSelect",function(){h.removeClass(b("Changed"))}).on("mouseup.customSelect",function(j){if(!h.hasClass(b("Open"))){if(a("."+b("Open")).not(h).length>0&&typeof InstallTrigger!=="undefined"){g.trigger("focus.customSelect")}else{h.addClass(b("Open"));j.stopPropagation();a(document).one("mouseup.customSelect",function(k){if(k.target!=g.get(0)&&a.inArray(k.target,g.find("*").get())<0){g.trigger("blur.customSelect")}else{f(g,h)}})}}}).on("focus.customSelect",function(){h.removeClass(b("Changed")).addClass(b("Focus"))}).on("blur.customSelect",function(){h.removeClass(b("Focus")+" "+b("Open"))}).on("mouseenter.customSelect",function(){h.addClass(b("Hover"))}).on("mouseleave.customSelect",function(){h.removeClass(b("Hover"))}).trigger("render.customSelect")})}})})(jQuery);