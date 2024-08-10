from typing import List
from model.entities import Entity
from database.db import supabase

class GainsLossesService:
    @staticmethod
    def get_gains() -> List[Entity]:
        # Fetch all entities
        response = supabase.table("entities").select("*").execute()
        if response.data:
            # Filter in Python, since PostgREST doesn't support direct column-to-column comparison
            gains = [
                Entity(
                    entity_id=item['entity_id'],
                    type=item['type'],
                    name=item['name'],
                    quantity=item['quantity'],
                    avg_buy_price=float(item['avg_buy_price']),
                    current_price=float(item['current_price']),
                    sector=item['sector']
                ) for item in response.data
                if float(item['current_price']) > float(item['avg_buy_price'])
            ]
            return gains
        return []

    @staticmethod
    def get_losses() -> List[Entity]:
        # Fetch all entities
        response = supabase.table("entities").select("*").execute()
        if response.data:
            # Filter in Python, since PostgREST doesn't support direct column-to-column comparison
            losses = [
                Entity(
                    entity_id=item['entity_id'],
                    type=item['type'],
                    name=item['name'],
                    quantity=item['quantity'],
                    avg_buy_price=float(item['avg_buy_price']),
                    current_price=float(item['current_price']),
                    sector=item['sector']
                ) for item in response.data
                if float(item['current_price']) < float(item['avg_buy_price'])
            ]
            return losses
        return []
