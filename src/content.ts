const appContent = document.getElementsByClassName("app_content")[0] as any;
const readerTopBar = document.getElementsByClassName("readerTopBar")[0] as any;
const readerControls = document.getElementsByClassName(
  "readerControls"
)[0] as any;
const wrCanvasContainer = document.getElementsByClassName(
  "wr_canvasContainer"
)[0] as any;
const readerCatalog = document.getElementsByClassName(
  "readerCatalog"
)[0] as any;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.fullScreen) {
    appContent.style.maxWidth = "100vw";
    readerTopBar.style.maxWidth = "100vw";
    readerControls.style.marginLeft = "46%";
    readerCatalog.style.marginLeft = "18%";
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    });
  }
});
