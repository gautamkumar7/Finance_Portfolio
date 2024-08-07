# services/wishlist_service.py

from model.wishlist import Wishlist
from database.db import supabase
from typing import List

class WishlistService:
    @staticmethod
    def get_wishlist(number: int) -> List[Wishlist]:
        response = supabase.table("wishlists").select("*").eq("number", number).execute()
        wishlist = []
        if response.data:
            for item in response.data:
                wishlist.append(Wishlist(
                    id=item['id'],
                    stock_name=item['stock'],
                    current_price=item['price']
                ))
        return wishlist
