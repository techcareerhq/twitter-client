class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :name,  :null => false
      t.string  :email, :null => false
      t.string  :phone
      t.string  :company
      t.string  :title
      t.string  :license_id
      t.string  :linkedin
      t.string  :twitter
      t.string  :facebook
      t.string  :web
      t.string  :password_digest, :null => false

      t.timestamps
    end
  end
end