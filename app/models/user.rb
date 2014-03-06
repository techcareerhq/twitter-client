class User < ActiveRecord::Base

  attr_accessor :password
  attr_protected :password_digest

  validates :name, :presence => true
  validates :email, :presence => true, :uniqueness => true, :email => true
  validates :password, :presence => true, :confirmation => true
  validates :password_confirmation, :presence => { :if => :password }
  validates :phone, :format => { :allow_nil => true, :with => /^[()0-9- +.]{10,20}s*[extension.]{0,9}s*[0-9]{0,5}$/i }

  def self.authenticate(email, pass)
    user = where(:email => email).first
    user && BCrypt::Password.new(user.password_digest) == pass ? user : nil
  end

  def password=(pass)
    return if pass.blank?
    @password = pass
    self.password_digest = BCrypt::Password.create(pass)
  end

end