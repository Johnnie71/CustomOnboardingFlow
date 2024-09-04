from fastapi import  APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import schemas
import crud
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session=Depends(get_db)):
  db_user = crud.get_user_by_email(db, email=user.email)
  if db_user:
    raise HTTPException(status_code=400, detail='Email already registered')

  return crud.create_user(db=db, user=user)

@router.patch("/{id}", response_model=schemas.User)
def update_user_info(id: int, updates: schemas.UserUpdate, db: Session = Depends(get_db)):
  db_user = crud.get_user_by_id(db, id)
  if not db_user:
    raise HTTPException(status_code=400, detail='No id associated with user found')
  
  return crud.update_user(user=db_user, updates=updates, db=db)