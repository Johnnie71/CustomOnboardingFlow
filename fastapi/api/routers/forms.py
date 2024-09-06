from fastapi import  APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import schemas
import crud
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Form) # Creating of form to have in the database
def create_form(form: schemas.FormCreate, db: Session = Depends(get_db)):
  db_form = crud.get_form_by_name(name=form.name, db=db)
  if db_form:
    raise HTTPException(status_code=400, detail='Form already registered')
  
  return crud.create_form(form=form, db=db)

@router.get('/', response_model=list[schemas.Form])
def get_forms(db: Session = Depends(get_db)):
  return crud.get_forms(db=db)

@router.patch("/{id}", response_model=schemas.Form)
def update_form_page(id: int, page: int, db: Session = Depends(get_db)):
  db_form = crud.get_form_by_id(id=id, db=db)
  if not db_form:
    raise HTTPException(status_code=400, detail='No id associated with the form found')
  
  return crud.update_form_page(form=db_form, page=page, db=db)