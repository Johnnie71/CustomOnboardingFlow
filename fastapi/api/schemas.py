from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date

## Schema for a user
class UserBase(BaseModel):
    email: EmailStr
    about: Optional[str] = None
    birthday: Optional[date] = None
    street_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class UserUpdate(UserBase):
    email: Optional[str] = None
    about: Optional[str] = None
    birthday: Optional[date] = None
    street_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None

## Schema for forms
class FormBase(BaseModel):
    name: str
    page: int

class FormCreate(FormBase):
    pass

class FormUpdate(FormBase):
    name: Optional[str] = None
    page: Optional[int] = None

class Form(FormBase):
    id: int

    class Config:
        from_attributes = True