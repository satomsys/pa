/**
* UA判定して指定のページにリダイレクトさせる
*/
function protectpage(){
  this.ua = window.navigator.userAgent.toLowerCase(),
  this.appVersion = window.navigator.appVersion.toLowerCase(),
  this.url = '';

 if((this.ua.indexOf("msie") != -1 && this.appVersion.indexOf("msie 6.") != -1) ||
  (this.ua.indexOf("msie") != -1 && this.appVersion.indexOf("msie 7.") != -1) || 
  (this.ua.indexOf("msie") != -1 && this.appVersion.indexOf("msie 8.") != -1) || 
  (this.ua.indexOf("msie") != -1 && this.appVersion.indexOf("msie 9.") != -1) || 
  (this.ua.indexOf("msie") != -1 && this.appVersion.indexOf("msie 10.") != -1)){
      
     this.url = location.href.replace(/talk.*/,'') + '/_not-supported'; //ディレクトリ直下のnot~に。
   } 

  if ( typeof this.url !== 'undefined' && this.url.length !== 0 ) location.href  = this.url;
}