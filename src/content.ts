const appContent = document.getElementsByClassName(
  "app_content"
)[0] as HTMLDivElement;
const readerTopBar = document.getElementsByClassName(
  "readerTopBar"
)[0] as HTMLDivElement;
const readerControls = document.getElementsByClassName(
  "readerControls"
)[0] as HTMLDivElement;
const wrCanvasContainer = document.getElementsByClassName(
  "wr_canvasContainer"
)[0] as HTMLDivElement;
const readerCatalog = document.getElementsByClassName(
  "readerCatalog"
)[0] as HTMLDivElement;

chrome.runtime.onMessage.addListener(function (request) {
  // 接受到全屏的请求后改变界面大小
  if (request.fullScreen) {
    appContent.style.maxWidth = "100vw";
    // 顶部信息
    readerTopBar.style.maxWidth = "100vw";
    // 目录等浮框
    readerControls.style.marginLeft = "46%";
    readerCatalog.style.marginLeft = "18%";
    // css canvas修改大小后需要触发resize事件后才能生效
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }
});
