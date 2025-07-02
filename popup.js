document.getElementById('register-btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: registerISBN
  });
});

// function getBookTitle() {
//   // XPathでタイトル取得
//   const xpath = '//*[@id="productTitle"]';
//   const result = document.evaluate(
//     xpath,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   );
//   const title = result.singleNodeValue?.textContent.trim();

//   if (!title) return alert("タイトルが見つかりません");
//   return title;
// }

function registerISBN() {
  const url = window.location.href;
  const match = url.match(/\/dp\/([A-Z0-9]{10})/);
  if (!match) return alert("ISBNが見つかりません");

  const isbn = match[1];
  if (isbn.startsWith("B0")) {
    alert("ISBNがB0から始まっているためスキップされました");
    return;
  }
  // const title = getBookTitle()
  // XPathでタイトル取得
  const xpath = '//*[@id="productTitle"]';
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  const title = result.singleNodeValue?.textContent.trim();

  if (!title) return alert("タイトルが見つかりません");

  const cover_xpath = '//*[@id="landingImage"]';
  const cover_result = document.evaluate(
    cover_xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  const imgEl = cover_result.singleNodeValue;
  const imageUrl = imgEl ? imgEl.src : "No image found";

  alert(`
    ISBN: ${isbn}・Title: ${title}・Image: ${imageUrl}
    `);

}


// https://www.amazon.co.jp/dp/4309039286/ref=sspa_dk_detail_4?psc=1&pd_rd_i=4309039286&pd_rd_w=uh4pV&content-id=amzn1.sym.4519c587-1a66-4b67-a87f-559231103a05&pf_rd_p=4519c587-1a66-4b67-a87f-559231103a05&pfa_rd_r=JZSQN29KWTMCZVTTQBJM&pd_rd_wg=FNmsu&pd_rd_r=85f2f546-47ed-4d48-86f1-39b25542e8d6&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy


// function registerISBN() {
//   const url = window.location.href;
//   const match = url.match(/\/dp\/([A-Z0-9]{10})/);
//   if (!match) return alert("ISBNが見つかりません");

//   const isbn = match[1];
//   if (isbn.startsWith("B0")) {
//     alert("ISBNがB0から始まっているためスキップされました");
//     return;
//   }

//   fetch("https://example.com/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: `isbn=${isbn}`
//   })
//     .then(res => res.ok ? alert("登録完了") : alert("登録失敗"))
//     .catch(err => alert("エラー: " + err.message));
// }
