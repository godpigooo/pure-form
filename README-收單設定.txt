淨序製研 PURE FORM V17 收單設定

目前網站已完成：
- 購物車數量增減、刪除
- 7-11／宅配選擇
- 滿 NT$1,000 免運
- 貨到付款
- 結帳資料驗證
- 訂單編號與完成頁

要讓訂單自動寫入 Google 試算表並寄到客服信箱：
1. 建立一份 Google 試算表。
2. 試算表中選「擴充功能」→「Apps Script」。
3. 貼上 google-apps-script.gs 全部內容並儲存。
4. 選「部署」→「新增部署作業」→ 類型選「網頁應用程式」。
5. 執行身分選自己，存取權限選「所有人」。
6. 複製部署後的網址。
7. 打開 index.html，找到：window.PURE_FORM_ORDER_ENDPOINT='';
8. 把網址貼進引號內，例如：window.PURE_FORM_ORDER_ENDPOINT='https://script.google.com/macros/s/XXXXX/exec';
9. 重新上傳 GitHub Pages。

未填 Endpoint 時，網站仍會建立訂單編號並顯示可複製的訂單內容，但不會自動寄信。
