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
			});