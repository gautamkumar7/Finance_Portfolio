from dataclasses import dataclass

@dataclass
class Entity:
    entity_id: int
    type: str
    name: str
    quantity: int
    avg_buy_price: float
    current_price: float
    sector: str
