$(document).ready(function(){function t(){var e=$("#user-nav > ul").width();$("#user-nav > ul").css({width:e,"margin-left":"-"+e/2+"px"});var t=$("#content-header .btn-group").width();$("#content-header .btn-group").css({width:t,"margin-left":"-"+e/2+"px"})}$(".submenu > a").click(function(e){e.preventDefault();var t=$(this).siblings("ul"),n=$(this).parents("li"),r=$("#sidebar li.submenu ul"),i=$("#sidebar li.submenu");n.hasClass("open")?($(window).width()>768||$(window).width()<479?t.slideUp():t.fadeOut(250),n.removeClass("open")):($(window).width()>768||$(window).width()<479?(r.slideUp(),t.slideDown()):(r.fadeOut(250),t.fadeIn(250)),i.removeClass("open"),n.addClass("open"))});var e=$("#sidebar > ul");$("#sidebar > a").click(function(t){t.preventDefault();var n=$("#sidebar");n.hasClass("open")?(n.removeClass("open"),e.slideUp(250)):(n.addClass("open"),e.slideDown(250))}),$(window).resize(function(){$(window).width()>479&&(e.css({display:"block"}),$("#content-header .btn-group").css({width:"auto"})),$(window).width()<479&&(e.css({display:"none"}),t()),$(window).width()>768&&($("#user-nav > ul").css({width:"auto",margin:"0"}),$("#content-header .btn-group").css({width:"auto"}))}),$(window).width()<468&&(e.css({display:"none"}),t()),$(window).width()>479&&($("#content-header .btn-group").css({width:"auto"}),e.css({display:"block"})),$(".tip").tooltip(),$(".tip-left").tooltip({placement:"left"}),$(".tip-right").tooltip({placement:"right"}),$(".tip-top").tooltip({placement:"top"}),$(".tip-bottom").tooltip({placement:"bottom"}),$("#search input[type=text]").typeahead({source:["Dashboard","Form elements","Common Elements","Validation","Wizard","Buttons","Icons","Interface elements","Support","Calendar","Gallery","Reports","Charts","Graphs","Widgets"],items:4}),$("#style-switcher i").click(function(){$(this).hasClass("open")?($(this).parent().animate({marginRight:"-=190"}),$(this).removeClass("open")):($(this).parent().animate({marginRight:"+=190"}),$(this).addClass("open")),$(this).toggleClass("icon-arrow-left"),$(this).toggleClass("icon-arrow-right")}),$("#style-switcher a").click(function(){var e=$(this).attr("href").replace("#","");$(".skin-color").attr("href","css/unicorn."+e+".css"),$(this).siblings("a").css({"border-color":"transparent"}),$(this).css({"border-color":"#aaaaaa"})})});