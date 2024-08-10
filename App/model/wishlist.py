from dataclasses import dataclass

@dataclass
class Wishlist:
    number: int
    stock_name: str
    current_price: float
    previous_price: float
