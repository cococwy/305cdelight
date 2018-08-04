function desktop_or_mobile(){
    var result = 'desktop';
    
    (function(a){if(/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
    result = 'mobile';
    })
    (navigator.userAgent||navigator.vendor||window.opera);
    
    return result;
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    element = element.offsetParent;
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    /*while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }*/
    return { x: xPosition, y: yPosition };
}

function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function custom_alert(text){
    //Set Msg
    var msg = nl2br(text);
    var device = desktop_or_mobile();
    //console.log(device);
    $('#custom_alert_message').html(msg);
    //Set Title
    $('#custom_alert_title').html("Acer 極速配對攞滿 FUN");
            
    // #popuprel will fadein
    $('#custom_alert_dialog').fadeIn();
    


    // append div with id fade into the bottom of body tag
    // and we allready styled it in our step 2 : CSS
    $('body').append('<div id="custom_alert_fade"></div>');
    $('#custom_alert_fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
    
    
    //Mobile ONLY
    if(device == 'mobile'){
        $('#custom_alert_dialog').css({
            "width":"420px",
            "font-size": "20px"
        });
    }
    


    // Now here we need to have our popup box in center of 
    // webpage when its fadein. so we add 10px to height and width 
    var popuptopmargin = ($('#custom_alert_dialog').height() + 10) / 2;
    var popupleftmargin = ($('#custom_alert_dialog').width() + 10) / 2;


    // Then using .css function style our popup box for center allignment
    $('#custom_alert_dialog').css({
        'margin-top' : -popuptopmargin,
        'margin-left' : -popupleftmargin
    });
    
    //Mobile ONLY
    if(device == 'mobile'){
        $('#custom_alert_title').css({
            "font-size": "22px"
        });
        $('#custom_alert_close').css({
            "font-size": "22px"
        });
    }
            
    //body height
	var body = document.body, html = document.documentElement;

    var docheight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    var docwidth = $(document).width();
    var docalertloc = docheight/2 - 100;
            
    //Set fade out blur background height
    $('#custom_alert_fade').css({
        'height' : docheight,
        'width' : docwidth
    });
    
    //FB.Canvas.scrollTo(0,docalertloc);
    
    //Mobile ONLY
    if(device == 'mobile'){

    }
    else {
        if( typeof FB === 'undefined'){

	    }
	    else FB.Canvas.scrollTo(0,docalertloc);
    }
}


function loading_alert(){

    $('#loader').fadeIn();

    $('body').append('<div id="custom_alert_fade"></div>');
    $('#custom_alert_fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

    var popuptopmargin = ($('#loader').height() + 10) / 3;
    var popupleftmargin = ($('#loader').width() + 10) / 2;

    $('#loader').css({
        'margin-top' : -popuptopmargin,
        'margin-left' : -popupleftmargin
   });
                
   //body height
   var docheight = $(document).height();
                
   //Set fade out blur background height
   $('#custom_alert_fade').css({
        'height' : docheight
   });
}

function confirm_pop(text,callback){
    //Set Msg
    var msg = nl2br(text);
    var device = desktop_or_mobile();
    
    $('#confirm_popup_message').html(msg);
    //Set Title
    $('#confirm_popup_title').html("Acer 極速配對攞滿 FUN");
            
    // #popuprel will fadein
    $('#confirm_popup_dialog').fadeIn();


    // append div with id fade into the bottom of body tag
    // and we allready styled it in our step 2 : CSS
    $('body').append('<div id="custom_alert_fade"></div>');
    $('#custom_alert_fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
    
    
    //Mobile ONLY
    if(device == 'mobile'){
        $('#confirm_popup_dialog').css({
            "width":"420px",
            "font-size": "20px"
        });
    }


    // Now here we need to have our popup box in center of 
    // webpage when its fadein. so we add 10px to height and width 
    var popuptopmargin = ($('#confirm_popup_dialog').height() + 10) / 2;
    var popupleftmargin = ($('#confirm_popup_dialog').width() + 10) / 2;


    // Then using .css function style our popup box for center allignment
    $('#confirm_popup_dialog').css({
        'margin-top' : -popuptopmargin,
        'margin-left' : -popupleftmargin
    });
    
    
    //Mobile ONLY
    if(device == 'mobile'){
        $('#confirm_popup_cancel,#confirm_popup_ok').css({
            "font-size": "22px"
        });
        $('#confirm_popup_title').css({
            "font-size": "22px"
        });
    }
    
            
    //body height
    var docheight = $(document).height();
    var docalertloc = docheight/2 - 100;
    var boxPosition = getPosition($('#confirm_popup_dialog'));
            
    //Set fade out blur background height
    $('#custom_alert_fade').css({
        'height' : docheight
    });
    

    if(device == 'mobile'){
        window.scrollTo(boxPosition.x,boxPosition.y);
    }
    else{
        if( typeof FB === 'undefined'){

	    }
	    else FB.Canvas.scrollTo(0,docalertloc);
    }
    
    $('#confirm_popup_ok').click(function() {					  
        $('#custom_alert_fade , #confirm_popup_dialog').fadeOut();
        callback();
        $('#confirm_popup_ok').unbind('click');
        return false;
    }); 
}


$(document).ready(function() {	
    $("<div/>", {
        "id":"custom_alert_dialog"
    }).html("<div id=\"custom_alert_title\"></div><div id=\"custom_alert_message\"></div><div class=\"custom_alert_btn\"><input type=\"button\" id=\"custom_alert_close\" value=\"確定\"/></div>"
    ).appendTo('body');
    
    $("<div/>", {
        "id":"confirm_popup_dialog"
    }).html("<div id=\"confirm_popup_title\"></div><div id=\"confirm_popup_message\"></div><div class=\"confirm_popup_btn\"><input type=\"button\" id=\"confirm_popup_ok\" value=\"確定\"/><input type=\"button\" id=\"confirm_popup_cancel\" value=\"取消\"/></div>"
    ).appendTo('body');

    
           
    
     $('#confirm_popup_cancel').click(function() {		
        $('#confirm_popup_ok').unbind('click');			  
        $('#custom_alert_fade , #confirm_popup_dialog').fadeOut();
        $('#custom_alert_fade').remove();
        return false;
    });
    
     $('#custom_alert_close').click(function() {					  
        $('#custom_alert_fade , #custom_alert_dialog').fadeOut();
        $('#custom_alert_fade').remove();
        return false;
    });
    
    
});