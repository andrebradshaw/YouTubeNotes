var reg = (x,n) => x ? x[n] : '';
async function getTranscripts(href) {
  var shareEntity = reg(/(?<=serializedShareEntity":").+?(?=%)/.exec(document.body.outerHTML),0);
  var trackingParams = reg(/(?<="clickTrackingParams":").+?(?=")/.exec(document.body.outerHTML),0);
  var xsrf = reg(/(?<="XSRF_TOKEN":").+?(?=")/.exec(document.head.innerHTML),0);
  var csn = reg(/(?<="csn":").+?(?=")/.exec(document.body.outerHTML),0);
  var id_token = reg(/(?<=ID_TOKEN":").+?(?=")/.exec(document.head.innerHTML),0);
  var res = await fetch("https://www.youtube.com/service_ajax?name=getTranscriptEndpoint", {
  "credentials": "include",
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "x-client-data": "CI22yQEIprbJAQjBtskBCKmdygEIqKPKAQixp8oBCOKoygEI8anKAQiPqsoBCNesygEYz6rKAQ==",
    "x-spf-previous": href,
    "x-spf-referer": href,
    "x-youtube-client-name": "1",
    "x-youtube-client-version": "2.20190620",
    "x-youtube-identity-token": id_token,
    "x-youtube-page-cl": "254043953",
    "x-youtube-page-label": "youtube.ytfe.desktop_20190619_6_RC0",
    "x-youtube-utc-offset": "-240",
    "x-youtube-variants-checksum": "0b3fdca47a187a4f660169cc54d2d985"
  },
  "referrer": href,
  "referrerPolicy": "origin-when-cross-origin",
  "body": "sej=%7B%22clickTrackingParams%22%3A%22"+trackingParams+"%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fservice_ajax%22%2C%22sendPost%22%3Atrue%7D%7D%2C%22getTranscriptEndpoint%22%3A%7B%22params%22%3A%22"+shareEntity+"%253D%253D%22%7D%7D&csn="+csn+"&session_token="+xsrf+"%3D",
  "method": "POST",
  "mode": "cors"
});

  var d = await res.json();
  var cues = d.data.actions[0].openTranscriptAction.transcriptRenderer.transcriptRenderer.body.transcriptBodyRenderer.cueGroups.map(el => [el.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.cue.simpleText, el.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.durationMs, el.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.startOffsetMs]);

  console.log(cues);
}
getTranscripts(window.location.href);
