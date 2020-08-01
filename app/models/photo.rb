class Photo < ApplicationRecord
  # shrineから継承されたImageUploaderクラス
  include ImageUploader[:image]
end
