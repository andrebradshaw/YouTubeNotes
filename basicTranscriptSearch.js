var reg = (x, n) => x ? x[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

async function getTranscripts(href, doc) {
  var shareEntity = reg(/(?<=serializedShareEntity":").+?(?=%)/.exec(doc.body.outerHTML), 0);
  var trackingParams = reg(/(?<="clickTrackingParams":").+?(?=")/.exec(doc.body.outerHTML), 0);
  var xsrf = reg(/(?<="XSRF_TOKEN":").+?(?=")/.exec(doc.head.innerHTML), 0);
  var csn = reg(/(?<="csn":").+?(?=")/.exec(doc.body.outerHTML), 0);
  var id_token = reg(/(?<=ID_TOKEN":").+?(?=")/.exec(doc.head.innerHTML), 0);
  var res = await fetch("https://www.youtube.com/service_ajax?name=getTranscriptEndpoint", {
    "credentials": "include",
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      "x-client-data": "CI22yQEIprbJAQjBtskBCKmdygEIqKPKAQixp8oBCOKoygEI8anKAQiPqsoBCNesygEYz6rKAQ==",
      "x-spf-previous": 'https://www.youtube.com/watch?v=' + href,
      "x-spf-referer": 'https://www.youtube.com/watch?v=' + href,
      "x-youtube-client-name": "1",
      "x-youtube-client-version": "2.20190620",
      "x-youtube-identity-token": id_token,
      "x-youtube-page-cl": "254043953",
      "x-youtube-page-label": "youtube.ytfe.desktop_20190619_6_RC0",
      "x-youtube-utc-offset": "-240",
      "x-youtube-variants-checksum": "0b3fdca47a187a4f660169cc54d2d985"
    },
    "referrer": 'https://www.youtube.com/watch?v=' + href,
    "referrerPolicy": "origin-when-cross-origin",
    "body": "sej=%7B%22clickTrackingParams%22%3A%22" + trackingParams + "%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fservice_ajax%22%2C%22sendPost%22%3Atrue%7D%7D%2C%22getTranscriptEndpoint%22%3A%7B%22params%22%3A%22" + shareEntity + "%253D%253D%22%7D%7D&csn=" + csn + "&session_token=" + xsrf + "%3D",
    "method": "POST",
    "mode": "cors"
  });
  var d = await res.json();
  var tBod = d.data.actions[0].openTranscriptAction.transcriptRenderer.transcriptRenderer.body;
  var cues = tBod ? tBod.transcriptBodyRenderer.cueGroups.map(el => [el.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.cue.simpleText, el.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.durationMs, el.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer.startOffsetMs]) : null;
  return cues;
}

async function getVideoTrans(path) {
  var res = await fetch("https://www.youtube.com/watch?v=" + path);
  var text = await res.text();
  var doc = new DOMParser().parseFromString(text, 'text/html');
  var transcripts = await getTranscripts(path, doc);
  return transcripts;
}

async function createHTMLSearchBox(path) {
  var transcripts = await getVideoTrans(path);
  var mapped = '';
  if(transcripts){
    transcripts.forEach(el => {
      mapped = mapped + el[0] + ' t_' + Math.round(el[2] / 1000) + ' '
    });
    console.log(mapped);
  }

  if (gi(document, 'trans_search_container')) gi(document, 'trans_search_container').outerHTML = '';

  var cont = ele('div');
  attr(cont, 'id', 'trans_search_container');
  attr(cont, 'style', 'padding: 6px; position: fixed; top: 1%; left: 1%; width: 380px; z-index: 11111;');
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'id', 'trans_search_head');
  attr(head, 'style', 'padding: 6px; background: #004471; color: #fff; border-radius: 0.2em; border: 1.5px solid #004471; height: 18px; cursor: move;');
  cont.appendChild(head);

  var close = ele('div');
  attr(close, 'id', 'trans_search_close');
  attr(close, 'style', 'padding: 6px; background: transparent; color: crimson; float: left; transform: scale(3.3, 2); cursor: pointer;');
  close.innerText = 'X';
  head.appendChild(close);

  var bod = ele('div');
  attr(bod, 'id', 'trans_search_body');
  attr(bod, 'style', 'padding: 6px; background: #fff; color: #000; border-radius: 0.2em; border: 1.5px solid #004471;');
  cont.appendChild(bod);

  var searchBox = ele('input');
  attr(searchBox, 'id', 'trans_search_searchBox');
  attr(searchBox, 'placeholder', 'Transcript Search - Enter to run');
  attr(searchBox, 'style', 'padding: 6px; background: #fff; color: #004471; border-radius: 0.2em; border: 1px solid #004471; width: 94%;');
  bod.appendChild(searchBox);

  searchBox.addEventListener('keydown', (e) => {
    if (/Enter/i.test(e.key.toString())) {
      runSearch();
    }
  });

  function runSearch() {
    if (gi(document, 'search_resContainer')) gi(document, 'search_resContainer').outerHTML = '';
    var matchingLinks = [];
    var bool = gi(document, 'trans_search_searchBox').value.replace(/\s*\*\s*/g, '\\s*\\w*\\s+');
    var x = bool ? new RegExp(bool + '.+?(t_\\d+)', 'i') : null;
    var matches = x ? mapped.match(new RegExp(bool + '.+?(t_\\d+)', 'ig')) : [];
    if (matches) {
      matches.forEach(el => {
        var matchedStr = x ? reg(x.exec(el), 1).replace(/t_/, '') : null;
        var second = matchedStr ? parseInt(matchedStr) : null;
        var moveback = second && second > 2 ? second - 3 : null;
        var linkgen = moveback ? 'https://youtu.be/' + path + '?t=' + moveback : '';
        matchingLinks.push([el.replace(/\s*t_\d+\s*/g, ''), linkgen]);
      });
    }

    var resCont = ele('div');
    attr(resCont, 'id', 'search_resContainer');
    attr(resCont, 'style', 'padding: 6px;');
    bod.appendChild(resCont);
    if (matches) {
      matchingLinks.forEach(el => {
        var link = ele('div');
        attr(link, 'style', 'padding: 6px;');
        resCont.appendChild(link);
        link.innerHTML = '<a href="' + el[1] + '">' + el[0] + '</a>';
      });
    }else{
      var link = ele('div');
      attr(link, 'style', 'padding: 6px;');
      resCont.appendChild(link);
      link.innerText = 'no results';
    }
  }

}
var tubePath = reg(/(?<=youtube.com\/watch\?v=|youtu.be\/).+?(?=\&|\?|$)/.exec(window.location.href),0);
if(tubePath) createHTMLSearchBox(tubePath);
