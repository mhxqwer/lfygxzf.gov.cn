/**
 * @name:常用函数
 * @author:pangzhicui
 */

/**
 * @name:easeSwiper
 * @desc:背景图轮播函数
 * @author:pangzhicui
 * @param:$str dom:       元素名
 */
function easeSwiper(dom) {
  var pic = dom;
  var max = pic.length;
  var index = Math.floor(Math.random() * max);
  var timer = null;
  clearInterval(timer);

  pic.removeClass("active").eq(index).addClass("active");
  timer = setInterval(function () {
    if (index >= max - 1) {
      index = 0;
    } else {
      ++index;
    }
    pic.removeClass("active").eq(index).addClass("active");
  }, 5000);
}

/**
 * @name:tab
 * @desc:鼠标滑过切换层
 * @author:lanyf
 * @param:$str navid:       包含鼠标滑过navid
 * @param:$str conid:       包含层id
 * @param:$str lable:       conid下包含标签
 * @param:$str more:        是否切换更多
 * @param:$str nowclass:    鼠标滑过显示样式名称
 * @return:NULL
 */
function tab(navid, conid, lable, more, nowclass) {
  $("#" + navid + " li").hover(function (e) {
    var index = $("#" + navid + " li").index(this);
    var curLable = $("#" + conid + ">" + lable);
    if (more != "") {
      var moreLable = $("#" + more + " a");
      moreLable.eq(index).siblings().removeClass(nowclass);
      moreLable.eq(index).addClass(nowclass);
    }
    $(this).siblings().removeClass(nowclass);
    $(this).addClass(nowclass);
    curLable.eq(index).siblings(lable).hide();
    curLable.eq(index).show();
  });
}
/**
 * @name:tabclick
 * @desc:鼠标点击切换层
 * @author:lanyf
 * @param:$str navid:       包含鼠标滑过navid
 * @param:$str conid:       包含层id
 * @param:$str lable:       conid下包含标签
 * @param:$str more:        是否切换更多
 * @param:$str nowclass:    鼠标滑过显示样式名称
 * @return:NULL
 */
function tabclick(navid, conid, lable, more, nowclass) {
  $("#" + navid + " li").click(function (e) {
    var index = $("#" + navid + " li").index(this);
    var curLable = $("#" + conid + ">" + lable);
    if (more != "") {
      var moreLable = $("#" + more + " a");
      moreLable.eq(index).siblings().removeClass(nowclass);
      moreLable.eq(index).addClass(nowclass);
    }
    $(this).siblings().removeClass(nowclass);
    $(this).addClass(nowclass);
    curLable.eq(index).siblings(lable).hide();
    curLable.eq(index).show();
  });
}

function getPar(par) {
  var local_url = document.location.href;
  var get = local_url.indexOf(par + "=");
  if (get == -1) {
    return false;
  }
  var get_par = local_url.slice(par.length + get + 1);
  var nextPar = get_par.indexOf("&");
  if (nextPar != -1) {
    get_par = get_par.slice(0, nextPar);
  }
  if (get_par == null) {
    get_par = 377;
  }
  return get_par;
}

/**
 *  getPar : 获取url 上指定参数
 *  @name : 需要获取参数
 *
 * */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * timestampToTime：时间戳转时间
 * @timestamp：时间戳（毫秒）
 * @alltitme：返回时间类型 1 精确到分 2 Y+M+D 不传参：M+D
 * */
function timestampToTime(timestamp, alltitme) {
  var date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  if (alltitme == 1) {
    return Y + M + D + h + m;
  } else if (alltitme == 2) {
    return Y + M + D;
  } else {
    return M + D;
  }
}

function padding(s, len) {
  let l = len - (s + "").length;
  for (var i = 0; i < l; i++) {
    s = "0" + s;
  }
  return s;
}

/**
 * 格式化时间
 * @date：时间
 * @pattern：格式
 * */

function formatDate(date, pattern) {
  var d = new Array(
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  );
  pattern = pattern || "yyyy-MM-dd";
  return pattern.replace(/([yMdhsmw])(\1*)/g, function ($0) {
    switch ($0.charAt(0)) {
      case "y":
        return padding(date.getFullYear(), $0.length);
      case "M":
        return padding(date.getMonth() + 1, $0.length);
      case "d":
        return padding(date.getDate(), $0.length);
      case "w":
        return d[date.getDay()];
      case "h":
        return padding(date.getHours(), $0.length);
      case "m":
        return padding(date.getMinutes(), $0.length);
      case "s":
        return padding(date.getSeconds(), $0.length);
    }
  });
}

/**
 * doSearch：搜索
 * @searchWord:关键字
 * @siteId：站点id
 * */
function doSearch(btn) {
  var url = window.location.href;
  var searchWord = $(btn).siblings("input[name=searchWord]").val();
  var siteId = parseInt($(btn).siblings("input[name=siteId]").val());
  //console.log(parseInt(siteId));
  var typeText = $(btn).siblings("input[name=typeText]").val();

  /*
   $url = '/site/gx/#/?searchWord=' + encodeURI(searchWord)+'&siteId='+siteId;
  typeText ? $url+='&typeText=' + typeText : $url;
  window.open($url, '_blank');
  */

  searchCommonFunc(siteId, typeText, searchWord);
}
function doSearchGxzf(btn) {
  var url = window.location.href;
  var searchWord = $(btn).siblings("input[name=searchWord]").val();
  var siteId = $(btn).siblings("input[name=siteId]").val();
  var typeText = $(btn).siblings("input[name=typeText]").val();

  /*==
  $url = '/site/gxzf/#/?searchWord=' + encodeURI(searchWord);
  typeText ? $url+='&typeText=' + typeText : $url;
  window.open($url, '_blank');
  */

  searchCommonFunc(siteId, typeText, searchWord);
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    var url = window.location.href;
    var searchWord = $(".search-submit")
      .siblings("input[name=searchWord]")
      .val();
    var siteId = $(".search-submit").siblings("input[name=siteId]").val();
    var typeText = $(".search-submit").siblings("input[name=typeText]").val();

    /*==
  $url = '/site/gxzf/#/?searchWord=' + encodeURI(searchWord);
  typeText ? $url+='&typeText=' + typeText : $url;
  window.open($url, '_blank');
  */

    searchCommonFunc(siteId, typeText, searchWord);
  }
});
/**
 * doSearchHot：搜索热词
 * @searchWord:关键字
 * @siteId：站点id
 * */
function doSearchHot(self) {
  var searchWord = $(self).html();
  var siteId = $("input[name=siteId]").val();
  var typeText = $("input[name=typeText]").val();

  searchCommonFunc(siteId, typeText, searchWord);
}

function searchCommonFunc(siteId, typeText, searchWord) {
  $.ajax({
    type: "get",
    url: "/site/gx/siteArr.json",
    dataType: "json",
    success: function (data) {
      var arrData = data.siteArr;
      var curSite = {};
      jump: for (var i = 0; i < arrData.length; i++) {
        if (arrData[i][0].arr) {
          for (var j = 0; j < arrData[i].length; j++) {
            for (var t = 0; t < arrData[i][j].arr.length; t++) {
              if (parseInt(arrData[i][j].arr[t].id) == siteId) {
                curSite = arrData[i][j].arr[t];
                break jump;
              }
            }
          }
        } else {
          for (var j = 0; j < arrData[i].length; j++) {
            if (parseInt(arrData[i][j].id) == siteId) {
              curSite = arrData[i][j];
              break jump;
            }
          }
        }
      }

      var $url = "";
      siteId == 14 || siteId == 141
        ? ($url =
            "/irs-intelligent-search/search?code=181aedaa542&dataTypeId=227&configCode=&sign=9cc99c9d-94aa-44b4-aa79-41227a5385d7&orderBy=related&searchBy=all&appendixType=&granularity=ALL&isSearchForced=0&pageNo=1&pageSize=10&isAdvancedSearch&isDefaultAdvanced&advancedFilters")
        : ($url = "/site/gx/#/");
      //if (siteId == 14) siteId=141; //政府网特权搜索

      var type = "?type=所有";
      if (typeText) {
        /*
               var typeObj = [
                   {id:1,type:'news?type=新闻'},
                   {id:2,type:'public?type=公开'},
                   {id:3,type:'service?type=服务'},
                   {id:4,type:'file?type=文件'},
                   {id:5,type:'interpretation?type=解读'},
                   {id:7,type:'bulletin?type=公报'}
               ];
               type = typeObj.find(x => x.id === typeText).type;
               */
        var typeArr = [
          "",
          "news?type=新闻",
          "public?type=公开",
          "service?type=服务",
          "file?type=文件",
          "interpretation?type=解读",
          "",
          "bulletin?type=公报",
        ];
        // type = typeArr[typeText];
        type = "?type=所有";
      }
      // $url =
      // $url +
      // type +
      // "&searchWord=" +
      //encodeURI(searchWord) +
      //"&siteId=" +
      //  siteId +
      // "&name=" +
      // encodeURI(curSite.name) +
      // "&sitename=" +
      // encodeURI(curSite.sitename) +
      // "&sitetype=" +
      //encodeURI(curSite.sitetype) +
      //"&siteclass=" +
      //   encodeURI(curSite.siteclass);
      //console.log($url);
      $url = $url + "&searchWord=" + encodeURI(searchWord);

      // window.location.href = $url;

      window.open($url, "_blank");
    },
  });
}

// 分享
function shareTo(stype) {
  var shareLink = document.location.href;
  var shareTitle = document.title;
  var lk = "";
  //qq空间
  if (stype == "qzone") {
    window.open(
      "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
        shareLink +
        "?sharesource=qzone&title=" +
        shareTitle +
        "&summary=" +
        shareTitle +
        "&desc=" +
        shareTitle
    );
  }
  //新浪微博
  if (stype == "sina") {
    window.open(
      "http://service.weibo.com/share/share.php?url=" +
        shareLink +
        "?sharesource=weibo&title=" +
        shareTitle +
        "&pic=" +
        lk +
        "&appkey=2992312571"
    );
  }
  //qq好友
  if (stype == "qq") {
    window.open(
      "http://connect.qq.com/widget/shareqq/index.html?url=" +
        shareLink +
        "?sharesource=qzone&title=" +
        shareTitle
    );
  }
  if (stype == "wechat") {
    $("#shareCode").html("");
    $("#shareCodeIndex").html("");
    $("#shareCode,#shareCodeIndex").qrcode({
      width: 100,
      height: 100,
      text: shareLink,
    });
    $("#shareCode").show();
  }
  if (stype == "toutiao") {
    $("#shareCodeToutiao").html("");
    $("#shareCodeToutiao").qrcode({
      width: 100,
      height: 100,
      text: shareLink,
    });
    $("#shareCodeToutiao").show();
  }
  if (stype == "wechatIndex") {
    $("#shareCodeIndex").html("");
    $("#shareCodeIndex").qrcode({
      width: 100,
      height: 100,
      text: shareLink,
    });
    $("#shareCodeIndex").show();
  }
  if (stype == "douban") {
  }
  $(".article-share-group").mouseover(function () {
    $("#shareCode").hide();
    $("#shareCodeIndex").hide();
    $("#shareCodeToutiao").hide();
  });
  $(".article-share-wechat").mouseover(function () {
    $("#shareCodeIndex").hide();
  });
  $(".article-share-toutiao").mouseover(function () {
    $("#shareCodeToutiao").hide();
  });
}
