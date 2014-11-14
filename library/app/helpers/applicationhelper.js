// XSS Protection
function htmlEncode(value){
  return $('<div/>').text(value).html();
};

function htmlDecode(value){
  return $('<div/>').html(value).text();
};

// Form data serialize
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};
		
//Ajax Prefilter
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'https://safe-dusk-6297.herokuapp.com/api' + options.url;
});