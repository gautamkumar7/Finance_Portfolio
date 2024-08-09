from database.db import supabase
from model.wishlist import Wishlist
from typing import List

class WishlistService:
    @staticmethod
    def get_wishlist(number: int) -> List[Wishlist]:
        response = supabase.table("wishlist").select("*").filter("number", "eq", number).execute()
        if response.data:
            return [Wishlist(
                number=item['number'],
                stock_name=item['stock_name'],
                current_price=item['current_price']
            ) for item in response.data]
        return []

    @staticmethod
    def add_to_wishlist(number: int, stock_name: str, current_price: float) -> bool:
        try:
            response = supabase.table("wishlist").insert({
                'number': number,
                'stock_name': stock_name,
                'current_price': current_price
            }).execute()
            # Check for successful insertion based on the response data
            if response.data:
                return True
            else:
                return False
        except Exception as e:
            print(f"An error occurred: {e}")
            return False

    @staticmethod
    def delete_from_wishlist(number, stock_name):
        # Implement the logic to delete the wishlist item from the database
        response = supabase.table('wishlist').delete().eq('number', number).eq('stock_name', stock_name).execute()

        if response.data:
            return True
        else:
            return False