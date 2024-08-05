from repository.database_access import  get_db_connection

def test_get_db_connection():
    actualdb = get_db_connection().database
    expecteddb= 'portfolio'
    assert actualdb == expecteddb