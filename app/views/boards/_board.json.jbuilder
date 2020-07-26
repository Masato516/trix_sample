json.extract! board, :id, :title, :abstract, :blog, :created_at, :updated_at
json.url board_url(board, format: :json)
