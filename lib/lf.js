export const LF_ID = process.env.NEXT_PUBLIC_LEAD_FORENSICS_ID



export function track_load (docloc, doctit) {


    var trk_sw = escape(screen.width).substring(0, 6);
    var trk_sh = escape(screen.height).substring(0, 6);
    var trk_ref = escape(document.referrer).substring(0, 1100);
    var trk_tit = escape(doctit).substring(0, 200);
    trk_tit = trk_tit.replace(/\%u00a0/g, '');
    trk_tit = trk_tit.replace(/\%u2122/g, '');
    trk_tit = trk_tit.replace(/\%u[0-9][0-9][0-9][0-9]/g, '');
    var trk_loc = escape(docloc).substring(0, 200);
    var trk_agn = escape(navigator.appName).substring(0, 100);
    var trk_lng = window.navigator.userLanguage || window.navigator.language;
    var trk_agv = escape(navigator.userAgent + '.lfcd' + screen.colorDepth + '.lflng' + trk_lng).substring(0, 1000);
    var trk_dom = escape(document.domain).substring(0, 200);
    var trk_user = '216189';
    var trk_cookie = '';
    var trk_guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    var trk_img = 'https://secure.leadforensics.com/Track/Capture.aspx';
    var trk_link = trk_img + '?trk_user=' + trk_user + '&trk_sw=' + trk_sw + '&trk_sh=' + trk_sh + '&trk_ref=' + trk_ref + '&trk_tit=' + trk_tit + '&trk_loc=' + trk_loc + '&trk_agn=' + trk_agn + '&trk_agv=' + trk_agv + '&trk_dom=' + trk_dom + '&trk_guid=' + trk_guid + '&trk_cookie=NA';
    var preload = new Image();
    preload.src = trk_link;

}
