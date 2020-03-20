#＠usersを配列形式にし、変数userとして分解していく
json.array! @users do |user|
  json.id user.id
  json.name user.name
end

#これにより、jsファイル上で、usersという配列、id、nameという変数が使えるようになる