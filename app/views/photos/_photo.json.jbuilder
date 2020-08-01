# 非同期通信でfileがPOSTされる
# JSONを返す(引数のオブジェクトの中身を指定して返す)
# -> {"id": "~~", "image_data": "~~", "created_at": "~~", "updated_at": "~~"}
json.extract! photo, :id, :image_data, :created_at, :updated_at

json.url photo_url(photo, format: :json)
# => /photos/1.json を返す
# 画像にアクセスするためのurlを作成
json.image_url photo.image_url
