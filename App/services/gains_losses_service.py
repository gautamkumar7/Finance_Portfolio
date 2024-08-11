from typing import List, Dict
from database.db import supabase

class GainsLossesService:
    @staticmethod
    def get_percentage_change(avg_buy_price: float, current_price: float) -> float:
        if avg_buy_price == 0:
            return 0
        return ((current_price - avg_buy_price) / avg_buy_price) * 100

    @staticmethod
    def get_combined_gains_losses() -> List[Dict[str, float]]:
        # Fetch all entities
        response = supabase.table("entities").select("*").execute()
        if response.data:
            gains_losses = [
                {
                    'name': item['name'],
                    'type': item['type'],
                    'percentage_change': GainsLossesService.get_percentage_change(float(item['avg_buy_price']), float(item['current_price']))
                }
                for item in response.data
            ]
            return gains_losses
        return []
