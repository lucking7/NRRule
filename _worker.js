const prefix = "/Internal/";
const active = new Set(["/Internal/artifact-lifecycle.json","/Internal/preserved-artifacts.json","/Internal/publication-manifest.json","/Internal/rule-coverage.json","/Internal/rule-output-audit.json","/Internal/source-delta.json","/Internal/source-snapshots/ads.json.gz","/Internal/source-snapshots/ai.json.gz","/Internal/source-snapshots/amazon.json.gz","/Internal/source-snapshots/apple.json.gz","/Internal/source-snapshots/apple_cdn.json.gz","/Internal/source-snapshots/apple_cn.json.gz","/Internal/source-snapshots/apple_intelligence.json.gz","/Internal/source-snapshots/apple_services.json.gz","/Internal/source-snapshots/apple_services_ip.json.gz","/Internal/source-snapshots/bilibili.json.gz","/Internal/source-snapshots/biliintl.json.gz","/Internal/source-snapshots/cdn.json.gz","/Internal/source-snapshots/china_asn.json.gz","/Internal/source-snapshots/china_ip.json.gz","/Internal/source-snapshots/china_ip_ipv6.json.gz","/Internal/source-snapshots/cloudmounter.json.gz","/Internal/source-snapshots/direct-fmz.json.gz","/Internal/source-snapshots/direct.json.gz","/Internal/source-snapshots/disney.json.gz","/Internal/source-snapshots/domestic.json.gz","/Internal/source-snapshots/domestic_cdn.json.gz","/Internal/source-snapshots/download.json.gz","/Internal/source-snapshots/download_cn.json.gz","/Internal/source-snapshots/download_global.json.gz","/Internal/source-snapshots/emby.json.gz","/Internal/source-snapshots/game_download.json.gz","/Internal/source-snapshots/github.json.gz","/Internal/source-snapshots/gitlab.json.gz","/Internal/source-snapshots/global.json.gz","/Internal/source-snapshots/google.json.gz","/Internal/source-snapshots/icloud_private_relay.json.gz","/Internal/source-snapshots/lan.json.gz","/Internal/source-snapshots/microsoft.json.gz","/Internal/source-snapshots/microsoft_cdn.json.gz","/Internal/source-snapshots/my_git.json.gz","/Internal/source-snapshots/my_plus.json.gz","/Internal/source-snapshots/my_proxy.json.gz","/Internal/source-snapshots/my_reject.json.gz","/Internal/source-snapshots/my_tw.json.gz","/Internal/source-snapshots/my_us.json.gz","/Internal/source-snapshots/neteasemusic.json.gz","/Internal/source-snapshots/netflix.json.gz","/Internal/source-snapshots/primevideo.json.gz","/Internal/source-snapshots/reject-drop.json.gz","/Internal/source-snapshots/reject-fmz.json.gz","/Internal/source-snapshots/reject-no-drop.json.gz","/Internal/source-snapshots/reject.json.gz","/Internal/source-snapshots/reject_extra.json.gz","/Internal/source-snapshots/reject_phishing.json.gz","/Internal/source-snapshots/reject_url_regex.json.gz","/Internal/source-snapshots/sogouinput.json.gz","/Internal/source-snapshots/speedtest.json.gz","/Internal/source-snapshots/speedtest_china.json.gz","/Internal/source-snapshots/speedtest_international.json.gz","/Internal/source-snapshots/spotify.json.gz","/Internal/source-snapshots/stream.json.gz","/Internal/source-snapshots/stream_eu.json.gz","/Internal/source-snapshots/stream_hk.json.gz","/Internal/source-snapshots/stream_jp.json.gz","/Internal/source-snapshots/stream_kr.json.gz","/Internal/source-snapshots/stream_tw.json.gz","/Internal/source-snapshots/stream_us.json.gz","/Internal/source-snapshots/streaming_!cn.json.gz","/Internal/source-snapshots/streaming_cn.json.gz","/Internal/source-snapshots/telegram.json.gz","/Internal/source-snapshots/tiktok.json.gz","/Internal/source-snapshots/wechat.json.gz","/Internal/source-snapshots/wechat_no_ua.json.gz","/Internal/source-snapshots/youtube.json.gz"]);
const retired = new Set(["/Clash/container.txt","/Clash/discord.txt","/Clash/ip/container.txt","/Clash/ip/discord.txt","/Clash/ip/scholar.txt","/Clash/non_ip/container.txt","/Clash/non_ip/discord.txt","/Clash/non_ip/scholar.txt","/Clash/scholar.txt","/List/container.list","/List/discord.list","/List/ip/container.list","/List/ip/discord.list","/List/ip/scholar.list","/List/non_ip/container.list","/List/non_ip/discord.list","/List/non_ip/scholar.list","/List/scholar.list","/Loon/container.list","/Loon/discord.list","/Loon/ip/container.list","/Loon/ip/discord.list","/Loon/ip/scholar.list","/Loon/non_ip/container.list","/Loon/non_ip/discord.list","/Loon/non_ip/scholar.list","/Loon/scholar.list","/Modules/Converted/Tencent_Video_remove_ads.sgmodule","/Modules/Converted/腾讯视频去广告.sgmodule","/sing-box/china_asn.json","/sing-box/container.json","/sing-box/discord.json","/sing-box/ip/china_asn.json","/sing-box/ip/container.json","/sing-box/ip/discord.json","/sing-box/ip/scholar.json","/sing-box/non_ip/china_asn.json","/sing-box/non_ip/container.json","/sing-box/non_ip/discord.json","/sing-box/non_ip/scholar.json","/sing-box/scholar.json"]);
const retiredPrefixes = ["/Clash/domainset/","/List/domainset/","/Loon/domainset/","/sing-box/domainset/"];
export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    let decoded;
    try { decoded = decodeURIComponent(pathname); } catch { decoded = null; }
    const isRetired = retired.has(decoded) || (decoded !== null && retiredPrefixes.some(retiredPrefix => decoded.startsWith(retiredPrefix)));
    if (!pathname.startsWith(prefix) && !isRetired) return env.ASSETS.fetch(request);
    if (!isRetired && active.has(decoded)) {
      const asset = await env.ASSETS.fetch(request);
      const response = new Response(asset.body, asset);
      response.headers.set('cache-control', 'public, max-age=0, must-revalidate');
      response.headers.set('x-robots-tag', 'noindex');
      response.headers.set('x-content-type-options', 'nosniff');
      return response;
    }
    return new Response(request.method === 'HEAD' ? null : 'Not Found\n', {
      status: 404,
      headers: {
        'cache-control': 'no-store',
        'content-type': 'text/plain; charset=utf-8',
        'x-content-type-options': 'nosniff',
        'x-robots-tag': 'noindex'
      }
    });
  }
};
