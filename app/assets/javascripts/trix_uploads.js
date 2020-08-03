// Trix.config.lang.captionPlaceholder = "キャプション"

Trix.config.attachments.preview.caption = { name: false, size: false }

// ファイルが添付された時に非同期通信でファイルを送信する
function uploadAttachment(attachment) {
  var file = attachment.file;
  var form = new FormData;
  form.append("Content-Type", file.type);
  form.append("photo[image]", file);

  var xhr = new XMLHttpRequest;
  /* HTTPリクエスト初期化＋HTTPメソッドおよびリクエスト先URLの設定 */
  xhr.open("POST", "/photos.json", true)
  xhr.setRequestHeader("X-CSRF-Token", Rails.csrfToken());
  xhr.upload.onprogress = function(event){
    var progress = event.loaded / event.total * 100;
    attachment.setUploadProgress(progress);
  }
  xhr.onload = function(){
    if (xhr.status === 201) {
      // 文字列を JSON として解析し、文字列によって記述されている JavaScript の値やオブジェクトを構築
      var data = JSON.parse(xhr.responseText);
      return attachment.setAttributes({
        url: data.image_url,
        href: data.image_url,
        blob_id: data.id //Photoのidを取得するため
      })
    } else {
      attachment.remove();
    }
  }
  return xhr.send(form);
}
// 添付していたファイルが削除された時に非同期通信でファイルを削除する
function destroyAttachment(blob_id) {
  var xhr = new XMLHttpRequest;
  xhr.open("DELETE", "/photos/" + blob_id + ".json", true);
  xhr.setRequestHeader("X-CSRF-Token", Rails.csrfToken());
  xhr.send(null);
}

document.addEventListener("trix-attachment-add", function(event){
  var attachment = event.attachment;
  if (attachment.file) {
    console.log("Uploading attachment");
    return uploadAttachment(attachment);
  }
})

document.addEventListener("trix-attachment-remove",
function(event){
  var attachment = event.attachment;
  if (attachment.file) {
    console.log("Deleting attachment " + attachment.getAttribute('blob_id'));
    return destroyAttachment(attachment.getAttribute('blob_id'));
  }
})

window.onbeforeunload = function(e) {
  return '';
};
