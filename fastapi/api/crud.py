from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from utils import hash_password
import models
import schemas
from database import engine

## User CRUD ##
def create_user(db: Session, user: schemas.UserCreate):
  password = hash_password(user.hashed_password)
  db_user = models.User(
    email=user.email,
    hashed_password=password
  )

  try:
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
  except BaseException as e:
    db.rollback()
    return {"status": 'failed', "message": f'Failed to create user: {e}'}

  return db_user

def get_user_by_id(db: Session, id: int):
  return db.query(models.User).filter(models.User.id == id).first()

def get_user_by_email(db: Session, email: str):
  return db.query(models.User).filter(models.User.email == email).first()

def update_user(user: schemas.User, updates: schemas.UserUpdate, db: Session):
  update_data = updates.model_dump(exclude_unset=True)

  for key, value in update_data.items():
    setattr(user, key, value)
  
  db.commit()
  db.refresh(user)
  
  return user

## Form CRUD ##
def create_form(form: schemas.FormCreate, db: Session):
  db_form = models.Form(
    name=form.name,
    page=form.page
  )

  try:
    db.add(db_form)
    db.commit()
    db.refresh(db_form)
  except BaseException as e:
    db.rollback()
    return {"status": 'failed', "message": f'Failed to create form: {e}'}
  
  return db_form

def get_form_by_id(id: int, db: Session):
  return db.query(models.Form).filter(models.Form.id == id).first()

def get_form_by_name(name: str, db: Session):
  return db.query(models.Form).filter(models.Form.name == name).first()

def update_form_page(form: schemas.Form, page: int, db: Session):
  form.page = page # Setting new page value

  try:
    db.commit()
    db.refresh(form)
  except BaseException as e:
    db.rollback()
    return {"status": 'failed', "message": f'Failed to update form page: {e}'}
  
  return form