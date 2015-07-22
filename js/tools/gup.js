/* exported getUrlParam */
'use strict';

function getUrlParam( name, url ) {
  if (!url) url = location.href.replace(/\/+$/, '');
  name = name.replace(/[\[]/,'[').replace(/[\]]/,']');
  var regexS = '[\\?&]'+name+'=([^&#]*)';
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results === null ? null : results[1];
}