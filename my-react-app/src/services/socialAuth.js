export const kakaoLogin = () =>
  new Promise((resolve, reject) => {
    if (!window.Kakao) {
      reject("Kakao SDK not loaded!");
      return;
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email, birthyear",
      success: function () {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            const data = {
              nickname: res.kakao_account.profile.nickname,
              email: res.kakao_account.email,
              birthyear: res.kakao_account.birthyear,
            };
            resolve(data);
          },
          fail: reject,
        });
      },
      fail: reject,
    });
  });
