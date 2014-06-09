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

				var totalSize = $('body').find(".solution-step").length;
				
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
			  		var current_percent = current_step == totalSize ? '99%' : Math.round((current_step/totalSize)*100);

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

});