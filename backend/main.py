from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
import models
from database import engine, sessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


# Import for the summarization
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
import nltk

nltk.download("punkt")
##


# from dataValidation import UserBase, NoteBase

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

# CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, adjust as needed
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.post("/register/", status_code=status.HTTP_201_CREATED)
async def register_user(request_data: dict, db: db_dependency):
    email = request_data.get("email")
    user_name = request_data.get("user_name")
    user_pass = request_data.get("user_pass")
    if not email or not user_name or not user_pass:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Missing required fields",
        )

    db_user = models.User(email=email, user_name=user_name, user_pass=user_pass)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/login/", status_code=status.HTTP_200_OK)
async def login_user(request_data: dict, db: db_dependency):
    email = request_data.get("email")
    u_pass = request_data.get("user_pass")
    # Validate request data
    if not email or not u_pass:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Missing email or password",
        )

    # Query database for user with given email
    user_data = db.query(models.User).filter(models.User.email == email).first()
    # Check if user exists and verify password
    if not user_data or user_data.user_pass != u_pass:
        return {"message": "Wrong Eamil or Password"}

    # Return successful login message or user data as needed
    return {"message": "Login successful", "user_data": user_data}


@app.post("/add_note/{user_email}", status_code=status.HTTP_201_CREATED)
async def add_note(user_email: str, request_data: dict, db: db_dependency):
    givenTitle = request_data.get("title")
    givenContent = request_data.get("content")
    givenUser_email = user_email
    # Validate request data
    if not givenTitle or not givenContent or not givenUser_email:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Missing data",
        )
    temp_note = db.query(models.Note).filter(models.Note.title == givenTitle).first()
    if temp_note:
        return {"message": "Multiple notes can not have same title"}
    note_data = models.Note(
        title=givenTitle, content=givenContent, user_email=givenUser_email
    )
    db.add(note_data)
    db.commit()
    db.refresh(note_data)
    return note_data


@app.put("/update_note/{note_id}", status_code=status.HTTP_200_OK)
async def update_note(note_id: int, request_data: dict, db: db_dependency):
    givenContent = request_data.get("content")
    # Validate request data
    if not givenContent:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Missing data",
        )
    note_data = db.query(models.Note).filter(models.Note.note_id == note_id).first()
    note_data.content = givenContent

    db.commit()
    db.refresh(note_data)
    return note_data


@app.delete("/delete_note/{note_id}", status_code=status.HTTP_200_OK)
async def delete_note(note_id: int, db: db_dependency):
    note_data = db.query(models.Note).filter(models.Note.note_id == note_id).first()

    # Check if the note exists
    if not note_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )

    db.delete(note_data)
    db.commit()

    return {"message": "Deleted note successfully."}


@app.get("/get_notes/{user_email}", status_code=status.HTTP_200_OK)
async def get_notes(user_email: str, db: db_dependency):
    all_notes = db.query(models.Note).filter(models.Note.user_email == user_email).all()
    if not all_notes:
        return {"message": "No notes available"}
    return all_notes

#Summary endpoint
@app.post("/summarize/")
async def summarize_text(request_data: dict, db: db_dependency):
    try:
        data = request_data
        text = data["text"]

        # Tokenize and summarize using sumy
        parser = PlaintextParser.from_string(text, Tokenizer("english"))

        # Calculate the number of sentences based on length_ratio
        num_sentences = int(len(parser.document.sentences) * 0.25)

        summarizer = LsaSummarizer()
        summary = summarizer(parser.document, num_sentences)  # Summarize to 2 sentences

        # Prepare summarized text as a string
        summarized_text = " ".join([str(sentence) for sentence in summary])

        return {"summary": summarized_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

