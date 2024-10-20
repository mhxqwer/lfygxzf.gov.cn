$(function(){
    
    var chinese_status = 'gxzf_chinese_status';
    
    //转繁体    
    $('#gxzf_s2t').click(function() {
        $('html').s2t();
        $.cookie(chinese_status, 'traditional', { expires: 360, path: '/' });
        if ( $.cookie(chinese_status) != 'traditional' ) { // 判断是否支持cookie
            alert('您的浏览器不支持cookie，为获得最佳体验建议开启。');
        }
    });
    
    //转简体    
    $('#gxzf_t2s').click(function() {
        $('html').t2s();
        $.cookie(chinese_status, 'simplified', { expires: 360, path: '/' });
    });

    if ( $.cookie(chinese_status) == 'traditional' ) { // 繁体
        $('html').s2t();
    }

});