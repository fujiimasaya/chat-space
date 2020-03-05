# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups,through::members
- has_many :messages
- has_many :members

## messagsテーブル
Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique:true|

### Association
- has_many :users,through::members
- has_many :messages
- has_many :members

## membersテーブル
Column|Type|Options|
|------|----|-------|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belomgs_to :user
