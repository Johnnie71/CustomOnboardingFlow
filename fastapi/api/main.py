from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud
import schemas
import models
from routers import users, forms
from database import engine

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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

app.include_router(
  users.router,
  tags=['Users'],
  prefix='/users',
  responses={404: {"description": 'Not Found'}}
)

app.include_router(
  forms.router,
  tags=['Forms'],
  prefix='/forms',
  responses={404: {"description": 'Not Found'}}
)