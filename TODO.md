command pad
-----------

* 一通り実装したら github issue に異動

* アプリケーションとして動かせるようにする
  - ESC周りはいったん後回し
  - 見た目も最低限整える
  - undine 周り整える (インストールとかも)



* ?
  - [ ] 重いプロセスの時にapp側で操作不能になる現象の対策
  - [ ] undine を終了できるようにする

* Connector
  - 共通コード
  	* [ ] undine がインストールされているか確認する
  	* [ ] 古いバージョンが入ってる場合はアップデート
  	* [ ] ない場合はインストール

  - LocalConnector
  - SshConnector

* TerminalViewModel
  - [ ] 追加ユーザー情報
  - [ ] umask
  - env
  - 実行中マーカー
    * [ ] PID
    * [x] exit_status
  - cwd
    * [ ] pwd 取得
    * [ ] ディレクトリ移動
  - screen
    * [ ] span を組み合わせたいい感じの出力画面
    * [ ] 文字入力を取得する
    * [ ] ESCシーケンス
    * [ ] ? 文字コード変更
    * [ ] ? binary dump
    * [ ] ? 出力が多すぎるときに省略機能
  - command line parse
    * [x] ひとまず仮に単純にスペースで split する
    * [ ] "", '', `` に対応する
    * [ ] glob
  - [ ] command line を装飾する

* HistoryViewModel
  - 実行時情報の表示
    * [x] user
    * [x] host
    * [ ] cmd, args をいい感じに修正できるようにする
    * [ ] 開始時間、終了時間、経過時間
    * [x] 消費時間
    * [x] 終了ステータス
  - stdout, stderr をいい感じに表示する
    * [ ] head, tail
    * [ ] 容量、文字コード

* PaneViewModel
  - [x] @views




* undine
  - [x] msgpack encoder を書く
  - [x] stdin
  - [x] stdout
  - [x] stderr
  - [x] pty
  - [ ] シグナル周り調査？
  - 環境通達
    * [ ] 環境変数取得
    * [ ] pwd 取得
    * [ ] current のファイルリスト取得
    * [ ] id 取得
  - 入出力バッファの保持
    * [ ] メモリ上に保持する
    * [ ] メモリ上限容量のカスタマイズ
    * [ ] ファイル上に保持する


----

* chroot


* history
	- Host, directory, env, result

* process
  - Host, directory, env, result, PID...

----
[@host, @user, @user_button, @cwd, @input.char_code, @output.char_code, @umask, @env, @git, @status, @controlls, @stop_button, @term_button, @bg_button]

_[1].stdout
_[1].stderr
_[1].string
_[1].exit_status



## 構造

* 仮想スクリーン
  - サイズは決まっている ex. 80x25
  - 表示が必要な時に表示する (overlay?)
* リザルト
  - 実行コマンド
  - head & tail or full or 仮想スクリーン
  - 実行ステータス
* プロンプト
  - current 情報 (ディレクトリ、環境変数など)
  - 入力中のコマンド
* サブリスト (overlay or window or sticky... ?)
  - ディレクトリリスト
  - ヒストリリスト
    * 共通 currentのみ / 同一セッションのみ / 全部
  - 環境変数

## ペイン (基本単位)

* 標準モード
  - 0..n個のリザルトと1個のプロンプト
  - リザルトは消すことも可能
  - まぁ標準的なコンソールっぽい表示
* ヒストリー一覧
  - 
* 自由帳
  - リザルトなどを持ってくる領域
  - editor

## 実行モード

* 標準実行
  - 入力されたコマンドを一度実行する
* watch (repeat)
  - 入力されたコマンドを一定時間おきに実行する
* watch (条件型)
  - 指定条件によって、入力されたコマンドを実行する
    たとえば、ファイルに変更が加わったらなど

