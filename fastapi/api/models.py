from sqlalchemy import Column, String, Integer, Text, Date
from database import Base

class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True, index=True)
  email = Column(String, unique=True, index=True)
  hashed_password = Column(String)

  about = Column(Text)
  birthday = Column(Date)
  street_address = Column(String(255))  
  city = Column(String(100))    
  state = Column(String(100))   
  zip_code = Column(String(20))