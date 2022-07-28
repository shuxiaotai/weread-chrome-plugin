import { useState, useEffect, useRef } from "react";
import { useRequest } from "ahooks";

import { cookiesDomain, baseWebUrl } from "../src/constant";
import MonthData from "./month-data";
import styles from "./App.module.css";

const USER_VID = "wr_vid";

interface ICookies {
  name: string
  value: string
}

function App() {
  const [cookies, setCookies] = useState<ICookies[]>([]);
  const getUserApi = (userVid: string) => {
    return `${baseWebUrl}/web/user?userVid=${userVid}`;
  };
  const { data, run } = useRequest(getUserApi, {
    manual: true,
  }); // 用户信息

  const findUserVidInCookie = (cookies: ICookies[]) => {
    const target = cookies.find((item) => item.name === USER_VID);
    return target?.value;
  };

  // 指定域名下的cookie
  const getCookie = () => {
    chrome.cookies.getAll(
      {
        domain: cookiesDomain,
      },
      function (cookies) {
        setCookies(cookies);
        const result = findUserVidInCookie(cookies);
        if (result) {
          run(result);
        }
      }
    );
  };
  useEffect(() => {
    getCookie();
  }, []);

  // 前往登录
  const handleOpenNewTab = () => {
    chrome.tabs.create({ url: baseWebUrl });
  };

  const handleFullScreen = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id!, { fullScreen: true });
    });
  };

  return (
    <div className={styles["main-wrapper"]}>
      {data?.avatar ? (
        <>
          <img src={data.avatar} />
          <div className={styles["username"]}>{data?.name}</div>
          <div className={styles["signature"]}>{data?.signature}</div>
          <div
            onClick={handleFullScreen}
            className={`${styles["btn"]} ${styles["full-screen"]}`}
          >
            全屏
          </div>
          <MonthData />
        </>
      ) : (
        <div
          className={`${styles["btn"]} ${styles["login"]}`}
          onClick={handleOpenNewTab}
        >
          <a>未登录微信读书，点击前往登录</a>
        </div>
      )}
    </div>
  );
}

export default App;
