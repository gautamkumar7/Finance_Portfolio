from dataclasses import dataclass


@dataclass
class Wishlist:
    id: int
    stock_name: str
    current_price: float
