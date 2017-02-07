
$(function() {

  //Show mobile contact popup
  $("#contact-us-mobile-icon").on( "click", showMobileContacts );
  $("#contact-us-mobile-popup .close-mobile-popup").on( "click", hideMobileContacts );

  $(".js-open-menu").on( "click", showMenu );
  $(".js-close-menu").on( "click", hideMenu );


  $("#contact-us-desktop-popup .top").on( "click", toggleDesktopContacts );

  var View2 = new View2Obj(); View2.init()

  $("#view2 .down").on( "click", function(){ View2.scrolDown() } );

  $(window).on('wheel', function(e) {
  	var delta = e.originalEvent.deltaY;

    var pos = $('body').scrollTop();
    if (pos == 0) {
        //alert('top of the div');
    }

  	if (delta > 0){
      if(!$('html').is(':animated') && !$('body').is(':animated') && !$('#view2 .item').is(':animated') ) {
          View2.scrolDown(pos)
      }
    } else {
      if(!$('html').is(':animated') && !$('body').is(':animated') && !$('#view2 .item').is(':animated') ) {
        View2.scrolUp(pos)
      }
    }


  	//return false; // this line is only added so the whole page won't scroll in the demo

    if( $("#stopScroll").length && $("#stopScroll").hasClass('stop') ){ return false; }
    return true;
  });

});




function View2Obj(){
  var totItem = $("#view2 .item").length;
  this.totItem = totItem
  console.log("totItem",totItem);

  this.selectedItem = 0

  this.scrolUp = function(pos){
    var that = this
    console.log("scrolUp");
    var prev = this.getPrev()
    var current = this.selectedItem

    if ( pos === 0 ){
      console.log("addScrollSTOP!!!!");
      $("#stopScroll").addClass('stop')
      $("#view2 .down").fadeIn()
    }

    if(current==0 || !$("#stopScroll").hasClass('stop'))
      return;


    //if(current==0)$("#view2 .title").addClass("bg1")


    /*$("#view2 .item" + current ).hide( 'slide', { direction: 'down'}, function() {
        $("#view2 .item" + prev ) .show(function(){
          that.selectedItem = prev
        })
    })*/
    //$("#view2 .item" + prev ).hide( 'slide', { direction: 'down'}, function() {})
    /*$("#view2 .item") .hide(function(){
      $("#view2 .item" + prev ) .show( function(){
        that.selectedItem = prev
        console.log(current,that.selectedItem);
      })
    })*/
    $("#view2 .item" + prev ) .addClass('visible',function(){
      $("#view2 .item" + current ) .removeClass('visible', function(){
        that.selectedItem = prev
        console.log(current,that.selectedItem);
        $( "#view2 .points .point" + current ).removeClass("sel")
        $( "#view2 .points .point" + prev ).addClass("sel")
      })
    })

  };

  this.scrolDown = function(){
    var that = this
    console.log("scrolDown");
    var next = this.getNext()
    var current = this.selectedItem

    if(current== totItem-1 || !$("#stopScroll").hasClass('stop') ){
      $("#stopScroll").removeClass('stop')
      return;
    }


    //if(current==0)$("#view2 .title").addClass("bg1")


    $("#view2 .item" + next ) .addClass('visible',function(){
      $("#view2 .item" + current ) .removeClass('visible', function(){
        that.selectedItem = next
        console.log(current,that.selectedItem);
        $( "#view2 .points .point" + current ).removeClass("sel")
        $( "#view2 .points .point" + next ).addClass("sel")

        if(next == totItem-1)
          $("#view2 .down").fadeOut()
      })
    })
    /*
    $("#view2 .item" + current ) .hide(function(){
      $("#view2 .item" + next ) .show( function(){
        that.selectedItem = next
        console.log(current,that.selectedItem);
      })
    })*/

  };

  this.init = function(){
    $( "#view2 .item" ).each(function( index ) {
      $(this).addClass("item" + index)
      $(this).attr('data-index', index)

      if($(this).hasClass('sel')){
        this.selectedItem = index
      }

      $( "#view2 .points" ).append('<span class="point point' + index + '"></span>')

    });

    $( "#view2 .points .point" + this.selectedItem ).addClass("sel")
  };

  this.getNext = function(){
    if( this.selectedItem === this.totItem ){
      return 0
    }else{
      return this.selectedItem + 1
    }
  };

  this.getPrev = function(){
    if( this.selectedItem === 0 ){
      return this.totItem
    }else{
      return this.selectedItem - 1
    }
  }


} //View2



//Show hide menu
var showMenu = function(){
  $("#menu").show()
  $("#logo .hamburger-icon").hide()
  $("#logo .close-icon").show()
};
var hideMenu = function(){
  $("#menu").hide()
  $("#logo .hamburger-icon").show()
  $("#logo .close-icon").hide()

};

//toggleDesktopContacts
var toggleDesktopContacts = function(){
  $("#contact-us-desktop-popup").toggleClass("show")
  $("#contact-us-desktop-popup .js-minus").toggleClass("display-none")
  $("#contact-us-desktop-popup .js-plus").toggle()

}

//Show hide mobile contact popup
var showMobileContacts = function(){
  $("#contact-us-mobile-icon").hide()
  $("#contact-us-mobile-popup").show()
};
var hideMobileContacts = function(){
  $("#contact-us-mobile-icon").show()
  $("#contact-us-mobile-popup").hide()
};



/*
  Google Map
*/
$('.map-container')
	.click(function(){
			$(this).find('iframe').addClass('clicked')})
	.mouseleave(function(){
			$(this).find('iframe').removeClass('clicked')});
