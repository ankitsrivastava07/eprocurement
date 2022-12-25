function login(e){return $("#login-form").valid()&&checkConnection()&&$.ajax({type:"POST",url:"/api/v1/user/login",contentType:"application/json",data:JSON.stringify(e),cache:!1,success:function(e,r,a){$(".error").remove(),$(".alert").remove(),e.status&&($(".modal-body").prepend("<div class='alert' id='alt'>"+e.message+"&nbsp;&nbsp;&nbsp;<i class='fa fa-times' id='icon' aria-hidden='true'></i></div>"),location.reload()),setTimeout(function(){!e.status&&0==$(".alert").length||null==$(".input-group span").length?$(".modal-body").prepend("<div class='alert' id='alt'>"+e.message+"&nbsp;&nbsp;&nbsp;<i class='fa fa-times' id='icon' aria-hidden='true'></i></div>"):e.status||$(".alert").html(e.message)},500),e.status&&($.cookie("browser",e.browser),$.cookie("session_Token",e.token),window.location.href="/")},error:function(e){503!=e.status&&408!=e.status||($(".alert").remove(),$("#modal_title").html(e.responseJSON.title),$("#message").html(e.responseJSON.message),$("#message").append('<img src="/images/timeout.jpg" />'),$("#server_error").modal("show")),e.responseJSON.validationFailed&&($(".error").remove(),$(".error_emailormobile").remove(),$.each(e.responseJSON.errors,function(e,r){$({to:0}).animate({to:1},500,function(){0==$(".error_"+r.fieldName).length||null==$(".error_"+r.fieldName).length?$("#"+r.fieldName).after("<span class=error error_"+r.fieldName+">"+r.message+"</span>"):$(".error_"+r.fieldName).val(r.message)})})),400!==e.status||e.responseJSON.validationFailed||e.responseJSON.status||(url=window.location.pathname.replace(/\/+$/,"")+"/error",window.location.replace(url))}}),!1}function changePassword(e){$("#change-password").valid()&&checkConnection()&&$.ajax({type:"POST",url:"/api/v1/user/change-password",contentType:"application/json",data:JSON.stringify(e),beforeSend:function(r){r.setRequestHeader("uriToken",e.code)},cache:!1,success:function(e){$(".alert").remove(),e.status&&($(".modal-body").prepend("<div class='alert' id='alt'>"+e.message+"</div>"),$(".alert").append("<span id ='txt'>  OK</span>")),setTimeout(function(){$.each(e.errorMessage,function(r,a){if(!e.status&&0==$(".input-group span").length||null==$(".input-group span").length){var o=$("<span />").addClass(r+"-error error").html(a);$("#"+r).after(o)}else e.status||$("#"+r).html(a)})},500),$(".modal").modal("show"),setTimeout(function(){!e.status&&0==$(".alert").length||null==$(".input-group span").length?$(".modal-body").prepend("<div class='alert alert-danger' role='alert'>"+e.message+"</div>"):e.status||$(".alert").html(e.message)},500),e.status&&($.cookie("session_Token",e.accessToken),$.cookie("browser",e.browser),window.location="/")},error:function(e){url=window.location.pathname.replace(/\/+$/,"")+"/error",401==e.status?$.ajax({url:"/ajax/unauthorize-change-password",type:"GET",success:function(r){$("#modal_review").html(r),$(".modal-backdrop").remove(),$(".alert").remove(),$("#modal_popup").modal("show"),$("#message").html(e.responseJSON.message),setTimeout(function(){window.location.href="/signin"},2e3)}}):503==e.status&&$.ajax({url:"/ajax/server-down",type:"GET",success:function(e){$(".modal-backdrop").remove(),$("#modal_popup").remove(),$("#modal_review").html(e),$(".alert").remove(),$("#modal_server").modal("show")}})}})}function userNameCheck(e){$("#reset-password").valid()&&checkConnection()&&$.ajax({type:"POST",url:"/user/validate",contentType:"application/json",data:JSON.stringify(e),async:!0,success:function(e){$(".alert").remove(""),e.status&&$.ajax({url:"/ajax/confirmation-page",type:"GET",success:function(e){$("#server_error").remove(),$("#reset-password").remove(),$("#confirm").modal({backdrop:"static",keyboard:!1}),$("#confirm").modal("show"),0==$(".material-icons").length&&$(".icon-box").prepend("<i class='material-icons'></i>")}})},error:function(r){url=window.location.pathname.replace(/\/+$/,"")+"/error",$(".alert").remove(),503==r.status&&!r.responseJSON.status&&r.responseJSON.isMailServiceDown&&($("#message").html(r.responseJSON.message),$("#server_error").modal("show"),$(document).ajaxStop(function(){console.log("ajax stoped")})),setTimeout(function(){404==r.status&&($(".alert").remove(),console.clear(),console.log(r.responseJSON.message+"  "+e.email),0==$(".alert").length||null==$(".input-group span").length?$("#email_response").append("<div class='alert alert-danger' role='alert'>"+r.responseJSON.message+"</div>"):$(".alert").html(r.responseJSON.message))},500),404!=r.status&&($(".alert").remove(""),$("#server_error").modal("show"))}})}function checkConnection(){return $.ajax("/check-connection",{statusCode:{0:function(){return alert(" We can’t connect to the server please check your internet connection or the page which you are looking for has been removed."),!1}}}),!0}function browserInfo(){navigator.appVersion;var e,r,a,o=navigator.userAgent,s=navigator.appName,n=""+parseFloat(navigator.appVersion),t=parseInt(navigator.appVersion,10);-1!=(r=o.indexOf("Opera"))?(s="Opera",n=o.substring(r+6),-1!=(r=o.indexOf("Version"))&&(n=o.substring(r+8))):-1!=(r=o.indexOf("MSIE"))?(s="Microsoft Internet Explorer",n=o.substring(r+5)):-1!=(r=o.indexOf("Chrome"))?(s="Chrome",n=o.substring(r+7)):-1!=(r=o.indexOf("Safari"))?(s="Safari",n=o.substring(r+7),-1!=(r=o.indexOf("Version"))&&(n=o.substring(r+8))):-1!=(r=o.indexOf("Firefox"))?(s="Firefox",n=o.substring(r+8)):(e=o.lastIndexOf(" ")+1)<(r=o.lastIndexOf("/"))&&(s=o.substring(e,r),n=o.substring(r+1),s.toLowerCase()==s.toUpperCase()&&(s=navigator.appName)),-1!=(a=n.indexOf(";"))&&(n=n.substring(0,a)),-1!=(a=n.indexOf(" "))&&(n=n.substring(0,a)),t=parseInt(""+n,10),isNaN(t)&&(n=""+parseFloat(navigator.appVersion),t=parseInt(navigator.appVersion,10))}$(document).ready(function(){$("#loginModalPop").click(function(){$(".modal").modal("show"),document.body.style.overflow="scroll"})}),$(document).ready(function(){$("#login-form").validate({rules:{emailOrMobile:{required:!0},password:{required:!0}},messages:{emailOrMobile:{required:"Please enter your email/mobile number"},password:{required:"Please enter your password"}},submitHandler:function(e){login({emailOrMobile:$("#emailOrMobile").val(),password:$("#password").val()})}})}),$(document).ready(function(){$("#popup-modal").on("hidden.bs.modal",function(){var e=$("#login-form");e.validate().resetForm(),e.find(".error").removeClass("error"),$("#login-form").trigger("reset")})}),jQuery("#change-password").validate({rules:{password:{minlength:6,required:!0},confirm_password:{minlength:6,required:!0,equalTo:"#password"}},messages:{password:{required:"Please enter password",minlength:"Password should be atleast 6 characters long"},confirm_password:{minlength:"Confirm password should be atleast 6 characters long",equalTo:"Password not matched",required:"Please Enter confirm password"}},submitHandler:function(e){var r="";let a=new URLSearchParams(window.location.search),o="";if(a.has("code"),a.has("code")){o=a.get("code"),navigator.appVersion;var s,n,t,i=navigator.userAgent,l=navigator.appName,d=""+parseFloat(navigator.appVersion),c=parseInt(navigator.appVersion,10),p=navigator.platform;-1!=(n=i.indexOf("Opera"))?(l="Opera",d=i.substring(n+6),-1!=(n=i.indexOf("Version"))&&(d=i.substring(n+8))):-1!=(n=i.indexOf("MSIE"))?(l="Microsoft Internet Explorer",d=i.substring(n+5)):-1!=(n=i.indexOf("Chrome"))?(l="Chrome",d=i.substring(n+7)):-1!=(n=i.indexOf("Safari"))?(l="Safari",d=i.substring(n+7),-1!=(n=i.indexOf("Version"))&&(d=i.substring(n+8))):-1!=(n=i.indexOf("Firefox"))?(l="Firefox",d=i.substring(n+8)):(s=i.lastIndexOf(" ")+1)<(n=i.lastIndexOf("/"))&&(l=i.substring(s,n),d=i.substring(n+1),l.toLowerCase()==l.toUpperCase()&&(l=navigator.appName)),-1!=(t=d.indexOf(";"))&&(d=d.substring(0,t)),-1!=(t=d.indexOf(" "))&&(d=d.substring(0,t)),c=parseInt(""+d,10),isNaN(c)&&(d=""+parseFloat(navigator.appVersion),c=parseInt(navigator.appVersion,10)),r={password:$("#password").val(),confirmPassword:$("#confirm_password").val(),code:o,browserName:l,locationName:d,osName:p}}changePassword(r)}}),window.addEventListener("pageshow",function(e){(e.persisted||void 0!==window.performance&&2===window.performance.navigation.type)&&window.location.reload()}),jQuery("#reset-password").validate({rules:{emailOrMobile:{maxlength:100,required:!0}},messages:{emailOrMobile:{required:"Please enter valid email or mobile number",maxlength:"Email or mobile should not be 100 characters long"}},submitHandler:function(e){userNameCheck({email:$("#emailOrMobile").val()})}}),$(document).on("click","#signin",function(){window.location="/signin"}),$(document).on("click","#close",function(){window.location="/"}),$(document).on("click","#icon",function(){$(".alert").remove()});