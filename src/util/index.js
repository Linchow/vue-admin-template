
/**
 * 设置cookie
 * @param {String} name cookie键名
 * @param {String | Number} value cookie值
 * @param {Number} iDay 过期时间 天数
 */
export function setCookie(name, value, iDay){
  var tempStr = name + '=' + value;
  var expires = '';
  if(iDay) { // 默认过期时间为浏览器关闭
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);
      expires = ';expires=' + oDate;
  }
  document.cookie = tempStr + expires;
}

/**
* 读取cookie
* @param {String} name
*/
export function getCookie(name){
  var arr = document.cookie.split('; '); // cookie名字前有空格,需要加空格
  for(var i = 0; i < arr.length; i++){
      var arr2 = arr[i].split('=');
      if(arr2[0] == name){
          return arr2[1];
      }
  }
  return '';
}

/**
* 删除cookie
* @param {String} name 
*/
export function removeCookie(name){
  setCookie(name, 1, -1);
}