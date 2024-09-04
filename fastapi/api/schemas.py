from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date

# Schema for creating a user
class UserBase(BaseModel):
    email: EmailStr
    about: Optional[str] = None
    birthday: Optional[date] = None
    street_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None

class UserCreate(UserBase):
    hashed_password: str

class User(UserBase):
    id: int
    email: str