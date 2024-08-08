from dataclasses import dataclass

@dataclass
class PnL:
    id: int
    date: str
    realised_pl: float
    unrealised_pl: float
