from fastapi import  APIRouter, HTTPException, Depends, status
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

@router.put("/", response_model=list[schemas.FormUpdate])
def update_forms_pages(forms: list[schemas.FormUpdate], db: Session = Depends(get_db)):
  form_ids = [form.id for form in forms]
  db_forms = crud.get_forms_by_ids(form_ids, db)

  if len(db_forms) != len(forms):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Some forms not found"
        )

  updated_db_forms = crud.update_form_pages(db_forms=db_forms, forms=forms, db=db)

  return updated_db_forms