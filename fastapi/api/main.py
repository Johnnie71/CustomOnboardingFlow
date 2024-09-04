from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud
import schemas
import models

from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

app.add_middleware(
  CORSMiddleware,
  allow_origins=['http://localhost:3000'],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/")
def health_check():
  return 'Health check complete'

@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session=Depends(get_db)):
  db_user = crud.get_user_by_email(db, email=user.email)
  if db_user:
    raise HTTPException(status_code=400, detail='Email already registered')

  return crud.create_user(db=db, user=user)

@app.patch("/user/{id}", response_model=schemas.User)
def update_user_info(id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
  db_user = crud.get_user_by_id(db, id)
  if not db_user:
    raise HTTPException(status_code=400, detail='No id associated with user found')
  
  return crud.update_user(id=id, user=user, db=db)