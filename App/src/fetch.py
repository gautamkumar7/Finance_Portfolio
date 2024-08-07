import sys
import os

# Add the project root directory to Python's module search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database.db import supabase

# Now you can use the supabase client
# For example:
response = supabase.table('portfolio').select('*').execute()
print(response)