// authコントローラ、auth Serviceで使う型をあらかじめ設定しておく。

// エラーメッセージの型付
export interface Msg {
  message: string;
}

export interface Csrf {
  csrfToken: string;
}

export interface Jwt {
  accessToken: string;
}
