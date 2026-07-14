const SHEET_NAME = '訂單';
const NOTIFY_EMAIL = 'ez.easy@msa.hinet.net';

function doPost(e) {
  try {
    const order = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['建立時間','訂單編號','姓名','手機','Email','配送方式','門市／地址','付款方式','商品明細','商品小計','運費','總計','備註']);
    }
    const itemText = order.items.map(x => `${x.name} × ${x.qty} = NT$${x.lineTotal}`).join('\n');
    const destination = order.shipping.method === '711' ? order.shipping.store : order.shipping.address;
    sheet.appendRow([
      new Date(), order.orderNo, order.customer.name, order.customer.phone, order.customer.email,
      order.shipping.method === '711' ? '7-11取貨' : '宅配', destination, order.payment,
      itemText, order.amount.subtotal, order.amount.shipping, order.amount.total, order.customer.note || ''
    ]);
    const body = [
      `訂單編號：${order.orderNo}`,
      `姓名：${order.customer.name}`,
      `手機：${order.customer.phone}`,
      `Email：${order.customer.email}`,
      `配送：${order.shipping.method === '711' ? '7-11取貨' : '宅配'}`,
      `門市／地址：${destination}`,
      `付款：${order.payment}`,
      '', '商品：', itemText, '',
      `商品小計：NT$${order.amount.subtotal}`,
      `運費：${order.amount.shipping === 0 ? '免運' : 'NT$'+order.amount.shipping}`,
      `總計：NT$${order.amount.total}`,
      `備註：${order.customer.note || '無'}`
    ].join('\n');
    MailApp.sendEmail(NOTIFY_EMAIL, `新訂單 ${order.orderNo}`, body);
    return ContentService.createTextOutput(JSON.stringify({ok:true,orderNo:order.orderNo})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
