from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, forms
from database import engine

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=['http://localhost:3000', 'https://onboardingflow12.netlify.app'],
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