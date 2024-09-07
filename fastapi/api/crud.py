from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from utils import hash_password
import models
import schemas
from database import engine

## User CRUD ##
def create_user(db: Session, user: schemas.UserCreate):
  password = hash_password(user.password)
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
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f'Failed to create user: {e}'
    )

  return db_user

def get_users(db: Session):
  return db.query(models.User).all()

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
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f'Failed to create form: {e}'
    )
  
  return db_form

def get_forms(db: Session):
  return db.query(models.Form).all()

def get_forms_by_ids(form_ids: list[int], db: Session):
  return db.query(models.Form).filter(models.Form.id.in_(form_ids)).all()

def get_form_by_name(name: str, db: Session):
  return db.query(models.Form).filter(models.Form.name == name).first()

def update_form_pages(db_forms: list[schemas.Form], forms: list[schemas.Form], db: Session):
  
  try:
    for db_form in db_forms:
      # finding the first form that matches, return None if no match
      updated_form = next((form for form in forms if form.id == db_form.id), None)
      if updated_form:
        db_form.page = updated_form.page
    
    db.commit()

    # refresh all forms
    for db_form in db_forms:
      db.refresh(db_form)

  except Exception as e:
    db.rollback()
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"Failed to update the forms: {e}"
    )
  
  return db_forms