
window.onload = function () {
    if (!window.SpeechSynthesisUtterance) {
        $(".whol").hide();
    }
    var isCloseBtn = localStorage.getItem("isCloseBtn");
    if (isCloseBtn == 0) {
        $(".closeBtn").click()
    }
    var speech_img = $('.speech_img');
    // var currentIndex = 0;
    var isPlaying = false;
    var isPaused = false;
    var text = "";
    var previousText = "";
    var speech;
    //类article-con包裹的内容为要播报的文章内容
    $('.article-con').each(function () {
        $(this).find('section,p').each(function () {
            var p_Text = $(this).text().trim() + "。";
            if (p_Text !== previousText) {
                text += p_Text;
                previousText = p_Text;
            }
        });
    });
    text = text.replace(/文件下载：|关联文件：|\n | |    /g, "");
    var sentences = text.split('。').filter(Boolean);
    sentences = Array.from(new Set(sentences));

    var currentSentenceIndex = 0;
    function playAudio() {
        currentSentenceIndex == sentences.length ? currentSentenceIndex = 0 : '';
        $('.bfts img')[0].src = 'http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/ts_zt.png';
        if (isPlaying) {
            return;
        }
        if (isPaused) {
            window.speechSynthesis.resume()
        } else {
            if (sentences[currentSentenceIndex] !== undefined) {
                console.log("currentSentenceIndex", sentences[currentSentenceIndex])
                if (currentSentenceIndex != sentences.length) {
                    speech = new SpeechSynthesisUtterance(sentences[currentSentenceIndex]);
                    speech.volume = 100; // 音量
                    speech.rate = '1';  // 速度
                    speech.lang = "zh-CN";
                    window.speechSynthesis.speak(speech);
                    speech.onend = msgOnEnd()
                }
                // else {
                //     speech_img.css('background-image', 'url(http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/speech_jing.png)');
                // }
                // console.log("window.speechSynthesis.getVoices()",window.speechSynthesis)
            }
        }
        isPlaying = true;
        isPaused = false;
        speech_img.css('background-image', 'url("http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/speech_dong.gif")');
    }

    function pauseAudio() {
        if (!isPlaying) {
            return;
        }
        isPlaying = false;
        isPaused = true;
        window.speechSynthesis.pause();
        speech_img.css('background-image', 'url(http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/speech_jing.png)');
        $('.bfts img')[0].src = 'http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/ts_jx.png';
    }

    speech_img.click(function () {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    function msgOnEnd() {
        currentSentenceIndex++;
        if (currentSentenceIndex < sentences.length) {
            if (sentences[currentSentenceIndex] !== undefined) {
                // playAudio()
                speech = new SpeechSynthesisUtterance(sentences[currentSentenceIndex]);
                speech.volume = 100; // 音量
                speech.rate = '1';  // 速度
                speech.lang = "zh-CN";
                window.speechSynthesis.speak(speech);
                speech.onend = function () {
                    if (currentSentenceIndex < sentences.length) {
                        msgOnEnd()
                    }
                }
            };
        } else {
            // pauseAudio();
            isPlaying = false;
            isPaused = false;
            speech_img.css('background-image', 'url(http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/speech_jing.png)');
            $('.bfts img')[0].src = 'http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/ts_cx.png';
        }
    };
    $(".closeBtn").click(function () {
        $(".znr").hide();
        window.speechSynthesis.cancel();
        isPlaying = false;
        isPaused = false;
        currentSentenceIndex = 0;
        $('.speech_img').css('background-image', 'url(http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/speech_jing.png)');
        $('.bfts img')[0].src = 'http://www.gxzf.gov.cn/material/zt/2023/yyinbg/imgs/ts.png';
        localStorage.setItem("isCloseBtn", 0);
        $(".Show_Btn").show();
    });
};

$(".Show_Btn").click(function () {
    $(".znr").show();
    localStorage.setItem("isCloseBtn", 1)
    $(".Show_Btn").hide();
});
window.addEventListener("beforeunload", function (e) {
    window.speechSynthesis.cancel();
});
