$(function () {
    //调整字体：大、小
    $(".size span").click(function () {

        var textFontSize = parseInt($(".pages_content").css("font-size"));

        var cName = $(this).attr("class");
        if (cName == "bigger") {
            if (textFontSize <= 30) {
                textFontSize += 2;
            }
        }
        else if (cName == "smaller") {
            if (textFontSize >= 12) {
                textFontSize -= 2;
            }
        }

        $(".pages_content").css("font-size",  textFontSize + 'px' );

    });

    var articleFileList = $('#article-file-list').html();
    if (articleFileList) {
        articleFileList = articleFileList.trim().replace(/\s/g, "")
        if (articleFileList.length == 0) {
            $('#article-file-list').parent().hide();
        }

    }


    //打印
    $(".article_print").click(function () {
        window.print();
    });


    //二维码
    if ($("#qrcode").length > 0) {
        var type = document.getElementById("Canvas").getContext ? 'canvas' : 'table';
        //var url = (location.href).replace(/www/, 'm');
        var url = location.href;
        $('#qrcode').qrcode({
            render: type,
            text: url, //二维码代表的字符串（本页面的URL）
        });
    }

    $('#fileDownBtn').click(function () {
        //$('#articleFile').addClass('downloadfile');
        var downTitle = $('#articleFile h1').text();
        $("#articleFile").wordExport(downTitle);

    });

    $(".share-box").mouseover(function () {
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

    //   滚动到文章主体显示分享内容
      $(window).scroll(function(){
        var offset=$(document).scrollTop();
        var num =$('.content-wrap').offset().top;
        if(offset >= num) {
            $('.share').show()
        }else{
            $('.share').hide()
        }
      })

});
