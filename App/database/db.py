from dotenv import load_dotenv

load_dotenv()

import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# data = supabase.table("portfolio").select("*").execute()
# print(data)

# Export the supabase client
__all__ = ['supabase']