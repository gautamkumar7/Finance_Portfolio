from dataclasses import dataclass

@dataclass
class Transaction:
    id: int
    action: str
    date: str
    type: str
    quantity: int
    price: float
    total_value: float
    entity_name: str
