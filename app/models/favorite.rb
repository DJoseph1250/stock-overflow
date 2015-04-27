# == Schema Information
#
# Table name: favorites
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  stock_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_favorites_on_stock_id  (stock_id)
#  index_favorites_on_user_id   (user_id)
#

class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :stock
end
